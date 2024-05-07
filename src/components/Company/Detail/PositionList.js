import { createWithRemoteLoader } from '@kne/remote-loader';
import { Space, Button } from 'antd';
import { getListColumns as getPositionListColumns } from '@components/Position';

const Position = createWithRemoteLoader({
  modules: [
    'components-core:Table@TablePage',
    'components-core:Filter',
    'components-core:Filter@fields',
    'components-core:Global@usePreset',
    'components-core:Enum'
  ]
})(({ remoteModules }) => {
  const [TablePage, Filter, filterFields, usePreset, Enum] = remoteModules;

  const { InputFilterItem } = filterFields;
  const { apis } = usePreset();

  return (
    <Space size={16} className="space-full" style={{ marginBottom: 'var(--margin-width, 16px)', marginTop: '-8px' }} direction="vertical">
      <TablePage
        {...Object.assign({}, apis.company.positionList)}
        columns={[
          ...getPositionListColumns(),
          {
            name: 'options',
            title: '操作',
            type: 'options',
            fixed: 'right',
            valueOf: data => {
              return [
                {
                  children: '查看候选人'
                }
              ];
            }
          }
        ]}
      />
    </Space>
  );
});

export default Position;
