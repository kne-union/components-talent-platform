import { createWithRemoteLoader } from '@kne/remote-loader';

const FormInner = createWithRemoteLoader({
  modules: ['components-core:FormInfo', 'components-core:Enum']
})(({ remoteModules }) => {
  const [FormInfo, Enum] = remoteModules;
  const { Input, Select, IndustrySelect, AddressSelect, TextArea } = FormInfo.fields;
  return (
    <FormInfo
      title="基本信息"
      list={[
        <Input name="name" label="公司名称" rule="REQ LEN-0-100" />,
        <Input name="shortName" label="公司简称" rule="REQ LEN-0-100" />,
        <Input name="englishName" label="公司英文名" rule="LEN-0-100" />,
        <Enum moduleName="companyNature">
          {list => {
            return (
              <Select
                name="companyNature"
                label="公司性质"
                options={list.map(item => ({
                  value: item.value,
                  label: item.description
                }))}
              />
            );
          }}
        </Enum>,
        <IndustrySelect single name="industry" label="公司行业" rule="REQ" />,
        <AddressSelect single name="city" label="城市" />,
        <TextArea name="description" label="公司简介" block />
      ]}
    />
  );
});

export default FormInner;
