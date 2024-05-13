const { List, enums } = _Resume;
const { default: resume } = resumeData;
const { createWithRemoteLoader } = remoteLoader;
const BaseExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal', 'components-core:Layout']
})(({ remoteModules }) => {
  const [PureGlobal, Layout] = remoteModules;
  return (
    <PureGlobal
      preset={{
        apis: {
          oss: {
            loader: () => {
              return new Promise(resolve => {
                resolve(window.PUBLIC_URL + '/avatar.png');
              });
            }
          },
          resume: {
            list: {
              loader: () => resume.data
            }
          }
        },
        enums
      }}
    >
      <Layout>
        <List />
      </Layout>
    </PureGlobal>
  );
});

render(<BaseExample />);
