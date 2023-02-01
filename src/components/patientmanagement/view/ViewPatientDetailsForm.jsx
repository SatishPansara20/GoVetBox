import React from "react";
// import { useState } from "react";

import { Form, Spin } from "antd";

import {
  SelectField,
  InputField,
  ButtonField,
  ImageField,
  DateField,
} from "../../common/FormField/index";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Kolkata");

const dateFormate = "MM/DD/YYYY";

const mixChoice = ["Yes", "No"];
const type = ["Not Applicable", "Neutered"];

const ViewPatientDetailsForm = React.forwardRef(
  (
    {
      userData,
      dobDdate,
      isFeching,
      isError,
      fetchError,
      handleSelecteName,
      onFinish,
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
          Object.keys(userData).length > 0 &&
          dobDdate !== "" ? (
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
              image: userData?.image,
              username: userData?.userDetail?.name,
              name: userData?.name,
              dob: dayjs(dobDdate, dateFormate),
              age: userData?.age,
              weight: userData?.weight,
              breed: userData?.breed?.name,
              species: userData?.species?.name,
              gender: userData?.gender,
              isMixBreed: userData?.isMixBreed,
              type: userData?.type,
            }}
          >
            <div className=" z-20 flex flex-col items-center justify-center mb-2">
              <ImageField
                id="image"
                imageURL={userData?.image}
                width={35}
                alt="User Look"
              />
            </div>

            {/* User Name And Patient Name*/}
            <div className="grid md:grid-cols-2  gap-3">
              {/*User Name */}
              <div className="flex flex-col ">
                <InputField
                  id="username"
                  InputlabelName="User Name"
                  type="text"
                  size="large"
                  message="This field is required"
                  placeholder="Enter the User Name"
                  disabled={true}
                />
              </div>
              {/* Patient Name */}
              <div className="flex flex-col ">
                <InputField
                  id="name"
                  InputlabelName="Patient Name"
                  type="text"
                  size="large"
                  message="This field is required"
                  placeholder="Enter the User Name"
                />
              </div>
            </div>

            {/* DOB And Age*/}
            <div className="grid md:grid-cols-2  gap-3">
              {/* DOB  */}
              <div className="flex flex-col ">
                <DateField
                  id="dob"
                  dateFieldLabelName="DOB"
                  message="Choose Date of Birth"
                  dateFormate={dateFormate}
                />
              </div>
              {/* 
              Age  */}
              <div className="flex flex-col ">
                <InputField
                  id="age"
                  InputlabelName="Age"
                  type="text"
                  size="large"
                  message="Age is required"
                  placeholder="Enter the Age"
                  disabled={true}
                />
              </div>
            </div>

            {/*Weight And Breed*/}
            <div className="grid md:grid-cols-2  gap-3">
              {/*Weight */}
              <div className="flex flex-col ">
                <InputField
                  id="weight"
                  InputlabelName="Weight"
                  type="text"
                  size="large"
                  message="This field is required"
                  placeholder="Enter the Weight"
                />
              </div>
              {/* Breed */}
              <div className="flex flex-col ">
                <InputField
                  id="breed"
                  InputlabelName="Breed"
                  type="text"
                  size="large"
                  message="This field is required"
                  placeholder="Enter the Breed"
                  disabled={true}
                />
              </div>
            </div>

            {/*Species And Gender
             */}
            <div className="grid md:grid-cols-2  gap-3">
              {/*Species */}
              <div className="flex flex-col ">
                <InputField
                  id="species"
                  InputlabelName="Species"
                  type="text"
                  size="large"
                  message="This field is required"
                  placeholder="Enter the Weight"
                  disabled={true}
                />
              </div>
              {/* Gender */}
              <div className="flex flex-col ">
                <InputField
                  id="gender"
                  InputlabelName="Gender"
                  type="text"
                  size="large"
                  message="This field is required"
                  placeholder="Enter the Breed"
                  disabled={true}
                />
              </div>
            </div>

            {/* Mixed Breed? And Neutered/Spayed */}
            <div className="grid md:grid-cols-2  gap-3">
              {/* Mixed Breed? */}

              <div className="flex flex-col ">
                <SelectField
                  id="isMixBreed"
                  selectFieldLabelName="Mixed Breed?"
                  message="Select Patient Name"
                  handleChange={handleSelecteName}
                  SelectFildValues={mixChoice}
                />
              </div>

              {/* Neutered/Spayed */}
              <div className="flex flex-col ">
                <SelectField
                  id="type"
                  selectFieldLabelName="Medication Name"
                  message="Select Medication Name"
                  SelectFildValues={type}
                />
              </div>
            </div>

            {/* Current Medications */}
            <div className="grid md:grid-cols-2  gap-3">
              {/* Current Medications*/}
              <div className="flex flex-col ">
                <ul className="list-none">
                  <li>
                    Current Medications
                    <ol className="pl-5 mt-2 space-y-1 list-disc list-inside">
                      {userData?.medication?.map((item) => {
                        return <li key={item.medicationId}>{item.name}</li>;
                      })}
                    </ol>
                  </li>
                </ul>
              </div>
            </div>

            <div className=" z-20 flex flex-col items-center justify-center mb-2">
              {" "}
              <ButtonField
                id="submit"
                type="primary"
                className="bg-violet-700"
                buttonText="Submit"
              />
            </div>
          </Form>
        ) : (
          <p>No Data Found</p>
        )}
      </>
    );
  }
);

export default ViewPatientDetailsForm;

// const sample = {
//   _id: "63a04bdbb3c9af5254fd6497",
//   name: "Josh",
//   dob: "2019-12-20T00:00:00Z",
//   weight: "35",
//   type: "Not Applicable",
//   notes: "",
//   gender: "Male",
//   isAdminApproved: 1,
//   age: "3 Years 1 Months",
//   isMixBreed: "No",
//   image: "Josh_7zIcn.jpg",
//   createdAt: "2022-12-19T11:32:43.163Z",
//   medication: [
//     {
//       amount: 30,
//       name: "Hello Medication",
//       medicationId: "63a04a46b3c9af5254fd648c",
//     },
//   ],
//   userDetail: {
//     _id: "637cb1dddee0a9e32b1779f7",
//     email: "rohan1m@yopmail.com",
//     profile: "undefined_Lqyeh.webp",
//     createdAt: "2022-11-22T11:26:21.687Z",
//     name: "Rohan Makwana",
//   },
//   breed: {
//     _id: "636219b275d02e50f6c01297",
//     name: "German Shepherd",
//     speciesId: "6362180d75d02e50f6c0127c",
//     updatedAt: "2022-11-02T07:18:10.155Z",
//     createdAt: "2022-11-02T07:18:10.155Z",
//   },
//   species: {
//     _id: "6362180d75d02e50f6c0127c",
//     name: "Siberian",
//     updatedAt: "2022-11-02T07:11:09.334Z",
//     createdAt: "2022-11-02T07:11:09.334Z",
//   },
//   administrationType: {
//     _id: "636219c475d02e50f6c01299",
//     name: "Tropical",
//     updatedAt: "2022-11-28T08:15:14.430Z",
//     createdAt: "2022-11-02T07:18:28.957Z",
//   },
//   size: {
//     _id: "636219e775d02e50f6c0129a",
//     name: "Small",
//     minWeight: 10,
//     maxWeight: 20,
//     updatedAt: "2022-11-02T07:19:21.125Z",
//     createdAt: "2022-11-02T07:19:03.721Z",
//   },
// };
