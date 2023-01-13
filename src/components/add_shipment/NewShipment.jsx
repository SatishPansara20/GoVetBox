import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

import {
  useGetApprovedPatientListMutation,
  useGetPatientAddressURLMutation,
  useGetAllMedicationURLMutation,
} from "../../Redux/ReduxApi";
import { Button, DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

let patientNames = [];

const NewShipment = () => {
  const [approvedPatientList] = useGetApprovedPatientListMutation();
  const [PatientAddress] = useGetPatientAddressURLMutation();
  const [AllMedication] = useGetAllMedicationURLMutation();

  const [apList, setAPList] = useState([]);
  const [pad, setPAD] = useState([]);
  const [am, setAM] = useState([]);

  const formRef = useRef(null);

  // NOTE: Approved Patient List
  useEffect(() => {
    const getData = async () => {
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
  }, [approvedPatientList]);

  if (apList.length > 0) {
    apList.map((patient) => {
      if (!patientNames.includes(patient.name)) {
        patientNames.push(patient.name);
      }
      return patientNames;
    });
  }

  // NOTE: Get All Medications

  const getMedicationAndAddress = async (id) => {
    setAM([]);
    setPAD([]);
    try {
      const response = await AllMedication({
        _id: id,
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
    formRef.current?.setFieldsValue({
      medicationname: "",
      patientaddress: "",
    });
    const selectedPatientName = apList.find(
      (patient) => patient.name === value
    );
    getMedicationAndAddress(selectedPatientName._id);
  };

  // const onFormLayoutChange = function (changedFields, allFields) {};

  const onFinish = (values) => {
    // const selectedPatientName = apList.find(
    //   (patient) => patient.name === values.patientname
    // );

    // const paylooad = {
    //   addressId: am._id,
    //   medicationId: am.medicationId,
    //   deliveryDate: "2023-01-14T13:16:26Z",
    //   dosage: "2",
    //   nextDeliveryDate: "2023-01-19T13:16:36Z",
    //   patientId: selectedPatientName._id,
    //   trackUrl:values.trackurl,
    // };

    console.log(values);
  };

  return (
    <>
      <div className="p-4 flex flex-col">
        <h2 className="text-xl">Shipment Add Management</h2>
        <Form
          ref={formRef}
          name="control-ref"
          labelCol={{
            span: 2,
          }}
          wrapperCol={{
            span: "100vh",
          }}
          layout="horizontal"
          //onFieldsChange={onFormLayoutChange}
          onFinish={onFinish}
          size="large"
        >
          <div className="grid md:grid-cols-2  gap-3">
            <div className="flex flex-col ">
              <label htmlFor="patientname">Patient Name</label>
              <Form.Item name="patientname">
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
              <label htmlFor="medicationname">Medication Name </label>
              <Form.Item name="medicationname">
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

          <label htmlFor="shipmentdate">Shipment Date</label>
          <Form.Item name="shipmentdate">
            <DatePicker
              defaultValue={dayjs("01/01/2015", dateFormatList[0])}
              format={dateFormatList}
            />
          </Form.Item>

          <div className="grid md:grid-cols-2  gap-3">
            <div className="flex flex-col ">
              <label htmlFor="trackurl">Track URL</label>
              <Form.Item name="trackurl">
                <Input />
              </Form.Item>
            </div>
            <div className="flex flex-col ">
              <label htmlFor="doges">Doges</label>
              <Form.Item name="doges">
                <Input />
              </Form.Item>
            </div>
          </div>

          <label htmlFor="patientaddress">Patient Address</label>
          <Form.Item name="patientaddress">
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
      </div>
    </>
  );
};

export default NewShipment;

// useEffect(() => {
//   const getData = async () => {
//     try {
//       const response = await ShipmentDetail({
//         _id: "6385e58a673b9e3583c17a58",
//       });

//       if (Object.keys(response.data.data).length) {
//         setSD(response.data.data);
//       }
//     } catch (error) {
//       console.log("Error while Getting ShipmentDetail : ", error);
//     }
//   };
//   getData();
// }, [ShipmentDetail]);
