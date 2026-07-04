import React, { useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Button,
} from "antd";

const ProductModal = ({
  open,
  setOpen,
  initialValues,
  onSubmit,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      if (initialValues) {
        form.setFieldsValue(initialValues);
      } else {
        form.resetFields();
      }
    }
  }, [open, initialValues, form]);

  const onFinish = async (productObj) => {
    await onSubmit(productObj);
    setOpen(false);
    form.resetFields();
  };

  return (
    <Modal
      title={
        <div
          style={{
            fontSize: "24px",
            fontWeight: 700,
            color: "#1f2937",
          }}
        >
          {initialValues
            ? "상품 수정"
            : "상품 등록"}
        </div>
      }
      open={open}
      onCancel={() => {
        setOpen(false);
        form.resetFields();
      }}
      footer={null}
      width={700}
      centered
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        size="large"
      >
        <Form.Item
          label="상품명"
          name="product_name"
          rules={[
            {
              required: true,
              message: "상품명을 입력하세요.",
            },
          ]}
        >
          <Input
            placeholder="예: 악세사리"
            style={{
              borderRadius: "10px",
            }}
          />
        </Form.Item>

        <Form.Item
          label="색상"
          name="color"
          rules={[
            {
              required: true,
              message: "색상을 선택하세요.",
            },
          ]}
        >
          <Select
            placeholder="색상 선택"
            style={{
              borderRadius: "10px",
            }}
            options={[
              {
                value: "Black",
                label: "Black",
              },
              {
                value: "White",
                label: "White",
              },
              {
                value: "Red",
                label: "Red",
              },
              {
                value: "Blue",
                label: "Blue",
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="원가"
          name="price"
          rules={[
            {
              required: true,
              message: "원가를 입력하세요.",
            },
          ]}
        >
          <InputNumber
            style={{
              width: "100%",
              borderRadius: "10px",
            }}
            placeholder="예: 40000"
          />
        </Form.Item>

        <Form.Item
          label="판매가"
          name="sale_price"
          rules={[
            {
              required: true,
              message: "판매가를 입력하세요.",
            },
          ]}
        >
          <InputNumber
            style={{
              width: "100%",
              borderRadius: "10px",
            }}
            placeholder="예: 80000"
          />
        </Form.Item>

        <Form.Item
          label="카테고리 코드"
          name="product_category_code"
          rules={[
            {
              required: true,
              message:
                "카테고리 코드를 선택하세요.",
            },
          ]}
        >
          <Select
            placeholder="카테고리 코드 선택"
            style={{
              borderRadius: "10px",
            }}
            options={[
              { value: "E1", label: "E1" },
              { value: "E2", label: "E2" },
              { value: "E3", label: "E3" },
              { value: "A1", label: "A1" },
              { value: "A2", label: "A2" },
            ]}
          />
        </Form.Item>

        <Form.Item style={{ marginTop: 30 }}>
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            style={{
              height: "52px",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: "700",
              boxShadow:
                "0 4px 12px rgba(22,119,255,0.25)",
            }}
          >
            {initialValues
              ? "수정하기"
              : "등록하기"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductModal;