import React from "react";
import { useState } from "react";

import { lazy } from "react";
import { Outlet } from "react-router-dom";

import { Layout, theme, Button, Dropdown, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { useDispatch } from "react-redux";
import { LOGIN_F } from "../../constants";

const { Header, Content, Sider } = Layout;

const PageHeader = lazy(() => import("./header/index"));
const SideBar = lazy(() => import("./sidebar/index"));

const WebLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch({ type: LOGIN_F });
  };

  const items = [
    {
      key: "1",
      label: (
        <Button type="button" onClick={onLogout}>
          Logout
        </Button>
      ),
    },
  ];

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <>
      <Layout className="h-screen w-full">
        <Sider
          width={250}
          style={{ backgroundColor: "#035E5E" }}
          trigger={null}
          breakpoint={"md"}
          theme="light"
          collapsible
          collapsed={collapsed}
          collapsedWidth={0}
          onCollapse={(value) => setCollapsed(value)}
        >
          <SideBar />
        </Sider>
        <Layout className="relative site-layout flex flex-col overflow-y-auto">
          <Header
            className="h-auto w-full z-10 sticky top-0"
            style={{
              padding: 0,
              margin: 0,
              background: colorBgContainer,
            }}
          >
            <div
              className="relative"
              style={{
                padding: 0,
                margin: 0,
                background: colorBgContainer,
              }}
            >
              <div className=" flex flex-col ">
                <div className=" flex items-center justify-between  ">
                  <Button
                    className="trigger h-full justify-self-start mr-2 border-none"
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
                  <Dropdown
                    menu={{
                      items,
                    }}
                    placement="bottomRight"
                  >
                    <Avatar
                      className="bg-black mr-4 mt-4"
                      size="large"
                      icon={<UserOutlined />}
                    />
                  </Dropdown>
                </div>
                <PageHeader />
              </div>
            </div>
          </Header>
          <Content className="static p-20 w-full mi bg-gray-200  overflow-y-auto">
            <section className="inline-block shadow-md bg-white h-fit p-4  xl:max-h-fit w-full justify-center items-center rounded-md">
              <Outlet />
            </section>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default WebLayout;
