import React from "react";
// import { useState } from "react";

import { Form, Spin } from "antd";

import {
  InputField,
  SelectField,
  DateField,
  SelectFieldForAddress,
  ButtonField,
} from "../../common/FormField/index";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Kolkata");

const dateFormate = "MM/DD/YYYY";

const EditForm = React.forwardRef(
  (
    {
      sd,
      isFeching,
      isError,
      fetchError,
      dDate,
      ndDate,
      onFinish,
      handleSelecteName,
      patientNames,
      medicationNames,
      pad,
      selectedpatient,
      // setData,
    },
    ref
  ) => {
    console.log(selectedpatient);
    // const onFormLayoutChange = (changedFields, allFields) => {
    //   console.log(allFields[0].value);
    //   // setSelectedPatient(ref.current?.getFieldValue["patientname"]);
    // };
    // console.log(ref.current);
    // console.log(ref.current?.getFieldValue["patientname"]);
    return (
      <>
        {isFeching ? (
          <Spin className="w-full" tip="Loading data..." size="large" />
        ) : isError ? (
          <p>{fetchError}</p>
        ) : sd !== undefined &&
          sd !== null &&
          Object.keys(sd).length > 0 &&
          dDate !== "" &&
          ndDate !== "" ? (
          <Form
            ref={ref}
            name="control-ref"
            labelCol={{
              span: 2,
            }}
            wrapperCol={{
              span: "100vh",
            }}
            layout="horizontal"
            //  onFieldsChange={onFormLayoutChange}
            onFinish={onFinish}
            size="large"
            initialValues={{
              patientname: sd.patinetName,
              medicationname: sd.medicationName,
              // medicationname:
              //   selectedpatient === sd.patientName ? sd.medicationName : " ",
              deliveryDate: dayjs(dDate, dateFormate),
              nextDeliveryDate: dayjs(ndDate, dateFormate),
              trackurl: sd.trackUrl,
              dosage: sd.dosage,
              patientaddress: `${sd.addressLine1},${sd.addressLine2}`,
            }}
          >
            {/* Patient Name And Medication Name */}
            <div className="grid md:grid-cols-2  gap-3">
              {/* Patient Name */}
              <div className="flex flex-col ">
                <SelectField
                  id="patientname"
                  selectFieldLabelName="Patient Name"
                  message="Select Patient Name"
                  handleChange={handleSelecteName}
                  SelectFildValues={patientNames}
                />
              </div>

              {/* Medication Name */}
              <div className="flex flex-col ">
                <SelectField
                  id="medicationname"
                  selectFieldLabelName="Medication Name"
                  message="Select Medication Name"
                  SelectFildValues={medicationNames}
                />
              </div>
            </div>

            {/*  Dates*/}
            <div className="grid md:grid-cols-2  gap-3">
              {/* Shipment Date */}
              <div className="flex flex-col ">
                <DateField
                  id="deliveryDate"
                  dateFieldLabelName="Shipment Date"
                  message="Choose Delivery Date"
                  dateFormate={dateFormate}
                />
              </div>
              {/* Next Shipment Date */}
              <div className="flex flex-col ">
                <DateField
                  id="nextDeliveryDate"
                  dateFieldLabelName="Next Shipment Date"
                  message="Choose Next Delivery Date"
                  dateFormate={dateFormate}
                />
              </div>
            </div>

            {/* Track URL And Doges*/}
            <div className="grid md:grid-cols-2  gap-3">
              {/* Track URL */}
              <div className="flex flex-col ">
                <InputField
                  id="trackurl"
                  InputlabelName="Track URL"
                  type="text"
                  size="large"
                  message="Track URL is required"
                  placeholder="Enter the Track URL"
                />
              </div>
              {/* Doges */}
              <div className="flex flex-col ">
                <InputField
                  id="dosage"
                  InputlabelName="Dosage"
                  type="text"
                  size="large"
                  message="Dosage is required"
                  placeholder="Enter the Dosage"
                />
              </div>
            </div>

            <SelectFieldForAddress
              id="patientaddress"
              selectFieldLabelName="Patient Address"
              message="Select Patient Address"
              SelectFildValues={pad}
            />

            <ButtonField
              id="submit"
              type="primary"
              className="bg-violet-700"
              buttonText="Submit"
            />
          </Form>
        ) : (
          <p>No Data Found</p>
        )}
      </>
    );
  }
);
export default EditForm;

// const handleSelecteName = (value) => {
//   ref.current?.setFieldsValue({
//     medicationname: "",
//     patientaddress: "",
//     deliveryDate: "",
//     nextDeliveryDate: "",
//   });
//   setData(value);
//   // const selectedPatientName = apList.find(
//   //   (patient) => patient.name === value
//   // );
//   // getMedicationAndAddress(selectedPatientName._id);
// };
