import React from 'react';
import { createWithRemoteLoader } from '@kne/remote-loader';

const BasicInfoForm = createWithRemoteLoader({
  modules: ['FormInfo', 'FormInfo@formModule', 'Enum']
})(({ remoteModules }) => {
  const [FormInfo, formModule, Enum] = remoteModules;
  const { RadioGroup, Input, Select, DatePickerToday, useFormContext } = formModule;
  const { openApi } = useFormContext();

  return (
    <FormInfo
      title="基本信息"
      column={2}
      list={[
        <Input name="name" allowClear label="职位名称" rule="REQ LEN-0-100" />,
        <Enum moduleName="positionStateEnum">
          {data => {
            return (
              <Select
                allowClear
                name="state"
                label="职位状态"
                rule="REQ"
                onChange={value => {
                  if (value !== 10) {
                    openApi.setField({
                      name: 'channels.mini.isOpen',
                      value: false
                    });
                  }
                }}
                options={(data || []).map(item => {
                  return {
                    label: item.description,
                    value: item.value
                  };
                })}
              />
            );
          }}
        </Enum>,
        <DatePickerToday soFarText="长期" rule="REQ TIME" name="time" label="职位时间" interceptor="date-range-string" />
      ]}
    />
  );
});

export default BasicInfoForm;
