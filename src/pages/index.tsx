import React, { useEffect, useState } from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import style from './index.module.css';
import { io } from "socket.io-client";
import Text from './text';
import List from './list';
import { ListType } from './list';
import { chatMsg, syncMsg } from '@/services';

const { Header, Content, Footer, Sider } = Layout;

const socket = io("ws://localhost:7777");

const userId = +new Date();

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [list, setList] = useState<ListType[]>([]);
  useEffect(() => {
    syncMsg().then(setList);
    socket.on("sync", (arg) => {
      setList(pre => {
        return pre.concat([{ ...arg, isMine: arg.user.id === userId }])
      })
    });
  }, [])

  const onChat = content => chatMsg(content, userId) 

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