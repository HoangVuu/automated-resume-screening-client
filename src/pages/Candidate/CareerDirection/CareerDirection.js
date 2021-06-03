import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import "./CareerDirection.scss";
import { Tabs, Tab } from "react-bootstrap";
import HasNoJob from "./HasNoJob";
import MatchSkillCard from "components/MatchSkill/MatchSkillCard/MatchSkillCard";

import { numberToArray } from "utils/index";
import { getCareerSkillProAction } from "state/actions/careerAction";
import isEmpty from "lodash/isEmpty";
import Loading from "components/Loading/Loading";
import {
  formatProvince,
  formatProvinceName,
  formatProvinceNameBrief
} from "utils/index";
import SimJob from "components/SimJob/SimJob";

const CareerDirection = () => {
  const { skill } = useParams();
  const dispatch = useDispatch();
  const skillData = useSelector((state) => state.jobDomain.careerSkill);
  let { provinces } = useSelector((state) => state.cv);

  const [loading, setLoading] = useState(false);

  const param = skill && skill.replaceAll("-", " ");

  console.log("param", param);

  useEffect(() => {
    console.log("skill", skillData && isEmpty(skillData));
    if (isEmpty(skillData)) {
      setLoading(true);

      param &&
        dispatch(getCareerSkillProAction({ skill: param }))
          .then((res) => setLoading(false))
          .catch((err) => console.log("err", err));
    }
  }, []);

  return (
    <div className="career-direction">
      <Loading loading={loading} />
      <div className="career-role__row"></div>

      <div className="career-role__header">
        <div className="container">
          <h2 className="career-role__header__title uppercase">{param}</h2>
          <p className="career-role__header__sub-title">
            Acquiring this skill can open up more career directions for you
          </p>
        </div>
      </div>
      <div className="container">
        <Link to="/career-advice" className="career-role__back row">
          <LeftOutlined className="career-role__back__icon" />
          <span>Explore careers</span>
        </Link>
        {skillData.domain_matched &&
        skillData.domain_matched.length !== 0 &&
        skillData.jobs_in_hot_province &&
        skillData.jobs_in_hot_province.length !== 0 ? (
          <>
            <section className="css-jp3yaf css-w7terr css-16ul3l9">
              <div className="css-qsdgf9 css-7b1cf9">
                <h2 className="career-direction__title">Career directions</h2>
              </div>
              <div className="css-qsdgf9">
                <p className="css-1tpa9ur career-direction__sub-title">
                  {skillData.domain_matched && skillData.domain_matched.length}{" "}
                  roles where this skill is commonly valued by employers
                </p>
                <div
                  className={
                    skillData.domain_matched.length < 3
                      ? "career-direction__list content-center"
                      : "career-direction__list-grid"
                  }
                >
                  {!isEmpty(skillData) &&
                    skillData.domain_matched &&
                    skillData.domain_matched.length &&
                    skillData.domain_matched.map((item, index) =>
                      skillData.domain_matched.length < 3 ? (
                        <div className="career-direction__list__item">
                          <MatchSkillCard
                            key={index}
                            name={item.domain.name}
                            logo={item.domain.logo}
                            content={item.domain.content}
                            min={item.salary.min}
                            max={item.salary.max}
                          />
                        </div>
                      ) : (
                        <MatchSkillCard
                          key={index}
                          name={item.domain.name}
                          logo={item.domain.logo}
                          content={item.domain.content}
                          min={item.salary.min}
                          max={item.salary.max}
                        />
                      )
                    )}
                  {/* <MatchSkillCard  className="career-direction__list__item" /> */}
                  {/* <MatchSkillCard className="career-direction__list__item"/> */}
                </div>
              </div>
            </section>

            {/* Tabs earn in role */}
            {!isEmpty(skillData) && skillData.jobs_in_hot_province && (
              <div className="career-role__container">
                <h2 className="career-direction__title">Jobs on FASTJOB</h2>

                <Tabs
                  className="career-role__tabs"
                  defaultActiveKey="All"
                  style={{ "--sizeTab": skillData.jobs_in_hot_province.length }}
                >
                  {skillData.jobs_in_hot_province.length &&
                    skillData.jobs_in_hot_province.map((item, index) => (
                      <Tab
                        eventKey={formatProvinceNameBrief(
                          formatProvince(provinces, String(item.province_id))
                        )}
                        title={formatProvinceNameBrief(
                          formatProvince(provinces, String(item.province_id))
                        )}
                        key={index}
                      >
                        {item.jobs.length ? (
                          <>
                            <p
                              className="career-role__skills__sub-title"
                              style={{ marginBottom: "40px" }}
                            >
                              {item.jobs.length}{" "}
                              {item.jobs.length > 1 ? "jobs" : "job"} found
                              where this skill is valued by employers
                            </p>

                            <div>
                              {item.jobs.map(
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
                              )}
                            </div>
                          </>
                        ) : (
                          <>
                            <HasNoJob
                              name={param}
                              location={formatProvince(
                                provinces,
                                String(item.province_id)
                              )}
                            />
                          </>
                        )}
                      </Tab>
                    ))}
                </Tabs>
              </div>
            )}
          </>
        ) : (
          <>
            <div
              style={{
                height: "70px",
                backgroundColor: "rgba(149, 86, 183, 0.05)"
              }}
            ></div>
            <HasNoJob name={param} />
            <div
              style={{
                height: "70px",
                backgroundColor: "rgba(149, 86, 183, 0.05)"
              }}
            ></div>
            <div
              style={{
                height: "100px",
                backgroundColor: "#F0F0F0"
              }}
            ></div>
          </>
        )}
      </div>
    </div>
  );
};

export default CareerDirection;
