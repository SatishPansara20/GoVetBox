import React from "react";
import { useState } from "react";

import { lazy } from "react";
import { Outlet } from "react-router-dom";

//import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, theme,Button } from "antd";

const { Header, Content, Sider, } = Layout;

const PageHeader = lazy(() => import("./header/index"));
const SideBar = lazy(() => import("./sidebar/index"));

const WebLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <>
      <main>
        <Layout className="h-screen w-screen ">
          <Sider
            className="h-screen"
            trigger={null}
            breakpoint={"lg"}
            theme="light"
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <SideBar />
          </Sider>
          <Layout className=" static site-layout  flex flex-col overflow-y-auto">
            <Header
              className="h-fit z-10 sticky top-0 flex"
              style={{
                padding: 12,
                background: colorBgContainer,
              }}
            >
              <Button
                className="trigger flex-grow h-full justify-self-start mr-2 border-none"
                onClick={() => setCollapsed(!collapsed)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="black"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                  />
                </svg>
              </Button>
              <PageHeader />
            </Header>
            <Content
              className="border-t-2 border-black"
              style={{
                minHeight: 280,
                background: colorBgContainer,
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </main>
    </>
  );
};

export default WebLayout;
