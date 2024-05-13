const { FormInner, enums } = _Company;
const { createWithRemoteLoader } = remoteLoader;

const FormInnerExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal', 'components-core:FormInfo@Form']
})(({ remoteModules }) => {
  const [PureGlobal, Form] = remoteModules;
  return (
    <PureGlobal
      preset={{
        enums
      }}
    >
      <Form>
        <FormInner />
      </Form>
    </PureGlobal>
  );
});

render(<FormInnerExample />);
