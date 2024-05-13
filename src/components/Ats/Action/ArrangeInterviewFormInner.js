import { createWithRemoteLoader } from '@kne/remote-loader';
import { Flex } from 'antd';

const ArrangeInterviewFormInner = createWithRemoteLoader({
  modules: ['components-core:FormInfo', 'components-core:Descriptions', 'components-core:Global@usePreset', 'components-core:Enum']
})(({ remoteModules }) => {
  const [FormInfo, Descriptions, usePreset, Enum] = remoteModules;
  const { AdvancedSelect, CheckboxGroup, RadioGroup } = FormInfo.fields;
  const { apis } = usePreset();
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
          <AdvancedSelect.User label="面试官" name="interviewer" rule="REQ" {...Object.assign({}, apis.user.getList)} block />
        ]}
      />
    </Flex>
  );
});

export default ArrangeInterviewFormInner;
