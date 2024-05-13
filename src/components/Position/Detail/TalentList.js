import { createWithRemoteLoader } from '@kne/remote-loader';

const TalentList = createWithRemoteLoader({
  modules: []
})(({ remoteModules }) => {
  return <div>TalentList</div>;
});

export default TalentList;
