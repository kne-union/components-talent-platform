const { PositionList, POSITION_TYPE_ENUM, POSITION_DEGREE_ENUM, EXPERIENCE_ENUM, POSITION_STATE_ENUM } = _Position;
const { createWithRemoteLoader } = remoteLoader;
const { range } = _lodash;
const { default: mockData } = _mockData;

const ListExample = createWithRemoteLoader({
  modules: ['Global@PureGlobal', 'Layout']
})(({ remoteModules }) => {
  const [PureGlobal, Layout] = remoteModules;
  return (
    <PureGlobal
      preset={{
        enums: {
          positionTypeEnum: POSITION_TYPE_ENUM,
          positionDegreeEnum: POSITION_DEGREE_ENUM,
          positionStateEnum: POSITION_STATE_ENUM,
          experienceEnum: EXPERIENCE_ENUM
        },
        apis: {
          position: {
            list: {
              loader: async ({ params }) => {
                return {
                  pageData: range(0, 50).map(index => {
                    return {
                      id: index,
                      name: '职位名称',
                      companyName: '职位所属公司名称',
                      level: '1',
                      description: '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试'
                    };
                  }),
                  totalCount: 50
                };
              }
            }
          },
          ats: {
            getProcessAll: {
              loader: async () => {
                return new Promise(resolve => {
                  resolve(mockData.data);
                });
              }
            }
          }
        }
      }}
    >
      <Layout navigation={{ isFixed: false }}>
        <PositionList />
      </Layout>
    </PureGlobal>
  );
});

render(<ListExample />);
