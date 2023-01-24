import { Form, Select, DatePicker, Input, Button } from "antd";

export const InputField = ({
  id,
  type,
  size,
  InputlabelName,
  message,
  handleChange,
  placeholder,
}) => {
  return (
    <>
      <label htmlFor={id}>{InputlabelName}</label>
      <Form.Item
        id={id}
        name={id}
        rules={[
          {
            required: true,
            message: { message },
          },
        ]}
      >
        <Input
          type={type}
          size={size}
          onChange={handleChange}
          placeholder={placeholder}
        />
      </Form.Item>
    </>
  );
};

export const SelectField = ({
  id,
  selectFieldLabelName,
  message,
  handleChange,
  SelectFildValues,
}) => {
  return (
    <>
      <label htmlFor={id}>{selectFieldLabelName}</label>
      <Form.Item
        name={id}
        rules={[
          {
            required: true,
            message: { message },
          },
        ]}
      >
        <Select onChange={handleChange}>
          {SelectFildValues.length > 0 ? (
            SelectFildValues.map((item, i) => {
              return (
                <Select.Option
                  key={i}
                  value={`${item}`}
                >{`${item}`}</Select.Option>
              );
            })
          ) : (
            <Select.Option value="No Option">No Option</Select.Option>
          )}
        </Select>
      </Form.Item>
    </>
  );
};

export const SelectFieldForAddress = ({
  id,
  selectFieldLabelName,
  message,
  handleChange,
  SelectFildValues,
}) => {
  return (
    <>
      <label htmlFor={id}>{selectFieldLabelName}</label>
      <Form.Item
        name={id}
        rules={[
          {
            required: true,
            message: { message },
          },
        ]}
      >
        <Select onChange={handleChange}>
          {SelectFildValues.length > 0 ? (
            SelectFildValues.map((item, i) => {
              return (
                <Select.Option
                  key={i}
                  value={`${item.addressLine1},${item.addressLine2},${item.city},${item.state},${item.pincode}`}
                >{`${item.addressLine1},${item.addressLine2},${item.city},${item.state},${item.pincode}`}</Select.Option>
              );
            })
          ) : (
            <Select.Option value="No Option">No Option</Select.Option>
          )}
        </Select>
      </Form.Item>
    </>
  );
};

export const DateField = ({
  id,
  dateFieldLabelName,
  message,
  disabledDate,
  dateFormate,
}) => {
  if (disabledDate === null) {
    return (
      <>
        <label htmlFor={id}>{dateFieldLabelName}</label>
        <Form.Item
          name={id}
          rules={[
            {
              required: true,
              message: [message],
            },
          ]}
        >
          <DatePicker
            className="w-full"
            disabledDate={disabledDate}
            format={dateFormate}
          />
        </Form.Item>
      </>
    );
  } else {
    return (
      <>
        <label htmlFor={id}>{dateFieldLabelName}</label>
        <Form.Item
          name={id}
          rules={[
            {
              required: true,
              message: [message],
            },
          ]}
        >
          <DatePicker
            className="w-full"
            disabledDate={disabledDate}
            format={dateFormate}
          />
        </Form.Item>
      </>
    );
  }
};

export const ButtonField = ({ id, type, className, buttonText }) => {
  return (
    <Form.Item>
      <Button className="bg-violet-700" type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  );
};
