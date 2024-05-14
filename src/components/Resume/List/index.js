import { createWithRemoteLoader } from '@kne/remote-loader';
import { withFetch } from '@kne/react-fetch';
import get from 'lodash/get';

import ListCardContent from './ListCardContent';

const ResumeListInner = withFetch(({ data }) => {
  return <ListCardContent dataSource={get(data, 'pageData', [])} />;
});

const List = createWithRemoteLoader({
  modules: ['components-core:Layout@Page', 'components-core:Global@usePreset']
})(({ remoteModules }) => {
  const [Page, usePreset] = remoteModules;
  const { apis } = usePreset();

  return (
    <Page noPadding name="resume-list" title="人才库">
      <ResumeListInner {...apis.resume.list} />
    </Page>
  );
});

export default List;
