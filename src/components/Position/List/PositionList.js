import { useState } from 'react';
import { createWithRemoteLoader } from '@kne/remote-loader';
import { Space, Button } from 'antd';
import { getColumns } from './index';
import { PositionMainForm } from '../FormInner';

const List = createWithRemoteLoader({
  modules: [
    'components-core:Layout@TablePage',
    'components-core:Filter@fields',
    'components-core:FormInfo@useFormModal',
    'components-core:Global@usePreset'
  ]
})(({ remoteModules }) => {
  const [TablePage, filterFields, useFormModal, usePreset] = remoteModules;
  const [filter, setFilter] = useState([]);
  const { InputFilterItem, IndustrySelectFilterItem } = filterFields;
  const { apis } = usePreset();

  const formModal = useFormModal();
  return (
    <TablePage
      {...apis.position.list}
      name="position-list"
      columns={[
        ...getColumns(),
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
                    title: '编辑职位信息',
                    children: <PositionMainForm />,
                    formProps: {
                      data: Object.assign({}, item)
                    }
                  });
                }
              },
              {
                children: '禁用'
              },
              {
                isDelete: true,
                confirm: true,
                children: '删除'
              }
            ];
          }
        }
      ]}
      page={{
        filter: {
          value: filter,
          onChange: setFilter,
          list: [[<InputFilterItem label="职位名称" name="text" />, <IndustrySelectFilterItem label="行业" name="industry" />]]
        },
        titleExtra: (
          <Space align="center">
            <Button
              type="primary"
              onClick={() => {
                formModal({
                  title: '新增职位',
                  children: <PositionMainForm />
                });
              }}
            >
              添加职位
            </Button>
          </Space>
        )
      }}
    />
  );
});

export default List;
