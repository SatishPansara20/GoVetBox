import React from "react";
import { useState, useEffect } from "react";
// import { useRef } from "react";

import { useDispatch } from "react-redux";
import { toggleSlider } from "../../../Redux/commonSlice";

import { AppstoreOutlined, AppstoreAddOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";

import { useLocation } from "react-router-dom";

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
  getItem(
    "Dashboard",
    "dashboard",
    <AppstoreOutlined style={{ fontSize: "150%" }} />
  ),
  getItem(
    "Addshipment",
    "addshipment",
    <AppstoreAddOutlined style={{ fontSize: "150%" }} />
  ),
];

const SideBar = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  let location = useLocation();
  const [current, setCurrent] = useState(
    location.pathname === "/" || location.pathname === ""
      ? "/dashboard"
      : location.pathname
  );

  // const [deviceSize, changeDeviceSize] = useState(window.innerWidth);
  // const [flag, setFlag] = useState(true);
  // const [removeflag, setRemovesetFlag] = useState(false);

  // const pElementRef = useRef();

  // useEffect(() => {
  //   // const divElement = document.createElement("div");
  //   // divElement.append(pElement);
  //   // const sidebarElement = document.getElementById("sidebar");

  //   const divElement = document.getElementById("box-1");
  //   const pElement = document.getElementById("box-2");
  //   const pElement_1 = document.createElement("p");
  //   pElement_1.textContent = "Box";

  //   const resizeW = () => changeDeviceSize(window.innerWidth);

  //   window.addEventListener("resize", resizeW);
  //   if (deviceSize < 760) {
  //     if (removeflag) {
  //       console.log("P got removed");
  //       // pElementRef?.current.remove();
  //       pElement.remove();
  //       setFlag(true);
  //       setRemovesetFlag(false);
  //     }
  //   } else {
  //     if (flag) {
  //       console.log("P got added");
  //       divElement.append(pElement_1);
  //       setFlag(false);
  //       setRemovesetFlag(true);
  //     }
  //   }
  //   return () => window.removeEventListener("resize", resizeW);
  // }, [deviceSize, flag, removeflag]);

  useEffect(() => {
    if (location) {
      if (current !== location.pathname) {
        setCurrent(location.pathname);
      }
    }
  }, [location, current]);

  // const handleClick = (e) => {
  //   setCurrent(e.key);
  //   navigate(`/${e.key}`);
  //   dispatch(toggleSlider());
  // };

  const onClick = (e) => {
    setCurrent(e.key);
    navigate(`/${e.key}`);
    dispatch(toggleSlider());
  };

  return (
    <>
      <div className="h-full flex flex-col">
        <div id="box-1" className="text-2xl text-center">
          <p id="box-2"> Box </p>
        </div>
        <Menu
          onSelect={onClick}
          // onClick={handleClick}
          selectedKeys={[current]}
          style={{
            flexGrow: 1,
            flexBasis: "auto",
            flexShrink: 1,
            overflow: "auto",
            borderRight: 0,
            display: "block",
          }}
          // defaultSelectedKeys={["dashboard"]}
        //  defaultOpenKeys={["dashboard"]}
          mode="vertical"
          items={items}
          theme="dark"
        />
      </div>
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
