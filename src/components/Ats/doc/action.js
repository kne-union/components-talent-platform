const { InitialScreeningPassFormInner, ArrangeInterviewFormInner, enums } = _Ats;
const { createWithRemoteLoader } = remoteLoader;
const { Space } = antd;
const { default: userData } = _userData;

const BaseExample = createWithRemoteLoader({
  modules: ['components-core:FormInfo@Form', 'components-core:Global@PureGlobal']
})(({ remoteModules }) => {
  const [Form, PureGlobal] = remoteModules;
  return (
    <PureGlobal
      preset={{
        enums,
        apis: {
          user: {
            getList: async () => {
              return userData.data;
            }
          }
        }
      }}
    >
      <Form>
        <Space direction="vertical">
          <div>初筛通过:</div>
          <InitialScreeningPassFormInner />
          <div>安排面试:</div>
          <ArrangeInterviewFormInner />
        </Space>
      </Form>
    </PureGlobal>
  );
});

render(<BaseExample />);
