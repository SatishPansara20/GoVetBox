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

import { useDispatch } from "react-redux";
import { toastAction } from "../../Redux/commonSlice";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Kolkata");

const dateFormat = "MM/DD/YYYY";

let dispayEditFrom;
let patientNames = [];

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

    //NOTE:  All Medications

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
      medicationName: "",
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
      trackUrl: values.trackUrl,
      _id: id,
    };

    // console.log(payload);

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

  if (apList.length > 0 && Object.keys(sd).length > 0) {
    apList.map((patient) => {
      if (!patientNames.includes(patient.name)) {
        patientNames.push(patient.name);
      }
      return patientNames;
    });

    am.map((patient, i) => {
      return (
        <Select.Option
          key={i}
          value={`${patient.name}`}
        >{`${patient.name}`}</Select.Option>
      );
    });

    // //2023-01-17T09:01:39Z
    // console.log(dayjs("2023-01-17T09:01:39Z").format(`${"DD/MM/YYYY"}`));

    // const dDate = dayjs(sd.deliveryDate, `${"YYYY-MM-DD"}T${"HH:mm:ss"}Z`);
    // const ndDate = dayjs(sd.nextDeliveryDate, `${"YYYY-MM-DD"}T${"HH:mm:ss"}Z`);

    const dDate = dayjs(sd.deliveryDate).format(dateFormat);
    const ndDate = dayjs(sd.nextDeliveryDate).format(dateFormat);

    if ((dDate && ndDate) !== undefined && (dDate && ndDate) !== null) {
      // console.log( dayjs(dDate.format(`${"DD/MM/YYYY"}`), dateFormat));

      dispayEditFrom = (
        <Form
          ref={formRef}
          initialValues={{
            patinetName: sd.patinetName,
            medicationName: sd.medicationName,
            deliveryDate: dayjs(dDate, dateFormat),
            nextDeliveryDate: dayjs(ndDate, dateFormat),
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
              <Form.Item
                name="patinetName"
                rules={[
                  {
                    required: true,
                    message: "Select Patient Name",
                  },
                ]}
              >
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
              <Form.Item
                name="medicationName"
                rules={[
                  {
                    required: true,
                    message: "Select Medication Name",
                  },
                ]}
              >
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
              <Form.Item
                name="deliveryDate"
                rules={[
                  {
                    required: true,
                    message: "Choose Delivery Date",
                  },
                ]}
              >
                <DatePicker format={dateFormat} />
              </Form.Item>
            </div>
            <div className="flex flex-col ">
              <label htmlFor="nextDeliveryDate">Next Shipment Date</label>
              <Form.Item
                name="nextDeliveryDate"
                rules={[
                  {
                    required: true,
                    message: "Choose Next Delivery Date",
                  },
                ]}
              >
                <DatePicker format={dateFormat} />
              </Form.Item>
            </div>
          </div>

          <div className="grid md:grid-cols-2  gap-3">
            <div className="flex flex-col ">
              <label htmlFor="trackUrl">Track URL</label>
              <Form.Item
                name="trackUrl"
                rules={[
                  {
                    required: true,
                    message: "Track URL is required",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="flex flex-col ">
              <label htmlFor="dosage">Dosage</label>
              <Form.Item
                name="dosage"
                rules={[
                  {
                    required: true,
                    message: "Doges is required",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
          </div>

          <label htmlFor="patientAddress">Patient Address</label>
          <Form.Item
            name="patientAddress"
            rules={[
              {
                required: true,
                message: "Select Patient Address",
              },
            ]}
          >
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
