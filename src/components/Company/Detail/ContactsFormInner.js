import { createWithRemoteLoader } from '@kne/remote-loader';

const ContactsFormInner = createWithRemoteLoader({
  modules: ['components-core:FormInfo', 'components-core:Enum']
})(({ remoteModules }) => {
  const [FormInfo, Enum] = remoteModules;
  const { Input, RadioGroup, PhoneNumber } = FormInfo.fields;

  return (
    <FormInfo
      list={[
        <Input label="姓名" name="name" rule="REQ LEN-0-50" />,
        <PhoneNumber label="电话" name="phone" rule="REQ" />,
        <Input label="邮箱" name="email" rule="REQ" />,
        <Enum moduleName="gender">
          {options => (
            <RadioGroup
              label="性别"
              name="gender"
              options={options.map(item => ({
                label: item.description,
                value: item.value
              }))}
            />
          )}
        </Enum>
      ]}
    />
  );
});

export default ContactsFormInner;
