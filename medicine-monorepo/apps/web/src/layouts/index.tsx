import { Outlet } from 'umi';
import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout as AntdLayout, Menu, theme } from 'antd';
const { Header, Sider } = AntdLayout;
import { useNavigate } from 'umi';
import 'antd/dist/reset.css';
import styles from './index.less';

const Layout: React.FC = (props: any) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();
  return (
    <AntdLayout className={styles.layout}>
      <Sider className={styles.sider} trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['/project/list']}
          onClick={(info) => {
            navigate(info.key)
          }}
          items={[
            {
              key: '/project/list',
              icon: <UserOutlined />,
              label: '项目列表',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
        />
      </Sider>
      <AntdLayout className="site-layout">
        <Header style={{ paddingLeft: 20, background: colorBgContainer }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <div className={styles.content}>
          <Outlet />
        </div>
      </AntdLayout>
    </AntdLayout>
  );
};

export default Layout;