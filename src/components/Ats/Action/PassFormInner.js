import { createWithRemoteLoader } from '@kne/remote-loader';
import { Alert, Flex } from 'antd';

const PassFormInner = createWithRemoteLoader({
  modules: ['components-core:FormInfo', 'components-core:Descriptions']
})(({ remoteModules, currentStage, nextStage }) => {
  const [FormInfo, Descriptions] = remoteModules;
  const { TextArea } = FormInfo.fields;

  return (
    <Flex vertical gap={8}>
      <Alert message={`确定${currentStage}通过吗？点击确定后，候选人将进入${nextStage}阶段。`} />
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
      <FormInfo list={[<TextArea label="备注" name="remark" block />]} />
    </Flex>
  );
});

export default PassFormInner;
