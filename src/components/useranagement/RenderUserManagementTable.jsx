import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteUser,
  deleteUserInfo,
  blockUnblockUser,
  blockUnblockUserInfo,
} from "../../Redux/UserManagementSlice";
import { toastAction } from "../../Redux/commonSlice";

import { Form, Table, Typography, Avatar } from "antd";
import { useNavigate } from "react-router-dom";

import { Input } from "antd";
import Column from "antd/es/table/Column";
import { Pagination } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  LockOutlined,
  //UnlockOutlined,
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
import { makeToast } from "../common/appcommonfunction/Fuctions";

const RenderTable = ({
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
  const deletedData = useSelector(deleteUserInfo);
  const blockUnblockUserData = useSelector(blockUnblockUserInfo);

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [deleteAndBlockFlag, setDeleteAndBlockFlag] = useState({
    deleteFlag: false,
    blockFlag: false,
  });
  const [deleteRecord, setdeleteRecord] = useState({});
  const [blockRecord, setBlockRecord] = useState({});
  const [dialogBoxTitle, setDialogBoxTitle] = useState("");
  const [dialogBoxContent, setDialogBoxContent] = useState("");
  const [dialogBoxContentIcon, setDialogBoxContentIcon] = useState(undefined);

  useEffect(() => {
    if (deletedData?.status === 200) {
      dispatch(toastAction(deletedData?.message));
    } else if (blockUnblockUserData?.status === 200) {
      dispatch(toastAction(blockUnblockUserData?.message));
    } else {
      makeToast(dispatch, deletedData?.message, toast.info);
      makeToast(dispatch, blockUnblockUserData?.message, toast.info);
    }

    return () => {};
  }, [deletedData, blockUnblockUserData, dispatch]);

  // NOTE: Edit DATA
  const edit = (record) => {
    navigate(`/usermanagement/edit/${record._id}`);
  };

  // NOTE: Delete User
  const deleteShipmentRow = async (record) => {
    setDeleteAndBlockFlag({
      ...deleteAndBlockFlag,
      deleteFlag: true,
      blockFlag: false,
    });
    setDialogBoxTitle("Delete");
    setDialogBoxContent("Are you sure want to delete this user?");
    setDialogBoxContentIcon(<CloseCircleOutlined />);
    setOpen(true);
    setdeleteRecord(record);
  };

  // NOTE: Block User
  const blockORUnblock = async (record) => {
    setDeleteAndBlockFlag({
      ...deleteAndBlockFlag,
      deleteFlag: false,
      blockFlag: true,
    });
    setDialogBoxTitle("Block");
    setDialogBoxContent("Are you sure want to Block user?");
    setDialogBoxContentIcon(<LockOutlined />);
    setOpen(true);
    setBlockRecord(record);
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteAndBlockFlag({
      ...deleteAndBlockFlag,
      deleteFlag: false,
      blockFlag: false,
    });
  };

  const handleAgree = async () => {
    setOpen(false);
    //deleteUser
    if (deleteAndBlockFlag.deleteFlag) {
      try {
        dispatch(
          deleteUser({
            _id: deleteRecord._id,
          })
        );
      } catch (error) {
        console.log("Error while Getting AllMedication: ", error);
      }

      //blockUnblockUser
    } else if (deleteAndBlockFlag.blockFlag) {
      try {
        dispatch(
          blockUnblockUser({
            _id: blockRecord._id,
          })
        );
      } catch (error) {
        console.log("Error while Getting AllMedication: ", error);
      }
    }
  };
  // Table Columns
  const columns = [
    {
      title: "Id",
      key: "index",
      ellipsis: true,
      render: (text, record, index) => index + 1,
    },
    {
      // title: "Patient Name",
      title: <Typography.Text>First Name</Typography.Text>,
      className: "text-clip",
      dataIndex: "firstName",
      editable: true,
      key: "firstName",
      // filteredValue: filteredInfo.name || null,
      // onFilter: (value, record) => record.name.includes(value),
      sorter: () => {},
      //sortOrder: sortedInfo.columnKey === 'firstName' ? sortedInfo.order : null,
    },
    {
      title: <Typography.Text>Last Name</Typography.Text>,
      dataIndex: "lastName",
      className: "text-clip",
      editable: true,
      key: "lastName",
      sorter: () => {},
    },
    {
      title: <Typography.Text>Email</Typography.Text>,
      dataIndex: "email",
      className: "text-clip",
      editable: true,
      key: "email",
      sorter: () => {},
    },
    {
      title: <Typography.Text>Phone Number</Typography.Text>,
      className: "text-clip",
      dataIndex: "contact",
      editable: true,
      key: "contact",
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

            <Typography.Link
              onClick={() => blockORUnblock(record)}
              style={{
                marginRight: 8,
              }}
            >
              <LockOutlined
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
        <h2 className="w-full text-4xl p-2 ">User Management</h2>
        <div className="w-full p-2 mb-1 h-fit gap-2 grid grid-cols-1 sm:grid-cols-2">
          <div className=" justify-self-start self-center">
            <Input
              placeholder="Search"
              allowClear
              size="large"
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <Form className="inline-block p-2" form={form} component={false}>
          <Table
            className=" w-full inline-block flex-shrink overflow-hidden"
            bordered
            loading={loading}
            dataSource={isError ? console.log(fetchError) : dataSource}
            rowKey={() => uuid()}
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
          <DialogTitle id="alert-dialog-title">{dialogBoxTitle}</DialogTitle>
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
                icon={dialogBoxContentIcon}
              ></Avatar>
              {dialogBoxContent}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <ButtonMI onClick={handleClose}>Cancle</ButtonMI>
            <ButtonMI onClick={handleAgree} autoFocus>
              {dialogBoxTitle}
            </ButtonMI>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default RenderTable;
