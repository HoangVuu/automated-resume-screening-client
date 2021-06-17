import {
  StarFilled,
  CaretUpOutlined,
  StockOutlined
} from "@ant-design/icons";

import React, { useEffect, useState } from "react";
import "./Statistics.scss";
import { numberToArray } from "utils/index";
import { useTranslation } from "react-i18next";

const Statistics = ({ total, min, max }) => {
  const { t, i18n } = useTranslation();

  return (
    <div className="statistics">
      <div className="statistics__item">
        <p className="statistics__item__number">
          {total > 0 && total < 10
            ? "0" + total?.toString()
            : total?.toString() || 112}
        </p>
        <div className="statistics__item__text">
          {i18n.language === "en" ? (
            <>
              Jobs on <strong>FASTJOB</strong> right <br />
              now
            </>
          ) : (
            <>
              Các việc làm hiện có trên <strong>FASTJOB</strong> <br/> ngay bây giờ
            </>
          )}
        </div>
      </div>

      <div className="statistics__item">
        <p className="statistics__item__number">
          <StockOutlined className="statistics__item__number__stock" />$
          {min || 500}
        </p>
        <div className="statistics__item__text">
          {i18n.language === "en" ? (
            <>
              Minimum common <br />
              salary
            </>
          ) : (
            <>
              Thu nhập bình quân <br /> tối thiểu
            </>
          )}
        </div>
      </div>

      <div className="statistics__item">
        <p className="statistics__item__number">
          <CaretUpOutlined className="statistics__item__number__care" /> $
          {max || 7000}{" "}
        </p>
        <div className="statistics__item__text">
          {i18n.language === "en" ? (
            <>
              Maximum common <br />
              salary
            </>
          ) : (
            <>
              Thu nhập bình quân <br /> tối đa
            </>
          )}
        </div>
      </div>

      <div className="statistics__item">
        <p className="statistics__item__number">79</p>
        <div className="statistics__item__text">{t("findJobSignIn.detail.satisfaction")}</div>
        {numberToArray(5).map((item, i) => (
          <StarFilled className="statistics__item__icon-fill" key={i} />
        ))}
      </div>
    </div>
  );
};

export default Statistics;
