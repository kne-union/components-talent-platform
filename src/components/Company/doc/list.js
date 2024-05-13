const { List, enums } = _Company;
const { createWithRemoteLoader } = remoteLoader;
const { range } = lodash;
const ListExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal', 'components-core:Layout', 'components-core:FormInfo']
})(({ remoteModules }) => {
  const [PureGlobal, Layout] = remoteModules;
  return (
    <PureGlobal
      preset={{
        enums,
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
