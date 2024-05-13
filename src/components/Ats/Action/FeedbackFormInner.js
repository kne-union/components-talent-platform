import { createWithRemoteLoader } from '@kne/remote-loader';
import { Flex } from 'antd';

const FeedbackFormInner = createWithRemoteLoader({
  modules: ['components-core:FormInfo', 'components-core:Descriptions', 'components-core:Enum']
})(({ remoteModules }) => {
  const [FormInfo, Descriptions, Enum] = remoteModules;
  const { RadioGroup, TextArea } = FormInfo.fields;

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
          ],
          [
            { label: '面试时间', content: '' },
            {
              label: '面试官',
              content: ''
            }
          ]
        ]}
      />
      <FormInfo
        list={[
          <Enum moduleName="interviewResult">
            {data => (
              <RadioGroup
                label="面试结果"
                name="result"
                options={data.map(({ value, description }) => ({
                  value,
                  label: description
                }))}
              />
            )}
          </Enum>,
          <TextArea label="备注" name="remark" block />
        ]}
      />
    </Flex>
  );
});

export default FeedbackFormInner;
