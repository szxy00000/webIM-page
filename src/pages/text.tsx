import React from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Mentions } from 'antd';
import style from './index.module.css';

interface TextProps {
  onChat: (string) => void;
}
const Text: React.FC<TextProps> = props => {

  return (
    <Mentions
      className={style.inputarea}
      rows={3}
      placeholder="You can use @ to ref user here"
      onKeyDown={(e: any) => {
        if (e.keyCode === 13) {
          props.onChat(e.target.value)
        }
      }}
      options={[
        {
          value: 'afc163',
          label: 'afc163',
        },
        {
          value: 'zombieJ',
          label: 'zombieJ',
        },
        {
          value: 'yesmeck',
          label: 'yesmeck',
        },
      ]}
    />
  );
};

export default Text;