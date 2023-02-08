import React, { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthGuard from "../components/auth";
import AddShipment from "../components/add_shipment";
import NewShipment from "../components/add_shipment/add";
import EditShipmentUserData from "../components/add_shipment/edit/index";
import UserManagement from "../components/useranagement/index";
import UserManagementEdit from "../components/useranagement/edit/index";
import PatientManagement from "../components/patientmanagement";
import MedicationManagement from "../components/appmanagement/medicationmanagement/index";
import MedicationManagementAdd from "../components/appmanagement/medicationmanagement/add/index";
import MedicationManagementView from "../components/appmanagement/medicationmanagement/view/index";
import TestCustomFuction from '../components/common/appcommonfunction/TestCustosmFuction'

const Layout = lazy(() => import("../components/layout/index"));
const SignIn = lazy(() => import("../pages/SignIn/index"));
const ForgotPassword = lazy(() => import("../components/auth/ForgotPassword"));
const Dashboard = lazy(() => import("../pages/Dashboard"));

const Routing = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/testcustomfuction" element={<TestCustomFuction />} />
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
        <Route index path="/" element={<Dashboard />} />

        {/* //Add Shipment */}
        <Route path="/addshipment" element={<AddShipment />} />
        <Route path="/addshipment/newshipment" element={<NewShipment />} />
        <Route
          path="/addshipment/updateuserData/:id"
          element={<EditShipmentUserData />}
        />
        {/* //user Management */}
        <Route path="/usermanagement" element={<UserManagement />} />
        <Route
          path="/usermanagement/edit/:id"
          element={<UserManagementEdit />}
        />
        {/* //Patient Management */}
        <Route path="/patientmanagement" element={<PatientManagement />} />
        {/* //Medication Management */}
        <Route
          path="/medicationmanagement"
          element={<MedicationManagement />}
        />
        <Route
          path="/medicationmanagement/add"
          element={<MedicationManagementAdd />}
        />
        <Route
          path="/medicationmanagement/view"
          element={<MedicationManagementView />}
        />
      </Route>
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};

export default Routing;
