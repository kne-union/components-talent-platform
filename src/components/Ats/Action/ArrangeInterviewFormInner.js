import { createWithRemoteLoader } from '@kne/remote-loader';
import { Flex } from 'antd';

const ArrangeInterviewFormInner = createWithRemoteLoader({
  modules: [
    'components-core:FormInfo',
    'components-core:FormInfo@useFormContext',
    'components-core:Descriptions',
    'components-core:Global@usePreset',
    'components-core:Enum'
  ]
})(({ remoteModules }) => {
  const [FormInfo, useFormContext, Descriptions, usePreset, Enum] = remoteModules;
  const { AdvancedSelect, CheckboxGroup, RadioGroup, Input, DatePicker } = FormInfo.fields;
  const { apis } = usePreset();
  const { formData } = useFormContext();
  return (
    <Flex vertical gap={8}>
      <Descriptions
        dataSource={[
          [{ label: '候选人姓名', content: '张三' }],
          [
            {
              label: '投递职位',
              content: '前端工程师'
            },
            { label: '投递客户', content: 'test科技有限公司' }
          ]
        ]}
      />
      <FormInfo
        list={[
          <DatePicker label="面试时间" name="time" rule="REQ" block />,
          <CheckboxGroup.Checkbox label="是否最后一轮" name="isLast" block>
            最后一轮
          </CheckboxGroup.Checkbox>,
          <Enum moduleName="interviewWays">
            {data => (
              <RadioGroup
                label="面试方式"
                name="type"
                options={data.map(({ value, description }) => ({
                  value,
                  label: description
                }))}
              />
            )}
          </Enum>,
          <Input display={!!formData.type} name="info" label={formData.type === 1 ? '面试链接' : '面试地点'} />,
          <AdvancedSelect.User label="面试官" name="interviewer" rule="REQ" api={Object.assign({}, apis.ats.getInterviewerList)} block />
        ]}
      />
    </Flex>
  );
});

export default ArrangeInterviewFormInner;
