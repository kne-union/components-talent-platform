const { FormInner, COMPANY_NATURE } = _Company;
const { createWithRemoteLoader } = remoteLoader;

const FormInnerExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal', 'components-core:FormInfo@Form']
})(({ remoteModules }) => {
  const [PureGlobal, Form] = remoteModules;
  return (
    <PureGlobal
      preset={{
        enums: {
          companyNature: COMPANY_NATURE
        }
      }}
    >
      <Form>
        <FormInner />
      </Form>
    </PureGlobal>
  );
});

render(<FormInnerExample />);
