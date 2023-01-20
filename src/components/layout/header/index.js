import React from "react";
import { useParams } from "react-router-dom";
import { useLocation, Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { toggleSlider } from "../../../Redux/commonSlice";

import { Breadcrumb, Dropdown, Button } from "antd";

import { LOGIN_F } from "../../../constants/index";

let pathNames = [];
let pathRoutes = [];

const route = [
  { name: "home", path: "Home" },
  { name: "dashboard", path: "Dashboard" },
  { name: "addshipment", path: "Add Shipment" },
  { name: "newshipment", path: "Shipment Add Management" },
  { name: "updateuserData", path: "Update Shipment" },
];
const PageHeader = () => {
  // const collapsed = useSelector(valueofsider);
  const dispatch = useDispatch();

  const location = useLocation();
  const { id } = useParams();
  const { pathname } = location;
  const pathNames_1 = pathname.split("/").filter((name) => name);

  if (pathNames_1.includes(id)) {
    pathNames = pathNames_1.filter((name) => name !== id);
    pathRoutes = pathNames;
  } else {
    pathNames = pathNames_1;
    pathRoutes = pathNames;
  }

  // useEffect(() => {
  //   //a fuction to change the pathnames according to the route object

  // }, [id]);
  const changeThePathNames = (pathNames) => {
    pathNames = pathNames.map((nameofPath) => {
      const a = route.find((item) => item.name === nameofPath);
      return nameofPath === a.name ? a.path : "No Such Path";
    });
    return pathNames;
  };

  pathNames = changeThePathNames(pathNames);

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

  const hadleSidebarClick = () => {
    dispatch(toggleSlider());
  };

  return (
    <>
      <div className=" flex flex-col h-full w-full">
        <div className="bg-white h-fit w-full border-b-2">
          <div className=" flex items-center justify-between p-2  ">
            <Button
              className="trigger inline-block w-fit h-full justify-self-start mr-2 border-none"
              onClick={hadleSidebarClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="black"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                />
              </svg>
            </Button>
            <p className="w-fit text-4xl h-fit justify-self-center md:invisible">
              Box
            </p>
            <Dropdown
              className="bg-white h-fit justify-self-end w-fit"
              menu={{
                items,
              }}
              placement="bottomRight"
            >
              <div className="flex items-center">
                <img
                  className="w-12 h-12 rounded-full"
                  src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80"
                  alt=""
                />
              </div>
            </Dropdown>
          </div>
        </div>
        <div className="bg-white w-full h-fit p-2 ">
          <Breadcrumb className="text-blue-400">
            {pathNames.length > 0 ? (
              <Breadcrumb.Item>
                <Link to="/dashboard">Home</Link>
              </Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            )}
            {pathNames.map((name, i) => {
              const routeTo = `/${pathRoutes.slice(0, i + 1).join("/")}`;
              const isLast = i === pathRoutes.length - 1;

              return isLast ? (
                <Breadcrumb.Item key={i}>{name}</Breadcrumb.Item>
              ) : (
                <Breadcrumb.Item key={i}>
                  <Link to={`${routeTo}`}>{name}</Link>
                </Breadcrumb.Item>
              );
            })}
          </Breadcrumb>
        </div>
      </div>
    </>
  );
};

export default PageHeader;

// const heades = (
//   <nav className="sticky flex flex-col h-full w-full top-0 left-0 right-0">
//     <div className=" z-10  flex  items-center justify-between p-2  ">
//       <Button
//         className="trigger inline-block w-fit h-full justify-self-start mr-2 border-none"
//         onClick={hadleSidebarClick}
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth={1.5}
//           stroke="black"
//           className="w-6 h-6"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
//           />
//         </svg>
//       </Button>
//       <p className="w-fit text-4xl h-fit justify-self-center md:invisible">
//         Box
//       </p>
//       <Dropdown
//         className="bg-slate-700 h-fit justify-self-end w-fit"
//         menu={{
//           items,
//         }}
//         placement="bottomRight"
//       >
//         <div className="rounded-full inline-block ">log out</div>
//       </Dropdown>
//     </div>
//     <div className="bg-white w-full shadow-md">
//       <Breadcrumb className="text-blue-400">
//         {pathNames.length > 0 ? (
//           <Breadcrumb.Item>
//             <Link to="/dashboard">Home</Link>
//           </Breadcrumb.Item>
//         ) : (
//           <Breadcrumb.Item>Home</Breadcrumb.Item>
//         )}
//         {pathNames.map((name, i) => {
//           const routeTo = `/${pathNames.slice(0, i + 1).join("/")}`;
//           const isLast = i === pathNames.length - 1;

//           return isLast ? (
//             <Breadcrumb.Item key={i}>{name}</Breadcrumb.Item>
//           ) : (
//             <Breadcrumb.Item key={i}>
//               <Link to={`${routeTo}`}>{name}</Link>
//             </Breadcrumb.Item>
//           );
//         })}
//       </Breadcrumb>
//       ;
//     </div>
//   </nav>
// );
