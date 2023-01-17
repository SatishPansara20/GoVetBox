import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import {
  useGetShipmentMutation,
  useDeleteShipmentMutation,
} from "../../Redux/ReduxApi";
import { Form, Table, Typography, Button } from "antd";
import { Link } from "react-router-dom";

import { Input } from "antd";
import { Pagination } from "antd";
import { v4 as uuid } from "uuid";
let dataSource = [];

const AddShipment = () => {
  const [getShipment] = useGetShipmentMutation();
  const [deleteShipment] = useDeleteShipmentMutation();

  const navigate = useNavigate();

  const [form] = Form.useForm();
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
      if (
        shipmentPayload.sort !== "" &&
        shipmentPayload.sort !== undefined &&
        shipmentPayload.sort !== null &&
        shipmentPayload.dir !== "" &&
        shipmentPayload.dir !== undefined &&
        shipmentPayload.dir !== null
      ) {
        try {
          console.log("1", shipmentPayload);
          const response = await getShipment(shipmentPayload);
          dataSource = [];

          setData(response.data.data.data);
          setTotalData(response.data.data.recordsTotal);
        } catch (error) {
          console.log("Error while Getting getShipment: ", error);
        }
      } else {
        try {
          console.log("2", shipmentPayload);
          const response = await getShipment({
            length: shipmentPayload.length,
            search: shipmentPayload.search,
            start: shipmentPayload.start,
          });
          dataSource = [];
          setData(response.data.data.data);
          setTotalData(response.data.data.recordsTotal);
        } catch (error) {
          console.log("Error while Getting getShipment: ", error);
        }
      }
    };
    getData();
  }, [getShipment, shipmentPayload]);

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

    //console.log(dataSource);
  }

  // NOTE: edit DATA
  const edit = (record) => {
    //dispatch(addShipmentdataToCommonSlice({ ...record }));
    navigate(`/addshipment/updateuserData/${record._id}`);
  };
  // const cancel = () => {
  //   setEditingKey("");
  // };

  // NOTE: DeleteShipmentRow DATA
  const deleteShipmentRow = async (record) => {
    try {
      await deleteShipment({
        _id: record._id,
      });
    } catch (error) {
      console.log("Error while Getting AllMedication: ", error);
    }
  };

  //responsive: ["xxl", "xl", "lg", "md", "sm", "xs"],
  const columns = [
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
      // title: "Next Shipment Date",
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
          <span>
            <Typography.Link
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

  return (
    <>
      <div className="relative p-2 w-full h-full z-0 flex flex-col justify-center items-center ">
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
          <Pagination
            showSizeChanger
            onChange={onShowSizeChange}
            defaultCurrent={1}
            total={totalData}
            pageSizeOptions={[10, 20, 30, 40]}
          />
        </Form>
      </div>
    </>
  );
};

export default AddShipment;

//rowKey={(data) => data._id}

// pagination={{
//   // position: ["bottomLeft"],

//   pageSize: 20,
//   //pageSizeOptions: [10, 20, 30, 40],
//   responsive: true,
//   defaultCurrent: 1,
//   total: 18,
//   showSizeChanger: true,
//   onChange: onShowSizeChange,
// }}

// setData([
//   {
//     _id: "63c53485b3ecf274fc709002",
//     patinetName: "Shane",
//     ownerName: "Jay Rana",
//     medicationName: "Hello Medication",
//     deliveryDate: "2022-11-10T18:30:00Z",
//     nextDeliveryDate: "2022-11-10T18:30:00Z",
//     trackUrl: "test.com",
//     dosage: "2",
//     addressLine: "Nnnn,,Nn,California,12344",
//     addressLine1: "Nnnn",
//     pincode: "12344",
//     addressLine2: "",
//     city: "Nn",
//     state: "California",
//   },
//   {
//     _id: "63c159ceb3ecf274fc708fff",
//     patinetName: "Mask",
//     ownerName: "Rohan Makwana",
//     medicationName: "Meta 01",
//     deliveryDate: "2023-01-05T11:21:59Z",
//     nextDeliveryDate: "2023-01-05T11:21:59Z",
//     trackUrl: "test.abc.com",
//     dosage: "2",
//     addressLine: "test,address,Ahmedabad ,Delaware,12345",
//     addressLine1: "test",
//     pincode: "12345",
//     addressLine2: "address",
//     city: "Ahmedabad ",
//     state: "Delaware",
//   },
//   {
//     _id: "63c1404eb3ecf274fc708ffe",
//     patinetName: "Mask",
//     ownerName: "Rohan Makwana",
//     medicationName: "Meta 01",
//     deliveryDate: "2022-02-17T11:24:47Z",
//     nextDeliveryDate: "2023-01-13T11:28:00Z",
//     trackUrl: "test.abc.com",
//     dosage: "2",
//     addressLine: "test,address,Ahmedabad ,Delaware,12345",
//     addressLine1: "test",
//     pincode: "12345",
//     addressLine2: "address",
//     city: "Ahmedabad ",
//     state: "Delaware",
//   },
//   {
//     _id: "63c1321fb3ecf274fc708ffd",
//     patinetName: "GG",
//     ownerName: "Joseph Sean",
//     medicationName: "Metabolic",
//     deliveryDate: "2023-01-11T11:22:53Z",
//     nextDeliveryDate: "2023-01-11T11:22:53Z",
//     trackUrl: "test.abc.com",
//     dosage: "2",
//     addressLine: "11, Happy street ,,Naples ,Florida,38100",
//     addressLine1: "11, Happy street ",
//     pincode: "38100",
//     addressLine2: "",
//     city: "Naples ",
//     state: "Florida",
//   },
//   {
//     _id: "6385e58a673b9e3583c17a58",
//     patinetName: "Mask",
//     ownerName: "Rohan Makwana",
//     medicationName: "Meta 01",
//     deliveryDate: "2022-11-30T10:57:07Z",
//     nextDeliveryDate: "2022-12-01T10:57:09Z",
//     trackUrl: "test.abc.com",
//     dosage: "1",
//     addressLine: "test,address,Ahmedabad ,Delaware,12345",
//     addressLine1: "test",
//     pincode: "12345",
//     addressLine2: "address",
//     city: "Ahmedabad ",
//     state: "Delaware",
//   },
//   {
//     _id: "6385e56d673b9e3583c17a57",
//     patinetName: "yup",
//     ownerName: "harsh soni",
//     medicationName: "Metacine",
//     deliveryDate: "2022-11-22T10:56:37Z",
//     nextDeliveryDate: "2022-11-30T10:56:39Z",
//     trackUrl: "test.com",
//     dosage: "2",
//     addressLine: "dsgdfgf,,,California,45568",
//     addressLine1: "dsgdfgf",
//     pincode: "45568",
//     addressLine2: "",
//     city: "",
//     state: "California",
//   },
//   {
//     _id: "636df128fd325befe4b4ffea",
//     patinetName: "lonely ",
//     ownerName: "Darshit Anjaria",
//     medicationName: "Metacine",
//     deliveryDate: "2022-11-02T06:52:18Z",
//     nextDeliveryDate: "2022-11-03T06:52:19Z",
//     trackUrl: "test.com",
//     dosage: "6",
//     addressLine: "law garden,,ahmedabad,Florida,43435",
//     addressLine1: "law garden",
//     pincode: "43435",
//     addressLine2: "",
//     city: "ahmedabad",
//     state: "Florida",
//   },
//   {
//     _id: "636df11dfd325befe4b4ffe9",
//     patinetName: "lonely ",
//     ownerName: "Darshit Anjaria",
//     medicationName: "Metacine",
//     deliveryDate: "2022-11-01T06:52:06Z",
//     nextDeliveryDate: "2022-11-02T06:52:08Z",
//     trackUrl: "test.com",
//     dosage: "2",
//     addressLine: "law garden,,ahmedabad,Florida,43435",
//     addressLine1: "law garden",
//     pincode: "43435",
//     addressLine2: "",
//     city: "ahmedabad",
//     state: "Florida",
//   },
//   {
//     _id: "636df110fd325befe4b4ffe8",
//     patinetName: "lonely ",
//     ownerName: "Darshit Anjaria",
//     medicationName: "Metacine",
//     deliveryDate: "2022-11-18T06:51:52Z",
//     nextDeliveryDate: "2022-11-19T06:51:55Z",
//     trackUrl: "test.com",
//     dosage: "2",
//     addressLine: "law garden,,ahmedabad,Florida,43435",
//     addressLine1: "law garden",
//     pincode: "43435",
//     addressLine2: "",
//     city: "ahmedabad",
//     state: "Florida",
//   },
//   {
//     _id: "636df0eefd325befe4b4ffe6",
//     patinetName: "lonely ",
//     ownerName: "Darshit Anjaria",
//     medicationName: "Metacine",
//     deliveryDate: "2022-02-17T11:24:47Z",
//     nextDeliveryDate: "2023-01-13T11:28:00Z",
//     trackUrl: "test.abc.com",
//     dosage: "2",
//     addressLine: "law garden,,ahmedabad,Florida,43435",
//     addressLine1: "law garden",
//     pincode: "43435",
//     addressLine2: "",
//     city: "ahmedabad",
//     state: "Florida",
//   },
//   {
//     _id: "636c97708de6475519907662",
//     patinetName: "Aa",
//     ownerName: "Rohan Makwana",
//     medicationName: "NEW",
//     deliveryDate: "2022-11-11T06:16:58Z",
//     nextDeliveryDate: "2022-11-30T06:17:07Z",
//     trackUrl: "test.com",
//     dosage: "2",
//     addressLine: "agile,nehrunagar,Ahmedabad ,Indiana,12345",
//     addressLine1: "agile",
//     pincode: "12345",
//     addressLine2: "nehrunagar",
//     city: "Ahmedabad ",
//     state: "Indiana",
//   },
//   {
//     _id: "636b6bc0e4c05eeaa583556c",
//     patinetName: "Aa",
//     ownerName: "Rohan Makwana",
//     medicationName: "NEW",
//     deliveryDate: "2022-11-10T08:58:28Z",
//     nextDeliveryDate: "2022-11-12T08:58:36Z",
//     trackUrl: "vetbox.com",
//     dosage: "2 per day",
//     addressLine: "agile,nehrunagar,Ahmedabad ,Indiana,12345",
//     addressLine1: "agile",
//     pincode: "12345",
//     addressLine2: "nehrunagar",
//     city: "Ahmedabad ",
//     state: "Indiana",
//   },
//   {
//     _id: "636b536ae4c05eeaa5835569",
//     patinetName: "Jokh",
//     ownerName: "Hhh Yyy",
//     medicationName: "NEW",
//     deliveryDate: "2022-11-12T07:14:42Z",
//     nextDeliveryDate: "2022-11-14T07:14:44Z",
//     trackUrl: "www.track.com",
//     dosage: "5mg",
//     addressLine: "aaa,hhh,Jjj,Connecticut,23222",
//     addressLine1: "aaa",
//     pincode: "23222",
//     addressLine2: "hhh",
//     city: "Jjj",
//     state: "Connecticut",
//   },
//   {
//     _id: "636b535be4c05eeaa5835568",
//     patinetName: "Jokh",
//     ownerName: "Hhh Yyy",
//     medicationName: "NEW",
//     deliveryDate: "2022-11-10T07:14:29Z",
//     nextDeliveryDate: "2022-11-12T07:14:31Z",
//     trackUrl: "vetbox.com",
//     dosage: "5mg",
//     addressLine: "aaa,hhh,Jjj,Connecticut,23222",
//     addressLine1: "aaa",
//     pincode: "23222",
//     addressLine2: "hhh",
//     city: "Jjj",
//     state: "Connecticut",
//   },
//   {
//     _id: "636b534ce4c05eeaa5835567",
//     patinetName: "Jokh",
//     ownerName: "Hhh Yyy",
//     medicationName: "NEW",
//     deliveryDate: "2022-11-04T07:14:15Z",
//     nextDeliveryDate: "2022-11-06T07:14:17Z",
//     trackUrl: "vetbox.com",
//     dosage: "5mg",
//     addressLine: "aaa,hhh,Jjj,Connecticut,23222",
//     addressLine1: "aaa",
//     pincode: "23222",
//     addressLine2: "hhh",
//     city: "Jjj",
//     state: "Connecticut",
//   },
//   {
//     _id: "636b533fe4c05eeaa5835566",
//     patinetName: "Jokh",
//     ownerName: "Hhh Yyy",
//     medicationName: "NEW",
//     deliveryDate: "2022-11-04T07:14:01Z",
//     nextDeliveryDate: "2022-11-05T07:14:03Z",
//     trackUrl: "vetbox.com",
//     dosage: "5mg",
//     addressLine: "aaa,hhh,Jjj,Connecticut,23222",
//     addressLine1: "aaa",
//     pincode: "23222",
//     addressLine2: "hhh",
//     city: "Jjj",
//     state: "Connecticut",
//   },
//   {
//     _id: "636a298e9cb2c77198850054",
//     patinetName: "Tommie",
//     ownerName: "Sam Miller ",
//     medicationName: "NEW",
//     deliveryDate: "2022-11-05T10:03:51Z",
//     nextDeliveryDate: "2022-11-06T10:03:53Z",
//     trackUrl: "www.track.com",
//     dosage: "5mg",
//     addressLine: "new,address ,Ahmedabad ,Indiana,54321",
//     addressLine1: "new",
//     pincode: "54321",
//     addressLine2: "address ",
//     city: "Ahmedabad ",
//     state: "Indiana",
//   },
//   {
//     _id: "636a1c8d9cb2c77198850053",
//     patinetName: "Ww",
//     ownerName: "Sam Miller ",
//     medicationName: "NEW",
//     deliveryDate: "2022-11-03T09:08:19Z",
//     nextDeliveryDate: "2022-11-21T09:08:22Z",
//     trackUrl: "test.comw",
//     dosage: "2",
//     addressLine: "new,address ,Ahmedabad ,Indiana,54321",
//     addressLine1: "new",
//     pincode: "54321",
//     addressLine2: "address ",
//     city: "Ahmedabad ",
//     state: "Indiana",
//   },
// ]);
