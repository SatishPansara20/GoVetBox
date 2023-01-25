import React, { useState } from "react";
import { useDispatch } from "react-redux";
//import { useSelector } from "react-redux";
import {
  addShipmentdataToCommonSlice,
  //updateShipmentPayload,
} from "../../Redux/commonSlice";
import {
  useDeleteShipmentMutation,
  useGetShipmentMutation,
} from "../../Redux/ReduxApi";
import { Form, Table, Typography, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";

import { Input } from "antd";
import Column from "antd/es/table/Column";
import { Pagination } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import ButtonMI from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { toast } from "react-toastify";
import { makeToast } from "../common/appcommonfunction/Fuctions";

const RenderTable = ({
  handleSearchChange,
  form,
  handleChange,
  onShowSizeChange,
  totalData,
  shipmentPayload,
  sendData,
  isFeching: loading,
  isError,
  fetchError,
  dataSource,
}) => {
  const dispatch = useDispatch();
  const [deleteShipment] = useDeleteShipmentMutation();
  const [getShipment] = useGetShipmentMutation();

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [deleteRecord, setdeleteRecord] = useState({});

  // NOTE: Edit DATA
  const edit = (record) => {
    //dispatch(addShipmentdataToCommonSlice({ ...record }));
    navigate(`/addshipment/updateuserData/${record._id}`);
  };

  // NOTE: Delete Shipment Row
  const deleteShipmentRow = async (record) => {
    setOpen(true);
    setdeleteRecord(record);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = async () => {
    setOpen(false);
    try {
      const response = await deleteShipment({
        _id: deleteRecord._id,
      });
      if (response.data.status === 200) {
        makeToast(dispatch, response.data.message, toast.success);
      } else {
        makeToast(dispatch, response.data.message, toast.info);
      }
    } catch (error) {
      console.log("Error while Getting AllMedication: ", error);
    }

    try {
      const response = await getShipment(shipmentPayload);

      sendData(response.data.data.recordsTotal, response.data.data.data);
      dispatch(addShipmentdataToCommonSlice( response.data.data.data));
    } catch (error) {
      console.log("Error while Getting getShipment: ", error);
    }
  };
  // Table Columns
  const columns = [
    { title: "Id", key: "index", render: (text, record, index) => index + 1 },
    {
      // title: "Patient Name",
      title: <Typography.Text>Patient Name</Typography.Text>,
      className: "text-clip",
      dataIndex: "patinetName",
      editable: true,
      key: "patinetName",
      // filteredValue: filteredInfo.name || null,
      // onFilter: (value, record) => record.name.includes(value),
      sorter: () => {},
      //sortOrder: sortedInfo.columnKey === 'patinetName' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: <Typography.Text>Username</Typography.Text>,
      dataIndex: "ownerName",
      className: "text-clip",
      editable: true,
      key: "ownerName",
      sorter: () => {},
    },
    {
      title: <Typography.Text>Medicaiton Name</Typography.Text>,
      dataIndex: "medicationName",
      className: "text-clip",
      editable: true,
      key: "medicationName",
      sorter: () => {},
    },
    {
      title: <Typography.Text>Shipment Date</Typography.Text>,
      className: "text-clip",
      dataIndex: "deliveryDate",
      editable: true,
      key: "deliveryDate",
      sorter: () => {},
    },
    {
      title: <Typography.Text>Next Shipment Date</Typography.Text>,
      dataIndex: "nextDeliveryDate",
      className: "text-clip",
      editable: true,
      key: "nextDeliveryDate",
      sorter: () => {},
    },
    {
      title: <Typography.Text>Track URL</Typography.Text>,
      dataIndex: "trackUrl",
      className: "text-clip",
      editable: true,
      key: "trackUrl",
      sorter: () => {},
    },
    {
      title: <Typography.Text>Dosage</Typography.Text>,
      dataIndex: "dosage",
      className: "text-clip",
      editable: true,
      key: "dosage",
      sorter: () => {},
    },
    {
      title: <Typography.Text>Address</Typography.Text>,
      className: "text-clip",
      dataIndex: "addressLine",
      editable: true,
      key: "addressLine",

      sorter: () => {},
    },

    {
      title: <Typography.Text>Action</Typography.Text>,
      className: "text-clip",
      dataIndex: "operation",
      key: "operation",
      render: (_, record) => {
        return (
          <span className="m-2 flex flex-col lg:flex-row gap-2">
            <Typography.Link
              onClick={() => edit(record)}
              style={{
                marginRight: 8,
              }}
            >
              <EditOutlined
                style={{
                  fontSize: 25,
                }}
              />
            </Typography.Link>

            <Typography.Link
              onClick={() => deleteShipmentRow(record)}
              style={{
                marginRight: 8,
              }}
            >
              <DeleteOutlined
                style={{
                  fontSize: 25,
                }}
              />
            </Typography.Link>
          </span>
        );
      },
    },
  ];

  return (
    <>
      <div className="relative p-2 w-full h-full z-0 flex flex-col justify-center items-center  ">
        <h2 className="w-full text-4xl p-2 ">Add Shipment</h2>
        <div className="w-full p-2 mb-1 h-fit gap-2 grid grid-cols-1 sm:grid-cols-2">
          <div className=" justify-self-start self-center">
            <Input
              placeholder="Search"
              allowClear
              size="large"
              onChange={handleSearchChange}
            />
          </div>
          <Link
            className="justify-self-start self-center  sm:justify-self-end "
            to="/addshipment/newshipment"
          >
            <Button className="bg-sky-600" type="primary">
              ADD
            </Button>
          </Link>
        </div>

        <Form className="inline-block p-2" form={form} component={false}>
          <Table
            className=" w-full inline-block flex-shrink overflow-hidden"
            bordered
            loading={loading}
            dataSource={isError ? console.log(fetchError) : dataSource}
            inputType="text"
            columns={columns}
            size="large"
            pagination={false}
            onChange={handleChange}
          />
          <Column></Column>
          <Pagination
            showSizeChanger
            onChange={onShowSizeChange}
            defaultCurrent={1}
            total={totalData}
            pageSizeOptions={Array(Math.ceil(totalData / 10))
              .fill()
              .map((_, index) => (index + 1) * 10)}
          />
        </Form>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete"}</DialogTitle>
          <DialogContent>
            <DialogContentText
              className="h-fit p-2 gap-2 flex flex-col place-items-center"
              id="alert-dialog-description"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Are you sure want to delete this shipment?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <ButtonMI onClick={handleClose}>Cancle</ButtonMI>
            <ButtonMI onClick={handleAgree} autoFocus>
              Delete
            </ButtonMI>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default RenderTable;
