// resources/js/Layouts/TeacherLayout.jsx

import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from '@inertiajs/react';
import { HomeOutlined} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

const TeacherLayout = ({ children }) => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={200} className="site-layout-background">
                <div className="logo" />
                <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%', borderRight: 0 }}>
                    <Menu.Item key="1" icon={<HomeOutlined />}>
                        <Link href="/teacher/dashboard">Главная</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<HomeOutlined />}>
                        <Link href="/teacher/profile">Профиль</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<HomeOutlined />}>
                        <Link href="/teacher/tasks">Задачи</Link>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<HomeOutlined />}>
                        <Link href="/teacher/logout">Выйти</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header className="site-layout-background" style={{ padding: 0 }} />
                <Content style={{ margin: '0 16px' }}>
                    <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
                        {children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Дашборд Учителя ©2024 Создано Вашим Имя</Footer>
            </Layout>
        </Layout>
    );
};

export default TeacherLayout;
