import React from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Mentions } from 'antd';
import style from './index.module.css';

// const msg = [{
//   user: {
//     nick: 'test',
//     icon: 'https://img.alicdn.com/imgextra/i4/O1CN01JGYv9V1s1rBNshgTz_!!6000000005707-0-tps-1170-874.jpg'
//   },
//   content: 'sadasdasdas'
// }, {
//   user: {
//     nick: 'test',
//     icon: 'https://img.alicdn.com/imgextra/i4/O1CN01JGYv9V1s1rBNshgTz_!!6000000005707-0-tps-1170-874.jpg'
//   },
//   content: 'sadasd11asdas',
//   isMine: true
// }]

export interface ListType {
  user: {
    nick: string;
    icon: string;
  },
  content: string;
}

interface ListProps {
  list: ListType[];
}
const List: React.FC<ListProps> = (props) => {
  return (
    <div className={style.list}>
      {props.list.map(one => (
        <div className={style.msg} key={one._id} style={{ direction: one.isMine? 'rtl': 'ltr' }}>
          <div className={style.user}>
            <img className={style.icon} src={one.user.icon}/>
            <div className={style.nick}>{one.user.nick}</div>
          </div>
          <div className={style.content}>
            {one.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;