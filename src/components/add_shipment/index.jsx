import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
//import { v4 as uuidv4 } from "uuid";

import { addShipmentdataToCommonSlice } from "../../Redux/commonSlice";
import {
  useGetShipmentMutation,
  useDeleteShipmentMutation,
} from "../../Redux/ReduxApi";
import { Form, Table, Typography, Button } from "antd";
import { Link } from "react-router-dom";

const AddShipment = () => {
  const [getShipment] = useGetShipmentMutation();
  const [deleteShipment] = useDeleteShipmentMutation();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");

  // NOTE: All patient Information
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getShipment({
          length: 40,
          search: "",
          start: 0,
        });
        // console.log(response.data.data.data);
        setData(response.data.data.data);
      } catch (error) {
        console.log("Error while Getting AllMedication: ", error);
      }
    };
    getData();
  }, [getShipment]);

  // NOTE: edit DATA
  const edit = (record) => {
    dispatch(addShipmentdataToCommonSlice({ ...record }));
    navigate(`/addshipment/updateuserData/${record._id}`);
  };
  const cancel = () => {
    setEditingKey("");
  };

  // NOTE: DeleteShipmentRow DATA
  const deleteShipmentRow = async (record) => {
    try {
      const response = await deleteShipment({
        _id: record._id,
      });
      console.log(response.data.data);
     
    } catch (error) {
      console.log("Error while Getting AllMedication: ", error);
    }
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
              //disabled={editingKey !== ""}
              onClick={() => deleteShipmentRow(record)}
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

  const editableRow = {
    color: "blue",
  };
  return (
    <>
      <div className="relative p-4 w-full h-screen z-0 flex flex-col justify-center items-center ">
        <h2 className="w-full text-xl p-4 ">Add Shipment</h2>
        <div className="w-full p-0 h-fit grid grid-cols-2">
          <div className=" justify-self-start self-center">SearchBar</div>
          <Button
            className="bg-sky-600 mr-2 justify-self-end  self-center"
            type="primary"
          >
            <Link to="/addshipment/newshipment">ADD</Link>
          </Button>
        </div>
        <Form className="inline-block " form={form} component={false}>
          <Table
            className=" w-full inline-block flex-shrink overflow-auto"
            bordered
            dataSource={data}
            //rowKey={() => uuidv4()}
            rowKey={(data) => data._id}
            inputType="text"
            columns={columns}
            size="small"
            rowClassName={editableRow}
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
