import { DatePicker, Modal, Select, Button, Input, Form } from "antd";
import React from "react";

function AddExpenseModal({ isExpensesVisible, handelExpenseModalCancel, onFinish }) {
  const [form] = Form.useForm();

  const onFinishHandler = (values) => {
    onFinish(values, "expense");
    form.resetFields();
  };

  return (
    <Modal
      style={{ fontWeight: 600 }}
      title="Add Expenses" // Fixed the typo in "title" (was "titel")
      visible={isExpensesVisible}
      onCancel={handelExpenseModalCancel} // Fixed the typo in "onCancel" (was "oncancel")
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinishHandler} // Changed to the correct function name
      >
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please Input the name of Transaction",
            },
          ]}
        >
          <Input type="text" className="custom-input" />
        </Form.Item>

        <Form.Item
          style={{ fontWeight: 600 }}
          label="Amount"
          name="amount"
          rules={[
            {
              required: true,
              message: "Please Input the expense amount",
            },
          ]}
        >
          <Input type="number" className="custom-input" />
        </Form.Item>

        <Form.Item
          style={{ fontWeight: 600 }}
          label="Date"
          name="date"
          rules={[
            {
              required: true,
              message: "Please Select Expense Date",
            },
          ]}
        >
          <DatePicker className="custom-input" format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item
          label="Tag"
          name="tag"
          style={{ fontWeight: 600 }}
          rules={[
            {
              required: true,
              message: "Please Select a Tag",
            },
          ]}
        >
          <Select className="select-input-2">
            <Select.Option value="food">Food</Select.Option>
            <Select.Option value="Education">Education</Select.Option>{" "}
            {/* Fixed the typo in "Educatio" */}
            <Select.Option value="office">Office</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button className="btn btn-blue" type="primary" htmlType="submit">
            Add Expense
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddExpenseModal;
