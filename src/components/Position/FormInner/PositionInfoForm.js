import { createWithRemoteLoader } from '@kne/remote-loader';

import style from './style.module.scss';

const FormInner = createWithRemoteLoader({
  modules: ['FormInfo', 'FormInfo@formModule', 'Enum']
})(({ remoteModules }) => {
  const [FormInfo, formModule, Enum] = remoteModules;
  const { InputNumber, Input, Select, AddressInput, FunctionSelect, TextArea, SalaryInput, IndustrySelect } = formModule;
  return (
    <FormInfo
      title="职位信息"
      column={2}
      list={[
        <IndustrySelect name="industry" label="行业" maxLength={5} rule="REQ" />,
        <FunctionSelect maxLength={5} allowClear name="functions" rule="REQ" label="职能" isPopup={false} />,
        <Input allowClear name="positionDepartment" label="职位所属客户部门" rule="LEN-0-100" />,
        <Input allowClear name="directSuperiorTitle" label="直属上级title" rule="LEN-0-100" />,
        <Input allowClear name="directSuperiorName" label="直属上级姓名" rule="LEN-0-100" />,
        <InputNumber
          placeholder="请输入下属人数(正整数)"
          name="underlingNumber"
          precision={0}
          formatter={value => {
            if (value === 0) return '';
            if (value) {
              return Math.floor(value);
            }
          }}
          label="下属人数"
          min={1}
          max={10000}
        />,
        <InputNumber
          placeholder="请输入平级人数(正整数)"
          name="sidewaysNumber"
          precision={0}
          formatter={value => {
            if (value === 0) return '';
            if (value) {
              return Math.floor(value);
            }
          }}
          label="平级人数"
          min={1}
          max={10000}
        />,
        <AddressInput name="address" rule="REQ ADDRESSR" label="工作地点" maxLength={50} />,
        <Enum moduleName="positionTypeEnum">
          {data => {
            return (
              <Select
                allowClear
                name="type"
                rule="REQ"
                label="工作性质"
                placeholder="请选择"
                options={(data || []).map(item => {
                  return {
                    value: item.value,
                    label: item.description
                  };
                })}
              />
            );
          }}
        </Enum>,
        <Enum moduleName="positionDegreeEnum">
          {data => {
            return (
              <Select
                allowClear
                name="degree"
                rule="REQ"
                label="学历要求"
                placeholder="请选择"
                options={(data || []).map(item => {
                  return {
                    value: item.value,
                    label: item.description
                  };
                })}
              />
            );
          }}
        </Enum>,
        <Enum moduleName="experienceEnum">
          {data => {
            return (
              <Select
                rule="REQ"
                allowClear
                name="experience"
                label="经验要求"
                options={(data || []).map(item => ({
                  label: item.description,
                  value: item.value
                }))}
              />
            );
          }}
        </Enum>,
        <Enum moduleName="salaryTypeEnum">
          {data => {
            return (
              <SalaryInput
                allowClear
                showOther={false}
                loader={() =>
                  (data || []).map(item => {
                    return {
                      label: item.description,
                      value: item.value
                    };
                  })
                }
                name="salaryRange"
                label="薪资范围"
                rule="REQ SALARYRANGE"
                remindUnit
              />
            );
          }}
        </Enum>,
        <InputNumber
          allowClear
          placeholder="请输入招聘人数(正整数)"
          rule="REQ"
          name="number"
          precision={0}
          formatter={value => {
            if (value === 0) return '';
            if (value) {
              return Math.floor(value);
            }
          }}
          label="招聘人数"
          style={{ width: '100%' }}
          min={1}
          max={10000}
        />,
        <TextArea allowClear name="salaryDescripition" rule="LEN-10-1000" label="薪资描述" block />,
        <TextArea allowClear name="description" rule="REQ LEN-10" label="职位描述" block />,
        <TextArea
          allowClear
          name="requirement"
          rule="REQ LEN-10"
          label="职位要求"
          labelRender={({ label }) => (
            <>
              <span>{label}</span>
              <span style={{ '--padding-left': '98px' }} className={style['focus-desc']}>
                （请尽量包含：学历、经验、语言、技能的要求）
              </span>
            </>
          )}
          placeholder="请输入职位要求，请尽量包含：学历、经验、语言、技能的要求"
          block
        />,
        <TextArea allowClear name="positionHighlights" rule="LEN-10-1000" label="职位亮点" block />
      ]}
    />
  );
});

export default FormInner;
