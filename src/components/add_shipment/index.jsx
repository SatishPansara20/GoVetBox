import React, { useEffect } from "react";
import { useState } from "react";
import dayjs from "dayjs";

import { useGetShipmentMutation } from "../../Redux/ReduxApi";
import { useSelector, useDispatch } from "react-redux";
import { toastData } from "../../Redux/commonSlice";

import { Form } from "antd";

import { v4 as uuid } from "uuid";

import { makeToast } from "../common/appcommonfunction/Fuctions";

import { toast } from "react-toastify";
import RenderTable from "./RenderTable";

let dataSource = [];

const AddShipment = () => {
  const receivedToastData = useSelector(toastData);
  const dispatch = useDispatch();

  // const [getShipment, isLoading, isSuccess, isUninitialized] =
  //   useGetShipmentMutation();

  const [getShipment] = useGetShipmentMutation();
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

  const sendData = (data, data_1) => {
    setTotalData(data);
    setData(data_1);
  };

  // NOTE: All patient Information
  useEffect(() => {
    const getData = async () => {
      //Checking start value
      if (shipmentPayload.start < 0) {
        setShipmentPayload({
          ...shipmentPayload,
          start: 0,
        });
      }
      if (
        shipmentPayload.sort !== "" &&
        shipmentPayload.sort !== undefined &&
        shipmentPayload.sort !== null &&
        shipmentPayload.dir !== "" &&
        shipmentPayload.dir !== undefined &&
        shipmentPayload.dir !== null
      ) {
        try {
          const response = await getShipment(shipmentPayload, {
            refetchOnMountOrArgChange: true,
          });
          if (response.data.status === 200) {
            setData(response.data.data.data);
            setTotalData(response.data.data.recordsTotal);
          } else {
            alert(response);
          }
        } catch (error) {
          console.log("Error while Getting getShipment: ", error);
        }
      } else {
        try {
          const response = await getShipment({
            length: shipmentPayload.length,
            search: shipmentPayload.search,
            start: shipmentPayload.start,
          });

          if (response.data.status === 200) {
            setData(response.data.data.data);
            setTotalData(response.data.data.recordsTotal);
          } else {
            alert(response);
          }
        } catch (error) {
          console.log("Error while Getting getShipment: ", error);
        }
      }
    };
    if (receivedToastData !== "")
      makeToast(dispatch, receivedToastData, toast.success);
    getData();
  }, [getShipment, shipmentPayload, dispatch, receivedToastData]);

  if (data.length > 0) {
    dataSource = [];
    //console.log(data.length);
    data.map((shipment) => {
      return dataSource.push({
        ...shipment,
        key: uuid(),
        deliveryDate: dayjs(shipment.deliveryDate).format("DD-MM-YYYY"),
        nextDeliveryDate: dayjs(shipment.nextDeliveryDate).format("DD-MM-YYYY"),
      });
    });
  }

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
      />
    </>
  );
};

export default AddShipment;
