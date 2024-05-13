const { Detail, POSITION_TYPE_ENUM, POSITION_DEGREE_ENUM, EXPERIENCE_ENUM, POSITION_STATE_ENUM } = _Position;
const { enums: resumeEnums } = _Resume;
const { createWithRemoteLoader } = remoteLoader;
const { range } = lodash;
const { processAllData, processDetailData } = _mockData;

const DetailExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal', 'components-core:Layout']
})(({ remoteModules }) => {
  const [PureGlobal, Layout] = remoteModules;
  return (
    <PureGlobal
      preset={{
        enums: {
          ...resumeEnums,
          positionTypeEnum: POSITION_TYPE_ENUM,
          positionDegreeEnum: POSITION_DEGREE_ENUM,
          positionStateEnum: POSITION_STATE_ENUM,
          experienceEnum: EXPERIENCE_ENUM
        },
        apis: {
          company: {
            detail: {
              loader: async () => {
                return processDetailData.data;
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
        <Detail />
      </Layout>
    </PureGlobal>
  );
});

render(<DetailExample />);
