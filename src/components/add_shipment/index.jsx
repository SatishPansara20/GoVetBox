import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { addShipmentdataToCommonSlice } from "../../Redux/commonSlice";

import { Form, Table, Typography, Button, Col, Row } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

const getShipmentURL = "http://202.131.117.92:7155/admin_v1/api/getShipment";

const AddShipment = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");

  const userTokens = localStorage.getItem("authTokenGoBox");

  // NOTE: All patient Information
  useEffect(() => {
    if ((userTokens !== undefined) | null) {
      const config = {
        headers: {
          Authorization: `${JSON.parse(userTokens)}`,
        },
      };
      axios
        .post(
          getShipmentURL,
          {
            length: 30,
            search: "",
            start: 0,
          },
          config
        )
        .then((response) => {
          setData(response.data.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userTokens]);

  // NOTE: edit DATA
  const edit = (record) => {
    dispatch(addShipmentdataToCommonSlice({ ...record }));
    navigate(`/addshipment/updateuserData/${record._id}`);
  };
  const cancel = () => {
    setEditingKey("");
  };

  //responsive: ["xxl", "xl", "lg", "md", "sm", "xs"],
  const columns = [
    {
      title: "Patient Name",
      dataIndex: "patinetName",
      responsive: ["xxl", "xl", "lg", "md", "sm", "xs"],
      editable: true,
      key: "patinetName",
    },
    {
      title: "Username",
      dataIndex: "ownerName",
      responsive: ["xxl", "xl", "lg", "md", "sm", "xs"],
      editable: true,
      key: "ownerName",
    },
    {
      title: "Medicaiton Name",
      dataIndex: "medicationName",
      responsive: ["xxl", "xl", "lg", "md", "sm", "xs"],
      editable: true,
      key: "medicationName",
    },
    {
      title: "Shipment Date",
      dataIndex: "deliveryDate",
      responsive: ["xxl", "xl", "lg", "md", "sm", "xs"],
      editable: true,
      key: "deliveryDate",
    },
    {
      title: "Next Shipment Date",
      dataIndex: "nextDeliveryDate",
      responsive: ["xxl", "xl", "lg", "md", "sm", "xs"],
      editable: true,
      key: "nextDeliveryDate",
    },
    {
      title: "Track URL",
      dataIndex: "trackUrl",
      responsive: ["xxl", "xl", "lg", "md", "sm", "xs"],
      editable: true,
      key: "trackUrl",
    },
    {
      title: "Dosage",
      dataIndex: "dosage",
      responsive: ["xxl", "xl", "lg", "md", "sm", "xs"],
      editable: true,
      key: "dosage",
    },
    {
      title: "Address",
      dataIndex: "addressLine",
      responsive: ["xxl", "xl", "lg", "md", "sm", "xs"],
      editable: true,
      key: "addressLine",
    },

    {
      title: "Action",
      dataIndex: "operation",
      responsive: ["xxl", "xl", "lg", "md", "sm", "xs"],
      key: "operation",
      render: (_, record) => {
        return (
          <span>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
              style={{
                marginRight: 8,
              }}
            >
              Edit
            </Typography.Link>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
              style={{
                marginRight: 8,
              }}
            >
              Delete
            </Typography.Link>
          </span>
        );
      },
    },
  ];

  return (
    <>
      <div className="w-full z-0 flex flex-col justify-center items-center">
        <h2 className="text-xl p-4 ">Add Shipment</h2>
        <div className="grid grid-cols-2">
          <Row>
            <Col span={18}>
              <div>SearchBar</div>
            </Col>
            <Col span={6}>
              <Row justify="end">
                <Button className="bg-sky-600 mr-2" type="primary">
                  <Link to="/addshipment/newshipment">ADD</Link>
                </Button>
              </Row>
            </Col>
          </Row>
        </div>
        <Form form={form} component={false}>
          <Table
            className="bg-neutral-400 flex flex-shrink"
            bordered
            dataSource={data}
            inputType="text"
            columns={columns}
            size="small"
            rowClassName="editable-row"
            pagination={{
              onChange: cancel,
            }}
          />
        </Form>
      </div>
    </>
  );
};

export default AddShipment;
