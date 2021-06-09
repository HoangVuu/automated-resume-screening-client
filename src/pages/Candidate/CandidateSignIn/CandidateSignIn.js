import { Form, Input } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { loginCandidateProAction } from "state/actions/authenticationActions";
import history from "state/history";
import { checkCookie } from "utils/cookies";
import "./CandidateSignIn.scss";

const validateMessages = {
  required: "Please enter ${label}",
  types: {
    email: "Email not valid",
    password: "Password"
  }
};

function CandidateSignIn() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  // const accessToken = useSelector((state) => state.login.token);

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
      <div className="candidate-login__container">
        {/* Login Form  */}
        <div className="candidate-login__container__left">
          <div className="candidate-login__container__left__logo">
            <Link
              to="/"
              className="candidate-login__container__left__logo__wrapper"
            >
              <h3>
                Automated&nbsp;<span>Screening</span>
              </h3>
            </Link>
          </div>

          <Link to="/recruiter/sign-in" className="candidate-login__container__left__employer">
            <span>Are you an employer?</span>
          </Link>

          <span className="candidate-login__container__left__title">
            Sign&nbsp;in
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
              label="Email address"
              name={["user", "email"]}
              rules={[{ type: "email", required: true }]}
            >
              <Input
                className="candidate-login__container__left__form__input"
                placeholder="Enter email..."
              />
            </Form.Item>

            {/* Password  */}
            <Form.Item
              label="Password"
              name={["user", "password"]}
              rules={[{ required: true }]}
            >
              <Input.Password
                className="candidate-login__container__left__form__input"
                placeholder="Enter password..."
              />
            </Form.Item>

            {/* Button Login  */}
            <button
              htmlType="submit"
              className="candidate-login__container__left__form__btn"
            >
              Sign in
              {isLoading && <div className="dashed-loading"></div>}
            </button>
          </Form>

          <div className="candidate-login__container__left__form__social">
            {/* Login with gmail  */}

            <button className="candidate-login__container__left__form__social__item--register">
              <span>
                {" "}
                Don't have an account? <Link to="/sign-up">Register</Link>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateSignIn;
