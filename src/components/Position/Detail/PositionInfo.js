import { createWithRemoteLoader } from '@kne/remote-loader';
import get from 'lodash/get';
import dayjs from 'dayjs';
import { ProcessInLabelFetch } from '../ProcessInLabel';
import { Divider, Space } from 'antd';

const PositionInfo = createWithRemoteLoader({
  modules: [
    'components-core:InfoPage',
    'components-core:Descriptions',
    'components-core:Enum',
    'components-core:Global@usePreset',
    'components-core:Common@AddressEnum',
    'components-core:Common@IndustryEnum',
    'components-core:Common@FunctionEnum'
  ]
})(({ data, remoteModules }) => {
  const [InfoPage, Descriptions, Enum, usePreset, AddressEnum, IndustryEnum, FunctionEnum] = remoteModules;
  const { apis } = usePreset();

  return (
    <InfoPage>
      <InfoPage.Part title="基本信息">
        <Descriptions
          dataSource={[
            [
              { label: '职位名称', content: get(data, 'name') },
              { label: '客户名称', content: get(data, 'clientName') }
            ],
            [
              {
                label: '职位状态',
                content: get(data, 'state') && <Enum moduleName="positionStateEnum" name={data.state} />
              },
              {
                label: '职位时间',
                content: get(data, 'startAt')
                  ? `${dayjs(get(data, 'startAt')).format('YYYY-MM-DD')} ~ ${get(data, 'isLongTerm') ? '长期' : dayjs(get(data, 'expectEndAt')).format('YYYY-MM-DD')}`
                  : ''
              }
            ]
          ]}
        />
      </InfoPage.Part>
      <InfoPage.Part title="职位信息">
        <Descriptions
          dataSource={[
            [
              {
                label: '行业',
                content: (
                  <Space split={','}>
                    {get(data, 'industry').map(item => (
                      <IndustryEnum name={item} displayParent />
                    ))}
                  </Space>
                )
              },
              {
                label: '职能',
                content: (
                  <Space split={','}>
                    {get(data, 'functions').map(item => (
                      <FunctionEnum name={item} displayParent />
                    ))}
                  </Space>
                )
              }
            ],
            [
              { label: '职位所属客户部门', content: get(data, 'positionDepartment') },
              { label: '职位所属客户部门', content: get(data, 'directSuperiorTitle') }
            ],
            [
              { label: '直属上级姓名', content: get(data, 'directSuperiorName') },
              { label: '下属人数', content: get(data, 'underlingNumber') }
            ],
            [
              { label: '平级人数', content: get(data, 'sidewaysNumber') },
              {
                label: '工作地点',
                content: get(data, 'outWorkplaceCityId') ? (
                  <Space direction="vertical">
                    <Space split={<Divider type="vertical" />}>
                      <AddressEnum name={get(data, 'outWorkplaceCityId')} />
                      {get(data, 'telecommuting') > 0 && <span>支持远程办公</span>}
                    </Space>
                    {get(data, 'workplaceAddress')}
                  </Space>
                ) : null
              }
            ],
            [
              { label: '工作性质', content: get(data, 'type') && <Enum moduleName="positionTypeEnum" name={data.type} /> },
              {
                label: '学历要求',
                content: get(data, 'degree') && <Enum moduleName="positionDegreeEnum" name={data.degree} />
              }
            ],
            [
              {
                label: '经验要求',
                content: get(data, 'experience') && <Enum moduleName="experienceEnum" name={data.experience} />
              },
              {
                label: '薪资范围',
                content: get(data, 'salaryType') && <Enum moduleName="salaryTypeEnum" name={data.salaryType} />
              }
            ],
            [{ label: '招聘人数', content: get(data, 'number') }],
            [{ label: '薪资描述', content: get(data, 'salaryDescripition') }],
            [{ label: '职位描述', content: get(data, 'description') }],
            [{ label: '职位要求', content: get(data, 'requirement') }],
            [{ label: '职位亮点', content: get(data, 'positionHighlights') }]
          ]}
        />
      </InfoPage.Part>
      <InfoPage.Part title="招聘流程">
        <Descriptions
          dataSource={[
            [
              {
                label: '招聘流程',
                content: <ProcessInLabelFetch {...apis.ats.getProcessAll} id={get(data, 'processinId')} />
              }
            ],
            [{ label: '流程备注', content: get(data, 'processRemark') }]
          ]}
        />
      </InfoPage.Part>
    </InfoPage>
  );
});

export default PositionInfo;
