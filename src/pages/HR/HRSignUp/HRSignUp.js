import { Form, Input, Radio } from "antd";
import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";

import { registerHrAction } from "state/actions/authenticationActions";
import { checkCookie } from "utils/cookies";
import "./HRSignUp.scss";

const validateMessages = {
  required: "Vui lòng nhập ${label}!",
  types: {
    email: "Email không hợp lệ",
    password: "Mật khẩu"
  }
};

function HRSignUp() {
  const dispatch = useDispatch();

  //Handle submit Login
  const onFinish = (value) => {
    // dispatch(registerHrAction(value));
  };

  return checkCookie("recruiter_token") ? (
    <Redirect to="/" />
  ) : (
    <div className="hr-register">
      <div className="hr-register__container">
        <div className="hr-register__container__logo">
          <Link
            to="/recruiter"
            className="hr-register__container__logo__wrapper"
          >
            <h3>
              Automated&nbsp;<span>Screening</span>
            </h3>
          </Link>
        </div>

        {/* Content  */}
        <div className="hr-register__container__form">
          <span className="hr-register__container__form__title">
            Nhà tuyển dụng đăng&nbsp;ký
          </span>
          {/* 
          <p className="hr-register__container__form__bigLabel">
            Thông tin đăng nhập
          </p> */}

          <Form
            layout="vertical"
            name="nest-messages"
            validateMessages={validateMessages}
            onFinish={onFinish}
            className="hr-register__container__form__confirm"
          >
            {/* Fullname */}
            <Form.Item
              label="Họ và tên"
              name="fullName"
              rules={[{ required: true }]}
            >
              <Input
                className="hr-register__container__form__confirm__input"
                placeholder="Họ và tên"
              />
            </Form.Item>
            {/* Email */}
            <Form.Item
              label="Email"
              name="email"
              rules={[{ type: "email", required: true }]}
            >
              <Input
                className="hr-register__container__form__confirm__input"
                placeholder="Email"
              />
            </Form.Item>
            {/* Password  */}
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu!"
                }
              ]}
              hasFeedback
            >
              <Input.Password
                className="hr-register__container__form__confirm__input"
                placeholder="Mật khẩu"
              />
            </Form.Item>
            <Form.Item
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Vui lòng xác nhận mật khẩu!"
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "Password không trùng khớp, vui lòng kiểm tra lại!"
                    );
                  }
                })
              ]}
            >
              <Input.Password
                placeholder="Xác nhận mật khẩu"
                className="hr-register__container__form__confirm__input"
              />
            </Form.Item>
            {/* Phonenumber */}
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                { required: true },
                {
                  pattern: /^[\d]{0,11}$/,
                  message: "Số điện thoại tối đa 11 số"
                },
                { min: 10, message: "Số điện thoại phải từ 10-11 số" }
              ]}
            >
              <Input
                className="hr-register__container__form__confirm__input"
                placeholder="Số điện thoại"
                type="number"
              />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
              name="gender"
            >
              <Radio.Group>
                <Radio value={true}>Nam</Radio>
                <Radio value={false}>Nữ</Radio>
              </Radio.Group>
            </Form.Item>

            <p className="hr-register__container__form__confirm__text">
              Đã có tài khoản?{" "}
              <Link to="/recruiter/sign-in">
                <strong>Đăng nhập ngay</strong>
              </Link>
            </p>
            {/* Button Login  */}
            <button
              htmlType="submit"
              className="hr-register__container__form__confirm__btn"
            >
              Đăng ký
              {/* {isLoading && <div className="dashed-loading"></div>} */}
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default HRSignUp;
