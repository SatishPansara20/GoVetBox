import React, { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthGuard from "../components/auth";
import AddShipment from "../components/add_shipment";
import NewShipment from "../components/add_shipment/NewShipment";
import EditShipmentUserData from "../components/add_shipment/EditShipmentUserData";

const Layout = lazy(() => import("../components/layout/index"));
const SignIn = lazy(() => import("../pages/SignIn/index"));
const ForgotPassword = lazy(() => import("../components/auth/ForgotPassword"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const MyAccount = lazy(() => import("../pages/MyAccount"));

const Routing = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route
        path="/"
        element={
          <AuthGuard>
            <Layout />
          </AuthGuard>
        }
      >
        <Route index path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Navigate replace to="/" />} />
        <Route path="/my-account" element={<MyAccount />} />

        <Route path="/addshipment" element={<AddShipment />} />
        <Route path="/addshipment/newshipment" element={<NewShipment />} />
        <Route
          path="/addshipment/updateuserData/:id"
          element={<EditShipmentUserData />}
        />
      </Route>
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};

export default Routing;
