import React from "react";
import { useState, useEffect } from "react";
import { useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { toggleSlider, valueofsider } from "../../../Redux/commonSlice";

import { AppstoreOutlined, AppstoreAddOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Layout } from "antd";

import { Menu } from "antd";

import { useLocation } from "react-router-dom";

const { Sider } = Layout;

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
  const ref = useRef();
  const collapsed = useSelector(valueofsider);

  const navigate = useNavigate();
  let location = useLocation();
  const [current, setCurrent] = useState(
    location.pathname === "/" || location.pathname === ""
      ? "/dashboard"
      : location.pathname
  );

  useEffect(() => {
    if (location) {
      if (current !== location.pathname) {
        setCurrent(location.pathname);
      }
    }
  }, [location, current]);

  const [deviceSize, changeDeviceSize] = useState(window.innerWidth);
  const [addflag, setAddFlag] = useState(true);
  const [removeflag, setRemovesetFlag] = useState(false);

  useEffect(() => {
    const mainDivElement = document.getElementById("main-div");
    const sidebarElement = document.getElementById("sidebar");

    const divElement = document.createElement("div");

    divElement.style.height = "10%";
    divElement.style.width = "100%";
    divElement.style.padding = "2%";
    divElement.style.background = "#a8b2c0";
    divElement.style.display = "flex";
    divElement.style.justifyContent = "center";
    divElement.style.alignItems = "center";

    const pElement = document.createElement("p");
    pElement.textContent = "Box";
    pElement.style.fontSize = "xx-large";

    divElement.appendChild(pElement);

    const resizeW = () => changeDeviceSize(window.innerWidth);

    window.addEventListener("resize", resizeW);
    if (deviceSize < 760) {
      if (removeflag) {
        console.log("P got removed");
        mainDivElement.removeChild(mainDivElement.children[0]);
        console.log("After Remove", mainDivElement.children);
        setAddFlag(true);
        setRemovesetFlag(false);
      }
    } else {
      if (addflag) {
        console.log("P got added");
        mainDivElement.insertBefore(divElement, sidebarElement);
        console.log("After Adding", mainDivElement.children[0]);
        setAddFlag(false);
        setRemovesetFlag(true);
      }
    }
    return () => window.removeEventListener("resize", resizeW);
  }, [deviceSize, addflag, removeflag]);

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
      <Sider
        ref={ref}
        trigger={null}
        breakpoint={"xl"}
        width={250}
        collapsible
        collapsed={collapsed}
        collapsedWidth={0}
      >
        <div id="main-div" className=" flex flex-col h-full bg-white">
          <Menu
            id="sidebar"
            onSelect={onClick}
            theme="dark"
            style={{
              flexGrow: 1,
              flexShrink: 0,
              flexBasis: "auto",
            }}
            // selectedKeys={[current]}
            defaultSelectedKeys={["dashboard"]}
            mode="inline"
            items={items}
          />
        </div>
      </Sider>
    </>
  );
};

export default SideBar;

// divElement.append(pElement);

// const divElement = document.getElementById("box-1");
// const pElement = document.getElementById("box-2");
// const pElement_1 = document.createElement("p");
// pElement_1.textContent = "Box";

// const [deviceSize, changeDeviceSize] = useState(window.innerWidth);
// const [flag, setFlag] = useState(true);
// const [removeflag, setRemovesetFlag] = useState(false);

// useEffect(() => {
//   const sidebarElement = document.getElementById("box-sider");

//   const divElement = document.createElement("div");

//   let node = document.createTextNode("Hello");
//   divElement.appendChild(node);

//   const resizeW = () => changeDeviceSize(window.innerWidth);

//   window.addEventListener("resize", resizeW);
//   if (deviceSize < 760) {
//     if (removeflag) {
//       console.log("P got removed");
//       // ref?.current.remove();
//       divElement.remove();
//       setFlag(true);
//       setRemovesetFlag(false);
//     }
//   } else {
//     if (flag) {
//       console.log("P got added");
//       sidebarElement.append(divElement);
//       setFlag(false);
//       setRemovesetFlag(true);
//     }
//   }
//   return () => window.removeEventListener("resize", resizeW);
// }, [deviceSize, flag, removeflag]);
