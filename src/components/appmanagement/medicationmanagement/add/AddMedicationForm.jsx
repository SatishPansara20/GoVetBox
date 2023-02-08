import { Form, Input, InputNumber, Switch, Table } from "antd";

import React, { useState } from "react";
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  form,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form form={form} component={false}>
          <Form.Item
            id={record.key}
            name={dataIndex}
            style={{
              margin: 0,
            }}
          >
            {inputNode}
          </Form.Item>
        </Form>
      ) : (
        children
      )}
    </td>
  );
};

let editingKey = [];

const AddMedicationForm = ({
  administrationData,
  isLoading,
  administrationTypeName,
  dataSource,
  setChanageTableData,
}) => {
  const [form] = Form.useForm();
  const [data, setData] = useState(administrationData);
  const [globleSwitchValues, setGlobleSwitchValues] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [switchValue, setSwitchValue] = useState(false);

  const isEditing = (record) => {
    return editingKey.length > 0
      ? editingKey.includes(record.key)
        ? true
        : false
      : false;
  };

  const edit = (record) => {
    console.log("-------------------- edit--------------------");

    console.log(form.getFieldsValue());
    // form.setFieldsValue({
    //   amount: record.amount,
    //   dosage: "",
    //   ...record,
    // });

    const id = columns.find((column, i) => {
      return column.key === "isAllow";
    });

    for (let i = 0; i < administrationData.length; i++) {
      if (administrationData[i].administrationTypeName === id.title.key) {
        const isExit = administrationData[
          i
        ].administrationTypeNameDataSource?.dataSource?.findIndex((item) => {
          return item.key === record.key;
        });
        if (isExit > -1) {
          Object.assign(
            administrationData[i].administrationTypeNameDataSource?.dataSource[
              isExit
            ],
            { isAllow: true }
          );

          if (!editingKey.includes(record.key)) {
            // setEditingKey([record.key, ...editingKey]);
            editingKey.push(record.key);
          }
          break;
        }
      }
    }

    console.log(record, editingKey);
  };

  const save = async (record) => {
    console.log("--------------------We are Save--------------------");
    // setEditingKey((products) => {
    //   return products.filter((item) => item !== record.key);
    // });

    const indexOfkey = editingKey.findIndex((item) => {
      return item === record.key;
    });
    editingKey.splice(indexOfkey, 1);
    setGlobleSwitchValues(false);

    const newData = [...data];

    const row = await form.validateFields();

    try {
      for (let i = 0; i < newData.length; i++) {
        const isExit = newData[
          i
        ].administrationTypeNameDataSource?.dataSource?.findIndex((item) => {
          return item.key === record.key;
        });

        if (isExit > -1) {
          console.log("Row Data", row);
          Object.assign(
            newData[i].administrationTypeNameDataSource?.dataSource[isExit],
            { amount: row.amount, dosage: row.dosage, isAllow: false }
          );

          console.log(
            "Updated row",
            Object.assign(
              newData[i].administrationTypeNameDataSource?.dataSource[isExit],
              { amount: row.amount, dosage: row.dosage, isAllow: false }
            )
          );
        }
      }
      setChanageTableData(newData);
    } catch (errInfo) {
      setData(data);
      console.log("Validate Failed:", errInfo);
    }
  };

  const onGlobelChange = (checked, e) => {
    const id = columns.find((column, i) => {
      return column.key === "isAllow";
    });

    console.log("-------------------- onGlobelChange--------------------");
    setGlobleSwitchValues(checked);
    for (let i = 0; i < administrationData.length; i++) {
      if (administrationData[i].administrationTypeName === id.title.key) {
        for (
          let j = 0;
          j <
          administrationData[i].administrationTypeNameDataSource?.dataSource
            .length;
          j++
        ) {
          const dataSourceObject =
            administrationData[i].administrationTypeNameDataSource?.dataSource[
              j
            ];

          Object.assign(dataSourceObject, {
            isAllow: checked,
          });

          if (checked && !editingKey.includes(dataSourceObject.key)) {
            // setEditingKey([...editingKey, dataSourceObject.key]);
            editingKey.push(dataSourceObject.key);
          } else {
            const indexOfkey = editingKey.findIndex((item) => {
              return item === dataSourceObject.key;
            });
            editingKey.splice(indexOfkey, 1);
            // setEditingKey([]);
          }
        }
      }
    }

    console.log(editingKey);
  };

  const onRowSwitch = (checked, record) => {
    setSwitchValue(checked);
    if (checked) {
      console.log("We are Editing");
      edit(record);
    } else {
      console.log("We are SAVING");
      save(record);
    }
  };

  const columns = [
    {
      title: "Sizes",
      dataIndex: "size",
      key: "size",
      width: "10%",
    },
    {
      title: "Amount",
      key: "amount",
      dataIndex: "amount",
      width: "15%",
      editable: true,
    },

    {
      title: "Dosage",
      key: "dosage",
      dataIndex: "dosage",
      width: "15%",
      editable: true,
    },

    {
      title: (
        <Switch
          key={administrationTypeName}
          checked={globleSwitchValues}
          onClick={onGlobelChange}
        />
      ),
      key: "isAllow",
      dataIndex: "isAllow",
      render: (_, record) => {
        const editable = isEditing(record);

        return editable ? (
          <Switch
            checked={editable}
            onChange={(checked) => onRowSwitch(checked, record)}
          />
        ) : (
          <Switch
            defaultChecked
            onChange={(checked) => onRowSwitch(checked, record)}
          />
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      if (col.key === "isAllow") {
      }
      return { ...col };
    }

    return {
      ...col,
      onCell: (record) => {
        //console.log("OnCell", record);
        return {
          record,
          form: form,
          inputType: col.dataIndex === "amount" ? "number" : "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        };
      },
    };
  });

  return (
    <>
      <React.Fragment>
        <div>
          <p>AdministrationType: {administrationTypeName}</p>
        </div>
        {/* <Form form={form} component={false}> */}
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          size="small"
          loading={isLoading}
          columns={mergedColumns}
          rowClassName="editable-row"
          dataSource={dataSource}
          pagination={false}
        />
        {/* </Form> */}
      </React.Fragment>
    </>
  );
};

export default AddMedicationForm;
