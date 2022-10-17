import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  HomeOutlined,
  LogoutOutlined,
  CopyOutlined,
  OrderedListOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/DefaultLayout.css';
import { useSelector } from 'react-redux';

const { Header, Sider, Content } = Layout;

const DefaultLayout = ({ children }) => {
  const { cartItems } = useSelector((state) => state.rootReducer);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h1 className="text-center text-light font-weight-bold mt-4">POS</h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}>
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/bills" icon={<CopyOutlined />}>
            <Link to="/bills">Bills</Link>
          </Menu.Item>
          <Menu.Item key="/items" icon={<OrderedListOutlined />}>
            <Link to="/items">Items</Link>
          </Menu.Item>
          <Menu.Item key="/customers" icon={<UserOutlined />}>
            <Link to="/customers">Customers</Link>
          </Menu.Item>
          <Menu.Item key="/logout" icon={<LogoutOutlined />}>
            Lgout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="cart-item">
            <p>{cartItems.lenght ? cartItems.length : 0}</p>
            <ShoppingCartOutlined />
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
