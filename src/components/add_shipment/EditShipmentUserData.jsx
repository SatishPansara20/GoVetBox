import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  useGetApprovedPatientListMutation,
  useGetShipmentDetailURLMutation,
  useGetPatientAddressURLMutation,
  useGetAllMedicationURLMutation,
  useUpdateShipmentMutation,
} from "../../Redux/ReduxApi";

import { useDispatch } from "react-redux";
import { toastAction } from "../../Redux/commonSlice";
import EditForm from "./EditForm";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Kolkata");

const dateFormate = "MM/DD/YYYY";

let dispayEditFrom;
let patientNames = [];
let medicationNames = [];

const EditShipmentUserData = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const [approvedPatientList] = useGetApprovedPatientListMutation();
  const [ShipmentDetail] = useGetShipmentDetailURLMutation();
  const [PatientAddress] = useGetPatientAddressURLMutation();
  const [AllMedication] = useGetAllMedicationURLMutation();
  const [updateShipment] = useUpdateShipmentMutation();

  const [apList, setAPList] = useState([]);
  const [sd, setSD] = useState({});
  const [pad, setPAD] = useState([]);
  const [am, setAM] = useState([]);

  const formRef = useRef(null);

  useEffect(() => {
    const getData = async () => {
      // NOTE: ShipmentDetail
      try {
        const response = await ShipmentDetail({
          _id: id,
        });
        if (response.status === 400) {
          alert(response.message);
        } else if (Object.keys(response.data).length) {
          setSD(response.data.data);
        }
      } catch (error) {
        console.log("Error while Getting ShipmentDetail : ", error);
      }

      // NOTE: Approved Patient List
      try {
        const response = await approvedPatientList({ start: 0, length: 10000 });
        if (response.data.data.data.length > 0) {
          setAPList(response.data.data.data);
          if (response.data.data.data.length > 0) {
            response.data.data.data.map((patient) => {
              if (!patientNames.includes(patient.name)) {
                patientNames.push(patient.name);
              }
              return patientNames;
            });
          }
        }
      } catch (error) {
        console.log("Error while Getting approvedPatientList : ", error);
      }
    };
    getData();

    return () => {};
  }, [ShipmentDetail, approvedPatientList, id]);

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

  // const onFormLayoutChange = function (changedFields, allFields) {};

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

  if (am.length > 0 || Object.keys(sd).length > 0) {
    const dDate = dayjs(sd.deliveryDate).format(dateFormate);
    const ndDate = dayjs(sd.nextDeliveryDate).format(dateFormate);
    if ((dDate && ndDate) !== undefined && (dDate && ndDate) !== null) {
      dispayEditFrom = (
        <EditForm
          sd={sd}
          dDate={dDate}
          ndDate={ndDate}
          formRef={formRef}
          onFinish={onFinish}
          handleSelecteName={handleSelecteName}
          patientNames={patientNames}
          medicationNames={medicationNames}
          pad={pad}
        />
      );
    }
  }

  return (
    <>
      <div className="p-4 flex flex-col">
        <h2 className="text-xl">Shipment Add Management</h2>
        {dispayEditFrom}
      </div>
    </>
  );
};

export default EditShipmentUserData;
