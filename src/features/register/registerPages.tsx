import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  Form,
  Input,
  Button,
  Table,
  Space,
  DatePicker,
  Radio,
  Select,
} from "antd";
import { setField, resetForm, selectUserForm } from "./userFormSlice";
import "./style/registerPages.scss";
import dayjs from "dayjs";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const RegisterForm: React.FC = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userForm = useSelector(selectUserForm);
  const [tableData, setTableData] = React.useState<any[]>([]);
  const navigate = useNavigate();
  const [selectedData, setSelectedData] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const routeTo = (path: string) => {
    navigate(path);
  };

  React.useEffect(() => {
    const storedData = localStorage.getItem("tableData");
    if (storedData) {
      setTableData(JSON.parse(storedData));
    }
  }, []);

  const handleSubmit = () => {
    if (
      userForm.name &&
      userForm.lastName &&
      userForm.birthdate &&
      userForm.phoneNumber &&
      userForm.sex &&
      userForm.nationality &&
      userForm.antecedent &&
      userForm.expectedSalary
    ) {
      const newData = { ...userForm, key: Date.now() };
      setTableData((prevData) => [...prevData, newData]);
      localStorage.setItem(
        "tableData",
        JSON.stringify([...tableData, newData])
      );
      dispatch(resetForm());
    } else {
      console.log("Please fill in all fields");
    }
  };

  const handleReset = () => {
    dispatch(resetForm());
    form.resetFields();
  };

  const columns = [
    {
      title: t("Name"),
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: t("Sex"),
      dataIndex: "sex",
      key: "sex",
      sorter: (a, b) => a.sex.localeCompare(b.sex),
    },
    {
      title: t("Phone Number"),
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      sorter: (a, b) => a.phoneNumber.localeCompare(b.phoneNumber),
    },
    {
      title: t("Nationality"),
      dataIndex: "nationality",
      key: "nationality",
      sorter: (a, b) => a.nationality.localeCompare(b.nationality),
    },
    {
      title: t("Action"),
      key: "action",
      render: (record: any) => (
        <>
          <EditOutlined onClick={() => handleEdit(record)} />
          <DeleteOutlined
            onClick={() => handleDelete(record.key)}
            style={{ color: "red", marginLeft: "18px" }}
          />
        </>
      ),
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      setSelectedData(selectedRowKeys);
    },
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }} defaultValue={"+66"}>
        <Option value="+66">+66</Option>
        <Option value="+86">+86</Option>
        <Option value="+87">+87</Option>
      </Select>
    </Form.Item>
  );

  const handleDelete = (key: string | number) => {
    setTableData((prevData) =>
      prevData.filter((item: any) => item.key !== key)
    );
    localStorage.setItem(
      "tableData",
      JSON.stringify(tableData.filter((item: any) => item.key !== key))
    );
  };

  const handleDeleteDatas = () => {
    selectedData.forEach((key) => {
      setTableData((prevData) => {
        const datas = prevData.filter((item: any) => item.key !== key);
        localStorage.setItem("tableData", JSON.stringify(datas));
        return datas;
      });
    });
  };

  const handleEdit = (record: any) => {
    setIsEditing(true);
    updatefield(record);
  };

  const updatefield = (record: any) => {
    console.log(record.antecedent);
    dispatch(setField({ field: "antecedent", value: record.antecedent }));
    dispatch(setField({ field: "name", value: record.name }));
  };

  useEffect(() => {
    console.log(userForm);
  }, [userForm]);

  return (
    <div className="ConteinerRegister">
      <div className="text-header">
        <h1>{t("Form Page Management")}</h1>
        <h1 onClick={() => routeTo("/")}>{t("Back")}</h1>
      </div>
      <div className="register">
        <div className="container-register">
          <Form onFinish={handleSubmit} className="registerform" form={form}>
            <div className="formAntecedent">
              <Form.Item
                label={t("Antecedent")}
                className="inputAntecedent"
                name="antecedent"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder={t("Antecedent")}
                  onChange={(value) => {
                    console.log(value);
                    dispatch(setField({ field: "antecedent", value }));
                  }}
                  value={userForm.antecedent}
                >
                  <Select.Option value="mr">{t("Mr.")}</Select.Option>
                  <Select.Option value="miss">{t("Miss")}</Select.Option>
                  <Select.Option value="mrs">{t("Mrs.")}</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="formName">
              <Form.Item
                label={t("Name")}
                className="inputName"
                name="name"
                rules={[{ required: true }]}
              >
                <Input
                  value={userForm.name}
                  onChange={(e) =>
                    dispatch(setField({ field: "name", value: e.target.value }))
                  }
                />
              </Form.Item>
            </div>
            <div className="formLastname">
              <Form.Item
                label={t("Last Name")}
                className="inputLastname"
                name="last name"
                rules={[{ required: true }]}
              >
                <Input
                  value={userForm.lastName}
                  onChange={(e) =>
                    dispatch(
                      setField({ field: "lastName", value: e.target.value })
                    )
                  }
                />
              </Form.Item>
            </div>
            <div className="formBirthdate">
              <Form.Item
                label={t("Birthdate")}
                className="inputBirthdate"
                name="birthdate"
                rules={[{ required: true }]}
              >
                <DatePicker
                  value={
                    userForm.birthdate ? dayjs(userForm.birthdate) : dayjs()
                  }
                  onChange={(date) =>
                    dispatch(
                      setField({
                        field: "birthdate",
                        value: date ? date.format("YYYY-MM-DD") : "",
                      })
                    )
                  }
                />
              </Form.Item>
            </div>
            <div className="formNationality">
              <Form.Item
                label={t("Nationality")}
                className="inputNationality"
                name="nationality"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder={t("Please select")}
                  onChange={(value) =>
                    dispatch(setField({ field: "nationality", value }))
                  }
                  value={userForm.nationality}
                >
                  <Select.Option value="thai">{t("Thai")}</Select.Option>
                  <Select.Option value="other">{t("Other")}</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="formIdCardNumber">
              <Form.Item
                label={t("ID Card Number")}
                className="inputIdCardNumber"
              >
                <Input
                  type="number"
                  value={userForm.idCardNumber}
                  onChange={(e) =>
                    dispatch(
                      setField({ field: "idCardNumber", value: e.target.value })
                    )
                  }
                />
              </Form.Item>
            </div>
            <div className="formSex">
              <Form.Item
                label={t("Sex")}
                className="inputSex"
                name="Sex"
                rules={[{ required: true }]}
              >
                <Radio.Group
                  onChange={(e) =>
                    dispatch(setField({ field: "sex", value: e.target.value }))
                  }
                  value={userForm.sex}
                >
                  <Radio value="male">{t("Male")}</Radio>
                  <Radio value="female">{t("Female")}</Radio>
                  <Radio value="Other">{t("Other")}</Radio>
                </Radio.Group>
              </Form.Item>
            </div>
            <div className="formPhoneNumber">
              <Form.Item
                label={t("Phone Number")}
                className="inputPhoneNumber"
                name="Phone Number"
                rules={[{ required: true }]}
              >
                <Input
                  type="number"
                  value={userForm.phoneNumber}
                  addonBefore={prefixSelector}
                  onChange={(e) =>
                    dispatch(
                      setField({ field: "phoneNumber", value: e.target.value })
                    )
                  }
                />
              </Form.Item>
            </div>
            <div className="formPassport">
              <Form.Item label={t("Passport")} className="inputPassport">
                <Input
                  value={userForm.passport}
                  onChange={(e) =>
                    dispatch(
                      setField({ field: "passport", value: e.target.value })
                    )
                  }
                />
              </Form.Item>
            </div>
            <div className="formExpectedSalary">
              <Form.Item
                label={t("Expected Salary")}
                className="inputExpectedSalary"
                name="Expected Salary"
                rules={[{ required: true }]}
              >
                <Input
                  type="number"
                  value={userForm.expectedSalary}
                  onChange={(e) =>
                    dispatch(
                      setField({
                        field: "expectedSalary",
                        value: e.target.value,
                      })
                    )
                  }
                />
              </Form.Item>
            </div>
            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={
                    !userForm.name ||
                    !userForm.lastName ||
                    !userForm.birthdate ||
                    !userForm.phoneNumber ||
                    !userForm.sex ||
                    !userForm.nationality ||
                    !userForm.antecedent ||
                    !userForm.expectedSalary
                  }
                >
                  {t("Submit")}
                </Button>
                <Button htmlType="button" onClick={handleReset}>
                  {t("Reset")}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
        <div style={{ width: "90vw", marginBottom: "10px" }}>
          <button style={{}} onClick={handleDeleteDatas}>
            {t("Delete")}
          </button>
        </div>
        <Table
          dataSource={tableData}
          columns={columns}
          rowSelection={rowSelection}
          className="Tabledate"
        />
      </div>
    </div>
  );
};

export default RegisterForm;
