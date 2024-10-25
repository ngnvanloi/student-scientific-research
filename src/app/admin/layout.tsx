"use client";
import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  FireOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, MenuProps, theme } from "antd";
import { useRouter } from "next/navigation"; // Import useRouter

const { Header, Sider, Content } = Layout;

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const router = useRouter(); // Use Next.js router

  type MenuItem = Required<MenuProps>["items"][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    path?: string // Add path for redirection
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      onClick: () => {
        if (path) {
          router.push(path); // Redirect to the path when menu item is clicked
        }
      },
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem("Tổng quan", "1", <PieChartOutlined />, undefined, "/admin"),
    getItem(
      "Quản lý bài báo",
      "2",
      <DesktopOutlined />,
      undefined,
      "/admin/post"
    ),
    getItem(
      "Quản lý cuộc thi",
      "3",
      <FireOutlined />,
      undefined,
      "/admin/competition"
    ),
    getItem("Quản lý cuộc thi", "sub1", <UserOutlined />, [
      getItem("Thêm", "4", undefined, undefined, "/admin/competition"),
      getItem("Xóa", "5", undefined, undefined, "/admin/"),
      getItem("Sửa", "6", undefined, undefined, "/admin/"),
    ]),
    getItem("Team", "sub2", <TeamOutlined />, [
      getItem("Team 1", "7", undefined, undefined, "/admin"),
      getItem("Team 2", "8", undefined, undefined, "/admin"),
    ]),
    getItem("Files", "9", <FileOutlined />, undefined, "/admin"),
  ];

  return (
    <Layout>
      <Sider
        width={200}
        style={{ background: colorBgContainer }}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%", borderRight: 0 }}
          items={items}
        />
      </Sider>

      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 500,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
