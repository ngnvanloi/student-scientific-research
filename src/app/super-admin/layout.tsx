"use client";
import React, { useState } from "react";
import {
  AuditOutlined,
  CloudServerOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  SafetyCertificateOutlined,
  SignatureOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, MenuProps, theme } from "antd";
import { useRouter } from "next/navigation";

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
    getItem("Tổng quan", "1", <PieChartOutlined />, undefined, "/super-admin"),

    getItem("Quản lý bài báo", "sub2", <CloudServerOutlined />, [
      getItem(
        "Bài báo chờ phê duyệt",
        "2",
        <SignatureOutlined />,
        undefined,
        "/super-admin/pending-approval-article"
      ),
      getItem(
        "Bài báo đã xuất bản",
        "3",
        <SafetyCertificateOutlined />,
        undefined,
        "/super-admin"
      ),
    ]),
    getItem(
      "Phê duyệt nghiệm thu",
      "4",
      <AuditOutlined />,
      undefined,
      "/super-admin/track-ongoing-project-evaluations"
    ),
    getItem("Tin nhắn", "5", <MailOutlined />, undefined, "/super-admin/inbox"),
    getItem(
      "Quản lý người dùng",
      "6",
      <UserOutlined />,
      undefined,
      "/super-admin/user-administration"
    ),
    getItem(
      "Sao lưu phục hồi dữ liệu",
      "7",
      <CloudServerOutlined />,
      undefined,
      "/super-admin/backup-restore-database"
    ),
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
