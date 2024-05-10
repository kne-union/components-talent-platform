const { PositionMainForm, POSITION_TYPE_ENUM, POSITION_DEGREE_ENUM, EXPERIENCE_ENUM, POSITION_STATE_ENUM } = _Position;
const { createWithRemoteLoader } = remoteLoader;
const { default: mockData } = _mockData;

const FormInnerExample = createWithRemoteLoader({
  modules: ['Global@PureGlobal', 'FormInfo@Form']
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
                  resolve(mockData.data);
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
