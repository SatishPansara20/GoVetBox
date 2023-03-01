import React from "react";
import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  getMedicationList,
  medicationList,
} from "../../../Redux/MedicationManagementSlice";
import { toastData } from "../../../Redux/commonSlice";

import { Form } from "antd";

import { makeToast } from "../../common/appcommonfunction/Fuctions";

import { toast } from "react-toastify";
import RenderMedicationManagementTable from "./RenderMedicationManagementTable";

// const delay = () =>
//   new Promise((res) =>
//     setTimeout(() => {
//       // console.log("we are delay it....");
//       return res();
//     }, 2000)
//   );

const MedicationManagement = () => {
  const receivedToastData = useSelector(toastData);
  const allMedicationList = useSelector(medicationList);

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
      dispatch(getMedicationList(shipmentPayload));
    } else {
      setIsFeching(true);
      dispatch(getMedicationList(shipmentPayload));
    }
  }, [dispatch, shipmentPayload, receivedToastData]);

  // React.useEffect(() => {}, [dispatch, shipmentPayload]);

  React.useEffect(() => {
    const getData = async () => {
      if (isFeching && allMedicationList?.status !== 200) {
        // console.log("Loading Your Data");
      } else if (allMedicationList?.status === 200) {
       // await delay();
        setIsFeching(false);
        setDataSource(allMedicationList?.data?.data);
        setTotalData(allMedicationList?.data?.recordsTotal);
      }
    };
    getData();
  }, [allMedicationList, isFeching]);

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

  //
  return (
    <>
      <RenderMedicationManagementTable
        handleSearchChange={handleSearchChange}
        form={form}
        dataSource={dataSource}
        handleChange={handleChange}
        onShowSizeChange={onShowSizeChange}
        totalData={totalData}
        shipmentPayload={shipmentPayload}
        isFeching={isFeching}
      />
      {/* <p className=" bg-slate-400 uppercase">getSizeList</p> */}
    </>
  );
};

export default MedicationManagement;
