import { createWithRemoteLoader } from '@kne/remote-loader';
import React from 'react';

import { ProcessInLabel } from '../ProcessInLabel';

const ProcessInfoForm = createWithRemoteLoader({
  modules: ['components-core:FormInfo', 'components-core:FormInfo@formModule', 'components-core:Global@usePreset']
})(({ remoteModules }) => {
  const [FormInfo, formModule, usePreset] = remoteModules;
  const { AdvancedSelect, TextArea } = formModule;
  const { apis } = usePreset();

  return (
    <FormInfo
      title="招聘流程"
      column={1}
      list={[
        <AdvancedSelect
          name="processinId"
          label="招聘流程"
          rule="REQ"
          single
          overlayWidth={'600px'}
          api={apis.ats.getProcessAll}
          dataFormat={data => {
            const list = (data || []).map(item => {
              return {
                label: <ProcessInLabel selected={item} />,
                value: item.id
              };
            });
            list.sort((a, b) => {
              return a.value - b.value;
            });
            return {
              list
            };
          }}
        />,
        <TextArea allowClear name="processRemark" label="流程备注" block />
      ]}
    />
  );
});

export default ProcessInfoForm;
