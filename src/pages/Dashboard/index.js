import React from "react";

import { Card, Spin } from "antd";

import { useFetchData } from "../../components/common/appcommonfunction/Fuctions";

const Dashboard = () => {
  const {
    data,
    isError,
    fetchError,
    isLoading: isFeching,
  } = useFetchData("dashboardData");

  return (
    <>
      <div className="relative site-card-wrapper w-full  h-full ">
        <div className="inline-block flex-col w-full  h-full  p-2">
          <h2 className="text-xl">Dashboard</h2>
          {isFeching ? (
            <Spin
              className=" w-full"
              tip="Waiting For data.."
              size="large"
            ></Spin>
          ) : isError ? (
            console.log(fetchError)
          ) : data !== undefined &&
            data !== null &&
            Object.keys(data.data).length > 0 ? (
            <div className=" w-full grid sm:grid-cols-3 md:grid-cols-5 ">
              {Object.entries(data.data.data).map(([k, y], index) => {
                return (
                  <Card
                    key={index}
                    className="bg-blue-700 p-0 "
                    style={{ wordWrap: "break-word" }}
                    title={y}
                  >
                    {k}
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className=" w-full grid sm:grid-cols-3 md:grid-cols-5 ">
              <p>No data Found</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
