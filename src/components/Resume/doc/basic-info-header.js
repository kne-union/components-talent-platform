const { BasicInfoHeader, enums } = _Resume;
const { default: resume } = resumeData;
const { createWithRemoteLoader } = remoteLoader;
const BaseExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal']
})(({ remoteModules }) => {
  const [PureGlobal] = remoteModules;
  return (
    <PureGlobal
      preset={{
        enums
      }}
    >
      <BasicInfoHeader data={resume.data} />
    </PureGlobal>
  );
});

render(<BaseExample />);
