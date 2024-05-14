
# Resume


### 概述

简历


### 示例(全屏)

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _Resume(@components/Resume)

```jsx
const { default: Resume } = _Resume;
const BaseExample = () => {
  return <Resume />;
};

render(<BaseExample />);

```

- 这里填写示例标题
- 这里填写示例说明
- _Resume(@components/Resume),resumeData(@components/Resume/doc/resume-mock.json),remoteLoader(@kne/remote-loader)

```jsx
const { BasicInfoHeader, enums } = _Resume;
const { default: resume } = resumeData;
const { createWithRemoteLoader } = remoteLoader;
const BaseExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal']
})(({ remoteModules }) => {
  const [PureGlobal] = remoteModules;
  return (
    <PureGlobal
      preset={{
        enums
      }}
    >
      <BasicInfoHeader data={resume.data} />
    </PureGlobal>
  );
});

render(<BaseExample />);

```

- 这里填写示例标题
- 这里填写示例说明
- _Resume(@components/Resume),resumeData(@components/Resume/doc/resume-list-mock.json),remoteLoader(@kne/remote-loader)

```jsx
const { List, enums } = _Resume;
const { default: resume } = resumeData;
const { createWithRemoteLoader } = remoteLoader;
const BaseExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal', 'components-core:Layout']
})(({ remoteModules }) => {
  const [PureGlobal, Layout] = remoteModules;
  return (
    <PureGlobal
      preset={{
        apis: {
          oss: {
            loader: () => {
              return new Promise(resolve => {
                resolve(window.PUBLIC_URL + '/avatar.png');
              });
            }
          },
          resume: {
            list: {
              loader: () => resume.data
            }
          }
        },
        enums
      }}
    >
      <Layout>
        <List />
      </Layout>
    </PureGlobal>
  );
});

render(<BaseExample />);

```


### API

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |

