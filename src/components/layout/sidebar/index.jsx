import React from "react";
import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { toggleSlider, valueofsider } from "../../../Redux/commonSlice";

import { useLocation, useNavigate } from "react-router-dom";

import {
  AppstoreOutlined,
  AppstoreAddOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";

import { useWindowSize } from "../../common/appcommonfunction/Fuctions";

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
    "Add Shipment",
    "addshipment",
    <AppstoreAddOutlined style={{ fontSize: "150%" }} />
  ),

  getItem(
    "User Management",
    "usermanagement",
    <AppstoreAddOutlined style={{ fontSize: "150%" }} />
  ),

  getItem(
    "Patient Managementt",
    "patientmanagement",
    <AppstoreAddOutlined style={{ fontSize: "150%" }} />
  ),

  getItem("Medication Management", "sub1", <AppstoreAddOutlined />, [
    getItem(
      "Breed Management",
      "1",
      <ContainerOutlined style={{ fontSize: "150%" }} />
    ),
    getItem(
      "Species Management",
      "2",
      <ContainerOutlined style={{ fontSize: "150%" }} />
    ),
    getItem(
      "Administration Type",
      "3",
      <ContainerOutlined style={{ fontSize: "150%" }} />
    ),
    getItem(
      "Medication Management",
      "medicationmanagement",
      <ContainerOutlined style={{ fontSize: "150%" }} />
    ),
    getItem(
      "Patient Size",
      "4",
      <ContainerOutlined style={{ fontSize: "150%" }} />
    ),
  ]),
];

const SideBar = () => {
  const dispatch = useDispatch();
  const collapsed = useSelector(valueofsider);

  const navigate = useNavigate();
  let location = useLocation();
  const [current, setCurrent] = useState(
    location.pathname === "/" || location.pathname === ""
      ? "/dashboard"
      : location.pathname
  );

  //Current window size
  const size = useWindowSize();

  useEffect(() => {
    if (location) {
      if (current !== location.pathname) {
        setCurrent(location.pathname);
      }
    }
  }, [location, current]);

  const [addflag, setAddFlag] = useState(true);
  const [removeflag, setRemovesetFlag] = useState(false);

  useEffect(() => {
    const mainDivElement = document.getElementById("main-div");
    const sidebarElement = document.getElementById("sidebar");

    const divElement = document.createElement("div");

    divElement.style.height = "53px";
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

    if (size.width < 760) {
      if (removeflag) {
        mainDivElement.removeChild(mainDivElement.children[0]);
        setAddFlag(true);
        setRemovesetFlag(false);
      }
    } else {
      if (addflag) {
        mainDivElement.insertBefore(divElement, sidebarElement);
        setAddFlag(false);
        setRemovesetFlag(true);
      }
    }
  }, [size, addflag, removeflag]);

  const onClick = (e) => {
    setCurrent(e.key);
    navigate(`/${e.key}`);
    dispatch(toggleSlider());
  };

  return (
    <>
      <Sider
        trigger={null}
        width={250}
        collapsible
        collapsed={collapsed}
        collapsedWidth={0}
        breakpoint="sm"
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
            defaultSelectedKeys={[current]}
            //  selectedKeys={[current]}
            mode="inline"
            items={items}
          />
        </div>
      </Sider>
    </>
  );
};

export default SideBar;
