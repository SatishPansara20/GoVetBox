import React from "react";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";

import { toast } from "react-toastify";

import {
  forgotPasswordAction,
  forgotPasswordData,
} from "../../Redux/AuthSlice";
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
  const response = useSelector(forgotPasswordData);

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
    dispatch(forgotPasswordAction({ email: values.email }))
      .then(() => {
        //  console.log(response);
        if (response.status === 200) {
          makeToast(
            dispatch,
            response?.message || "Please try agian!",
            toast.success
          );
        } else {
          makeToast(dispatch, "Please try agian!", toast.warn);
        }
        formRef?.current.setFieldsValue({
          email: "",
        });
      })
      .catch((error) => {
        console.log(error);
        if (error?.status === 400) {
          makeToast(
            dispatch,
            error?.message || "Please try agian!",
            toast.warn
          );
        } else if (error.request) {
          console.log(
            `The request was made but not received proper response and The response received is  : ${error.request}`
          );
        } else {
          console.log(
            `Something happened in setting up the request that triggered an Error as Didn't recevied any response and Error Messages is : ${error.message} `
          );
        }
      });
  };

  const onFinish = (values) => {
    sentPasswordRestLink(values);
    //console.log(values);
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
