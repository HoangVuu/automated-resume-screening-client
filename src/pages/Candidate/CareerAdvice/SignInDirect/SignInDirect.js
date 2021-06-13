import React from "react";
import "./SignInDirect.scss";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SignInDirect = ({ isNeedCV = false }) => {
  const { t } = useTranslation();

  return (
    <div className="sign-direct">
      <h2 className="sign-direct__title">
        {isNeedCV
          ? t("signInDirect.isNeedCV.create")
          : t("signInDirect.isNeedCV.signIn")}
      </h2>

      <ul className="sign-direct__list">
        <li className="sign-direct__list__item">
          {t("signInDirect.identify")}
        </li>
        <li className="sign-direct__list__item">{t("signInDirect.see")}</li>
        <li className="sign-direct__list__item">{t("signInDirect.rate")}</li>
        <li className="sign-direct__list__item">
          {t("signInDirect.discover")}
        </li>
      </ul>

      <div className="sign-direct__button">
        {isNeedCV ? (
          <>
            {" "}
            <Link to="/profile" className="sign-direct__button__sign-in">
              {t("signInDirect.upload")}
            </Link>
          </>
        ) : (
          <>
            {" "}
            <Link to="/sign-in" className="sign-direct__button__sign-in">
              {t("signInDirect.signIn")}
            </Link>
            <p> {t("signInDirect.or")}</p>
            <Link to="/sign-up" className="sign-direct__button__register">
              {t("signInDirect.register")}
            </Link>{" "}
          </>
        )}
      </div>

      <div className="sign-direct__img">
        <img src="https://www.seek.com.au/career-advice/assets/9d11997f.svg" />
      </div>
    </div>
  );
};

export default SignInDirect;
