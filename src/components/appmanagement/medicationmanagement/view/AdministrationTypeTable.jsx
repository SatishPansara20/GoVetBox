import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
//import { useQuery } from "react-query";  import axios from "axios";

import {
  getAllSize,
  allSize,
} from "../../../../Redux/MedicationManagementSlice";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "antd";

let administrationData = [];

const AdministrationTypeTable = ({ data }) => {
  const dispatch = useDispatch();
  const allSizeResponse = useSelector(allSize);

  const [isLoading, setIsLoading] = useState(true);
  const [administrationSizes, setAdministrationSizes] = useState([]);

  useEffect(() => {
    try {
      setIsLoading(true);
      dispatch(getAllSize());
      setIsLoading(false);
    } catch (e) {
      console.log("While Getting Size Types", e);
    }
  }, [dispatch, setIsLoading]);

  useEffect(() => {
    if (isLoading && allSizeResponse?.status !== 200) {
      console.log("Loading");
    } else {
      setAdministrationSizes(allSizeResponse?.data);
    }
  }, [allSizeResponse, isLoading]);

  console.log(administrationSizes);

  useEffect(() => {
    if (administrationSizes?.length > 0) {
      administrationData = [];
      data?.map((item) => {
        return administrationData.push({
          administrationTypeName: item.administrationType.name,
          administrationTypeNameDataSource: {
            dataSource: item.sizes.map((item, i) => {
              return {
                key: uuid(),
                size: administrationSizes[i]?.name,
                amount: item.amount,
                dosage: item.dosage,
              };
            }),
          },
        });
      });
    }

    return () => {};
  }, [data, administrationSizes]);

  const columns = [
    {
      title: "Sizes",
      dataIndex: "size",
      key: "size",
      width: "10%",
    },
    {
      title: "Amount",
      key: "amount",
      dataIndex: "amount",

      width: "10%",
      render: (amount) => (
        <p className="bg-gray-300 pl-3 p-2  rounded-md">{amount}</p>
      ),
    },

    {
      title: "Dosage",
      key: "dosage",
      dataIndex: "dosage",
      width: "10%",
      render: (dosage) => (
        <p className="bg-gray-300 pl-3 p-2 rounded-md">{dosage}</p>
      ),
    },
    {
      title: "",
      key: "",
      dataIndex: "",
    },
  ];

  return (
    <>
      <div>
        {" "}
        {administrationData.map((item, i) => {
          return (
            <React.Fragment key={i}>
              <div>
                <p>AdministrationType: {item.administrationTypeName}</p>
              </div>
              <Table
                bordered
                size="small"
                columns={columns}
                dataSource={item.administrationTypeNameDataSource.dataSource}
                pagination={false}
              />
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

export default AdministrationTypeTable;

// const {
//     data: response,
//     isLoading,
//     isSuccess,
//   } = useQuery(
//     "query-administrationSizes",
//     async () => {
//       return await axios.post(
//         "http://202..117.92:7155/admin_v1/api/getAllSize",{}
//       );
//     },
//     {
//       enabled: false,
//       onSuccess: (res) => {
//         console.log(res.data);
//       },
//       onError: (err) => {},
//     }
//   );

//   useEffect(() => {
//     if (isLoading) {
//       console.log("Loding...");
//     } else if (isSuccess) {
//       setAdministrationSizes(response?.data);
//     }
//   }, [isLoading, isSuccess, response]);
