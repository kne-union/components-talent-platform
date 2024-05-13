
# Ats


### 概述

招聘流程


### 示例

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _Ats(@components/Ats),remoteLoader(@kne/remote-loader)

```jsx
const { default: Ats } = _Ats;
const BaseExample = () => {
  return <Ats />;
};

render(<BaseExample />);

```

- 这里填写示例标题
- 这里填写示例说明
- _Ats(@components/Ats),antd(antd),remoteLoader(@kne/remote-loader),_userData(@components/Ats/doc/user-data.json)

```jsx
const { InitialScreeningPassFormInner, ArrangeInterviewFormInner, enums } = _Ats;
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
          user: {
            getList: async () => {
              return userData.data;
            }
          }
        }
      }}
    >
      <Form>
        <Space direction="vertical">
          <div>初筛通过:</div>
          <InitialScreeningPassFormInner />
          <div>安排面试:</div>
          <ArrangeInterviewFormInner />
        </Space>
      </Form>
    </PureGlobal>
  );
});

render(<BaseExample />);

```


### API

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |

