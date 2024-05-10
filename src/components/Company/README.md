
# Company


### 概述




### 示例(全屏)

#### 示例代码

- 这里填写示例标题
- 这里填写示例说明
- _Company(@components/Company)

```jsx
const { default: Company } = _Company;
const BaseExample = () => {
  return <Company />;
};

render(<BaseExample />);

```

- 公司表单
- 创建或修改公司信息表单
- _Company(@components/Company),remoteLoader(@kne/remote-loader)

```jsx
const { FormInner, COMPANY_NATURE } = _Company;
const { createWithRemoteLoader } = remoteLoader;

const FormInnerExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal', 'components-core:FormInfo@Form']
})(({ remoteModules }) => {
  const [PureGlobal, Form] = remoteModules;
  return (
    <PureGlobal
      preset={{
        enums: {
          companyNature: COMPANY_NATURE
        }
      }}
    >
      <Form>
        <FormInner />
      </Form>
    </PureGlobal>
  );
});

render(<FormInnerExample />);

```

- 公司列表
- 显示公司列表
- _Company(@components/Company),remoteLoader(@kne/remote-loader),lodash(lodash)

```jsx
const { List, COMPANY_NATURE } = _Company;
const { createWithRemoteLoader } = remoteLoader;
const { range } = lodash;
const ListExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal', 'components-core:Layout', 'components-core:FormInfo']
})(({ remoteModules }) => {
  const [PureGlobal, Layout] = remoteModules;
  return (
    <PureGlobal
      preset={{
        enums: {
          companyNature: COMPANY_NATURE
        },
        apis: {
          company: {
            list: {
              loader: async ({ params }) => {
                return {
                  pageData: range(0, 50).map(index => {
                    return {
                      id: index,
                      name: '测试优先公司',
                      shortName: '测试',
                      englishName: 'test',
                      companyNature: 3,
                      description: '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试'
                    };
                  }),
                  totalCount: 50
                };
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

- 公司详情
- 显示公司详情
- _Company(@components/Company),_Resume(@components/Resume),remoteLoader(@kne/remote-loader),lodash(lodash)

```jsx
const { Detail, COMPANY_NATURE } = _Company;
const { enums: resumeEnums } = _Resume;
const { createWithRemoteLoader } = remoteLoader;
const { range } = lodash;
const DetailExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal', 'components-core:Layout']
})(({ remoteModules }) => {
  const [PureGlobal, Layout] = remoteModules;
  return (
    <PureGlobal
      preset={{
        enums: {
          ...resumeEnums,
          companyNature: COMPANY_NATURE
        },
        apis: {
          company: {
            detail: {
              loader: async () => {
                return {
                  id: '0232',
                  name: '测试优先公司',
                  shortName: '测试',
                  englishName: 'test',
                  companyNature: 3,
                  description: '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试'
                };
              }
            },
            contactsList: {
              loader: async () => {
                return {
                  pageData: range(0, 50).map(index => {
                    return {
                      id: index,
                      name: '联系人',
                      phone: '1892829928',
                      email: 'a@a.com',
                      gender: 'M'
                    };
                  }),
                  totalCount: 50
                };
              }
            },
            positionList: {
              loader: async () => {
                return {
                  pageData: [],
                  totalCount: 0
                };
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

