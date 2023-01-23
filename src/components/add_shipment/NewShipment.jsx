import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetApprovedPatientListMutation,
  useGetPatientAddressURLMutation,
  useGetAllMedicationURLMutation,
  useAddShipmentMutation,
} from "../../Redux/ReduxApi";
import { useDispatch } from "react-redux";
import { toastAction } from "../../Redux/commonSlice";

import { Button, DatePicker, Form, Input, Select } from "antd";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Kolkata");

const dateFormate = "MM/DD/YYYY";

let patientNames = [];

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

  const formRef = useRef(null);

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
          }
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

  // NOTE: Get All Medications And Addresses

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

  const disabledDate = (current) => {
    if (
      formRef.current?.getFieldValue(["shipmentdate"]) !== null &&
      formRef.current?.getFieldValue(["shipmentdate"]) !== undefined
    ) {
      const startDate = formRef.current
        ?.getFieldValue(["shipmentdate"])
        .format(`${"MM/DD/YYYY"}`);
      return current && current < dayjs(startDate, "MM/DD/YYYY").endOf("day");
    }
  };
  const onFormLayoutChange = function (changedFields, allFields) {
    if (allFields[2].value !== null && allFields[2].value !== undefined) {
      document.getElementById("nextDate").style.visibility = "visible";
      //console.log(allFields[2].value);

      disabledDate(allFields[2].value.format(`${"MM/DD/YYYY"}`));
    } else {
      document.getElementById("nextDate").style.visibility = "hidden";
    }
  };

  const onFinish = async (values) => {
    const selectedPatientName = apList.find(
      (patient) => patient.name === values.patientname
    );

    const amID = am.find(
      (madicationName) => madicationName.name === values.medicationname
    );

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
          onFieldsChange={onFormLayoutChange}
          onFinish={onFinish}
          size="large"
        >
          <div className="grid md:grid-cols-2  gap-3">
            <div className="flex flex-col ">
              <label htmlFor="patientname">Patient Name</label>
              <Form.Item
                name="patientname"
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
              <label htmlFor="medicationname">Medication Name </label>
              <Form.Item
                name="medicationname"
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
              <label htmlFor="shipmentdate">Shipment Date</label>
              <Form.Item
                name="shipmentdate"
                rules={[
                  {
                    required: true,
                    message: "Choose Shipment Date",
                  },
                ]}
              >
                <DatePicker className="w-full" format={dateFormate} />
              </Form.Item>
            </div>
            <div
              id="nextDate"
              className=" flex flex-col "
              style={{ visibility: "hidden" }}
            >
              <label htmlFor="nextshipmentdate">Next Shipment Date</label>
              <Form.Item
                name="nextshipmentdate"
                rules={[
                  {
                    required: true,
                    message: "Choose Next Shipment Date",
                  },
                ]}
              >
                <DatePicker className="w-full" disabledDate={disabledDate} format={dateFormate} />
              </Form.Item>
            </div>
          </div>

          <div className="grid md:grid-cols-2  gap-3">
            <div className="flex flex-col ">
              <label htmlFor="trackurl">Track URL</label>
              <Form.Item
                name="trackurl"
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
              <label htmlFor="doges">Doges</label>
              <Form.Item
                name="doges"
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

          <label htmlFor="patientaddress">Patient Address</label>
          <Form.Item
            name="patientaddress"
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
      </div>
    </>
  );
};

export default NewShipment;

// const getDateFormate = (a) => {
//   const b = `${a.$d}`.split(" ");

//   const formatter = new Intl.DateTimeFormat("en-IN", {
//     year: "numeric",
//     month: "2-digit",
//     day: "2-digit",
//   });
//   const date = new Date(b[3], a.$M, a.$D);
//   const result = formatter.format(date).split("/").join("-");
//   console.log(`${result}T${b[4]}Z`); // outputs “01/03/2018”

//   // console.log(`${b[3]}-${a.$M + 1}-${a.$D}T${b[4]}Z`);

//   return result;
// };
