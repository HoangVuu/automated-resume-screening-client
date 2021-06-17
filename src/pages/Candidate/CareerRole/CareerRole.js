import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./CareerRole.scss";
import { Link } from "react-router-dom";
import {
  StarTwoTone,
  StarFilled,
  CaretUpOutlined,
  StockOutlined,
  LeftOutlined
} from "@ant-design/icons";
import { numberToArray } from "utils/index";
import { Tabs, Tab } from "react-bootstrap";
import CareerEarn from "./CareerEarn";
import { getCareerRoleProAction } from "state/actions/careerAction";
import isEmpty from "lodash/isEmpty";
import Loading from "components/Loading/Loading";
import {
  formatProvince,
  formatProvinceName,
  formatProvinceNameBrief
} from "utils/index";
import SimJob from "components/SimJob/SimJob";
import HasNoPost from "./HasNoPost";
import { useTranslation } from "react-i18next";

const CareerRole = (props) => {
  const { t, i18n } = useTranslation();

  const { id } = useParams();
  // const { role } = useParams();

  const dispatch = useDispatch();
  const domainData = useSelector((state) => state.jobDomain.careerDomain);
  let { provinces } = useSelector((state) => state.cv);

  const [loading, setLoading] = useState(false);

  let provinceId =
    !isEmpty(domainData) &&
    provinces.length &&
    domainData.provinceSummary.map((item) => String(item.province_id));

  const provinceNames =
    provinceId.length &&
    provinceId.map((p) =>
      formatProvinceNameBrief(formatProvince(provinces, p))
    );

  console.log("provinceNames", provinceNames);

  useEffect(() => {
    if (isEmpty(domainData)) {
      setLoading(true);

      dispatch(getCareerRoleProAction({ domain_id: id }))
        .then((res) => setLoading(false))
        .catch((err) => console.log("err", err));
    }
  }, []);

  return (
    <div className="career-role">
      <Loading loading={loading} />
      {!isEmpty(domainData) && (
        <>
          <div className="career-role__row"></div>
          <div className="career-role__header">
            <div className="container">
              <h2 className="career-role__header__title">
                {domainData.domain.name}
              </h2>
              <p className="career-role__header__sub-title">
                Create user–friendly websites and multimedia content
              </p>
            </div>
          </div>
          <div className="container">
            <Link to="/career-advice" className="career-role__back row">
              <LeftOutlined className="career-role__back__icon" />
              <span>{t("role.explore")}</span>
            </Link>

            <div className="statistics career-role__general">
              <div className="statistics__item">
                <p className="career-role__general__top">
                  {i18n.language === "en"
                    ? "Job opportunities"
                    : "Cơ hội việc làm"}
                </p>
                <p className="statistics__item__number">
                  {domainData.totalJobsCount}
                </p>
                <div className="statistics__item__text">
                  {i18n.language === "en" ? (
                    <>
                      Jobs on <strong>FASTJOB</strong> right <br />
                      now
                    </>
                  ) : (
                    <>
                      Các việc làm hiện có trên <strong>FASTJOB</strong> <br />{" "}
                      ngay bây giờ
                    </>
                  )}
                </div>
              </div>

              <div className="statistics__item">
                <p className="career-role__general__top">{t("role.salary")}</p>
                <p className="statistics__item__number">
                  <StockOutlined className="statistics__item__number__stock" />$
                  {domainData.salary.min}
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
                <p className="career-role__general__top">{t("role.salary")}</p>
                <p className="statistics__item__number">
                  <CaretUpOutlined className="statistics__item__number__care" />{" "}
                  ${domainData.salary.max}
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
                <p className="career-role__general__top">
                  {t("findJobSignIn.detail.satisfaction")}
                </p>
                <p className="statistics__item__number">79</p>
                {numberToArray(5).map((item, i) => (
                  <StarFilled
                    className="statistics__item__icon-fill career-role__general__star"
                    key={i}
                  />
                ))}
                {/* {numberToArray(1).map((item, i) => (
                  <StarTwoTone
                    className="career-role__general__star"
                    twoToneColor="#F57C00"
                    key={i}
                  />
                ))} */}
                <div style={{ height: "22px" }}></div>
              </div>
            </div>

            {/* Detail information */}
            <div className="career-role__detail career-role__container">
              <h2 className="career-role__detail__title">
                {i18n.language === "en"
                  ? `What's it like to be a ${domainData.domain.name}`
                  : `Trở thành một ${domainData.domain.name} như thế nào`}
                ?
              </h2>
              <p className="career-role__detail__description">
                {domainData.domain.content.split("\\n")[0]}
              </p>

              <div className="career-role__detail__poster">
                <img src={domainData.domain.logo} alt="poster" />
              </div>
              <h3 className="career-role__detail__task">{t("role.task")}</h3>
              <ul className="career-role__detail__list">
                {domainData.domain.tasks.length &&
                  domainData.domain.tasks.map((item) => (
                    <li className="career-role__detail__list__item">
                      {item.name}
                    </li>
                  ))}
              </ul>
              <p className="career-role__detail__text">
                {domainData.domain.content.split("\\n")[1]}
              </p>
            </div>

            {/* Tabs earn in role */}
            <div className="career-role__container">
              <h2 className="career-role__skills__title">
                {t("role.whatCan") + domainData.domain.name}?
              </h2>
              <Tabs
                className="career-role__tabs"
                defaultActiveKey="All"
                style={{ "--sizeTab": domainData.provinceSummary.length + 1 }}
              >
                <Tab eventKey="All" title="All">
                  <CareerEarn
                    role={domainData.domain.name}
                    min={domainData.salary.min}
                    max={domainData.salary.max}
                    total={domainData.totalJobsCount}
                  />
                </Tab>
                {domainData.provinceSummary.length &&
                  domainData.provinceSummary.map((item, index) => (
                    <Tab
                      eventKey={formatProvinceNameBrief(
                        formatProvince(provinces, String(item.province_id))
                      )}
                      title={formatProvinceNameBrief(
                        formatProvince(provinces, String(item.province_id))
                      )}
                      key={index}
                    >
                      <CareerEarn
                        province={formatProvince(
                          provinces,
                          String(item.province_id)
                        )}
                        role={domainData.domain.name}
                        min={item.salary.min}
                        max={item.salary.max}
                        total={item.totalJobsCount}
                        name={formatProvinceName(
                          formatProvince(provinces, String(item.province_id))
                        )}
                      />
                    </Tab>
                  ))}
              </Tabs>
            </div>

            {/* Become */}
            {/* <div className="career-role__become career-role__container">
              <h2 className="career-role__become__title">
                How to become a Frontend Developer
              </h2>
              <div className="row">
                <img
                  src="https://www.seek.com.au/career-advice/assets/6a548afa.svg"
                  alt="uni"
                />
              </div>
            </div> */}

            {/* Skills  */}
            <div className="career-role__skills career-role__container">
              <h2 className="career-role__skills__title">{t("role.skill")}</h2>
              <p className="career-role__skills__sub-title">
                <b>{i18n.language === "en" ? "Hi there" : "Chào bạn"},</b>{" "}
                {t("role.see")}
                {domainData.domain.name}
              </p>
              <div className="career-role__skills__container">
                {domainData.mainSkills.length &&
                  domainData.mainSkills
                    .map((item) => item.name)
                    .map((skill) => <SkillItem name={skill} />)}
              </div>
            </div>

            {/* Latest job  */}
            <div className="career-role__skills career-role__container">
              <h2 className="career-role__skills__title">{t("role.lastest")}</h2>
              <p
                className="career-role__skills__sub-title"
                style={{ marginBottom: "40px" }}
              >
                {i18n.language === 'en' ? "We found" : "Chúng tôi đã tìm ra"} {domainData.lastJobsPost.length}
                {domainData.lastJobsPost.length > 1 ? t("role.newPosts") :  t("role.newPost")} {t("role.of")}
                {domainData.domain.name}
              </p>

              {domainData.lastJobsPost.length ? (
                domainData.lastJobsPost.map(
                  ({
                    job_post_id,
                    contact_type,
                    job_description,
                    job_title,
                    company_background,
                    company_logo,
                    company_name,
                    posted_in,
                    province_id,
                    salary
                  }) => {
                    return (
                      <SimJob
                        id={job_post_id}
                        contractType={contact_type}
                        description={job_description}
                        title={job_title}
                        companyBg={company_background}
                        companyLogo={company_logo}
                        companyName={company_name}
                        postedIn={posted_in}
                        provinceId={province_id}
                        salary={salary}
                        provinces={provinces}
                      />
                    );
                  }
                )
              ) : (
                <HasNoPost name={domainData.domain.name} />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CareerRole;

const SkillItem = ({ name }) => {
  return (
    <div className="career-role__skills__container__item">
      {name}{" "}
      <i
        class="fas fa-laptop-code"
        style={{ marginRight: "20px", fontSize: "18px", color: "#0D3880" }}
      ></i>
    </div>
  );
};
