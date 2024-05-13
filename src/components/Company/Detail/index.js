import { createWithRemoteLoader } from '@kne/remote-loader';
import { useParams, useSearchParams } from 'react-router-dom';
import Fetch from '@kne/react-fetch';
import FormInner from '../FormInner';
import ContactsList from './ContactsList';
import PositionList from './PositionList';
import ContactsFormInner from './ContactsFormInner';

const CompanyInfo = createWithRemoteLoader({
  modules: ['components-core:InfoPage', 'components-core:Descriptions', 'components-core:Enum']
})(({ data, remoteModules }) => {
  const [InfoPage, Descriptions, Enum] = remoteModules;
  return (
    <InfoPage>
      <InfoPage.Part title="基本信息">
        <Descriptions
          dataSource={[
            [
              { label: '公司名称', content: data.name },
              {
                label: '公司简称',
                content: data.shortName
              }
            ],
            [
              { label: '公司英文名', content: data.englishName },
              {
                label: '公司性质',
                content: data.companyNature && <Enum moduleName="companyNature" name={data.companyNature} />
              }
            ],
            [
              { label: '行业', content: data.industry },
              { label: '城市', content: data.city }
            ],
            [
              {
                label: '简介',
                content: data.description
              }
            ]
          ]}
        />
      </InfoPage.Part>
    </InfoPage>
  );
});

const detailMap = {
  companyInfo: CompanyInfo,
  contacts: ContactsList,
  position: PositionList
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
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeKey = searchParams.get('tab') || 'companyInfo';
  const DetailInner = detailMap[activeKey];

  return (
    <Fetch
      {...Object.assign({}, apis.company.detail, { params: { id } })}
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
                { tab: '公司信息', key: 'companyInfo' },
                {
                  tab: '公司联系人',
                  key: 'contacts'
                },
                { tab: '职位', key: 'position' }
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
                        title: '编辑公司信息',
                        children: <FormInner />,
                        formProps: {
                          data
                        }
                      });
                    }
                  },
                  {
                    children: '添加公司联系人',
                    onClick: () => {
                      formModal({
                        title: '添加公司联系人',
                        children: <ContactsFormInner />
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
