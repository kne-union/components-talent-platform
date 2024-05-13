import { createWithRemoteLoader } from '@kne/remote-loader';
import get from 'lodash/get';
import isNil from 'lodash/isNil';
import { Space } from 'antd';
import dayjs from 'dayjs';
import classnames from 'classnames';
import style from '../style.module.scss';

const BasicInfoHeader = createWithRemoteLoader({
  modules: [
    'components-view:CardView',
    'components-core:Image',
    'components-core:Enum',
    'components-core:Common@AddressEnum',
    'components-core:StateTag'
  ]
})(({ className, data, remoteModules, ...props }) => {
  const [CardView, Image, Enum, AddressEnum, StateTag] = remoteModules;
  const skillTags = get(data, 'tags.skillsTags');
  return (
    <CardView
      className={classnames(className, style['basic-info-header'])}
      avatar={<Image.Avatar id={get(data, 'photo')} shape="square" size={90} gender={get(data, 'gender')} />}
      title={get(data, 'name') || '姓名缺失'}
      subtitle={`ID：${get(data, 'id')}`}
      attributes={[
        ['gender', value => <Enum moduleName="genderEnum" name={value} />],
        ['age', value => `${value}岁`],
        ['currentLocation', value => <AddressEnum name={value} />],
        ['degree', value => <Enum moduleName="degreeEnum" name={value} />]
      ]
        .filter(([name]) => !isNil(get(data, name)))
        .map(([name, render]) => {
          return render(get(data, name));
        })}
      properties={[
        [
          'phone',
          value => (
            <Space>
              <div>电话:</div>
              <div>{value}</div>
            </Space>
          )
        ],
        [
          'email',
          value => (
            <Space>
              <div>邮箱:</div>
              <div>{value}</div>
            </Space>
          )
        ],
        [
          'lastAddDate',
          value => (
            <Space>
              <div>最近联系时间:</div>
              <div>{dayjs(value).format('YYYY-MM-DD HH:mm')}</div>
            </Space>
          )
        ]
      ]
        .filter(([name]) => !isNil(get(data, name)))
        .map(([name, render]) => {
          return render(get(data, name));
        })}
      footer={
        skillTags &&
        skillTags.length > 0 && (
          <Space wrap>
            {get(data, 'tags.skillsTags').map(({ tagName }, index) => (
              <StateTag key={index} text={tagName} type="skill" showBorder showBackground={false} />
            ))}
          </Space>
        )
      }
      {...props}
    />
  );
});

export default BasicInfoHeader;
