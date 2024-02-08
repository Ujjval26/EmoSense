import React, { useState } from 'react';
import {
 
UserOutlined,
HomeOutlined,
CameraFilled,
BarChartOutlined
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [

  getItem('User', '1', <UserOutlined/>),
  getItem('Report', '2', <BarChartOutlined />),
  getItem('Camera', '3', <CameraFilled />),
  getItem('Home', '4', <HomeOutlined />),
];
const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(true);

  return (
    <div>
      <Layout
      className='min-h-screen'
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical mt-32" />
        <Menu theme="dark" defaultSelectedKeys={['3']} mode="inline" items={items} />
      </Sider>
      
    </Layout>
    </div>
  );
}

export default Sidebar;