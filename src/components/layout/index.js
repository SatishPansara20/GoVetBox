import React from "react";

import { lazy } from "react";
import { Outlet } from "react-router-dom";

import { Layout } from "antd";

const { Content } = Layout;

const PageHeader = lazy(() => import("./header/index"));
const SideBar = lazy(() => import("./sidebar/index"));

const WebLayout = () => {
  return (
    <>
      <Layout className="h-screen w-full overflow-y-auto ">
        <SideBar className />
        <Layout className="relative site-layout h-screen flex-col ">
          <PageHeader />
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
