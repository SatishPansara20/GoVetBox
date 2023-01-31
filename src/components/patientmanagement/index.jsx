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
    </>
  );
};

export default PatientManagement;

//const sample = [
//     {
//       _id: "63a04bdbb3c9af5254fd6497",
//       name: "Josh",
//       ownerName: "Rohan Makwana",
//       ownerEmail: "rohan1m@yopmail.com",
//       image: "Josh_7zIcn.jpg",
//       dob: "2019-12-20T00:00:00Z",
//       weight: "35",
//       gender: "Male",
//       type: "Not Applicable",
//       isSubscribed: true,
//       isMixBreed: "No",
//       breedName: "German Shepherd",
//       isAdminApproved: 1,
//       createdAt: "2022-12-19T11:32:43.163Z",
//     },

//     {
//       _id: "637daedcdee0a9e32b1779fc",
//       name: "Julie",
//       ownerName: "Rohan Makwana",
//       ownerEmail: "rohan1m@yopmail.com",
//       image: "Julie_6fWs9.jpg",
//       dob: "12/31/1999",
//       weight: "55",
//       gender: "Female",
//       type: "Not Applicable",
//       isSubscribed: true,
//       breedName: "Burmese Cat",
//       isAdminApproved: 1,
//       createdAt: "2022-11-23T05:25:48.683Z",
//     },
//   ];
