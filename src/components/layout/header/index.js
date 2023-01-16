import React from "react";
import { useParams } from "react-router-dom";

import { useLocation, Link } from "react-router-dom";
import { Breadcrumb } from "antd";

let pathNames = [];
const PageHeader = () => {
  const location = useLocation();
  const { id } = useParams();
  const { pathname } = location;
  const pathNames_1 = pathname.split("/").filter((name) => name);

  if (pathNames_1.includes(id)) {
    pathNames = pathNames_1.filter((name) => name !== id);
  } else {
    pathNames = pathNames_1;
  }

  return (
    <>
      <div className="">
        <nav>
          <div className="bg-white z-10 w-full p-4 shadow-md sticky top-0 left-0 right-0">
            <Breadcrumb className="text-blue-400">
              {pathNames.length > 0 ? (
                <Breadcrumb.Item>
                  <Link to="/dashboard">Home</Link>
                </Breadcrumb.Item>
              ) : (
                <Breadcrumb.Item>Home</Breadcrumb.Item>
              )}
              {pathNames.map((name, i) => {
                const routeTo = `/${pathNames.slice(0, i + 1).join("/")}`;
                const isLast = i === pathNames.length - 1;

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
        </nav>
      </div>
    </>
  );
};

export default PageHeader;
