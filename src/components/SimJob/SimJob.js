import React, { useEffect, useState } from "react";

import "./SimJob.scss";
import history from "state/history";
import { getDiffTime, formatProvince, formatProvinceEn } from "utils/index";
import { useTranslation } from "react-i18next";

const SimJob = ({
  id,
  contractType,
  description,
  title,
  companyBg,
  companyLogo,
  companyName,
  postedIn,
  provinceId,
  salary,
  provinces
}) => {

  const [imgRatio, setImgRatio] = useState();

  const { t, i18n } = useTranslation();

  const getProvince = () => {
    let result = "";

    if(i18n.language === 'vi'){
      result = provinceId && provinceId
      .split(",")
      .map((p) => formatProvince(provinces, p))
      .join(", ");
    }
    else {
      result = provinceId && provinceId
      .split(",")
      .map((p) => formatProvinceEn(provinces, p))
      .join(", ");
    }

    return result;
  };

  const getLangSalary = (salary) => {
   if(salary){
    if (salary === "Thoả thuận") {
      salary = i18n.language === "vi" ? "Thoả thuận" : "Wage agreement";
    } else if (salary.includes("Lên đến")) {
      salary =
        i18n.language === "vi"
          ? salary
          : salary.replaceAll("Lên đến", "Up to ");
    } else if (salary.includes("Từ")) {
      salary =
        i18n.language === "vi" ? salary : salary.replaceAll("Từ", "From ");
    }
   }

    return salary;
  };

  const getLangContractType = (type) => {
    if(type){
      if (type === "Toàn thời gian") {
        type = i18n.language === "vi" ? "Toàn thời gian" : "Fulltime";
      } else if (type === "Bán thời gian") {
        type = i18n.language === "vi" ? "Bán thời gian" : "Parttime";
      } else if (type === "Thực tập") {
        type = i18n.language === "vi" ? "Thực tập" : "Internship";
      }
    }

    return type;
  };

  const getDateDiff = (post) => {
    let date =
      getDiffTime(post) > 1
        ? getDiffTime(post).toString() + t("jobList.days")
        : getDiffTime(post).toString() + t("jobList.day");

    if (getDiffTime(post) === 0) {
      date = t("jobList.justAdd");
    }

    return date;
  };

  const openJob = () => {
    window.open(`/job-detail/${id}`, "_blank", "noopener,noreferrer");
  };

  // const getProvince = () => {
  //   return (
  //     provinceId &&
  //     provinceId
  //       .split(",")
  //       .map((p) => formatProvince(provinces, p))
  //       .join(", ")
  //   );
  // };

  const getDays = (post) => {
    let date =
      getDiffTime(post) > 1
        ? getDiffTime(post).toString() + t("jobList.days")
        : getDiffTime(post).toString() + t("jobList.day");

    if (getDiffTime(post) === 0) {
      date = t("jobList.justAdd");
    }

    return date;
  };



  useEffect(() => {
    if (companyLogo) {
      let img = new Image();
      img.src = companyLogo;
      setImgRatio(img.naturalHeight / img.naturalWidth);
    }
  }, []);

  return (
    <div className="sim-job" onClick={openJob}>
      <div className="sim-job__top">
        <div className="sim-job__top__info">
          <p className="sim-job__top__info__title"> {title}</p>
          <div className="sim-job__top__info__group">
            <span className="sim-job__top__info__group__company">
              <span className="company-name">
                <p>{companyName}</p>
              </span>
              <span className="remote-bullet">•</span>
              <span className="sim-job__top__info__group__contract">
                {getLangContractType(contractType)}
              </span>
            </span>
          </div>
          <p className="sim-job__top__info__location">{getProvince()}</p>

          <p className="sim-job__top__info__salary">
            {t("jobList.salary")}: {" "} <b> {getLangSalary(salary)}</b>
          </p>
        </div>
        <div className="sim-job__top__logo">
          <img
            id="sim-job__top__logo__img"
            src={companyLogo || "/assets/img/company-default-logo.png"}
            alt="logo"
            // style={{paddingBottom: imgRatio && `${imgRatio} * 100%`}}
          />
        </div>
      </div>

      <div className="sim-job__bottom">
        <p
          className="sim-job__bottom__des show-less"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <p className="sim-job__bottom__time"> {getDays(postedIn)} </p>
      </div>
    </div>
  );
};

export default SimJob;
