const { PositionMainForm, enums } = _Position;
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
                  resolve(mockData.processAllData.data);
                });
              }
            }
          }
        },
        enums
      }}
    >
      <Form>
        <PositionMainForm />
      </Form>
    </PureGlobal>
  );
});

render(<FormInnerExample />);
