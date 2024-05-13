const { PassFormInner, ArrangeInterviewFormInner, RejectFormInner, FeedbackFormInner, enums } = _Ats;
const { createWithRemoteLoader } = remoteLoader;
const { Space } = antd;
const { default: userData } = _userData;

const BaseExample = createWithRemoteLoader({
  modules: ['components-core:FormInfo@Form', 'components-core:Global@PureGlobal']
})(({ remoteModules }) => {
  const [Form, PureGlobal] = remoteModules;
  return (
    <PureGlobal
      preset={{
        enums,
        apis: {
          ats: {
            getInterviewerList: {
              loader: async () => {
                return userData.data;
              },
              transformData: data => {
                return Object.assign({}, data, {
                  pageData: data.pageData.map(item => {
                    return Object.assign({}, item, {
                      label: item.name,
                      value: item.id
                    });
                  })
                });
              }
            }
          }
        }
      }}
    >
      <Form>
        <Space direction="vertical">
          <div>初筛通过:</div>
          <PassFormInner currentStage="初筛" nextStage="面试" />
          <div>安排面试:</div>
          <ArrangeInterviewFormInner />
          <div>面试通过:</div>
          <PassFormInner currentStage="面试" nextStage="Offer" />
          <div>淘汰:</div>
          <RejectFormInner />
          <div>面试反馈:</div>
          <FeedbackFormInner />
        </Space>
      </Form>
    </PureGlobal>
  );
});

render(<BaseExample />);
