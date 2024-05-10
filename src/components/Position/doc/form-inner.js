const { PositionInfoForm, ProcessInfoForm, POSITION_TYPE_ENUM, POSITION_DEGREE_ENUM, EXPERIENCE_ENUM } = _Position;
const { createWithRemoteLoader } = remoteLoader;
const { default: mockData } = _mockData;

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
                  resolve(mockData.data);
                });
              }
            }
          }
        },
        enums: {
          positionTypeEnum: POSITION_TYPE_ENUM,
          positionDegreeEnum: POSITION_DEGREE_ENUM,
          experienceEnum: EXPERIENCE_ENUM
        }
      }}
    >
      <Form>
        <PositionInfoForm />
        <ProcessInfoForm />
      </Form>
    </PureGlobal>
  );
});

render(<FormInnerExample />);
