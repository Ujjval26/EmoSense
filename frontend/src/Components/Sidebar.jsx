import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Assuming you're using React Router for navigation
import {
  UserOutlined,
  HomeOutlined,
  CameraFilled,
  BarChartOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';

const { Sider } = Layout;

function getItem(label, key, icon, link, children) {
  return {
    key,
    icon,
    children,
    label,
    link
  };
}

const items = [
  getItem('User', '1', <UserOutlined />, '/profile'),
  getItem('Report', '2', <BarChartOutlined />, '/report'),
  getItem('Camera', '3', <CameraFilled />, '/dashboard'),
  getItem('Home', '4', <HomeOutlined />, '/')
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation();

  return (
    <div>
      <Layout className='min-h-screen fixed'>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical mt-32" />
          <Menu theme="dark" mode="inline">
            {items.map(item => (
              <Menu.Item key={item.key} icon={item.icon} className={location.pathname === item.link ? 'ant-menu-item-selected' : ''}>
                <a href={item.link}>{item.label}</a>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
      </Layout>
    </div>
  );
}

export default Sidebar;
