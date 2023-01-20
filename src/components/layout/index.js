import React from "react";
//import {useEffect, useState } from "react";

import { lazy } from "react";
import { Outlet } from "react-router-dom";

import { Layout, theme } from "antd";

import { useSelector } from "react-redux";
import { valueofsider } from "../../Redux/commonSlice";

const { Header, Content, Sider } = Layout;

const PageHeader = lazy(() => import("./header/index"));
const SideBar = lazy(() => import("./sidebar/index"));

const WebLayout = () => {
  const collapsed = useSelector(valueofsider);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <>
      <Layout className="h-screen w-full overflow-y-auto ">
        <Sider
          id="sidebar"
          width={250}
          style={{ backgroundColor: "#035E5E" }}
          trigger={null}
          breakpoint={"sm"}
          collapsible
          collapsed={collapsed}
          collapsedWidth={0}
        >
          <SideBar />
        </Sider>
        <Layout className="relative site-layout h-screen flex-col ">
          <Header
            className=" w-full z-10 sticky top-0"
            style={{
              padding: 0,
              margin: 0,
              background: colorBgContainer,
            }}
          >
            <PageHeader />
          </Header>
          <Content className="block p-20 h-fit w-full flex-grow bg-gray-200 overflow-y-auto ">
            <section className="block shadow-md bg-white h-fit p-4 w-full justify-center items-center rounded-md ">
              <Outlet />
            </section>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default WebLayout;
