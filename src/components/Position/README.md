
# Position


### 概述

职位


### 示例(全屏)

#### 示例代码

- 职位表单
- 创建或修改职位信息表单
- _Position(@components/Position),remoteLoader(@kne/remote-loader),_mockData(./mock)

```jsx
const { PositionMainForm, enums } = _Position;
const { createWithRemoteLoader } = remoteLoader;
const { processAllData } = _mockData;

const FormInnerExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal', 'components-core:FormInfo@Form']
})(({ remoteModules }) => {
  const [PureGlobal, Form] = remoteModules;
  return (
    <PureGlobal
      preset={{
        apis: {
          ats: {
            getProcessAll: {
              loader: async () => {
                return new Promise(resolve => {
                  resolve(processAllData.data);
                });
              }
            }
          }
        },
        enums
      }}
    >
      <Form>
        <PositionMainForm />
      </Form>
    </PureGlobal>
  );
});

render(<FormInnerExample />);

```

- 职位列表
- 职位列表
- _Position(@components/Position),_lodash(lodash),remoteLoader(@kne/remote-loader),_mockData(./mock)

```jsx
const { List, enums } = _Position;
const { createWithRemoteLoader } = remoteLoader;
const { range } = _lodash;
const { processAllData } = _mockData;

const ListExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal', 'components-core:Layout']
})(({ remoteModules }) => {
  const [PureGlobal, Layout] = remoteModules;
  return (
    <PureGlobal
      preset={{
        enums,
        apis: {
          position: {
            list: {
              loader: async ({ params }) => {
                return {
                  pageData: range(0, 50).map(index => {
                    return {
                      id: index,
                      name: '职位名称',
                      clientName: '职位所属公司名称',
                      level: '1',
                      description: '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试'
                    };
                  }),
                  totalCount: 50
                };
              }
            }
          },
          ats: {
            getProcessAll: {
              loader: async () => {
                return new Promise(resolve => {
                  resolve(processAllData.data);
                });
              }
            }
          }
        }
      }}
    >
      <Layout navigation={{ isFixed: false }}>
        <List />
      </Layout>
    </PureGlobal>
  );
});

render(<ListExample />);

```

- 职位详情
- 显示职位详情
- _Position(@components/Position),_Resume(@components/Resume),remoteLoader(@kne/remote-loader),lodash(lodash),_mockData(./mock)

```jsx
const { Detail, enums } = _Position;
const { enums: resumeEnums } = _Resume;
const { createWithRemoteLoader } = remoteLoader;
const { range } = lodash;
const { processAllData, positionDetailData } = _mockData;

const DetailExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal', 'components-core:Layout']
})(({ remoteModules }) => {
  const [PureGlobal, Layout] = remoteModules;
  return (
    <PureGlobal
      preset={{
        enums: {
          ...resumeEnums,
          ...enums
        },
        apis: {
          position: {
            detail: {
              loader: async () => {
                return positionDetailData.data;
              }
            }
          },
          ats: {
            getProcessAll: {
              loader: async () => {
                return new Promise(resolve => {
                  resolve(processAllData.data);
                });
              }
            }
          }
        }
      }}
    >
      <Layout navigation={{ isFixed: false }}>
        <Detail />
      </Layout>
    </PureGlobal>
  );
});

render(<DetailExample />);

```


### API

|属性名|说明|类型|默认值|
|  ---  | ---  | --- | --- |

