import React from "react";
import "./CareerRole.scss";
import { AreaChartOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "utils/index";

const CareerEarn = ({ province, role, min, max, total, name }) => {
  const { t, i18n } = useTranslation();

  const getAnnual = (value) => {
    let res = value * 6 + value * 6 * 1.3;

    return res;
  };

  
  return (
    <div className="career-earn">
      <p className="career-earn__salary">
        {i18n.language === "en" && "The"}&nbsp;<b>{t("role.most")}</b>&nbsp;
        {t("role.in")} {name || t("role.vn")} {t("role.for")} {role}{" "}
        {t("role.is")}&nbsp;<b>${formatCurrency(getAnnual(min))}</b>
        {t("role.and")}
        <b>${formatCurrency(getAnnual(max))}</b>
      </p>

      <div className="career-earn__total row">
        <AreaChartOutlined className="career-earn__total__icon" />
        <span>
          <b>
            {total} {i18n.language === "en" ? "jobs" : "việc làm"}
          </b>{" "}
          {role}&nbsp;{t("role.in")} {province || "Việt Nam "}
        </span>
      </div>
    </div>
  );
};

export default CareerEarn;
