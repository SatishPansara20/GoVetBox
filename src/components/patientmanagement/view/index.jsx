import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPatientDetail,
  patientInfo,
} from "../../../Redux/PatientManagementSlice";
import ViewPatientDetailsForm from "./ViewPatientDetailsForm";

// const delay = () => new Promise((res) => setTimeout(() => res(), 2000));

const ViewPatientDetails = ({ data }) => {
  const dispatch = useDispatch();
  const patientData = useSelector(patientInfo);

  const ref = useRef(null);
  const [userData, setUserData] = useState({});
  const [isFeching, setIsFeching] = useState(true);

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
      console.log("Loading Your Data");
    } else if (patientData?.status === 200) {
      setUserData(patientData?.data);
    }
  }, [patientData, isFeching]);

  return (
    <>
      <ViewPatientDetailsForm
        ref={ref}
        isFeching={isFeching}
        userData={userData}
      />
    </>
  );
};

export default ViewPatientDetails;
