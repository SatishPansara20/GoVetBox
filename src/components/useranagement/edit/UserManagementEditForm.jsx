import React from "react";
// import { useState } from "react";
import { API_IMAGE } from "../../../constants/index";

import { Form, Spin } from "antd";

import {
  InputField,
  ButtonField,
  ImageField,
} from "../../common/FormField/index";

const UserManagementEditForm = React.forwardRef(
  (
    {
      userData,
      isFeching,
      isError,
      fetchError,
      onFinish,

      // setData,
    },
    ref
  ) => {
    return (
      <>
        {isFeching ? (
          <Spin className="w-full" tip="Loading data..." size="large" />
        ) : isError ? (
          <p>{fetchError}</p>
        ) : userData !== undefined &&
          userData !== null &&
          Object.keys(userData).length > 0 ? (
          <Form
            ref={ref}
            style={{
              display: "inline-block",
              width: "100%",
            }}
            name="control-ref"
            layout="horizontal"
            //  onFieldsChange={onFormLayoutChange}
            onFinish={onFinish}
            size="large"
            initialValues={{
              firstName: userData.firstName,
              lastName: userData.lastName,
              email: userData.email,
              contact: userData.contact,
            }}
          >
            <div className="flex flex-col items-center justify-center mb-2">
              <ImageField
                id="image"
                imageURL={`${API_IMAGE}profile/${userData.profile}`}
                width={140}
                alt="User Look"
              />
            </div>
            {/* First Name And Last Name*/}

            <div className="grid md:grid-cols-2  gap-3">
              {/* First Name */}
              <div className="flex flex-col ">
                <InputField
                  id="firstName"
                  type="text"
                  size="large"
                  message="This field is required"
                  placeholder="Enter the First Name"
                />
              </div>
              {/* Last Name */}
              <div className="flex flex-col ">
                <InputField
                  id="lastName"
                  type="text"
                  size="large"
                  message="This field is required"
                  placeholder="Enter the Last Name"
                />
              </div>
            </div>

            {/* Email And Contact*/}
            <div className="grid md:grid-cols-2  gap-3">
              {/* Email */}
              <div className="flex flex-col ">
                <InputField
                  id="email"
                  type="email"
                  size="large"
                  message="Enter required"
                  placeholder="Enter the Track URL"
                  disabled={true}
                />
              </div>
              {/* 
              Contact  */}
              <div className="flex flex-col ">
                <InputField
                  id="contact"
                  type="text"
                  size="large"
                  message="Dosage is required"
                  placeholder="Enter the Dosage"
                />
              </div>
            </div>

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
export default UserManagementEditForm;

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
