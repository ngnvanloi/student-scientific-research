"use client";
import React, { useState } from "react";
import {
  AppstoreAddOutlined,
  BellOutlined,
  CarryOutOutlined,
  CloudServerOutlined,
  CommentOutlined,
  FileTextOutlined,
  FireOutlined,
  Loading3QuartersOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  ReconciliationOutlined,
  SignatureOutlined,
  SolutionOutlined,
  TeamOutlined,
  TrophyOutlined,
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
          router.push(path);
        }
      },
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem("Tổng quan", "1", <PieChartOutlined />, undefined, "/author"),
    getItem("Quản lý bài báo", "2", <FileTextOutlined />, [
      getItem("Nộp bài báo", "3", <TrophyOutlined />, undefined, "#"),
      getItem("Bài báo của tôi", "4", <CommentOutlined />, undefined, "#"),
    ]),
    getItem("Đề tài của tôi", "5", <ReconciliationOutlined />, [
      getItem("Đề tài đã công bố", "6", <TrophyOutlined />, undefined, "#"),
      getItem("Đề tài chờ phản biện", "7", <CommentOutlined />, undefined, "#"),
      getItem(
        "Đề tài chờ nghiệm thu",
        "8",
        <Loading3QuartersOutlined />,
        undefined,
        "#"
      ),
    ]),
    getItem(
      "Đề tài đang nghiệm thu",
      "9",
      <CloudServerOutlined />,
      undefined,
      "#"
    ),
    getItem("Thông báo", "10", <BellOutlined />, undefined, "#"),
    getItem("Quản lý tài khoản", "11", <UserOutlined />, undefined, "#"),
  ];

  return (
    <Layout>
      <Sider
        width={300}
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
