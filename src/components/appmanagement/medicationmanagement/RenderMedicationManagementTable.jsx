import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteMedication,
  deleteMedicationInfo,
} from "../../../Redux/MedicationManagementSlice";
import { toastAction } from "../../../Redux/commonSlice";

import { Form, Table, Typography, Avatar, Button, Skeleton } from "antd";

import { Input } from "antd";
import Column from "antd/es/table/Column";
import { Pagination } from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

import ButtonMI from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import { makeToast } from "../../common/appcommonfunction/Fuctions";

// import ViewMedicationDetails from "./view/index";

const RenderMedicationManagementTable = ({
  handleSearchChange,
  form,
  handleChange,
  onShowSizeChange,
  totalData,
  isFeching: loading,
  isError,
  fetchError,
  dataSource,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deletedData = useSelector(deleteMedicationInfo);

  const [open, setOpen] = useState(false);
  const [deleteRecord, setdeleteRecord] = useState({});
  useEffect(() => {
    if (deletedData?.status === 200) {
      dispatch(toastAction(deletedData?.message));
    } else {
      makeToast(dispatch, deletedData?.message, toast.info);
    }

    return () => {};
  }, [deletedData, dispatch]);

  // NOTE: Edit DATA
  const view = (record) => {
    console.log();
    navigate(`/medicationmanagement/view/`, { state: record });
    //return <ViewMedicationDetails data={record} />;
  };

  // NOTE: Delete Shipment Row
  const deleteShipmentRow = async (record) => {
    setOpen(true);
    setdeleteRecord(record);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    setOpen(false);
    console.log("DeleteRecord", deleteRecord);
    try {
      const response = dispatch(
        deleteMedication({
          _id: deleteRecord._id,
        })
      );
      if (response?.data?.status === 200) {
        makeToast(dispatch, response?.data?.message, toast.success);
      } else {
        makeToast(dispatch, response?.data?.message, toast.info);
      }
    } catch (error) {
      console.log("Error while Getting deleteMedication: ", error);
    }
  };
  // Table Columns
  const columns = [
    {
      title: "Id",
      key: "index",
      width: "8%",
      ellipsis: true,
      render: (text, record, index) => index + 1,
    },

    //Medication Name
    {
      title: <Typography.Text>Medication Name</Typography.Text>,
      dataIndex: "name",
      className: "text-clip",
      editable: true,
      key: "name",
      sorter: () => {},
    },
    //Species Name
    {
      title: <Typography.Text>Species Name</Typography.Text>,
      dataIndex: "speciesName",
      className: "text-clip",
      editable: true,
      key: "speciesName",
    },

    {
      title: <Typography.Text>Action</Typography.Text>,
      className: "text-clip",
      dataIndex: "operation",
      width: "15%",
      key: "operation",
      render: (_, record) => {
        return (
          <span className="m-2 flex flex-col lg:flex-row gap-2 justify-center">
            <Typography.Link onClick={() => view(record)}>
              <EyeOutlined
                style={{
                  fontSize: 25,
                }}
              />
            </Typography.Link>
            <Typography.Link onClick={() => deleteShipmentRow(record)}>
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
        <h2 className="w-full text-4xl p-2 ">Medication Management</h2>
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
            to="/medicationmanagement/add"
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
            rowKey={() => uuid()}
            inputType="text"
            // columns={columns}
            columns={
              loading
                ? columns.map((column) => {
                    return {
                      ...column,
                      render: function renderPlaceholder() {
                        return (
                          <Skeleton
                            key={column.dataIndex}
                            title={true}
                            paragraph={false}
                            active={true}
                          />
                        );
                      },
                    };
                  })
                : columns
            }
            size="small"
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
              className="h-fit pr-12  pl-12 gap-2 flex flex-col place-items-center"
              id="alert-dialog-description"
            >
              <Avatar
                className="stroke-2"
                style={{
                  verticalAlign: "middle",
                  background: "white",
                  color: "red",
                  margin: "0px",
                  padding: "0px",
                }}
                size={{
                  xs: 30,
                  sm: 64,
                  md: 64,
                  lg: 64,
                  xl: 80,
                  xxl: 100,
                }}
                icon={<CloseCircleOutlined />}
              ></Avatar>
              Are you sure want to delete this medication?
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

export default RenderMedicationManagementTable;
