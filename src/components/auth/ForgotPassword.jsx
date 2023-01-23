import React from "react";
import { useState, useRef } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { UserOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";

import { toast } from "react-toastify";

import { FORGOT_PASSWORD } from "../../constants/index";
import { InputField } from "../common/FormField";
import { makeToast } from "../common/appcommonfunction/Fuctions";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Kolkata");

const ForgotPassword = () => {
  //  const [api, contextHolder] = notification.useNotification();
  const dispatch = useDispatch();

  const formRef = useRef();
  const [email, setEmail] = useState("");

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

            <InputField
              id="trackurl"
              InputlabelName="Track URL"
              type="text"
              size="large"
              message="Track URL is required"
              placeholder="Enter the Track URL"
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
