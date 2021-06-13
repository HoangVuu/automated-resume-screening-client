import React from "react";
import "./JobItem.scss";
import { FullscreenOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

import JobDetail from "components/JobItem/JobDetail";
import { getDiffTime, formatProvince, formatProvinceEn } from "utils/index";
import history from "state/history";
import { useTranslation } from "react-i18next";
import { getDate } from "date-fns";

const JobItem = ({
  jobId,
  curSelect,
  onChangeSelect,
  top,
  bottom,
  jobTitle,
  company,
  salary,
  jobDescription,
  postedIn,
  contractType,
  provinces,
  provinceId
}) => {
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

    return salary;
  };

  const getLangContractType = (type) => {
    if (type === "Toàn thời gian") {
      type = i18n.language === "vi" ? "Toàn thời gian" : "Fulltime";
    } else if (type === "Bán thời gian") {
      type = i18n.language === "vi" ? "Bán thời gian" : "Parttime";
    } else if (type === "Thực tập") {
      type = i18n.language === "vi" ? "Thực tập" : "Internship";
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

  return (
    <>
      <div
        className={`jobsearch-SerpJobCard unifiedRow row result clickcard ${
          jobId === curSelect ? "vjs-highlight" : ""
        }`}
        onClick={() => onChangeSelect(jobId)}
      >
        <Tooltip placement="bottom" title="Show detail on page">
          <FullscreenOutlined
            className="job-expand"
            onClick={() => {
              history.push(`/job-detail/${jobId}`);
            }}
          />
        </Tooltip>
        <h2 className="job-title">
          <p className="jobtitle turnstileLink">{jobTitle}</p>
        </h2>
        <div className="job-detail">
          <div>
            <span className="company-name">
              <p>{company}</p>
            </span>
            <span className="remote-bullet">•</span>
            <span className="contact-type">
              {getLangContractType(contractType)}
            </span>
            <span className="location accessible-contrast-color-location">
              {getProvince()}
            </span>
          </div>
        </div>
        <div className="salarySnippet holisticSalary">
          <span className="salary no-wrap">
            <span>{t("jobList.salary")}: &nbsp; </span>
            <span className="salaryText">{getLangSalary(salary)}</span>
          </span>
        </div>
        <div
          className="summary show-less"
          dangerouslySetInnerHTML={{ __html: jobDescription }}
        ></div>
        <div className="jobsearch-SerpJobCard-footer">
          <div className="jobsearch-SerpJobCard-footerActions">
            <div className="result-link-bar-container">
              <div className="result-link-bar">
                <span className="date"> {getDateDiff(postedIn)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {jobId === curSelect && (
        <JobDetail
          id={jobId}
          top={top}
          onChangeSelect={onChangeSelect}
          bottom={bottom}
        />
      )}
    </>
  );
};

export default JobItem;
