import { Space } from 'antd';
import { withFetch } from '@kne/react-fetch';

import pathImg from './images/path.png';
import style from './style.module.scss';

export const ProcessInLabel = ({ selected }) => {
  return (
    <Space key={selected.id}>
      <span className={style['process-name']}>{selected.desc}：</span>
      <Space split={<img src={pathImg} alt="" />}>
        {Object.keys(selected.phase).map(key => {
          return <span>{selected.phase[key]}</span>;
        })}
      </Space>
    </Space>
  );
};

export const ProcessInLabelFetch = withFetch(({ data, id }) => {
  const selected = data.find(item => item.id === id) || {};
  return id ? <ProcessInLabel selected={selected} /> : '-';
});
