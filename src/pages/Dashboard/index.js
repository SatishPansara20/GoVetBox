import React from "react";
import { useEffect, useState } from "react";
import { Card, Spin } from "antd";
import { useGetDashboardataMutation } from "../../Redux/ReduxApi";

const Dashboard = () => {
  const [dashboardData, { isLoading }] = useGetDashboardataMutation({
    refetchOnMountOrArgChange: true,
  });

  const delay = () => new Promise((res) => setTimeout(() => res(), 5000));

  const [cardContents, setCardContents] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        await delay();
        const response = await dashboardData();

        if (response.status === 400) {
          alert(response);
        } else if (Object.keys(response.data).length) {
          setCardContents(response.data.data);
        }
      } catch (error) {
        console.log("Error while Getting ShipmentDetail : ", error);
      }
    };

    getData();
  }, [dashboardData]);

  return (
    <>
      <div className="relative site-card-wrapper w-full  h-full ">
        <div className="inline-block flex-col w-full  h-full  p-2">
          <h2 className="text-xl">Dashboard</h2>
          <div className=" relative grid sm:grid-cols-3 md:grid-cols-5 w-full">
            {isLoading
              ? setTimeout(
                  () => (
                    <Spin tip="Loading" size="large">
                      <div className="content">"Waiting For data.."</div>
                    </Spin>
                  ),
                  3000
                )
              : Object.entries(cardContents).map(([k, y], index) => {
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

            {/* {Object.keys(cardContents).length > 0
              ? Object.entries(cardContents).map(([k, y], index) => {
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
                })
              : "Waiting For data.."} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

// if (isLoading) {
//   console.log("isLoading");
// } else if (isFetching) {
//   console.log("isFetching");
// } else if (isError) {
//   console.log("isError");
// } else if (response.status === 400) {
//   alert(response);
// } else if (Object.keys(response.data).length) {
//   setCardContents(response.data.data);
// }
