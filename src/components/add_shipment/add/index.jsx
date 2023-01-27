import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetApprovedPatientListMutation,
  useGetPatientAddressURLMutation,
  useGetAllMedicationURLMutation,
  useAddShipmentMutation,
} from "../../../Redux/ReduxApi";
import { useDispatch } from "react-redux";
import { toastAction } from "../../../Redux/commonSlice";

import AddForm from "./AddForm";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Kolkata");

let patientNames = [];
let medicationNames = [];

const NewShipment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [approvedPatientList] = useGetApprovedPatientListMutation();
  const [PatientAddress] = useGetPatientAddressURLMutation();
  const [AllMedication] = useGetAllMedicationURLMutation();
  const [addShipment] = useAddShipmentMutation();

  const [apList, setAPList] = useState([]);
  const [pad, setPAD] = useState([]);
  const [am, setAM] = useState([]);
  const [visibility, setVisibility] = useState("hidden");

  const ref = useRef(null);

  // NOTE: Approved Patient List
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await approvedPatientList({ start: 0, length: 10000 });
        if (response.status === 401) {
          alert(response.message);
        } else {
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
        }
      } catch (error) {
        console.log("Error while Getting approvedPatientList : ", error);
      }
    };
    getData();
  }, [approvedPatientList]);

  // NOTE: Get All Medications And Addresses

  const getMedicationAndAddress = async (id) => {
    setAM([]);
    setPAD([]);
    medicationNames = [];
    try {
      const response = await AllMedication({
        _id: id,
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

    try {
      const response = await PatientAddress({
        length: 10000,
        patientId: id,
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
    ref.current?.setFieldsValue({
      medicationname: "",
      patientaddress: "",
    });
    const selectedPatientName = apList.find(
      (patient) => patient.name === value
    );
    getMedicationAndAddress(selectedPatientName._id);
  };

  const disabledDate = (current) => {
    if (
      ref.current?.getFieldValue(["shipmentdate"]) !== null &&
      ref.current?.getFieldValue(["shipmentdate"]) !== undefined
    ) {
      const startDate = ref.current
        ?.getFieldValue(["shipmentdate"])
        .format(`${"MM/DD/YYYY"}`);
      return current && current < dayjs(startDate, "MM/DD/YYYY").endOf("day");
    }
  };

  const onFormLayoutChange = function (changedFields, allFields) {
    if (allFields[2].value !== null && allFields[2].value !== undefined) {
      setVisibility("visible");
      document.getElementById("nextDate").style.visibility = visibility;
      //console.log(allFields[2].value);

      disabledDate(allFields[2].value.format(`${"MM/DD/YYYY"}`));
    } else {
      setVisibility("hidden");
      document.getElementById("nextDate").style.visibility = visibility;
    }
  };

  const onFinish = async (values) => {
    const selectedPatientName = apList.find(
      (patient) => patient.name === values.patientname
    );

    const amID = am.find((madicationName) => {
      return madicationName.name === values.medicationname;
    });

    const padID = pad.find((patient) => {
      return (
        values.patientaddress ===
        `${patient.addressLine1},${patient.addressLine2},${patient.city},${patient.state},${patient.pincode}`
      );
    });

    const payload = {
      patientId: selectedPatientName._id,
      medicationId: amID.medicationId,
      addressId: padID._id,
      deliveryDate: new Date(values.shipmentdate.format()).toISOString(),
      nextDeliveryDate: new Date(
        values.nextshipmentdate.format()
      ).toISOString(),
      dosage: "2",
      trackUrl: values.trackurl,
    };

    try {
      const response = await addShipment(payload);
      dispatch(toastAction(response.data.message));
      navigate("/addshipment");
    } catch (error) {
      console.log("Error while Getting AllMedication: ", error);
    }
  };

  return (
    <>
      <div className="p-4 flex flex-col">
        <h2 className="text-xl">Shipment Add Management</h2>
        {patientNames.length > 0 && medicationNames !== undefined ? (
          <AddForm
            onFormLayoutChange={onFormLayoutChange}
            onFinish={onFinish}
            handleSelecteName={handleSelecteName}
            patientNames={patientNames}
            medicationNames={medicationNames}
            disabledDate={disabledDate}
            pad={pad}
            visibility={visibility}
            ref={ref}
          />
        ) : (
          <>
            <p>{patientNames}</p>
            <p>{medicationNames}</p>
          </>
        )}
      </div>
    </>
  );
};

export default NewShipment;
