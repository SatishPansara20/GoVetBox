import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getMedicationDetail,
  medicationDetail,
} from "../../../../Redux/MedicationManagementSlice";
import ViewPatientDetailsForm from "./ViewMedicationDetailsForm";
import { useLocation, useNavigate } from "react-router-dom";

const delay = () => new Promise((res) => setTimeout(() => res(), 200));

const ViewMedicationDetails = () => {
  const dispatch = useDispatch();
  const medicationData = useSelector(medicationDetail);
  const ref = useRef(null);
  const [userData, setUserData] = useState({});
  const [isFeching, setIsFeching] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      if (
        location.state._id !== undefined &&
        location.state._id !== null &&
        location.state._id !== ""
      ) {
        //console.log("ViewMedication", data._id);
        setIsFeching(true);
        dispatch(getMedicationDetail({ _id: location.state._id }));
        await delay();
        setIsFeching(false);
      } else {
        navigate(`/medicationmanagement`);
      }
    };
    getData();
  }, [dispatch, navigate, location.state._id]);

  useEffect(() => {
    if (isFeching && medicationData?.status === 200) {
      // console.log("Loading Your Data");
    } else if (medicationData?.status === 200) {
      setUserData(medicationData?.data);
    }
  }, [medicationData, isFeching]);


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

export default ViewMedicationDetails;

// const data = {
//   _id: "639bf41abda62fabe7447798",
//   name: "101",
//   species: {
//     _id: "6374a7e34c1878857763db44",
//     name: "big cat cat",
//     updatedAt: "2022-11-17T04:44:09.099Z",
//     createdAt: "2022-11-16T09:05:39.969Z",
//   },
//   medicationDetail: [
//     {
//       administrationType: {
//         _id: "636219bf75d02e50f6c01298",
//         name: "Pill",
//         updatedAt: "2022-11-02T07:18:23.277Z",
//         createdAt: "2022-11-02T07:18:23.277Z",
//       },
//       sizes: [
//         {
//           sizeId: "636219e775d02e50f6c0129a",
//           amount: 10,
//           dosage: "2 ML",
//           isAllow: true,
//           size: {
//             _id: "636219e775d02e50f6c0129a",
//             name: "Small",
//             minWeight: 10,
//             maxWeight: 20,
//             updatedAt: "2022-11-02T07:19:21.125Z",
//             createdAt: "2022-11-02T07:19:03.721Z",
//           },
//           updatedAt: "2022-12-16T04:29:14.947Z",
//           createdAt: "2022-12-16T04:29:14.947Z",
//         },
//         {
//           sizeId: "636219f375d02e50f6c0129b",
//           amount: 20,
//           dosage: "5 ML",
//           isAllow: true,
//           size: {
//             _id: "636219f375d02e50f6c0129b",
//             name: "Medium",
//             minWeight: 20,
//             maxWeight: 40,
//             updatedAt: "2022-11-02T07:19:15.013Z",
//             createdAt: "2022-11-02T07:19:15.013Z",
//           },
//           updatedAt: "2022-12-16T04:29:14.947Z",
//           createdAt: "2022-12-16T04:29:14.947Z",
//         },
//         {
//           sizeId: "63621a0375d02e50f6c0129c",
//           amount: 30,
//           dosage: "7 ML",
//           isAllow: true,
//           size: {
//             _id: "63621a0375d02e50f6c0129c",
//             name: "Large",
//             minWeight: 40,
//             maxWeight: 60,
//             updatedAt: "2022-11-02T07:19:31.768Z",
//             createdAt: "2022-11-02T07:19:31.768Z",
//           },
//           updatedAt: "2022-12-16T04:29:14.947Z",
//           createdAt: "2022-12-16T04:29:14.947Z",
//         },
//         {
//           sizeId: "63621a1c75d02e50f6c0129d",
//           amount: 40,
//           dosage: "10 ML",
//           isAllow: true,
//           size: {
//             _id: "63621a1c75d02e50f6c0129d",
//             name: "Baby",
//             minWeight: 2,
//             maxWeight: 10,
//             updatedAt: "2022-11-10T11:15:04.522Z",
//             createdAt: "2022-11-02T07:19:56.512Z",
//           },
//           updatedAt: "2022-12-16T04:29:14.947Z",
//           createdAt: "2022-12-16T04:29:14.947Z",
//         },
//       ],
//     },
//   ],
// };
