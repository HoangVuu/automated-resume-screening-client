/* eslint-disable jsx-a11y/anchor-is-valid */
import SimJob from "components/SimJob/SimJob";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./JobDetail.scss";
import ApplyModal from "components/Modals/Apply/ApplyModal";
import LoginModal from "components/Modals/LoginModal/LoginModal";
import { HeartOutlined, HeartFilled, LoadingOutlined } from "@ant-design/icons";

import { useDispatch } from "react-redux";
import ContentLoader from "react-content-loader";
import { candidateJobSimilarAction } from "state/actions/candidateJobAction";
import { getDiffTime, toastErr, formatProvince } from "utils/index";
import { useSelector } from "react-redux";
import { format_date, toast } from "utils/index";
import { Link, useLocation } from "react-router-dom";
import JobSearchClick from "components/Forms/JobSearchClick/JobSearchClick";
import { getJobDetail, saveJob } from "services/jobServices";
import MissingSkill from "./MissingSkill";
import { useTranslation } from "react-i18next";

const DEFAULT = {
  apply: false,
  authen: false
};

const CandidateJobDetail = ({ history }) => {
  const { t, i18n } = useTranslation();

  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [job, setJob] = useState({});
  const [showModal, toggleShowModal] = useState(DEFAULT);
  const [loadingSave, setLoadingSave] = useState();

  const provinceTotal = useSelector((state) => state.cv.provinces);
  const { token } = useSelector((state) => state.auth.candidate);
  const simJob = useSelector(
    (state) => state?.candidateJob.candidateSimilarJob
  );

  const toggleModal = () => {
    if (!token) {
      toggleShowModal({ ...DEFAULT, authen: true });
    } else {
      toggleShowModal({ ...DEFAULT, apply: true });
    }
  };
  const onCancel = () => toggleShowModal(DEFAULT);

  const params = useLocation().search;

  const {
    job_title,
    description,
    benefit,
    contract_type,
    deadline,
    amount,
    requirement,
    salary,
    provinces,
    company_name,
    company_logo,
    company_background,
    posted_in,
    saved,
    general_skills,
    soft_skills,
    candSoftSkill,
    candTechSkills
  } = job;

  const [save, setSave] = useState();

  const handleSaveJP = async () => {
    if (!token) {
      toast({ type: "info", message: "Please login to save job" });
    } else {
      setLoadingSave(true);

      setSave(!save);
      const status = save ? 0 : 1;

      await saveJob(id, status, token)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => toastErr(err))
        .finally(() => setLoadingSave(false));
    }
  };

  const diffTechSkills =
    general_skills &&
    candTechSkills?.length &&
    general_skills
      ?.split("|")
      .filter((value) => !candTechSkills?.includes(value));

  const diffSoftSkills =
    soft_skills &&
    candSoftSkill?.length &&
    soft_skills?.split("|").filter((value) => !candSoftSkill?.includes(value));
  console.log("filter", diffSoftSkills);

  const getProvince = () => {
    return (
      provinces &&
      provinces.map((p) => formatProvince(provinceTotal, p)).join(", ")
    );
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

  useEffect(() => {
    setLoading(true);

    const fetchJob = async () => {
      await getJobDetail(id, token)
        .then(async (res) => {
          setJob({
            ...res.data.data.post,
            saved: res.data.data.saved_date,
            candSoftSkill: res.data.data.cand_soft_skills?.split("|") || null,
            candTechSkills:
              res.data.data.cand_technical_skills?.split("|") || null
          });
          setSave(res.data.data.saved_date ? true : false);
        })
        .catch((err) => {
          toastErr(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchJob();
    id && dispatch(candidateJobSimilarAction(id));
  }, [id]);

  return (
    <>
      <div className="detail-page">
        <div
          id="search-jobs"
          className="search-jobs-container search-jobs-widget detail-page__search"
        >
          <div className="container">
            <JobSearchClick />
          </div>
        </div>

        {loading ? (
          <div className="container" style={{ marginTop: "30px" }}>
            <MyLoader />
          </div>
        ) : (
          <>
            <div className="container" style={{ backgroundColor: "#fff" }}>
              <div className="row detail-page__container">
                <div className="col-ct-8">
                  {/* <div className="JobTitle"> */}
                  <div className="detail-page__poster">
                    <img
                      src={
                        company_background ||
                        "/assets/img/company-default-bg.jpg"
                      }
                      alt="company background"
                      className="detail-page__poster__big"
                    />
                    <img
                      src={
                        company_logo || "/assets/img/company-default-logo.png"
                      }
                      alt="company logo"
                      className="detail-page__poster__logo"
                    />
                  </div>

                  <div className="detail-page__title">
                    <h1>{job_title}</h1>
                    <div>
                      <div className="text detail-page__company">
                        {company_name}
                      </div>
                      <div className="text detail-page__province">
                        {getProvince()}
                      </div>
                    </div>
                    <div className="box">
                      <a style={{ fontSize: "17px" }} onClick={toggleModal}>
                        Apply Now
                      </a>
                      <span>
                        <button
                          className="state-picker-button"
                          onClick={handleSaveJP}
                        >
                          <span>
                            {loadingSave ? (
                              <LoadingOutlined
                                style={{ fontSize: "18px", fontWeight: "700" }}
                              />
                            ) : !save ? (
                              <>
                                <HeartOutlined
                                  style={{
                                    fontSize: "18px",
                                    fontWeight: "700"
                                  }}
                                  className=""
                                />
                                {/* Save Job */}
                              </>
                            ) : (
                              <>
                                <HeartFilled
                                  style={{
                                    fontSize: "18px",
                                    fontWeight: "700"
                                  }}
                                  className=""
                                />
                                {/* Saved Job */}
                              </>
                            )}
                          </span>
                        </button>
                      </span>
                    </div>
                    <div className="detail-page__border"></div>
                  </div>

                  <div className="JobDetail">
                    <div
                      id="jobDetailsSection"
                      className="job-detail-section-container"
                      style={{
                        paddingTop: "23px",
                        marginLeft: "0",
                        marginRight: "0"
                      }}
                    >
                       
                       <div className="job-detail-section-item">
                        <div className="job-detail-section-itemKey text-bold">
                        {t("jobList.deadline")}: 
                        </div>
                        <span>{format_date(deadline)}</span>
                      </div>
                      <div className="job-detail-section-item">
                        <div className="job-detail-section-itemKey text-bold">
                        {t("jobList.salary")}:
                        </div>
                        <span>{salary}</span>
                      </div>
                      <div className="job-detail-section-item">
                        <div className="job-detail-section-itemKey text-bold">
                        {t("jobList.workType")}:
                        </div>
                        <span>{contract_type}</span>
                      </div>
                      <div className="job-detail-section-item">
                        <div className="job-detail-section-itemKey text-bold">
                        {t("jobList.amount")}:
                        </div>
                        <span>
                          {amount === 0
                            ? "Không giới hạn số lượng"
                            : `${amount} ứng viên`}
                        </span>
                      </div>
                    </div>
                    {((diffTechSkills && diffTechSkills?.length) ||
                      (diffSoftSkills && diffSoftSkills?.length)) && (
                      <div style={{ marginTop: "25px" }}>
                        <h2 className="jobSectionHeader">
                          <b style={{ fontSize: "1.125rem" }}>
                            Resume insights
                          </b>
                        </h2>
                        <p className="detail-page__miss-sub">
                          Here's how your resume aligns with the job description
                        </p>

                        {diffTechSkills && diffTechSkills?.length && (
                          <MissingSkill
                            title=" Your resume might be missing some technical skills"
                            skills={
                              diffTechSkills.length > 10
                                ? diffTechSkills?.slice(0, 10)
                                : diffTechSkills
                            }
                          />
                        )}
                        {diffSoftSkills && diffSoftSkills?.length && (
                          <MissingSkill
                            title="Your resume might be missing some soft skills"
                            skills={
                              diffSoftSkills.length > 10
                                ? diffSoftSkills?.slice(0, 10)
                                : diffSoftSkills
                            }
                          />
                        )}

                        <div className="detail-page__resume">
                          <span className="detail-page__resume__title">
                            Make sure your resume is up to date
                          </span>
                          <span className="detail-page__resume__sub-title">
                            Changes may take some time to be reflected in the
                            above message.
                          </span>

                          <button className="detail-page__resume__button">
                            <Link to="/profile">Update Resume</Link>
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="JobDetail__wrapper">
                      {/* <p>Develop Zalo for Work's features</p> */}
                      <div>
                        <h2 className="jobSectionHeader">
                          <b style={{ fontSize: "1.125rem" }}>Description: </b>
                        </h2>
                        <div
                          dangerouslySetInnerHTML={{ __html: description }}
                        />

                        <h2 className="jobSectionHeader">
                          <b style={{ fontSize: "1.125rem" }}>
                            Role Requirements:{" "}
                          </b>
                        </h2>
                        <div
                          dangerouslySetInnerHTML={{ __html: requirement }}
                        />

                        <h2 className="jobSectionHeader">
                          <b style={{ fontSize: "1.125rem" }}>
                            Perks and Benefits:{" "}
                          </b>
                        </h2>
                        <div dangerouslySetInnerHTML={{ __html: benefit }} />
                      </div>
                    </div>

                    <div className="jobsearch-JobMetadataFooter">
                      <strong className="icl-u-textColor--success">
                        {company_name}
                      </strong>
                      <div style={{ marginTop: "5px" }}>
                        {getDateDiff(posted_in)}
                      </div>
                      <div
                        id="originalJobLinkContainer"
                        className="icl-u-lg-inline icl-us-xs-hide"
                      >
                        <p style={{ paddingTop: "5px" }}>Original job</p>
                      </div>
                      <div>
                        <div>
                          <div>
                            <button
                              className="mosaic-reportcontent-button desktop"
                              type="button"
                            >
                              <i className="fas fa-flag"></i>
                              Report job
                            </button>
                          </div>
                          <div className="mosaic-reportcontent-content"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-ct-4">
                  <div className="ComSidebar">
                    <div className="jobsearch-CompanyAvatar">
                      <div className="jobsearch-CompanyAvatar-card">
                        <h2 className="right-title">Company Info</h2>
                        <div className="body">
                          <div className="jobsearch-CompanyAvatar-form">
                            <div>
                              <div>
                                <div className="jobsearch-CompanyAvatar-buttonContainer">
                                  <div className="jobsearch-CompanyAvatar-radius">
                                    <img
                                      className="jobsearch-CompanyAvatar-image"
                                      src={
                                        company_logo ||
                                        "/assets/img/company-default-logo.png"
                                      }
                                      alt="company logo"
                                    />
                                  </div>
                                  <div className="jobsearch-CompanyAvatar-button">
                                    <button
                                      className="icl-Button  right-button"
                                      type="button"
                                    >
                                      Follow
                                    </button>
                                  </div>
                                  <div className="jobsearch-CompanyAvatar-cta">
                                    Get job updates from {company_name}
                                  </div>
                                  <div className="name-rating">
                                    <a className="jobsearch-CompanyAvatar-companyLink">
                                      {company_name}
                                    </a>
                                    <div className="rating">
                                      <div className="icl-Ratings-starsWrapper">
                                        <div className="icl-Ratings-starsUnfilled">
                                          <div
                                            className="icl-Ratings-starsFilled"
                                            style={{
                                              width: "84.8px"
                                            }}
                                          ></div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="jobsearch-CompanyAvatar-description">
                                    Whether it's helping a vulnerable child,
                                    making highways safer or restoring salmon
                                    habitat, the work that we do matters to the
                                    people of ...
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="jobsearch-CompanyAvatar"
                      style={{ width: "250px" }}
                    >
                      <div
                        className="jobsearch-CompanyAvatar-card"
                        style={{ width: "250px" }}
                      >
                        <h2 className="right-title">Let employers find you</h2>
                        <div className="body">
                          <div className="jobsearch-CompanyAvatar-form">
                            <div>
                              <div>
                                <div className="jobsearch-CompanyAvatar-buttonContainer">
                                  <div className="jobsearch-CompanyAvatar-cta">
                                    Thousands of employers search for candidates
                                    on our website
                                  </div>
                                  <div className="jobsearch-CompanyAvatar-button">
                                    <Link
                                      className="icl-Button right-button"
                                      to="/profile"
                                    >
                                      Upload your resume
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container">
              <h2 className="sim-name">Similar Job</h2>
              <p style={{ fontStyle: "italic" }}>
                We found {simJob.length} similar jobs
              </p>
              <div className="row">
                <div
                  className="col-ct-8"
                  style={{
                    backgroundColor: "#fff",
                    padding: "0 20px 20px 20px",
                    marginBottom: "20px"
                  }}
                >
                  {simJob.length !== 0 &&
                    simJob.map(
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
                            provinces={provinceTotal}
                          />
                        );
                      }
                    )}
                  <div className="sim-name__more">
                    <Link to="/find-jobs">See more jobs ... </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <ApplyModal
        visible={showModal.apply}
        onCancel={onCancel}
        {...{
          company_name,
          job_title,
          token,
          jp_id: id,
          location: getProvince()
        }}
      />

      <LoginModal show={showModal.authen} toggleModal={onCancel} />
    </>
  );
};

export default CandidateJobDetail;

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={710}
    height={600}
    viewBox="0 0 710 600"
    backgroundColor="#b7b3b3"
    foregroundColor="#ffffff"
    {...props}
  >
    <rect x="0" y="10" rx="0" ry="0" width="750" height="20" />
    <rect x="0" y="40" rx="0" ry="0" width="300" height="16" />
    <rect x="0" y="90" rx="0" ry="0" width="150" height="14" />
    <rect x="0" y="112" rx="0" ry="0" width="750" height="14" />
    <rect x="0" y="135" rx="0" ry="0" width="750" height="14" />
    <rect x="0" y="177" rx="0" ry="0" width="750" height="20" />
    <rect x="0" y="207" rx="0" ry="0" width="300" height="16" />
    <rect x="0" y="246" rx="0" ry="0" width="150" height="14" />
    <rect x="0" y="271" rx="0" ry="0" width="750" height="14" />
    <rect x="0" y="296" rx="0" ry="0" width="750" height="14" />
    <rect x="0" y="344" rx="0" ry="0" width="750" height="20" />
    <rect x="0" y="376" rx="0" ry="0" width="300" height="16" />
    <rect x="0" y="414" rx="0" ry="0" width="150" height="14" />
    <rect x="0" y="438" rx="0" ry="0" width="750" height="14" />
    <rect x="0" y="464" rx="0" ry="0" width="750" height="14" />
    <rect x="0" y="344" rx="0" ry="0" width="750" height="20" />
    <rect x="0" y="414" rx="0" ry="0" width="150" height="14" />
    <rect x="0" y="344" rx="0" ry="0" width="750" height="20" />
    <rect x="0" y="344" rx="0" ry="0" width="750" height="20" />
    <rect x="0" y="344" rx="0" ry="0" width="750" height="20" />
    <rect x="0" y="414" rx="0" ry="0" width="150" height="14" />
    <rect x="0" y="344" rx="0" ry="0" width="750" height="20" />
    <rect x="0" y="344" rx="0" ry="0" width="750" height="20" />
    <rect x="0" y="344" rx="0" ry="0" width="750" height="20" />
  </ContentLoader>
);
