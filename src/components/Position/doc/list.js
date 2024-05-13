const { PositionList, enums } = _Position;
const { createWithRemoteLoader } = remoteLoader;
const { range } = _lodash;
const { processAllData } = _mockData;

const ListExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal', 'components-core:Layout']
})(({ remoteModules }) => {
  const [PureGlobal, Layout] = remoteModules;
  return (
    <PureGlobal
      preset={{
        enums,
        apis: {
          position: {
            list: {
              loader: async ({ params }) => {
                return {
                  pageData: range(0, 50).map(index => {
                    return {
                      id: index,
                      name: '职位名称',
                      clientName: '职位所属公司名称',
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
                  resolve(processAllData.data);
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
