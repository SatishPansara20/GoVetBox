import React from "react";
import { Form } from "antd"; //Switch

import {
  InputField,
  SelectField,
  DateField,
  SelectFieldForAddress,
  ButtonField,
} from "../../../common/FormField/index";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Kolkata");

const dateFormate = "MM/DD/YYYY";

const AddMedicationForm = React.forwardRef(
  (
    {
      onFormLayoutChange,
      onFinish,
      handleSelecteName,
      patientNames,
      medicationNames,
      disabledDate,
      visibility,
      pad,
    },
    ref
  ) => {
    return (
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
        onFieldsChange={onFormLayoutChange}
        onFinish={onFinish}
        size="large"
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

        {/*  Dates */}
        <div id="root-shipment-div" className="grid md:grid-cols-2  gap-3">
          {/* Shipment Date */}
          <div className="flex flex-col ">
            <DateField
              id="shipmentdate"
              dateFieldLabelName="Shipment Date"
              message="Choose Shipment Date"
              dateFormate={dateFormate}
            />
          </div>
          {/* Next Shipment Date */}
          <div
            id="nextDate"
            className=" flex flex-col "
            style={{ visibility: visibility }}
          >
            <DateField
              id="nextshipmentdate"
              dateFieldLabelName="Next Shipment Date"
              message="Choose Next Shipment Date"
              disabledDate={disabledDate}
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
    );
  }
);

export default AddMedicationForm;
