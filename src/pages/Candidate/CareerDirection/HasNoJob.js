import React from "react";
import { Link } from "react-router-dom";
import "./CareerDirection.scss";
import { useTranslation } from "react-i18next";

const HasNoJob = ({ name, location }) => {
  const { t, i18n } = useTranslation();

  return (
    <div className="no-job">
      <div className="no-job__title">
       {t("skill.no")} <b className="uppercase">{name}</b> {t("role.in")} {" "}
        {location || "your preferred location"}
      </div>

      <div className="no-job__title">
        {t("skill.try")}
        <Link to="/career-advice" className="no-job__title__link">
          <u>{t("skill.ex")}</u>
        </Link>{" "}
        {t("skill.other")}
      </div>

      <div className="no-job__title">
      {t("skill.orEx")} <b>FASTJOB</b> {t("skill.too")}
      </div>
    </div>
  );
};

export default HasNoJob;
