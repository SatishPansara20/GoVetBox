import React from "react";
import { useState, useRef } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
//import { useGetShipmentMutation } from "../../Redux/ReduxApi";
import { UserOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";

import { toast } from "react-toastify";

import { FORGOT_PASSWORD } from "../../constants/index";
import { InputField } from "../common/FormField";
import { makeToast, useFetchData } from "../common/appcommonfunction/Fuctions";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Kolkata");

const ForgotPassword = () => {
  //  const [api, contextHolder] = notification.useNotification();
 // const [getShipment] = useGetShipmentMutation();
  const dispatch = useDispatch();

  const formRef = useRef();
  const [email, setEmail] = useState("");

  // const { data, fetchError, isLoading } = useFetchData(getShipment, {
  //   length: 10,
  //   search: "",
  //   start: 0,
  // });

  // isLoading &&  console.log("Loading shipment...")
  // !isLoading && fetchError && console.log(fetchError)
  // isLoading && !fetchError && (data.length ?   console.log(data) : console.log("No Data Found") )

  //NOTE: Notifications Banner
  // const openNotificationWithIcon = (notificationData) => {
  //   console.log(notificationData);
  //   if (notificationData.type !== "") {
  //     api[notificationData.type]({
  //       message: notificationData.message,
  //       description: notificationData.description || notificationData.message,
  //     });
  //   }
  // };

  //NOTE: Handleing password reset url and notification

  const sentPasswordRestLink = async (values) => {
    try {
      const response = await axios.post(FORGOT_PASSWORD, {
        email: values.email,
      });
      // console.log(response.data);

      if (response.data.status === 200) {
        // openNotificationWithIcon({
        //   type: "success",
        //   message: "Success",
        //   description: response.data.message,
        // });

        makeToast(dispatch, response.data.message, toast.success);
        formRef?.current.setFieldsValue({
          email: "",
        });
      }
    } catch (error) {
      console.log(error.response);
      if (error.response) {
        if (error.response.data.status === 400) {
          // openNotificationWithIcon({
          //   type: "warning",
          //   message: "Warning",
          //   description: error.response.data.message,
          // });

          makeToast(dispatch, error.response.data.message, toast.warn);
        }
      } else if (error.request) {
        console.log(
          `The request was made but not received proper response and The response received is  : ${error.request}`
        );
      } else {
        console.log(
          `Something happened in setting up the request that triggered an Error as Didn't recevied any response and Error Messages is : ${error.message} `
        );
      }
    }
  };

  const onFinish = (values) => {
    sentPasswordRestLink(values);
    console.log(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleChange = (e) => setEmail(e.target.value);

  return (
    <>
      <section className="h-screen w-screen flex justify-center items-center bg-neutral-200 relative">
        {/* {contextHolder} */}
        <div className="bg-white flex flex-col h-fit w-fit rounded-md justify-center items-center shadow-lg">
          <p className="text-xl text-center p-4 uppercase text-black">
            Forget Password
          </p>
          <Form
            ref={formRef}
            name="basic"
            className="login-form shadow-md p-4"
            initialValues={{
              email: email,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <InputField
              id="email"
              InputlabelName="Email"
              type="email"
              size="large"
              message="This Field is required"
              onChange={handleChange}
              placeholder="Please Enter your Email!"
              prefix={<UserOutlined />}
            />

            <Button
              className="login-form-button inline-block px-6 py-2.5 bg-amber-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-amber-600 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg w-full mb-3 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-150"
              type="primary"
              htmlType="submit"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
            >
              SUBMIT
            </Button>
          </Form>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;

// import React, { useRef, useState } from "react";

// import { Form } from "antd";
// import {
//   InputField,
//   SelectField,
//   DateField,
//   SelectFieldForAddress,
//   ButtonField,
// } from "../common/FormField/index";

// import dayjs from "dayjs";
// import timezone from "dayjs/plugin/timezone";
// import utc from "dayjs/plugin/utc";
// dayjs.extend(utc);
// dayjs.extend(timezone);
// dayjs.tz.setDefault("Asia/Kolkata");

// const dateFormate = "MM/DD/YYYY";

// let patientNames = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"];

// const am = [1, 2, 3, 4, 7, 8, 9, 10, 11, 12, 13, 14, 15];
// const pad = [
//   {
//     addressLine1: "addressLine1",
//     addressLine2: "addressLine2",
//     state: "state",
//     pincode: "pincode",
//   },
// ];

// const ForgotPassword = () => {
//   const formRef = useRef(null);
//   const [addflag, setAddFlag] = useState(true);
//   const [removeflag, setRemovesetFlag] = useState(false);

//   const handleSelecteName = (value) => {
//     formRef.current?.setFieldsValue({
//       medicationname: "",
//       patientaddress: "",
//     });

//     console.log(value);
//   };

//   const disabledDate = (current) => {
//     if (
//       formRef.current?.getFieldValue(["shipmentdate"]) !== null &&
//       formRef.current?.getFieldValue(["shipmentdate"]) !== undefined
//     ) {
//       const startDate = formRef.current
//         ?.getFieldValue(["shipmentdate"])
//         .format(`${"MM/DD/YYYY"}`);
//       return current && current < dayjs(startDate, "MM/DD/YYYY").endOf("day");
//     }
//   };

//   const customDate = (
//     <DateField
//       id="nextshipmentdate"
//       dateFieldLabelName="Next Shipment Date"
//       message="Choose Next Shipment Date"
//       disabledDate={disabledDate}
//       dateFormate={dateFormate}
//     />
//   );

//   const onFormLayoutChange = function (changedFields, allFields) {
//     const DateDivElement = document.getElementById("root-shipment-div");

//     const divElement = document.createElement("div");

//     const pElement = document.createElement("div");
//     //pElement.textContent = { customDate };
//     pElement.append(customDate);
//     // pElement.style.fontSize = "xx-large";

//     divElement.appendChild(pElement);

//     console.log(DateDivElement.children[1]);
//     if (allFields[2].value !== null && allFields[2].value !== undefined) {
//       if (addflag) {
//         DateDivElement.appendChild(divElement);
//         setAddFlag(false);
//         setRemovesetFlag(true);
//       }
//       // document.getElementById("nextDate").style.visibility = "visible";
//       //console.log(allFields[2].value);

//       disabledDate(allFields[2].value.format(`${"MM/DD/YYYY"}`));
//     } else {
//       // document.getElementById("nextDate").style.visibility = "hidden";
//       if (removeflag) {
//         DateDivElement.removeChild(DateDivElement.children[1]);
//         setAddFlag(true);
//         setRemovesetFlag(false);
//       }
//     }
//   };

//   const onFinish = async (values) => {
//     console.log(values);
//   };

//   return (
//     <>
//       <div className="p-4 flex flex-col">
//         <h2 className="text-xl">Shipment Add Management</h2>
//         <Form
//           ref={formRef}
//           name="control-ref"
//           labelCol={{
//             span: 2,
//           }}
//           wrapperCol={{
//             span: "100vh",
//           }}
//           layout="horizontal"
//           onFieldsChange={onFormLayoutChange}
//           onFinish={onFinish}
//           size="large"
//         >
//           {/* Patient Name And Medication Name */}
//           <div className="grid md:grid-cols-2  gap-3">
//             {/* Patient Name */}
//             <div className="flex flex-col ">
//               <SelectField
//                 id="patientname"
//                 selectFieldLabelName="Patient Name"
//                 message="Select Patient Name"
//                 handleChange={handleSelecteName}
//                 SelectFildValues={patientNames}
//               />
//             </div>
//             {/* Medication Name */}
//             <div className="flex flex-col ">
//               <SelectField
//                 id="medicationname"
//                 selectFieldLabelName="Medication Name"
//                 message="Select Medication Name"
//                 SelectFildValues={am}
//               />
//             </div>
//           </div>

//           {/* Shipment Date */}
//           <div id="root-shipment-div" className="grid md:grid-cols-2  gap-3">
//             {/* Shipment Date */}
//             <div className="flex flex-col ">
//               <DateField
//                 id="shipmentdate"
//                 dateFieldLabelName="Shipment Date"
//                 message="Choose Shipment Date"
//                 dateFormate={dateFormate}
//               />
//             </div>
//             {/* Next Shipment Date */}
//             {/* <div
//               id="nextDate"
//               className=" flex flex-col "
//               style={{ visibility: "hidden" }}
//             >
//               <DateField
//                 id="nextshipmentdate"
//                 dateFieldLabelName="Next Shipment Date"
//                 message="Choose Next Shipment Date"
//                 disabledDate={disabledDate}
//                 dateFormate={dateFormate}
//               />
//             </div> */}
//           </div>
//           {/* Track URL And Doges*/}
//           <div className="grid md:grid-cols-2  gap-3">
//             {/* Track URL */}
//             <div className="flex flex-col ">
//               <InputField
//                 id="trackurl"
//                 InputlabelName="Track URL"
//                 type="text"
//                 size="large"
//                 message="Track URL is required"
//                 placeholder="Enter the Track URL"
//               />
//             </div>
//             {/* Doges */}
//             <div className="flex flex-col ">
//               <InputField
//                 id="doges"
//                 InputlabelName="Doges"
//                 type="text"
//                 size="large"
//                 message="Doges is required"
//                 placeholder="Enter the Doges"
//               />
//             </div>
//           </div>

//           <SelectFieldForAddress
//             id="patientaddress"
//             selectFieldLabelName="Patient Address"
//             message="Select Patient Address"
//             SelectFildValues={pad}
//           />

//           <ButtonField
//             id="submit"
//             type="primary"
//             className="bg-violet-700"
//             buttonText="Submit"
//           />
//         </Form>
//       </div>
//     </>
//   );
// };

// export default ForgotPassword;
