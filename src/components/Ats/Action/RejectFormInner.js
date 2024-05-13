import { createWithRemoteLoader } from '@kne/remote-loader';

const RejectFormInner = createWithRemoteLoader({
  modules: ['components-core:FormInfo', 'components-core:FormInfo@useFormContext', 'components-core:Descriptions', 'components-core:Enum']
})(({ remoteModules }) => {
  const [FormInfo, useFormContext, Descriptions, Enum] = remoteModules;
  const { RadioGroup, CheckboxGroup, TextArea } = FormInfo.fields;
  const { formData } = useFormContext();
  return (
    <>
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
          <Enum moduleName="rejectReason">
            {data => (
              <RadioGroup
                label="淘汰原因"
                name="reason"
                options={data.map(({ value, description }) => ({
                  value,
                  label: description
                }))}
              />
            )}
          </Enum>,
          <Enum moduleName="candidateRejectReason" display={formData.reason === 1} block>
            {data => (
              <CheckboxGroup
                name="reasonDetail"
                label="具体原因"
                rule="REQ"
                options={data.map(({ value, description }) => ({
                  value,
                  label: description
                }))}
              />
            )}
          </Enum>,
          <Enum moduleName="interviewRejectReason" display={formData.reason === 2} block>
            {data => (
              <CheckboxGroup
                name="reasonDetail"
                label="具体原因"
                rule="REQ"
                options={data.map(({ value, description }) => ({
                  value,
                  label: description
                }))}
              />
            )}
          </Enum>,
          <TextArea
            label="其他原因"
            labelHidden
            name="otherReason"
            display={!!(formData.reasonDetail && formData.reasonDetail.indexOf(6) > -1)}
            block
          />
        ]}
      />
    </>
  );
});

export default RejectFormInner;
