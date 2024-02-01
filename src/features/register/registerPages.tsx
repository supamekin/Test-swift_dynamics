import { useNavigate } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
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
import { setField, resetForm, selectUserForm, } from "./userFormSlice";
import "./style/registerPages.scss"
import dayjs from "dayjs";

const RegisterForm: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userForm = useSelector(selectUserForm);
  const [tableData, setTableData] = React.useState<any[]>([]);
  const navigate = useNavigate();
  const routeTo = (path:string) => {
    navigate(path);
  };

  React.useEffect(() => {
    const storedData = localStorage.getItem("tableData");
    if (storedData) {
      setTableData(JSON.parse(storedData));
    }
  }, []);

  const handleSubmit = () => {
    if (userForm.name && userForm.lastName && userForm.birthdate) {
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
      render: (text, record) => (
        <Button onClick={() => handleDelete(record.key)}>{t("Delete")}</Button>
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
    },
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+66</Option>
        <Option value="87">+86</Option>
        <Option value="87">+87</Option>

      </Select>
    </Form.Item>
  );

  const handleDelete = (key:string|number) => {
    setTableData((prevData) => prevData.filter((item:any) => item.key !== key));
    localStorage.setItem("tableData", JSON.stringify(tableData.filter((item:any) => item.key !== key)));
  };

  return (
    <div className="ConteinerRegister">
      <div className="text-header" >
      <h1>{t("Form Page Management")}</h1>
      <h1 onClick={() => routeTo("/")} >{t("Back")}</h1>
      </div>
    <div className="register">
      <div className="container-register">
      <Form onFinish={handleSubmit} className="registerform">
      <div className="formAntecedent">
        <Form.Item label={t("Antecedent")} className="inputAntecedent">
          <Select
            placeholder="Antecedent"
            onChange={(value) =>
              dispatch(setField({ field: "antecedent", value }))
            }
            value={userForm.antecedent}
          >
            <Select.Option value="mr">{t('Mr.')}</Select.Option>
            <Select.Option value="miss">{t('Miss')}</Select.Option>
            <Select.Option value="mrs">{t('Mrs.')}</Select.Option>

          </Select>
        </Form.Item>
        </div>
      <div className="formName">
        <Form.Item label={t("Name")} className="inputName">
          <Input
            value={userForm.name}
            onChange={(e) =>
              dispatch(setField({ field: "name", value: e.target.value }))
            }
          />
        </Form.Item>
        </div>
        <div className="formLastname">
        <Form.Item label={t("Last Name")} className="inputLastname">
          <Input
            value={userForm.lastName}
            onChange={(e) =>
              dispatch(setField({ field: "lastName", value: e.target.value }))
            }
          />
        </Form.Item>
        </div>
        <div className="formBirthdate">
        <Form.Item label={t("Birthdate")} className="inputBirthdate">
          <DatePicker
            value={userForm.birthdate ? dayjs(userForm.birthdate) : dayjs()}
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
        <Form.Item label={t("Nationality")} className="inputNationality">
          <Select
            placeholder={t("- - กรุณาเลือก - -")}
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
        <Form.Item label={t("ID Card Number")} className="inputIdCardNumber">
          <Input
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
        <Form.Item label={t("Sex")} className="inputSex">
          <Radio.Group
            onChange={(e) =>
              dispatch(setField({ field: "sex", value: e.target.value }))
            }
            value={userForm.sex}
          >
            <Radio value="male">{t("Male")}</Radio>
            <Radio value="female">{t("Female")}</Radio>
            <Radio value="female">{t("Other")}</Radio>
          </Radio.Group>
        </Form.Item>
        </div>
        <div className="formPhoneNumber">
        <Form.Item label={t("Phone Number")} className="inputPhoneNumber">
          <Input
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
              dispatch(setField({ field: "passport", value: e.target.value }))
            }
          />
        </Form.Item>
        </div>
        <div className="formExpectedSalary">
        <Form.Item label={t("Expected Salary")} className="inputExpectedSalary">
          <Input
            value={userForm.expectedSalary}
            onChange={(e) =>
              dispatch(
                setField({ field: "expectedSalary", value: e.target.value })
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
                !userForm.name || !userForm.lastName || !userForm.birthdate
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
      <Table
        dataSource={tableData}
        columns={columns}
        rowSelection={rowSelection} className="Tabledate"
      />
    </div>
    </div>
  );
};

export default RegisterForm;
