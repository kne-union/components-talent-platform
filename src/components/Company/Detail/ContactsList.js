import { createWithRemoteLoader } from '@kne/remote-loader';
import { Space, Button } from 'antd';
import ContactsFormInner from './ContactsFormInner';

const ContactsList = createWithRemoteLoader({
  modules: [
    'components-core:Table@TablePage',
    'components-core:Filter',
    'components-core:Filter@fields',
    'components-core:Global@usePreset',
    'components-core:FormInfo@useFormModal',
    'components-core:Enum'
  ]
})(({ remoteModules }) => {
  const [TablePage, Filter, filterFields, usePreset, useFormModal, Enum] = remoteModules;

  const { InputFilterItem } = filterFields;
  const { apis } = usePreset();
  const formModal = useFormModal();

  return (
    <Space size={16} className="space-full" style={{ marginBottom: 'var(--margin-width, 16px)', marginTop: '-8px' }} direction="vertical">
      <Filter
        list={[
          [<InputFilterItem label="姓名" name="name" />, <InputFilterItem label="电话" name="phone" />, <InputFilterItem label="邮箱" name="email" />]
        ]}
        extra={
          <Button
            type="primary"
            onClick={() => {
              formModal({
                title: '添加公司联系人',
                children: <ContactsFormInner />
              });
            }}
          >
            添加公司联系人
          </Button>
        }
      />
      <TablePage
        {...Object.assign({}, apis.company.contactsList)}
        columns={[
          {
            name: 'name',
            title: '姓名',
            type: 'mainInfo'
          },
          {
            name: 'phone',
            title: '电话',
            type: 'hideInfo',
            valueOf: (item, { name }) => {
              return {
                loader: () => item[name]
              };
            }
          },
          {
            name: 'email',
            title: '邮箱',
            type: 'hideInfo',
            valueOf: (item, { name }) => {
              return {
                loader: () => item[name]
              };
            }
          },
          {
            name: 'gender',
            title: '性别',
            type: 'singleRow',
            valueOf: (item, { name }) => <Enum moduleName="gender" name={item[name]} />
          },
          {
            name: 'options',
            title: '操作',
            type: 'options',
            fixed: 'right',
            valueOf: item => {
              return [
                {
                  children: '编辑',
                  onClick: () => {
                    formModal({
                      title: '编辑公司联系人',
                      formProps: {
                        data: Object.assign({}, item)
                      },
                      children: <ContactsFormInner />
                    });
                  }
                },
                {
                  children: '生成邀请链接'
                },
                {
                  children: '禁用'
                },
                {
                  children: '删除'
                }
              ];
            }
          }
        ]}
      />
    </Space>
  );
});

export default ContactsList;
