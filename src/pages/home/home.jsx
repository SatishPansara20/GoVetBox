import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";
import Dashboard from "../Dashboard";

const home = () => {
  return (
    <Layout>
      <Content>
        <Dashboard />
      </Content>
    </Layout>
  );
};

export default home;
