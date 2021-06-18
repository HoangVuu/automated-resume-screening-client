import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

import { Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { loginHrProAction } from "state/actions/authenticationActions";
import { checkCookie } from "utils/cookies";
import "./HRSignIn.scss";
import history from "state/history";

const validateMessages = {
  required: "Vui lòng nhập ${label}",
  types: {
    email: "Email không hợp lệ",
    password: "Mật khẩu"
  }
};

function HRSignIn() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  // const isLogin = useSelector((state) => state.login.isLogin);
  // const accessToken = useSelector((state) => state.login.token);

  //Handle submit Login
  const onFinish = (values) => {
    setIsLoading(true);
    dispatch(loginHrProAction({ user: values.user }))
      .then(() => {
        const location = localStorage.getItem("location");
        if (location) {
          history.push(location);
          localStorage.removeItem("location");
        } else {
          history.push("/recruiter");
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return checkCookie("recruiter_token") ? (
    <Redirect to="/" />
  ) : (
    <div className="hr-login">
      <div className="hr-login__container">
        {/* Login Form  */}
        <div className="hr-login__container__left">
          <div className="hr-login__container__left__logo">
            <Link
              to="/recruiter/home"
              className="hr-login__container__left__logo__wrapper"
            >
              <img src="/assets/img/main-logo.jpg" />
            </Link>
          </div>

          <span className="hr-login__container__left__title">
            Nhà&nbsp;tuyển&nbsp;dụng&nbsp;đăng&nbsp;nhập
          </span>

          <Form
            layout="vertical"
            name="nest-messages"
            validateMessages={validateMessages}
            onFinish={onFinish}
            className="hr-login__container__left__form"
          >
            {/* Email */}
            <Form.Item
              label="Email"
              name={["user", "email"]}
              rules={[{ type: "email", required: true }]}
            >
              <Input
                className="hr-login__container__left__form__input"
                placeholder="Nhập email"
              />
            </Form.Item>

            {/* Password  */}
            <Form.Item
              label="Mật khẩu"
              name={["user", "password"]}
              rules={[{ required: true }]}
            >
              <Input.Password
                className="hr-login__container__left__form__input"
                placeholder="Nhập mật khẩu"
              />
            </Form.Item>

            {/* <Link to="/sign-up/hr">Đăng kí tài khoản</Link> */}

            {/* Button Login  */}
            <button
              htmlType="submit"
              className="hr-login__container__left__form__btn"
            >
              Đăng nhập
              {isLoading && <div className="dashed-loading"></div>}
            </button>
          </Form>

          <button
            className="hr-login__container__left__form__social__item hr-login__container__left__form__social__item--register"
            onClick={() => history.push("/recruiter/sign-up")}
          >
            <span> Đăng ký tài khoản mới</span>
          </button>
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
