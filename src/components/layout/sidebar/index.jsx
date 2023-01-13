import React from "react";
//import  { useState, useEffect } from 'react'
import { MailOutlined, AppstoreOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";

//import { Link, useLocation } from "react-router-dom";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("Dashboard", "dashboard", <MailOutlined />),
  getItem("Addshipment", "addshipment", <AppstoreOutlined />),
];

const SideBar = () => {
  const navigate = useNavigate();
  const onClick = (e) => {
    navigate(`/${e.key}`);
    // console.log(e);
  };

  return (
    <>
     
      <Menu
        onSelect={onClick}
        style={{
          width: 256,
          backgroundColor:"gray",
          height:"100vh",
      
        }}

        defaultSelectedKeys={["dashboard"]}
        defaultOpenKeys={["dashboard"]}
        mode="inline"
        items={items}
      />
    </>
  );
};

export default SideBar;

// let location = useLocation();
// const [current, setCurrent] = useState(
//   location.pathname === "/" || location.pathname === ""
//     ? "/dashboard"
//     : location.pathname
// );

// useEffect(() => {
//   if (location) {
//     if (current !== location.pathname) {
//       setCurrent(location.pathname);
//     }
//   }
// }, [location, current]);

// const handleClick = (e) => {
//   setCurrent(e.key);
// };

// const menu = (
//   <div>
//     <div className="h-8 m-4 bg-white">
//       <p className="text-green-500 text-center">Box</p>
//     </div>
//     <Menu onClick={handleClick} mode="vertical" selectedKeys={[current]}>
//       <Link to="/dashboard">
//         <Menu.Item icon={<MailOutlined />}>Dashboard</Menu.Item>
//       </Link>
//       <Link to="/addshipment">
//         <Menu.Item icon={<AppstoreOutlined />}>Add Recipes</Menu.Item>
//       </Link>
//     </Menu>
//   </div>
// );
