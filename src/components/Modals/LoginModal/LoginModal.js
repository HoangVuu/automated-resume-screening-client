import { Modal, Tabs, Tab } from "react-bootstrap";
import React, { useState } from "react";
import { Form, Input, Radio, DatePicker, Select } from "antd";
import "./LoginModal.scss";
import { CloseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  loginCandidateProAction,
  registerCandidateAction
} from "state/actions/authenticationActions";
import { useTranslation } from "react-i18next";

const config = {
  rules: [
    { type: "object", required: true, message: "Vui lòng chọn ngày sinh!" }
  ]
};

function LoginModal({ show, toggleModal }) {
  const { t, i18n } = useTranslation();

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  //Handle submit Login
  const onFinish = (values) => {
    setLoading(true);

    dispatch(loginCandidateProAction({ user: values.user }))
      .then(() => {
        toggleModal();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onSignupFinish = (fieldsValue) => {
    const values = {
      ...fieldsValue,
      province_id: fieldsValue.province_id,
      dateOfBirth: fieldsValue["dateOfBirth"].format("YYYY-MM-DD")
    };

    delete values.confirm;

    setLoading(true);

    dispatch(registerCandidateAction(values)).catch(() => {
      setLoading(false);
    });
  };

  return (
    <Modal
      show={show}
      onHide={toggleModal}
      dialogClassName="ir-modal"
      style={{ marginTop: "40px" }}
    >
      <Modal.Body>
        <button className="btn-close text-gray" onClick={toggleModal}>
          <CloseOutlined />
        </button>
        <div>
          <Tabs defaultActiveKey="login">
            <Tab eventKey="login" title="Đăng nhập" disable={loading}>
              <div className="text-note text-center text-dark-gray">
                {t("candidateSignIn.title")}
              </div>
              <Login onFinish={onFinish} loading={loading} />
            </Tab>
            <Tab eventKey="signup" title="Đăng ký" disable={loading}>
              <div className="text-note text-center text-dark-gray">
                {t("candidateSignIn.title")}
              </div>
              <Signup onFinish={onSignupFinish} loading={loading} />
            </Tab>
          </Tabs>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;

const Login = ({ onFinish, loading }) => {
  const { t, i18n } = useTranslation();

  const validateMessages = {
    required:
      i18n.language === "en"
        ? "Please enter ${label}"
        : "Vui lòng nhập ${label}",
    types: {
      email: i18n.language === "en" ? "Email not valid" : "Email không hợp lệ",
      password: "Password"
    }
  };

  return (
    <Form
      layout="vertical"
      name="nest-messages"
      validateMessages={validateMessages}
      onFinish={onFinish}
      className="hr-login__container__left__form"
    >
      {/* Email */}
      <Form.Item
        label={t("candidateSignIn.form.email")}
        name={["user", "email"]}
        rules={[{ type: "email", required: true }]}
      >
        <Input
          className="hr-login__container__left__form__input"
          placeholder={t("candidateSignIn.form.enterEmail")}
        />
      </Form.Item>

      {/* Password  */}
      <Form.Item
        label={t("candidateSignIn.form.password")}
        name={["user", "password"]}
        rules={[{ required: true }]}
      >
        <Input.Password
          className="hr-login__container__left__form__input"
          placeholder={t("candidateSignIn.form.enterPassword")}
        />
      </Form.Item>

      {/* <Link to="/sign-up/hr">Đăng kí tài khoản</Link> */}

      {/* Button Login  */}
      <button
        htmlType="submit"
        className="candidate-login__container__left__form__btn"
        style={{ width: "100%" }}
      >
        {t("candidateSignIn.signIn")}
        {loading && <div className="dashed-loading"></div>}
      </button>
    </Form>
  );
};

const Signup = ({ onFinish, loading }) => {
  const { t, i18n } = useTranslation();

  const provinces = useSelector((state) =>
    state.cv.provinces.map(({ province_id, province_name }) => ({
      value: province_id,
      label: province_name
    }))
  );

  const provincesEn = useSelector((state) =>
    state.cv.provinces.map(({ province_id, province_name_en }) => ({
      value: province_id,
      label: province_name_en
    }))
  );

  const validateMessages = {
    required:
      i18n.language === "en"
        ? "Please enter ${label}"
        : "Vui lòng nhập ${label}",
    types: {
      email: i18n.language === "en" ? "Email not valid" : "Email không hợp lệ",
      password: "Password"
    }
  };

  return (
    <Form
      layout="vertical"
      name="nest-messages"
      centered
      validateMessages={validateMessages}
      onFinish={onFinish}
      className="candidate-register__container__left__form"
    >
      {/* Fullname */}
      <Form.Item label="Họ và tên" name="fullName" rules={[{ required: true }]}>
        <Input
          className="candidate-register__container__left__form__input"
          placeholder={t("candidateSignIn.name")}
        />
      </Form.Item>

      {/* Email */}
      <Form.Item
        label={t("candidateSignIn.form.email")}
        name="email"
        rules={[{ type: "email", required: true }]}
      >
        <Input
          className="candidate-register__container__left__form__input"
          placeholder="Email"
        />
      </Form.Item>

      {/* Password  */}
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message:
              i18n.language === "vi"
                ? "Vui lòng nhập mật khẩu!"
                : "Please enter password"
          }
        ]}
        hasFeedback
      >
        <Input.Password
          className="candidate-register__container__left__form__input"
          placeholder={t("candidateSignIn.form.password")}
        />
      </Form.Item>

      {/* Confirm password  */}
      <Form.Item
        name="confirm"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message:
              i18n.language === "vi"
                ? "Vui lòng xác nhận mật khẩu!"
                : "Please confirm your password!"
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                i18n.language === "vi"
                  ? "Password không trùng khớp, vui lòng kiểm tra lại!"
                  : "Password does not match, please check again!"
              );
            }
          })
        ]}
      >
        <Input.Password
          placeholder={t("candidateSignIn.confirm")}
          className="candidate-register__container__left__form__input"
        />
      </Form.Item>

      <Form.Item
        name="province_id"
        label={t("candidateSignIn.province")}
        className="signup-label"
      >
        <Select
          placeholder={t("candidateSignIn.provinPla")}
          options={i18n.language === "vi" ? provinces : provincesEn}
          size="large"
        />
      </Form.Item>

      <div className="candidate-register__container__left__form__group">
        {/* Date of birth */}
        <Form.Item
          name="dateOfBirth"
          label="Ngày sinh"
          {...config}
          style={{ width: "50%" }}
        >
          <DatePicker
            placeholder={t("candidateSignIn.date")}
            className="candidate-register__container__left__form__input"
          />
        </Form.Item>

        {/* Gender  */}
        <Form.Item
          rules={[
            {
              required: true,
              message:
                i18n.language === "vi"
                  ? "Vui lòng chọn giới tính!"
                  : "Please choose gender"
            }
          ]}
          name="gender"
          style={{ marginLeft: "40px" }}
        >
          <Radio.Group>
            <Radio value={true}>{t("profile.male")}</Radio>
            <Radio value={false}>{t("profile.female")}</Radio>
          </Radio.Group>
        </Form.Item>
      </div>
      {/* Phonenumber */}
      <Form.Item
        label={t("candidateSignIn.phone")}
        name="phone"
        rules={[
          { required: true },
          {
            pattern: /^[\d]{0,11}$/,
            message:
              i18n.language === "vi"
                ? "Số điện thoại tối đa 11 số"
                : "Phone number up to 11 numbers"
          },
          {
            min: 10,
            message:
              i18n.language === "vi"
                ? "Số điện thoại phải từ 10-11 số"
                : "Phone number must be 10-11 numbers"
          }
        ]}
      >
        <Input
          className="candidate-register__container__left__form__input"
          placeholder={t("candidateSignIn.phone")}
          type="number"
        />
      </Form.Item>

      {/* Button Login  */}
      <button
        htmlType="submit"
        className="candidate-login__container__left__form__btn"
        style={{ width: "100%" }}
      >
        {t("candidateSignIn.register")}
        {loading && <div className="dashed-loading"></div>}
      </button>
    </Form>
  );
};
