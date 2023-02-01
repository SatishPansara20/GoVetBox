import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { editPatientInfo } from "../../Redux/PatientManagementSlice";
import { toastAction } from "../../Redux/commonSlice";

import { Avatar, Form, Table, Typography } from "antd";

import { Input } from "antd";
import Column from "antd/es/table/Column";
import { Pagination } from "antd";
import { EyeOutlined, CloseCircleOutlined } from "@ant-design/icons";

import { toast } from "react-toastify";
import { makeToast } from "../common/appcommonfunction/Fuctions";

import { ImageField } from "../common/FormField/index";

import ViewPatientDetails from "./view/index";

import Dialog from "@mui/material/Dialog";

import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";

let dialogBoxTitle;

let dialogBoxContent;

const RenderPatientManagementTable = ({
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
  const editPatientData = useSelector(editPatientInfo);

  const [open, setOpen] = useState(false);

  //Tost Effect
  useEffect(() => {
    if (editPatientData?.status === 200) {
      dispatch(toastAction(editPatientData?.message));
    } else {
      makeToast(dispatch, editPatientData?.message, toast.info);
    }

    return () => {};
  }, [editPatientData, dispatch]);

  const setData = (data) => {
    setOpen(data);
  };

  // NOTE: Edit DATA
  const edit = (record) => {
    setOpen(true);
    dialogBoxContent = <ViewPatientDetails data={record} setData={setData} />;
  };

  // Table Columns
  const columns = [
    {
      title: "Id",
      key: "index",
      ellipsis: true,
      render: (text, record, index) => index + 1,
    },

    // title: "Patient Image",
    {
      title: <Typography.Text>Patient Image</Typography.Text>,
      className: "text-clip",
      dataIndex: "image",
      editable: true,
      key: "image",

      // filteredValue: filteredInfo.name || null,
      // onFilter: (value, record) => record.name.includes(value),
      sorter: () => {},

      //sortOrder: sortedInfo.columnKey === 'firstName' ? sortedInfo.order : null,
      render: (image) => (
        <ImageField
          id="image"
          className="flex flex-col items-center justify-center mb-2"
          imageURL={image}
          width={35}
          alt="User Look"
        />
      ),
    },
    //Breed Name
    {
      title: <Typography.Text>Breed Name</Typography.Text>,
      dataIndex: "breedName",
      className: "text-clip",
      editable: true,
      key: "breedName",
      sorter: () => {},
    },
    //Mixed ?
    {
      title: <Typography.Text>Mixed ?</Typography.Text>,
      dataIndex: "isMixBreed",
      className: "text-clip",
      editable: true,
      key: "isMixBreed",
      sorter: () => {},
    },
    //Patient Name
    {
      title: <Typography.Text>Patient Name</Typography.Text>,
      className: "text-clip",
      dataIndex: "name",
      editable: true,
      key: "name",
      sorter: () => {},
    },
    //Username
    {
      title: <Typography.Text>Username</Typography.Text>,
      className: "text-clip",
      dataIndex: "ownerName",
      editable: true,
      key: "ownerName",
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
                margin: "0px",
                padding: "0px",
                display: "flex",
                flexBasis: "auto",
                flexGrow: 1,
                flexShrink: 0,
                justifyContent: "center",
              }}
            >
              <EyeOutlined
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

  const handleClose = () => {
    setOpen(false);
  };

  dialogBoxTitle = (
    <div className="w-full p-2 mb-1 h-fit gap-2 grid grid-cols-1 sm:grid-cols-2">
      <div className=" justify-self-start self-center">
        <p>VIEW</p>
      </div>
      <button
        onClick={handleClose}
        className="stroke-2 bg-white justify-self-start self-center  sm:justify-self-end "
      >
        <Avatar
          className="stroke-2"
          style={{
            verticalAlign: "middle",
            background: "white",
            color: "red",
            margin: "0px",
          }}
          size={64}
          icon={<CloseCircleOutlined />}
        />
      </button>
    </div>
  );

  return (
    <>
      <div className="relative p-2 w-full h-full z-0 flex flex-col justify-center items-center  ">
        <h2 className="w-full text-4xl p-2 ">Patient Management</h2>
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
            className="w-full inline-block flex-shrink overflow-hidden"
            bordered
            loading={loading}
            dataSource={isError ? console.log(fetchError) : dataSource}
            inputType="text"
            columns={columns}
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
          className="z-10"
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{dialogBoxTitle}</DialogTitle>
          <DialogContent>
            <div
              className="h-fit pr-12  pl-12 gap-2 flex flex-col place-items-center"
              id="alert-dialog-description"
            >
              {dialogBoxContent}
            </div>
          </DialogContent>
          {/* <DialogActions className="flex bg-black items-center justify-center ">
            <ButtonMI onClick={handleClose} autoFocus>
              Submit
            </ButtonMI>
          </DialogActions> */}
        </Dialog>
      </div>
    </>
  );
};

export default RenderPatientManagementTable;
