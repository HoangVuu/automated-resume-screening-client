import React from "react";
import "./CareerRole.scss";
import { AreaChartOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const CareerEarn = ({ province, role, min, max, total, name }) => {
  const { t, i18n } = useTranslation();

  return (
    <div className="career-earn">
      <p className="career-earn__salary">
        {i18n.language === "en" && 'The'}&nbsp;<b>{t("role.most")}</b>&nbsp;{t("role.in")} {name || t("role.vn")} for a {role} is
        between&nbsp;<b>${min}</b>&nbsp;and&nbsp;<b>${max}</b>
      </p>

      <div className="career-earn__total row">
        <AreaChartOutlined className="career-earn__total__icon"/>
        <span>
          <b>{total} {i18n.language === "en" ? "jobs" : "công việc"}</b> {role}&nbsp;{t("role.in")} {province || "total"}
        </span>
      </div>
    </div>
  );
};

export default CareerEarn;
