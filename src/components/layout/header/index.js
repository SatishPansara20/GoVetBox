import React from "react";

import { useDispatch } from "react-redux";
import { LOGIN_F } from "../../../constants";

import { Button, Dropdown, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
// import { Breadcrumb } from "antd";

const PageHeader = () => {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch({ type: LOGIN_F });
  };

  const items = [
    {
      key: "1",
      label: (
        <Button type="button" onClick={onLogout}>
          Logout
        </Button>
      ),
    },
  ];

  return (
    <>
      <div className="justify-self-center">
        <Dropdown
          menu={{
            items,
          }}
          placement="bottomRight"
        >
          <Avatar className="bg-black m-2 " size="large" icon={<UserOutlined />} />
        </Dropdown>
      </div>
      {/* <div className="  w-full p-4 mb-3 shadow-md">
          <Breadcrumb className="text-blue-400 bg-white">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
        </div> */}
    </>
  );
};

export default PageHeader;

// const [visible, setVisible] = useState(false);

// {/* <Drawer
//     title="Topics"
//     placement="left"
//     onClick={() => setVisible(false)}
//     onClose={() => setVisible(false)}
//     open={visible}
//   ></Drawer>
//   <Button
//     className="menu"
//     type="primary"
//     icon={<MenuOutlined />}
//     onClick={() => setVisible(true)}
//   /> */}

//  {/* <div className="justify-end-start">
//     <Dropdown
//       menu={{
//         items,
//       }}
//       placement="bottomRight"
//     >
//       <Avatar size={64} icon={<UserOutlined />} />
//     </Dropdown>
//   </div> */}
