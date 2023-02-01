import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPatientDetail,
  patientInfo,
  editPatient,
  editPatientInfo,
} from "../../../Redux/PatientManagementSlice";
import ViewPatientDetailsForm from "./ViewPatientDetailsForm";
import { toastAction } from "../../../Redux/commonSlice";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Kolkata");

const dateFormate = "MM/DD/YYYY";

// const delay = () => new Promise((res) => setTimeout(() => res(), 2000));

const ViewPatientDetails = ({ data, setData }) => {
  const dispatch = useDispatch();
  const patientData = useSelector(patientInfo);
  const editPatientData = useSelector(editPatientInfo);

  const formData = new FormData();
  const ref = useRef(null);
  const [userData, setUserData] = useState({});
  const [isFeching, setIsFeching] = useState(true);
  const [dobDdate, setDobDate] = useState({ dob: "" });

  useEffect(() => {
    const getData = async () => {
      setIsFeching(true);
      dispatch(getPatientDetail({ patientId: data._id }));
      // await delay();
      setIsFeching(false);
    };
    getData();
  }, [dispatch, data._id]);

  useEffect(() => {
    if (isFeching && patientData?.status === 200) {
      // console.log("Loading Your Data");
    } else if (patientData?.status === 200) {
      setUserData(patientData?.data);
      setDobDate({
        dob: dayjs(patientData?.dob).format(dateFormate),
      });
    }
  }, [patientData, isFeching]);

  const onFinish = async (values) => {
    setData(false);
    formData.set("_id", patientData?.data?._id);
    formData.set("weight", values.weight);
    formData.set("name", values.name);
    formData.set("dob", values.dob);
    formData.set("type", values.type);
    formData.set("isMixBreed", values.isMixBreed);
    formData.set("image", "");

    try {
      if (
        formData.get("_id") !== undefined &&
        formData.get("_id") !== null &&
        formData.get("_id") !== ""
      ) {
        dispatch(editPatient(formData));
        dispatch(toastAction(editPatientData?.message));
      } else {
        console.log("ViewPatientDetails _id is not Valid");
        for (const pair of formData.entries()) {
          console.log(`${pair[0]}, ${pair[1]}`);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ViewPatientDetailsForm
        ref={ref}
        isFeching={isFeching}
        userData={userData}
        dobDdate={dobDdate.dob}
        onFinish={onFinish}
      />
    </>
  );
};

export default ViewPatientDetails;
