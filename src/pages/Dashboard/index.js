import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <main className="bg-white w-fit =h-fit">
        <h2 style={{ textAlign: "center" }}>Dashboard </h2>

        <br />

        <h4 style={{ textAlign: "center" }}>
          <Link to="/my-account">My Account</Link>
        </h4>
      </main>
    </>
  );
};

export default Dashboard;
