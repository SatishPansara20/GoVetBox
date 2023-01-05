import React from "react";
// import { useState } from "react";

// import { LockOutlined, UserOutlined } from "@ant-design/icons";
// import { Button, Checkbox, Form, Input } from "antd";

const LoginPage = () => {
  // const [loadings, setLoadings] = useState([]);

  // const enterLoading = (index) => {
  //   setLoadings((prevLoadings) => {
  //     const newLoadings = [...prevLoadings];
  //     newLoadings[index] = true;
  //     return newLoadings;
  //   });
  //   setTimeout(() => {
  //     setLoadings((prevLoadings) => {
  //       const newLoadings = [...prevLoadings];
  //       newLoadings[index] = false;
  //       return newLoadings;
  //     });
  //   }, 6000);
  // };

  // const onFinish = (values) => {
  //   console.log("Received values of form: ", values);
  // };

  return (
    <>
      {/* <section className="h-screen gradient-form bg-gray-200">
        <div className="container h-screen">
          <div className="flex justify-center items-center flex-wrap w-screen h-screen g-6 text-gray-800">
            <div
              className="flex items-center shadow-lg rounded-lg"
              style={{
                background:
                  "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
              }}
            >
              <div className="text-white px-4 md:p-12 md:mx-6">
                <div className=" px-4 md:px-0">
                  <div className="md:px-12 md:mx-6">
                    <div className="text-center">
                      <img
                        className="mx-auto w-48"
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                        // src="./Login_Top.jpg"
                        alt="logo"
                      />
                      <h4 className="text-xl font-semibold mt-1 mb-12 pb-1">
                        Welcome
                      </h4>
                    </div>
                    <Form
                      name="normal_login"
                      className="login-form"
                      initialValues={{
                        remember: true,
                      }}
                      onFinish={onFinish}
                    >
                      <Form.Item
                        name="Email"
                        className="text-black"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Email!",
                          },
                        ]}
                      >
                        <Input
                          prefix={
                            <UserOutlined className="site-form-item-icon" />
                          }
                          type="email"
                          placeholder="Email Address"
                        />
                      </Form.Item>

                      <Form.Item
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Password!",
                          },
                        ]}
                      >
                        <Input
                          prefix={
                            <LockOutlined className="site-form-item-icon" />
                          }
                          type="password"
                          placeholder="Password"
                        />
                      </Form.Item>

                      <Form.Item>
                        <div className="flex">
                          <Form.Item
                            className="justify-self-start"
                            name="remember"
                            valuePropName="checked"
                            noStyle
                          >
                            <Checkbox>Remember me</Checkbox>
                          </Form.Item>

                          <a
                            className="login-form-forgot flex-grow justify-self-end text-end underline hover:text-white hover:underline
                            "
                            href="/"
                          >
                            Forgot password?
                          </a>
                        </div>
                      </Form.Item>

                      <Form.Item>
                        <div className="text-center pt-1 mb-12 pb-1">
                          <Button
                            className="login-form-button inline-block px-6 py-2.5 bg-amber-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-amber-600 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg w-full mb-3 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-150"
                            type="primary"
                            htmlType="submit"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                          >
                            Log in
                          </Button>
                        </div>
                        <div className="flex items-center justify-between pb-6">
                          <p className="mb-0 mr-2">Don't have an account?</p>
                          <Button
                            type="button"
                            className="inline-block px-6 py-2 bg-neutral-400 border-2 text-white font-medium text-xs leading-tight uppercase rounded focus:outline-none focus:ring-0 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300"
                            loading={loadings[0]}
                            onClick={() => enterLoading(0)}
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                          >
                            SIGN UP
                          </Button>
                        </div>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default LoginPage;
