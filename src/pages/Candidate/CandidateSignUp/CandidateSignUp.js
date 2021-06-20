// import { createFromIconfontCN, GooglePlusOutlined } from "@ant-design/icons";
import { Form, Input, Radio, DatePicker, Select } from "antd";
import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { registerCandidateAction } from "state/actions/authenticationActions";
import { checkCookie } from "utils/cookies";
import "./CandidateSignUp.scss";
import Header from "components/Header/Header";
import { useTranslation } from "react-i18next";

const config = {
  rules: [
    { type: "object", required: true, message: "Vui lòng chọn ngày sinh!" }
  ]
};

function CandidateSignUp() {
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);

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

  //Handle submit Login
  const onFinish = (fieldsValue) => {
    const values = {
      ...fieldsValue,
      province_id: fieldsValue.province_id
    };

    delete values.confirm;

    setLoading(true);

    dispatch(registerCandidateAction(values)).catch(() => {
      setLoading(false);
    });
  };

  const disabledDate = (current) => {
    const minYear = 1960;
    const maxYear = 2003;

    return (
      current &&
      (moment(current).year() <= minYear || moment(current).year() >= maxYear)
    );
  };

  return checkCookie("candidate_token") ? (
    <Redirect to="/" />
  ) : (
    <div className="candidate-login">
      <Header hasNavbar={false} />
      <div className="candidate-login__container">
        {/* Login Form  */}
        <div
          className="candidate-login__container__left"
          style={{ marginBottom: "30px" }}
        >
          <div
            className="candidate-login__container__left__employer"
          >
            <Link to="/recruiter/sign-in">{t("candidateSignIn.areYou")}</Link>
          </div>

          <span className="candidate-login__container__left__title">
            {t("candidateSignIn.register")}
          </span>

          <Form
            layout="vertical"
            name="nest-messages"
            validateMessages={validateMessages}
            onFinish={onFinish}
            className="candidate-login__container__left__form"
          >
            {/* Email */}
            <Form.Item
              label={t("candidateSignIn.form.email")}
              name="email"
              rules={[{ type: "email", required: true }]}
            >
              <Input
                className="candidate-login__container__left__form__input"
                placeholder={t("candidateSignIn.form.enterEmail")}
              />
            </Form.Item>

            <Form.Item
              label={t("candidateSignIn.name")}
              name="fullName"
              rules={[{ required: true }]}
            >
              <Input
                className="candidate-login__container__left__form__input"
                placeholder={t("candidateSignIn.enterName")}
              />
            </Form.Item>

            {/* Password  */}
            <Form.Item
              label={t("candidateSignIn.form.password")}
              name="password"
              rules={[{ required: true }]}
              hasFeedback
            >
              <Input.Password
                className="candidate-login__container__left__form__input"
                placeholder={t("candidateSignIn.form.enterPassword")}
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
                      : "Please confirm password"
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
                className="candidate-login__container__left__form__input"
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
                label={t("candidateSignIn.date")}
                className="candidate-register__container__left__form__group__date"
                {...config}
              >
                <DatePicker
                  format="DD/ MM/ YYYY"
                  placeholder={t("candidateSignIn.enterDate")}
                  className="candidate-login__container__left__form__input"
                  disabledDate={disabledDate}
                />
              </Form.Item>

              {/* Gender  */}
              <Form.Item
                rules={[
                  { required: true, message: i18n.language === "vi" ? "Vui lòng chọn giới tính!" : "Please choose gender" }
                ]}
                name="gender"
                label={t("candidateSignIn.gender")}
                className="candidate-register__container__left__form__group__gender"
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
                  pattern: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
                  message:
                    i18n.language === "vi"
                      ? "Số điện thoại không hợp lệ"
                      : "Phone numbder is invalid"
                }
              ]}
            >
              <Input
                className="candidate-login__container__left__form__input"
                placeholder={t("candidateSignIn.enterPhone")}
                type="number"
              />
            </Form.Item>

            {/* Button register  */}
            <button
              htmlType="submit"
              className="candidate-login__container__left__form__btn"
            >
              {t("candidateSignIn.register")}
              {isLoading && <div className="dashed-loading"></div>}
            </button>
          </Form>

          <div className="candidate-login__container__left__form__social">
            {/* Login with gmail  */}

            <button className="candidate-login__container__left__form__social__item--register">
              <span>
                {t("candidateSignIn.has")}{" "}
                <Link to="/sign-in">{t("candidateSignIn.signIn")}</Link>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateSignUp;
