import { createWithRemoteLoader } from '@kne/remote-loader';
import { useSearchParams } from 'react-router-dom';
import Fetch from '@kne/react-fetch';
import { PositionMainForm } from '../FormInner';
import PositionInfo from './PositionInfo';
import TalentList from './TalentList';
import RemarkList from './RemarkList';

const detailMap = {
  info: PositionInfo,
  talent: TalentList,
  remark: RemarkList
};

const Detail = createWithRemoteLoader({
  modules: [
    'components-core:Layout@StateBarPage',
    'components-view:PageHeader@PageHeaderInner',
    'components-core:Global@usePreset',
    'components-core:FormInfo@useFormModal'
  ]
})(({ remoteModules }) => {
  const [StateBarPage, PageHeader, usePreset, useFormModal] = remoteModules;
  const { apis } = usePreset();
  const formModal = useFormModal();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeKey = searchParams.get('tab') || 'info';
  const DetailInner = detailMap[activeKey];

  return (
    <Fetch
      {...Object.assign({}, apis.position.detail)}
      render={({ data }) => {
        return (
          <StateBarPage
            stateBar={{
              activeKey,
              onChange: key => {
                searchParams.set('tab', key);
                setSearchParams(searchParams.toString());
              },
              stateOption: [
                { tab: '职位描述', key: 'info' },
                { tab: '人才库推荐', key: 'talent' },
                { tab: '备注', key: 'remark' }
              ]
            }}
            header={
              <PageHeader
                title={data.name}
                info={`编号:${data.id}`}
                options={[
                  {
                    children: '编辑',
                    onClick: () => {
                      formModal({
                        title: '编辑职位信息',
                        children: <PositionMainForm />,
                        formProps: {
                          data
                        }
                      });
                    }
                  },
                  {
                    children: '禁用'
                  },
                  {
                    children: '删除'
                  }
                ]}
              />
            }
          >
            <DetailInner data={data} />
          </StateBarPage>
        );
      }}
    />
  );
});

export default Detail;
