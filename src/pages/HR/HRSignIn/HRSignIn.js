import React from "react";
import { Link } from "react-router-dom";

import { Input, Form, Button } from "antd";

import "./HRSignIn.scss";

const validateMessages = {
  required: "Vui lòng nhập ${label}",
  types: {
    password: "Mật khẩu"
  }
};

function HRSignIn() {
  return (
    <div className="hr-login">
      <div className="hr-login__container">
        {/* Login Form  */}
        <div className="hr-login__container__right">
          <div className="hr-login__container__right__link">
            <Link to="/" className="hr-login__container__right__link__back">
              x
            </Link>
            <p className="hr-login__container__right__link__text">
              Người tìm việc <Link to="/sign-in/candidate">đăng nhập</Link>
            </p>
          </div>

          <Form
            layout="vertical"
            name="nest-messages"
            validateMessages={validateMessages}
            className="hr-login__container__right__form"
          >
            <span className="hr-login__container__right__form__title">
              Nhà tuyển dụng đăng nhập
            </span>

            {/* Email */}
            <Form.Item
              label="Tài khoản"
              name={["user", "username"]}
              rules={[{ required: true }]}
            >
              <Input
                className="hr-login__container__right__form__input"
                placeholder="Nhập tên tài khoản"
              />
            </Form.Item>

            {/* Password  */}
            <Form.Item
              label="Mật khẩu"
              name={["user", "password"]}
              rules={[{ required: true }]}
            >
              <Input.Password
                className="hr-login__container__right__form__input"
                placeholder="Nhập mật khẩu"
              />
            </Form.Item>

            <a href="https://www.google.com.vn/">Quên mật khẩu?</a>

            {/* Button Login  */}
            <Button
              type="primary"
              htmlType="submit"
              className="hr-login__container__right__form__btn"
            >
              Đăng nhập
            </Button>
            {/* Sign up  */}

            <div className="hr-login__container__right__form__register text-center">
              <span>Bạn chưa có tài khoản? </span>{" "}
              <Link
                className="hr-login__container__right__form__register__now"
                to="/"
              >
                Đăng kí ngay
              </Link>
            </div>
          </Form>
        </div>

        {/* Background Image  */}
        <div
          className="hr-login__bg"
          style={{
            backgroundImage: "url('/assets/img/login-hr-bg.jpg')"
          }}
        ></div>
      </div>
    </div>
  );
}

export default HRSignIn;
