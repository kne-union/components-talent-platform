const { Detail, enums } = _Position;
const { enums: resumeEnums } = _Resume;
const { createWithRemoteLoader } = remoteLoader;
const { range } = lodash;
const { default: mockData } = _mockData;

const DetailExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal', 'components-core:Layout']
})(({ remoteModules }) => {
  const [PureGlobal, Layout] = remoteModules;
  return (
    <PureGlobal
      preset={{
        enums: {
          ...resumeEnums,
          ...enums
        },
        apis: {
          position: {
            detail: {
              loader: async () => {
                return mockData.positionDetailData.data;
              }
            }
          },
          ats: {
            getProcessAll: {
              loader: async () => {
                return new Promise(resolve => {
                  resolve(mockData.processAllData.data);
                });
              }
            }
          }
        }
      }}
    >
      <Layout navigation={{ isFixed: false }}>
        <Detail />
      </Layout>
    </PureGlobal>
  );
});

render(<DetailExample />);
