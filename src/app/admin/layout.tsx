"use client";
import React, { useState } from "react";
import {
  AppstoreAddOutlined,
  BulbOutlined,
  CarryOutOutlined,
  CloudServerOutlined,
  FileTextOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  ReconciliationOutlined,
  SafetyCertificateOutlined,
  ScheduleOutlined,
  SignatureOutlined,
  SolutionOutlined,
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
    getItem("Tổng quan", "1", <PieChartOutlined />, undefined, "/admin"),
    getItem(
      "Quản lý bài viết",
      "2",
      <FileTextOutlined />,
      undefined,
      "/admin/post"
    ),
    getItem(
      "Quản lý cuộc thi",
      "3",
      <TrophyOutlined />,
      undefined,
      "/admin/competition"
    ),
    getItem("Quản lý quy trình phản biện", "sub1", <ReconciliationOutlined />, [
      getItem(
        "Đăng kí chờ phê duyệt",
        "4",
        <BulbOutlined />,
        undefined,
        "/admin/pending-approval-research-topic"
      ),
      getItem(
        "Thành lập hội đồng phản biện",
        "5",
        <SolutionOutlined />,
        undefined,
        "/admin/establish-review-council"
      ),
      getItem(
        "Phân công phản biện đề tài",
        "6",
        <ScheduleOutlined />,
        undefined,
        "/admin/project-reviewer-assignment"
      ),
      getItem(
        "Tình trạng phản biện đề tài",
        "7",
        <CarryOutOutlined />,
        undefined,
        "/admin/track-the-status-of-project-review"
      ),
    ]),
    getItem("Quản lý quy trình nghiệm thu", "sub2", <CloudServerOutlined />, [
      getItem(
        "Đề tài đang nghiệm thu",
        "8",
        <SignatureOutlined />,
        undefined,
        "/admin/track-ongoing-project-evaluations"
      ),
      getItem(
        "Đề tài đã xuất bản",
        "9",
        <SafetyCertificateOutlined />,
        undefined,
        "/admin"
      ),
    ]),
    getItem("Tin nhắn", "10", <MailOutlined />, undefined, "/admin/inbox"),
    getItem(
      "Quản lý tài khoản",
      "11",
      <UserOutlined />,
      undefined,
      "/admin/my-profile"
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
