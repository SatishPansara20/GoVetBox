import React from "react";
// import { useState } from "react";

import { Form, Spin } from "antd";
import AdministrationTypeTable from "./AdministrationTypeTable";

import { SelectField, InputField } from "../../../common/FormField/index";

const ViewMedicationDetailsForm = React.forwardRef(
  ({ userData, isFeching }, ref) => {
    return (
      <>
        {isFeching ? (
          <Spin className="w-full" tip="Loading data..." size="large" />
        ) : userData !== undefined &&
          userData !== null &&
          Object.keys(userData).length > 0 ? (
          <>
            {" "}
            <Form
              ref={ref}
              style={{
                display: "inline-block",
                width: "100%",
              }}
              name="control-ref"
              layout="horizontal"
              disabled
              //  onFieldsChange={onFormLayoutChange}

              size="large"
              initialValues={{
                name: userData?.name,
                species: userData?.species.name,
              }}
            >
              {/*Medication Name And Species*/}
              <div className="grid md:grid-cols-2  gap-3">
                {/*Medication Name  */}
                <div className="flex flex-col ">
                  <InputField
                    id="name"
                    InputlabelName="Medication Name"
                    type="text"
                    size="large"
                    message="This field is required"
                    placeholder="Enter the Medication Name"
                  />
                </div>
                {/* Species*/}
                <div className="flex flex-col ">
                  <SelectField
                    id="species"
                    selectFieldLabelName="Species"
                    message="Select Species"
                  />
                </div>
              </div>
            </Form>
            <AdministrationTypeTable data={userData?.medicationDetail} />
          </>
        ) : (
          <p>No Data Found</p>
        )}
      </>
    );
  }
);

export default ViewMedicationDetailsForm;
