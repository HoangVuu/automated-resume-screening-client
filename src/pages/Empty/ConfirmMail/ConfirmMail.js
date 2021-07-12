import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  verifyCandidateAction,
  verifyHrAction
} from "state/actions/authenticationActions";
import "./ConfirmMail.scss";
import { useTitle } from "utils/index";
import { useTranslation } from "react-i18next";

const ConfirmMail = (props) => {
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  useTitle(i18n.language === "en" ? "FASTJOB | Confirm Email" : "FASTJOB | Xác nhận Email")

  const emailVerify = useSelector((state) => state.auth.email);

  const query = new URLSearchParams(props.location.search);
  const token = query.get("token");
  const type = query.get("type");

  useEffect(() => {
    token &&
      type &&
      dispatch(
        type === "candidate"
          ? verifyCandidateAction(token)
          : verifyHrAction(token)
      );
  });

  return (
    <div className="confirm">
      <div className="blank-pages"></div>
      <div className="clearfix"></div>
      <div className="confirm__page">
      
        <div className="m-t-40 card-box">
        <div className="text-center" style={{marginBottom: '40px'}}>
          <Link to="/" className="confirm__page__logo">
           <img src="/assets/img/main-logo.jpg" />
          </Link>
        </div>
          <div className="text-center">
            <h4 className="text-uppercase font-bold m-b-0 confirm__title">
              Xác thực tài khoản
            </h4>
          </div>
          <div className="panel-body text-center">
            <img
              src="/assets/img/mail_confirm.png"
              alt="img"
              className="thumb-lg m-t-20 center-block"
            />
            {!token ? (
              <p className="text-muted font-13 m-t-20">
                Email xác thực tài khoản đã được gửi{" "}
                <strong>{emailVerify}</strong>. Vui lòng check hộp thư và nhấn
                vào liên kết đính kèm để xác thực tài khoản
              </p>
            ) : (
              <p>
                Email xác thực thành công. Hãy đăng nhập để trải nghiệm hệ thống
              </p>
            )}
          </div>
        </div>

        {token && (
          <div className="row">
            <div className="col-sm-12 text-center">
              <p className="text-muted">
                Tới trang{" "}
                <Link
                  to={`${
                    type === "candidate" ? "/sign-in" : "/recruiter/sign-in"
                  }`}
                  className="text-primary m-l-5"
                >
                  <strong>Đăng nhập</strong>
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmMail;
