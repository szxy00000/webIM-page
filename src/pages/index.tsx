import React, { useEffect, useState } from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import style from './index.module.css';
import { io } from "socket.io-client";
import Text from './text';
import List from './list';
import { ListProps } from './list';
import axios from 'axios';

const { Header, Content, Footer, Sider } = Layout;

const socket = io("ws://localhost:7777");

const userId = +new Date();

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [list, setList] = useState<ListProps[]>([]);
  useEffect(() => {
    // fetch('http://localhost:7002/user/asdasd').then(res => res.json()).then(console.log)
    axios.get('http://localhost:7777/chatHistory').then(res => res.data).then(setList)
    socket.on("sync", (arg) => {
      setList(pre => {
        return pre.concat([{ ...arg, isMine: arg.user.id === userId }])
      })
    });
  }, [])

  const onChat = (content: string) => {
    axios.post('http://localhost:7777/chat', {
      user: {
        id: userId,
        nick: '匿名用户',
        icon: 'https://img.alicdn.com/imgextra/i4/O1CN01JGYv9V1s1rBNshgTz_!!6000000005707-0-tps-1170-874.jpg'
      },
      content
    })
  }

  return (
    <Layout className={style.layout}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['4']}
          items={[UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
            (icon, index) => ({
              key: String(index + 1),
              icon: React.createElement(icon),
              label: `nav ${index + 1}`,
            }),
          )}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div className={style.list} style={{ padding: 24, height: 400, background: colorBgContainer, overflow: 'auto' }}>
            <List list={list}/>
          </div>
          <div className={style.text} style={{ padding: 24, minHeight: 240, background: colorBgContainer }}>
            <Text onChat={onChat}/>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;