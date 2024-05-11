const { List, enums } = _Resume;
const { default: resume } = resumeData;
const { createWithRemoteLoader } = remoteLoader;
const BaseExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal']
})(({ remoteModules }) => {
  const [PureGlobal] = remoteModules;
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
          }
        },
        enums
      }}
    >
      <List dataSource={resume.data.pageData} />
    </PureGlobal>
  );
});

render(<BaseExample />);
