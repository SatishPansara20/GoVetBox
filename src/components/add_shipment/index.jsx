import React, { useEffect } from "react";
import { useState, useCallback } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  toastData,
  addShipmentdataToCommonSlice,
  updateShipmentPayload,
} from "../../Redux/commonSlice";

import { Form } from "antd";

import { makeToast, useFetchData } from "../common/appcommonfunction/Fuctions";

import { toast } from "react-toastify";
import RenderTable from "./RenderTable";

let ds;

const AddShipment = () => {
  const receivedToastData = useSelector(toastData);
  const dataSource = useSelector(updateShipmentPayload);
  const dispatch = useDispatch();

  // const [getShipment, isLoading, isSuccess, isUninitialized] =
  //   useGetShipmentMutation();

  const [form] = Form.useForm();

  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [shipmentPayload, setShipmentPayload] = useState({
    length: 10,
    search: "",
    start: 0,
    sort: "",
    dir: "",
  });

  // NOTE: All patient Information
  const {
    data: response,
    isError,
    fetchError,
    isLoading: isFeching,
  } = useFetchData("getShipment", shipmentPayload);

  const sendData = useCallback((data) => {
    setTotalData(data);
  }, []);

  useEffect(() => {
    if (receivedToastData !== "")
      makeToast(dispatch, receivedToastData, toast.success);
  }, [shipmentPayload, dispatch, receivedToastData]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!isFeching && !isError && response !== undefined && response !== null) {
      setData(response.data.data.data);
      setTotalData(response.data.data.recordsTotal);
    }
  });
  useEffect(() => {
    if (data.length > 0) {
      dispatch(addShipmentdataToCommonSlice(data));
    }
  }, [data, dispatch]);

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
      <RenderTable
        handleSearchChange={handleSearchChange}
        form={form}
        dataSource={dataSource}
        handleChange={handleChange}
        onShowSizeChange={onShowSizeChange}
        totalData={totalData}
        shipmentPayload={shipmentPayload}
        sendData={sendData}
        isFeching={isFeching}
        isError={isError}
        fetchError={fetchError}
      />
      {ds}
    </>
  );
};

export default AddShipment;
