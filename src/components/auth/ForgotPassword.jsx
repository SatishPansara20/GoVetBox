import React from "react";
import axios from "axios";
import { UserOutlined } from "@ant-design/icons";
import { Button, Input, Alert, Form } from "antd";

const ForgotPassword = () => {
  const [email, setEmail] = React.useState("admin.gvb@yopmail.com");

  const [alertData, setAlertData] = React.useState({
    type: "",
    message: "",
    description: "",
  });

  const alterBox = (
    <Alert
    className="absolute top-0 left-0 z-50 flex items-center justify-center"
      type="success"
      message="Success"
      description={alertData.description}
      showIcon
    />
  );

  const onFinish = (values) => {
    console.log(values);

    //Axios login

    axios
      .post("http://202.131.117.92:7155/admin_v1/auth/forgotPassword", {
        email: values.email,
      })
      .then((res) => {
        if (res.data.status === 200) {
         
        
          setAlertData({
            type: "success",
            message: "Success",
            description: res.data.message,
          });
        } else {
          setAlertData({
            type: "warning",
            message: "Warning",
            description: res.data.message,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <section className="h-screen w-screen bg-slate-200 relative">
         
          {alterBox}
        

        <div className="bg-white flex h-full justify-center items-center shadow-lg">
          <Form
            name="basic"
            className="login-form shadow-md p-4"
            initialValues={{
              email: email,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please Enter your Email!",
                },
              ]}
            >
              <Input
                type="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
                size="large"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="large size"
                prefix={<UserOutlined />}
              />
            </Form.Item>

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

