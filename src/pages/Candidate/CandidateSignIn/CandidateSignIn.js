import { Form, Input } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { loginCandidateProAction } from "state/actions/authenticationActions";
import history from "state/history";
import { checkCookie } from "utils/cookies";
import "./CandidateSignIn.scss";
import Header from "components/Header/Header";
import { useTranslation } from "react-i18next";
import { useTitle } from "utils/index";

function CandidateSignIn() {
  const { t,i18n } = useTranslation();
  useTitle(i18n.language === "en" ? "Candidate Sign in | FASTJOB" : "Ứng viên đăng nhập | FASTJOB")

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const validateMessages = {
    required: i18n.language === "en" ?  "Please enter ${label}" : "Vui lòng nhập ${label}",
    types: {
      email: i18n.language === "en" ? "Email not valid" : "Email không hợp lệ",
      password: "Password"
    }
  };

  //Handle submit Login
  const onFinish = (values) => {
    setIsLoading(true);

    dispatch(loginCandidateProAction({ user: values.user }))
      .then(() => {
        const location = localStorage.getItem("location");
        if (location) {
          history.push(location);
          localStorage.removeItem("location");
        } else {
          history.push("/");
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return checkCookie("candidate_token") ? (
    <Redirect to="/" />
  ) : (
    <div className="candidate-login">
        <Header hasNavbar={false}/>
      <div className="candidate-login__container">
        {/* Login Form  */}
        <div className="candidate-login__container__left">
          <div className="candidate-login__container__left__logo">
          </div>

          <div
            className="candidate-login__container__left__employer"
          >
            <Link to="/recruiter/sign-in">{t("candidateSignIn.areYou")}</Link>
          </div>

          <span className="candidate-login__container__left__title">
          {t("candidateSignIn.signIn")}
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
              name={["user", "email"]}
              rules={[{ type: "email", required: true }]}
            >
              <Input
                className="candidate-login__container__left__form__input"
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
                className="candidate-login__container__left__form__input"
                placeholder={t("candidateSignIn.form.enterPassword")}
              />
            </Form.Item>

            {/* Button Login  */}
            <button
              htmlType="submit"
              className="candidate-login__container__left__form__btn"
            >
             {t("candidateSignIn.signIn")}
              {isLoading && <div className="dashed-loading"></div>}
            </button>
          </Form>

          <div className="candidate-login__container__left__form__social">
            {/* Login with gmail  */}

            <button className="candidate-login__container__left__form__social__item--register">
              <span>
              {t("candidateSignIn.doNot")} <Link to="/sign-up">{t("candidateSignIn.register")}</Link>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateSignIn;
