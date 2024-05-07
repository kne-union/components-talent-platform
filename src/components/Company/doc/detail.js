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
