import { useState } from 'react';
import { createWithRemoteLoader } from '@kne/remote-loader';
import { Space, Button } from 'antd';
import FormInner from '../FormInner';

const List = createWithRemoteLoader({
  modules: [
    'components-core:Layout@TablePage',
    'components-core:Filter@fields',
    'components-core:FormInfo@useFormModal',
    'components-core:Global@usePreset',
    'components-core:Enum'
  ]
})(({ id, remoteModules }) => {
  const [TablePage, filterFields, useFormModal, usePreset, Enum] = remoteModules;
  const [filter, setFilter] = useState([]);
  const { InputFilterItem, CityFilterItem, IndustrySelectFilterItem } = filterFields;
  const { apis } = usePreset();
  const formModal = useFormModal();
  return (
    <TablePage
      {...Object.assign({}, apis.company.list, {
        params: { id }
      })}
      name="company-list"
      columns={[
        {
          name: 'name',
          title: '公司名称',
          type: 'mainInfo'
        },
        {
          name: 'shortName',
          title: '公司简称',
          type: 'otherSmall'
        },
        {
          name: 'englishName',
          title: '公司英文名',
          type: 'other'
        },
        {
          name: 'companyNature',
          title: '公司性质',
          type: 'other',
          valueOf: (item, { name }) => {
            return <Enum moduleName="companyNature" name={item[name]} />;
          }
        },
        {
          name: 'industry',
          title: '行业',
          type: 'other'
        },
        {
          name: 'city',
          title: '城市',
          type: 'otherSmall'
        },
        {
          name: 'description',
          title: '简介',
          type: 'description',
          ellipsis: true
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
                    title: '编辑公司信息',
                    children: <FormInner />,
                    formProps: {
                      data: Object.assign({}, item)
                    }
                  });
                }
              },
              {
                children: '新增公司联系人',
                onClick: () => {
                  formModal({
                    title: '新增公司联系人',
                    confirm: false,
                    children: <FormInner />,
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
          list: [
            [
              <InputFilterItem label="公司名称" name="text" />,
              <CityFilterItem label="城市" name="city" />,
              <IndustrySelectFilterItem label="行业" name="industry" />
            ]
          ]
        },
        titleExtra: (
          <Space align="center">
            <Button
              type="primary"
              onClick={() => {
                formModal({
                  title: '新增公司',
                  children: <FormInner />
                });
              }}
            >
              添加公司
            </Button>
          </Space>
        )
      }}
    />
  );
});

export default List;
