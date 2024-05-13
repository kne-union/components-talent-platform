import { createWithRemoteLoader } from '@kne/remote-loader';
import { Space } from 'antd';
import { getColumns as getPositionListColumns } from '@components/Position';

const Position = createWithRemoteLoader({
  modules: ['components-core:Table@TablePage', 'components-core:Global@usePreset']
})(({ remoteModules }) => {
  const [TablePage, usePreset] = remoteModules;

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
