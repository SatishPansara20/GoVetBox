import React from "react";
import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  getApprovedPatientList,
  //   getPatientDetail,
  approvedPatientList,
  //   patientInfo,
} from "../../Redux/PatientManagementSlice";
import { toastData } from "../../Redux/commonSlice";

import { Form } from "antd";

import { makeToast } from "../common/appcommonfunction/Fuctions";

import { toast } from "react-toastify";
import RenderPatientManagementTable from "./RenderPatientManagementTable";

// const delay = () =>
//   new Promise((res) =>
//     setTimeout(() => {
//       // console.log("we are delay it....");
//       return res();
//     }, 2000)
//   );

const PatientManagement = () => {
  const receivedToastData = useSelector(toastData);
  const allApprovedPatientList = useSelector(approvedPatientList);

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
      dispatch(getApprovedPatientList(shipmentPayload));
    } else {
      setIsFeching(true);
      dispatch(getApprovedPatientList(shipmentPayload));
    }
  }, [dispatch, shipmentPayload, receivedToastData]);

  // React.useEffect(() => {}, [dispatch, shipmentPayload]);

  React.useEffect(() => {
    const getData = async () => {
      if (isFeching && allApprovedPatientList?.length < 0) {
        console.log("Loading Your Data");
      } else if (allApprovedPatientList?.length > 0) {
        //await delay();
        setIsFeching(false);
        setDataSource(allApprovedPatientList);
        setTotalData(allApprovedPatientList?.length);
      }
    };
    getData();
  }, [allApprovedPatientList, isFeching]);

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
      <RenderPatientManagementTable
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

export default PatientManagement;
