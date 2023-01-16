import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, DatePicker, Form, Input, Select } from "antd";

import {
  useGetApprovedPatientListMutation,
  useGetShipmentDetailURLMutation,
  useGetPatientAddressURLMutation,
  useGetAllMedicationURLMutation,
  useUpdateShipmentMutation,
} from "../../Redux/ReduxApi";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Kolkata");

const dateFormat = "DD/MM/YYYY";

let dispayEditFrom;
let patientNames = [];

const EditShipmentUserData = () => {
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
    const getShipmentDetail = async () => {
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
        }
      } catch (error) {
        console.log("Error while Getting approvedPatientList : ", error);
      }
    };
    getShipmentDetail();
  }, [ShipmentDetail, approvedPatientList, id]);

  // NOTE: Patient Medications and Address

  const getMedicationAndAddress = async (patientId) => {
    setAM([]);
    setPAD([]);
    try {
      const response = await AllMedication({
        _id: patientId,
      });
      if (response.data.data.length > 0) {
        setAM(response.data.data);
      }
    } catch (error) {
      console.log("Error while Getting AllMedication: ", error);
    }

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
      medicationName: "",
      patientAddress: "",
    });
    const selectedPatientName = apList.find(
      (patient) => patient.name === value
    );
    getMedicationAndAddress(selectedPatientName._id);
  };

  // const onFormLayoutChange = function (changedFields, allFields) {};

  const onFinish = async (values) => {
    console.log();

    try {
      const response = await updateShipment({
        patientId: sd.patientId,
        medicationId: sd.medicationId,
        addressId: sd.addressId,
        deliveryDate: new Date(values.deliveryDate.format()).toISOString(),
        nextDeliveryDate: new Date(values.deliveryDate.format()).toISOString(),
        dosage: values.dosage,
        trackUrl: values.trackUrl,
        _id: id,
      });
      console.log(response.data.data);
      navigate("/addshipment");
    } catch (error) {
      console.log("Error while Getting AllMedication: ", error);
    }
  };

  if (apList.length > 0 && Object.keys(sd).length > 0) {
    apList.map((patient) => {
      if (!patientNames.includes(patient.name)) {
        patientNames.push(patient.name);
      }
      return patientNames;
    });

    const dDate = dayjs(sd.deliveryDate, `${"YYYY-MM-DD"}T${"HH:mm:ss"}Z`);
    const ndDate = dayjs(sd.nextDeliveryDate, `${"YYYY-MM-DD"}T${"HH:mm:ss"}Z`);

    if ((dDate && ndDate) !== undefined && (dDate && ndDate) !== null) {
      // console.log( dayjs(dDate.format(`${"DD/MM/YYYY"}`), dateFormat));

      dispayEditFrom = (
        <Form
          ref={formRef}
          initialValues={{
            patinetName: sd.patinetName,
            medicationName: sd.medicationName,
            deliveryDate: dayjs(dDate.format(`${"DD/MM/YYYY"}`)),
            nextDeliveryDate: dayjs(ndDate.format(`${"DD/MM/YYYY"}`)),
            trackUrl: sd.trackUrl,
            dosage: sd.dosage,
            patientAddress: `${sd.addressLine1},${sd.addressLine2}`,
          }}
          name="control-ref"
          labelCol={{
            span: 2,
          }}
          wrapperCol={{
            span: "100vh",
          }}
          layout="horizontal"
          // onFieldsChange={onFormLayoutChange}
          onFinish={onFinish}
          size="large"
        >
          <div className="grid md:grid-cols-2  gap-3">
            <div className="flex flex-col ">
              <label htmlFor="patinetName">Patient Name</label>
              <Form.Item name="patinetName">
                <Select onChange={handleSelecteName}>
                  {patientNames.length > 0 ? (
                    patientNames.map((patient, i) => {
                      return (
                        <Select.Option
                          key={i}
                          value={`${patient}`}
                        >{`${patient}`}</Select.Option>
                      );
                    })
                  ) : (
                    <Select.Option value="No Option">No Option</Select.Option>
                  )}
                </Select>
              </Form.Item>
            </div>
            <div className="flex flex-col ">
              <label htmlFor="medicationName">Medication Name </label>
              <Form.Item name="medicationName">
                <Select>
                  {am.length > 0 ? (
                    am.map((patient, i) => {
                      return (
                        <Select.Option
                          key={i}
                          value={`${patient.name}`}
                        >{`${patient.name}`}</Select.Option>
                      );
                    })
                  ) : (
                    <Select.Option value="No Option">No Option</Select.Option>
                  )}
                </Select>
              </Form.Item>
            </div>
          </div>

          <div className="grid md:grid-cols-2  gap-3">
            <div className="flex flex-col ">
              <label htmlFor="deliveryDate">Shipment Date</label>
              <Form.Item name="deliveryDate">
                <DatePicker format={dateFormat} />
              </Form.Item>
            </div>
            <div className="flex flex-col ">
              <label htmlFor="nextDeliveryDate">Next Shipment Date</label>
              <Form.Item name="nextDeliveryDate">
                <DatePicker format={dateFormat} />
              </Form.Item>
            </div>
          </div>

          <div className="grid md:grid-cols-2  gap-3">
            <div className="flex flex-col ">
              <label htmlFor="trackUrl">Track URL</label>
              <Form.Item name="trackUrl">
                <Input />
              </Form.Item>
            </div>
            <div className="flex flex-col ">
              <label htmlFor="dosage">Dosage</label>
              <Form.Item name="dosage">
                <Input />
              </Form.Item>
            </div>
          </div>

          <label htmlFor="patientAddress">Patient Address</label>
          <Form.Item name="patientAddress">
            <Select>
              {pad.length > 0 ? (
                pad.map((patient, i) => {
                  return (
                    <Select.Option
                      key={i}
                      value={`${patient.addressLine1},${patient.addressLine2},${patient.city},${patient.state},${patient.pincode}`}
                    >{`${patient.addressLine1},${patient.addressLine2},${patient.city},${patient.state},${patient.pincode}`}</Select.Option>
                  );
                })
              ) : (
                <Select.Option value="No Option">No Option</Select.Option>
              )}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button className="bg-violet-700" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
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
