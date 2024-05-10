import { createWithRemoteLoader } from '@kne/remote-loader';
import { Space } from 'antd';
import React from 'react';

import pathImg from './images/path.png';
import style from './style.module.scss';

const ProcessInfoForm = createWithRemoteLoader({
  modules: ['FormInfo', 'FormInfo@formModule', 'Global@usePreset']
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
                label: (
                  <Space key={item.id}>
                    <span className={style['process-name']}>{item.desc}：</span>
                    <Space split={<img src={pathImg} alt="" />}>
                      {Object.keys(item.phase).map(key => {
                        return <span>{item.phase[key]}</span>;
                      })}
                    </Space>
                  </Space>
                ),
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
