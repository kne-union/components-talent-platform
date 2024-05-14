import { createWithRemoteLoader } from '@kne/remote-loader';
import classnames from 'classnames';
import { List, Space, Timeline, Row, Col } from 'antd';
import get from 'lodash/get';
import isNil from 'lodash/isNil';
import dayjs from 'dayjs';
import style from '../style.module.scss';

const ListCardContent = createWithRemoteLoader({
  modules: [
    'components-view:CardView',
    'components-core:Icon',
    'components-core:Image',
    'components-core:Enum',
    'components-core:Common@AddressEnum',
    'components-core:StateTag'
  ]
})(({ className, remoteModules, ...props }) => {
  const [CardView, Icon, Image, Enum, AddressEnum, StateTag] = remoteModules;
  return (
    <List
      {...props}
      renderItem={data => {
        const skillTags = get(data, 'tags.skillsTags');
        const works = get(data, 'works');
        return (
          <List.Item className={classnames(className, style['list-item'])}>
            <CardView
              className={style['list-item-card-view']}
              avatar={<Image.Avatar id={get(data, 'photo')} size={50} gender={get(data, 'gender')} />}
              title={get(data, 'name') || '姓名缺失'}
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
                  'educations[0].school',
                  value => (
                    <Space>
                      <Icon type="icon-yuanxiao" />
                      <div>{value}</div>
                    </Space>
                  )
                ],
                [
                  'educations[0].subject',
                  value => (
                    <Space>
                      <Icon type="icon-zhuanye" />
                      <div>{value}</div>
                    </Space>
                  )
                ]
              ]
                .filter(([name]) => !isNil(get(data, name)))
                .map(([name, render]) => {
                  return render(get(data, name));
                })}
              info={
                works &&
                works.length && (
                  <Timeline
                    className={classnames({
                      [style['card-info-without-timeline']]: works.length === 1
                    })}
                    items={works.slice(0, 2).map(work => {
                      const startTime = get(work, 'startTime'),
                        endTime = get(work, 'endTime');
                      return {
                        children: (
                          <Row gutter={8} className={style['card-info-wrap']}>
                            <Col span={6}>
                              {startTime && `${dayjs(startTime).format('YYYY.MM')}-${endTime ? dayjs(endTime).format('YYYY.MM') : '至今'}`}
                            </Col>
                            <Col span={9} className={style['card-company-position']}>
                              {get(work, 'company')}
                            </Col>
                            <Col span={9} className={style['card-company-position']}>
                              {get(work, 'position')}
                            </Col>
                          </Row>
                        )
                      };
                    })}
                  />
                )
              }
              footer={
                skillTags &&
                skillTags.length > 0 && (
                  <Space wrap>
                    {skillTags.map(({ tagName }, index) => (
                      <StateTag key={index} text={tagName} type="skill" showBorder showBackground={false} />
                    ))}
                  </Space>
                )
              }
            />
          </List.Item>
        );
      }}
    />
  );
});

export default ListCardContent;
