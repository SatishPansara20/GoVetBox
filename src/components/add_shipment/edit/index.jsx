import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  useGetPatientAddressURLMutation,
  useGetAllMedicationURLMutation,
  useUpdateShipmentMutation,
} from "../../../Redux/ReduxApi";

import { useDispatch } from "react-redux";
import { toastAction } from "../../../Redux/commonSlice";

import { Spin } from "antd";
import { useFetchData } from "../../common/appcommonfunction/Fuctions";
import EditForm from "./EditForm";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Kolkata");

const dateFormate = "MM/DD/YYYY";

let patientNames = [];
let medicationNames = [];

const EditShipmentUserData = () => {
  const dispatch = useDispatch();
  const [PatientAddress] = useGetPatientAddressURLMutation();
  const [AllMedication] = useGetAllMedicationURLMutation();
  const [updateShipment] = useUpdateShipmentMutation();

  const formRef = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const [apList, setAPList] = useState([]);
  const [sd, setSD] = useState({});
  const [pad, setPAD] = useState([]);

  const [am, setAM] = useState([]);
  const [date, setDate] = useState({ dDate: "", ndDate: "" });

  // ShipmentDetail
  useEffect(() => {}, []);
  const {
    data: response,
    isError,
    fetchError,
    isLoading: isFeching,
  } = useFetchData("ShipmentDetail", {
    _id: id,
  });

  useEffect(() => {
    if (!isFeching && !isError && response !== undefined && response !== null) {
      setSD(response.data.data);
    }
  }, [response, isError, isFeching, id]);

  useEffect(() => {
    if (sd !== undefined && sd !== null && Object.keys(sd).length > 0) {
      setDate({
        dDate: dayjs(sd.deliveryDate).format(dateFormate),
        ndDate: dayjs(sd.nextDeliveryDate).format(dateFormate),
      });
    }
  }, [sd]);

  // Approved Patient List
  const {
    data: response_1,
    isError: isError_1,
    fetchError: fetchError_1,
    isLoading: isFeching_1,
  } = useFetchData("approvedPatientList", { start: 0, length: 10000 });

  useEffect(() => {
    if (isFeching_1) {
    } else if (isError_1) {
      console.log(fetchError_1);
    } else if (
      response_1 !== undefined &&
      response_1 !== null &&
      response_1.data.data.data.length > 0
    ) {
      setAPList(response_1.data.data.data);
      response_1.data.data.data.map((patient) => {
        if (!patientNames.includes(patient.name)) {
          patientNames.push(patient.name);
        }
        return patientNames;
      });
    }
  }, [response_1, fetchError_1, isError_1, isFeching_1]);

  useEffect(() => {
    const getData = async (patientId) => {
      //NOTE:  All Medications

      try {
        const response = await AllMedication({
          _id: patientId,
        });
        if (response.data.data.length > 0) {
          setAM(response.data.data);
          if (response.data.data.length > 0) {
            response.data.data.map((medication) => {
              if (!medicationNames.includes(medication.name)) {
                medicationNames.push(medication.name);
              }
              return medicationNames;
            });
          }
        }
      } catch (error) {
        console.log("Error while Getting AllMedication: ", error);
      }

      // NOTE:  Patient Address
      try {
        const response = await PatientAddress({
          length: 10000,
          patientId: patientId,
          start: 0,
        });

        if (response.data.data.length > 0) {
          setPAD(response.data.data);
        }
      } catch (error) {
        console.log("Error while Getting PatientAddress : ", error);
      }
    };

    if (Object.keys(sd).length > 0) {
      getData(sd.patientId);
    }
  }, [AllMedication, PatientAddress, sd]);

  //  Get Patient Medications and Address According to the options Selected
  const getMedicationAndAddress = async (patientId) => {
    setAM([]);
    setPAD([]);
    medicationNames = [];

    //NOTE:  All Medications

    try {
      const response = await AllMedication({
        _id: patientId,
      });
      if (response.data.data.length > 0) {
        setAM(response.data.data);
        if (response.data.data.length > 0) {
          response.data.data.map((medication) => {
            if (!medicationNames.includes(medication.name)) {
              medicationNames.push(medication.name);
            }
            return medicationNames;
          });
        }
      }
    } catch (error) {
      console.log("Error while Getting AllMedication: ", error);
    }

    // NOTE:  Patient Address
    try {
      const response = await PatientAddress({
        length: 10000,
        patientId: patientId,
        start: 0,
      });

      if (response.data.data.length > 0) {
        setPAD(response.data.data);
      }
    } catch (error) {
      console.log("Error while Getting PatientAddress : ", error);
    }
  };

  const handleSelecteName = (value) => {
    formRef.current?.setFieldsValue({
      medicationNames: "",
      patientAddress: "",
      deliveryDate: "",
      nextDeliveryDate: "",
    });
    const selectedPatientName = apList.find(
      (patient) => patient.name === value
    );
    getMedicationAndAddress(selectedPatientName._id);
  };

  const onFinish = async (values) => {
    const payload = {
      patientId: sd.patientId,
      medicationId: sd.medicationId,
      addressId: sd.addressId,
      deliveryDate: new Date(values.deliveryDate.format()).toISOString(),
      nextDeliveryDate: new Date(
        values.nextDeliveryDate.format()
      ).toISOString(),
      dosage: values.dosage,
      trackUrl: values.trackurl,
      _id: id,
    };

    try {
      const response = await updateShipment(payload);

      if (response.data.status === 200) {
        dispatch(toastAction(response.data.message));
        navigate("/addshipment");
      }
    } catch (error) {
      console.log("Error while Getting AllMedication: ", error);
    }
  };
  return (
    <>
      <div className="p-4 flex flex-col">
        <h2 className="text-xl">Shipment Add Management</h2>
        <div className="w-full">
          {isFeching ? (
            <Spin className="w-full" tip="Loading data..." size="large" />
          ) : isError ? (
            <p>{fetchError}</p>
          ) : sd !== undefined &&
            sd !== null &&
            Object.keys(sd).length > 0 &&
            am.length > 0 &&
            date.dDate !== "" &&
            date.ndDate !== "" ? (
            <EditForm
              formRef={formRef}
              sd={sd}
              isFeching={isFeching}
              isError={isError}
              fetchError={fetchError}
              dDate={date.dDate}
              ndDate={date.ndDate}
              onFinish={onFinish}
              handleSelecteName={handleSelecteName}
              patientNames={patientNames}
              medicationNames={medicationNames}
              pad={pad}
            />
          ) : (
            <p>No Data Found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default EditShipmentUserData;

//const [patientId, setPatientId] = useState("");
// //NOTE:  All Medications

// const {
//   data: response_2,
//   isError: isError_2,
//   fetchError: fetchError_2,
//   isLoading: isFeching_2,
// } = useFetchData("AllMedication", patientId);

// useEffect(() => {
//   if (isFeching_2) {
//   } else if (isError_2) {
//     console.log(fetchError_2);
//   } else if (
//     response_2 !== undefined &&
//     response_2 !== null &&
//     response_2.data.data.length > 0
//   ) {
//     setAM([]);
//     setAM(response_2.data.data);
//     medicationNames = [];
//     response_2.data.data.map((medication) => {
//       if (!medicationNames.includes(medication.name)) {
//         medicationNames.push(medication.name);
//       }
//       return medicationNames;
//     });
//   }
// }, [isFeching_2, response_2, fetchError_2, isError_2, patientId]);

// // NOTE:  Patient Address
// const {
//   data: response_3,
//   isError: isError_3,
//   fetchError: fetchError_3,
//   isLoading: isFeching_3,
// } = useFetchData("PatientAddress", patientId);

// useEffect(() => {
//   if (isFeching_3) {
//   } else if (isError_3) {
//     console.log(fetchError_3);
//   } else if (
//     response_3 !== undefined &&
//     response_3 !== null &&
//     response_3.data.data.length > 0
//   ) {
//     setPAD([]);
//     setPAD(response_3.data.data);
//   }
// }, [isFeching_3, response_3, fetchError_3, isError_3, patientId]);
