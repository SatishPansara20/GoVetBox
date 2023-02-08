import React from "react";
import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  getMedicationList,
  medicationList,
  addMedicationInfo,
} from "../../../Redux/MedicationManagementSlice";
import { toastAction, toastData } from "../../../Redux/commonSlice";

import { Form, Spin } from "antd";

import { makeToast } from "../../common/appcommonfunction/Fuctions";

import { toast } from "react-toastify";
import RenderMedicationManagementTable from "./RenderMedicationManagementTable";
import { useLocation } from "react-router-dom";

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
  const addMedicationInfoResponse = useSelector(addMedicationInfo);

  const dispatch = useDispatch();
  const location = useLocation();

  const [dataSource, setDataSource] = useState([]);

  const [form] = Form.useForm();

  const [totalData, setTotalData] = useState(0);
  const [isFeching, setIsFeching] = useState(true);
  const [loaderForAdd, setLoaderForAdd] = useState(false);
  //const [addRequestChecker, setAddRequestChecker] = useState(false);
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

  // }
  React.useEffect(() => {
    if (
      location?.state?.addRequestCreated &&
      location?.state?.addRequestCreated !== null
    ) {
      if (!Object.keys(addMedicationInfoResponse).length) {
        console.log("We Are not Change");
        console.log(location?.state);
        setLoaderForAdd(true);
      } else {
        setLoaderForAdd(false);
        Object.assign(location?.state, { addRequestCreated: false });
        console.log(location?.state);
        dispatch(toastAction(addMedicationInfoResponse?.message));
      }
    } else {
      if (location?.state !== null)
        Object.assign(location?.state, { addRequestCreated: false });

      setLoaderForAdd(false);
    }
  }, [
    addMedicationInfoResponse,
    addMedicationInfoResponse?.message,
    addMedicationInfoResponse?.status,
    dispatch,
    location?.state,
  ]);

  React.useEffect(() => {
    if (
      receivedToastData === "Medication added successfully." &&
      receivedToastData !== "" &&
      location?.state?.addRequestCreated
    ) {
      setLoaderForAdd(false);
      makeToast(dispatch, receivedToastData, toast.success);
      dispatch(toastAction(""));
      Object.assign(location?.state, { addRequestCreated: false });
    }
  }, [dispatch, location.state, receivedToastData]);

  React.useEffect(() => {
    const getData = async () => {
      if (isFeching && allMedicationList?.status !== 200) {
      } else if (allMedicationList?.status === 200) {
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
      {loaderForAdd ? (
        <Spin className="w-full" tip="Loading data..." size="large" />
      ) : (
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
      )}

      {/* <p className=" bg-slate-400 uppercase">getSizeList</p> */}
    </>
  );
};

export default MedicationManagement;
