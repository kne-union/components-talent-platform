const { PositionMainForm, POSITION_TYPE_ENUM, POSITION_DEGREE_ENUM, EXPERIENCE_ENUM, POSITION_STATE_ENUM } = _Position;
const { createWithRemoteLoader } = remoteLoader;
const { processAllData } = _mockData;

const FormInnerExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal', 'components-core:FormInfo@Form']
})(({ remoteModules }) => {
  const [PureGlobal, Form] = remoteModules;
  return (
    <PureGlobal
      preset={{
        apis: {
          ats: {
            getProcessAll: {
              loader: async () => {
                return new Promise(resolve => {
                  resolve(processAllData.data);
                });
              }
            }
          }
        },
        enums: {
          positionTypeEnum: POSITION_TYPE_ENUM,
          positionDegreeEnum: POSITION_DEGREE_ENUM,
          positionStateEnum: POSITION_STATE_ENUM,
          experienceEnum: EXPERIENCE_ENUM
        }
      }}
    >
      <Form>
        <PositionMainForm />
      </Form>
    </PureGlobal>
  );
});

render(<FormInnerExample />);
