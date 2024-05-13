import { createWithRemoteLoader } from '@kne/remote-loader';

const RemarkList = createWithRemoteLoader({
  modules: []
})(({ remoteModules }) => {
  return <div>RemarkList</div>;
});

export default RemarkList;
