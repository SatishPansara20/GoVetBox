import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import {
  useGetShipmentMutation,
  useDeleteShipmentMutation,
} from "../../Redux/ReduxApi";
import { useSelector, useDispatch } from "react-redux";
import { toastData } from "../../Redux/commonSlice";

import { Form, Table, Typography, Button } from "antd";
import { Link } from "react-router-dom";

import { Input } from "antd";
import Column from "antd/es/table/Column";
import { Pagination } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { v4 as uuid } from "uuid";

import ButtonMI from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { toast } from "react-toastify";
import { makeToast } from "../toast/fuctions";

let dataSource = [];

const AddShipment = () => {
  const receivedToastData = useSelector(toastData);
  const dispatch = useDispatch();

  // const [getShipment, isLoading, isSuccess, isUninitialized] =
  //   useGetShipmentMutation();

  const [getShipment] = useGetShipmentMutation();
  const [deleteShipment] = useDeleteShipmentMutation();

  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [deleteRecord, setdeleteRecord] = useState({});
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [shipmentPayload, setShipmentPayload] = useState({
    length: 10,
    search: "",
    start: 0,
    sort: "",
    dir: "",
  });

  // NOTE: All patient Information
  useEffect(() => {
    const getData = async () => {
      //Checking start value
      if (shipmentPayload.start < 0) {
        setShipmentPayload({
          ...shipmentPayload,
          start: 0,
        });
      }
      if (
        shipmentPayload.sort !== "" &&
        shipmentPayload.sort !== undefined &&
        shipmentPayload.sort !== null &&
        shipmentPayload.dir !== "" &&
        shipmentPayload.dir !== undefined &&
        shipmentPayload.dir !== null
      ) {
        try {
          const response = await getShipment(shipmentPayload, {
            refetchOnMountOrArgChange: true,
          });

          dataSource = [];

          setData(response.data.data.data);
          setTotalData(response.data.data.recordsTotal);
        } catch (error) {
          console.log("Error while Getting getShipment: ", error);
        }
      } else {
        try {
          const response = await getShipment({
            length: shipmentPayload.length,
            search: shipmentPayload.search,
            start: shipmentPayload.start,
          });

          if (response.data.status === 200) {
            dataSource = [];
            setData(response.data.data.data);
            setTotalData(response.data.data.recordsTotal);
          } else {
            alert(response);
          }
        } catch (error) {
          console.log("Error while Getting getShipment: ", error);
        }
      }
    };
    if (receivedToastData !== "")
      makeToast(dispatch, receivedToastData, toast.success);
    getData();
  }, [getShipment, shipmentPayload, dispatch, receivedToastData]);

  if (data.length > 0) {
    //console.log(data.length);
    data.map((shipment) => {
      return dataSource.push({
        ...shipment,
        key: uuid(),
        deliveryDate: dayjs(shipment.deliveryDate).format("DD-MM-YYYY"),
        nextDeliveryDate: dayjs(shipment.nextDeliveryDate).format("DD-MM-YYYY"),
      });
    });
  }

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

  const handleChange = (pagination, filters, sorter) => {
    // order:"ascend"  order:"descend" sorter.columnKey
    if (sorter.order === "ascend") {
      setShipmentPayload({
        ...shipmentPayload,
        sort: sorter.columnKey, //asc  or desc
        dir: "asc",
      });
    } else {
      setShipmentPayload({
        ...shipmentPayload,
        sort: sorter.columnKey, //asc  or desc
        dir: "desc",
      });
    }
  };

  const handleSearchChange = (e) => {
    setShipmentPayload({ ...shipmentPayload, search: e.target.value });
  };

  const onShowSizeChange = (page, pageSize) => {
    setShipmentPayload({
      ...shipmentPayload,
      length: Number(pageSize),
      start: Number(page * 10 - 10),
    });
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
        // toast.success(response.data.message, {
        //   position: "top-right",
        //   onClose: () => {
        //     dispatch(toastAction(""));
        //   },
        //   autoClose: 2000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        // });
      } else {
        makeToast(dispatch, response.data.message, toast.info);
        // toast.info(response.data.message, {
        //   position: "top-right",
        //   onClose: () => {
        //     dispatch(toastAction(""));
        //   },
        //   autoClose: 2000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        // });
      }
    } catch (error) {
      console.log("Error while Getting AllMedication: ", error);
    }

    try {
      const response = await getShipment(shipmentPayload);
      dataSource = [];
      setData(response.data.data.data);
      setTotalData(response.data.data.recordsTotal);
    } catch (error) {
      console.log("Error while Getting getShipment: ", error);
    }
  };

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
          <Button
            className="bg-sky-600 justify-self-start self-center  sm:justify-self-end "
            type="primary"
          >
            <Link to="/addshipment/newshipment">ADD</Link>
          </Button>
        </div>
        <Form className="inline-block p-2" form={form} component={false}>
          <Table
            className=" w-full inline-block flex-shrink overflow-hidden"
            bordered
            dataSource={dataSource}
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
            <DialogContentText id="alert-dialog-description">
              <div className="h-fit p-2 gap-2 flex flex-col place-items-center">
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
                <p>Are you sure want to delete this shipment?</p>
              </div>
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

export default AddShipment;
