import React from "react";
import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getUserList, userList } from "../../Redux/UserManagementSlice";
import { toastData } from "../../Redux/commonSlice";

import { Form } from "antd";

import { makeToast } from "../common/appcommonfunction/Fuctions";

import { toast } from "react-toastify";
import RenderUserManagementTable from "./RenderUserManagementTable";

// const delay = () =>
//   new Promise((res) =>
//     setTimeout(() => {
//       // console.log("we are delay it....");
//       return res();
//     }, 2000)
//   );

const UserManagement = () => {
  const receivedToastData = useSelector(toastData);
  const response = useSelector(userList);

  // const isFacthing = useSelector(isLoading);
  const dispatch = useDispatch();

  const [dataSource, setDataSource] = useState([]);

  const [form] = Form.useForm();

  const [totalData, setTotalData] = useState(0);
  const [isFeching, setIsFeching] = useState(true);
  const [shipmentPayload, setShipmentPayload] = useState({
    length: 10,
    search: "",
    start: 0,
    sort: "",
    dir: "",
  });

  React.useEffect(() => {
    if (shipmentPayload.start < 0) {
      setShipmentPayload({
        ...shipmentPayload,
        start: 0,
      });
    }
    if (receivedToastData !== "") {
      makeToast(dispatch, receivedToastData, toast.success);
      setIsFeching(true);
      dispatch(getUserList(shipmentPayload));
    } else {
      setIsFeching(true);
      dispatch(getUserList(shipmentPayload));
    }
  }, [dispatch, shipmentPayload, receivedToastData]);

  React.useEffect(() => {}, [dispatch, shipmentPayload]);

  React.useEffect(() => {
    const getData = async () => {
      if (isFeching && response?.status !== 200) {
        console.log("Loading Your Data");
      } else if (response?.status === 200) {
        //await delay();
        setIsFeching(false);
        setDataSource(response.data.data);
        setTotalData(response.data.recordsTotal);
      }
    };
    getData();
  }, [response, isFeching]);

  const handleChange = (pagination, filters, sorter) => {
    // order:"ascend"  order:"descend" sorter.columnKey
    if (sorter.order === "ascend") {
      setShipmentPayload({
        ...shipmentPayload,
        sort: sorter.columnKey, //asc  or desc
        dir: "asc",
      });
    } else {
      setShipmentPayload({
        ...shipmentPayload,
        sort: sorter.columnKey, //asc  or desc
        dir: "desc",
      });
    }
  };

  const handleSearchChange = (e) => {
    setShipmentPayload({ ...shipmentPayload, search: e.target.value });
  };

  const onShowSizeChange = (page, pageSize) => {
    setShipmentPayload({
      ...shipmentPayload,
      length: Number(pageSize),
      start: Number(page * 10 - 10),
    });
  };

  return (
    <>
      <RenderUserManagementTable
        handleSearchChange={handleSearchChange}
        form={form}
        dataSource={dataSource}
        handleChange={handleChange}
        onShowSizeChange={onShowSizeChange}
        totalData={totalData}
        shipmentPayload={shipmentPayload}
        isFeching={isFeching}
      />
    </>
  );
};

export default UserManagement;
