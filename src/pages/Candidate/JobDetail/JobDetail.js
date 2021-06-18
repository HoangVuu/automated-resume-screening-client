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
import { getDiffTime, toastErr, formatProvince, formatProvinceEn } from "utils/index";
import { useSelector } from "react-redux";
import { format_date, toast } from "utils/index";
import { Link } from "react-router-dom";
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

  const profile = useSelector((state) => state.profile.candidateProfile);
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
      toast({
        type: "info",
        message:
          i18n.language === "en"
            ? "Please login to save job"
            : "Vui lòng đăng nhập để lưu việc làm"
      });
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

  const getProvince = () => {
    let result = "";

    if (i18n.language === "vi") {
      result =
        provinces &&
        provinces.map((p) => formatProvince(provinceTotal, p)).join(", ");
    } else {
      result =
        provinces &&
        provinces.map((p) => formatProvinceEn(provinceTotal, p)).join(", ");
    }

    return result;
  };

  const getLangSalary = (salary) => {
    if (salary) {
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

  const getAmount = (amount) => {
    if (amount) {
      if (
        amount === "Không giới hạn ứng viên" ||
        amount === "Không giới hạn" ||
        parseInt(amount) === 0
      ) {
        amount = t("jobList.noLimit");
      } else if (parseInt(amount) === 1) {
        amount = `${amount} ${t("jobList.candidate")}`;
      } else if (parseInt(amount) > 1) {
        amount = `${amount} ${t("jobList.candidates")}`;
      }
    }

    return amount;
  };
  
  const getLangContractType = (type) => {
    if (type) {
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
                        {t("jobList.apply")}
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
                        <span>{getLangSalary(salary)}</span>
                      </div>
                      <div className="job-detail-section-item">
                        <div className="job-detail-section-itemKey text-bold">
                          {t("jobList.workType")}:
                        </div>
                        <span>{getLangContractType(contract_type)}</span>
                      </div>
                      <div className="job-detail-section-item">
                        <div className="job-detail-section-itemKey text-bold">
                          {t("jobList.amount")}:
                        </div>
                        <span>
                          {getAmount(amount)}
                        </span>
                      </div>
                    </div>
                    {((diffTechSkills && diffTechSkills?.length) ||
                      (diffSoftSkills && diffSoftSkills?.length)) && (
                      <div style={{ marginTop: "25px" }}>
                        <h2 className="jobSectionHeader">
                          <b style={{ fontSize: "1.125rem" }}>
                            {t("skillSuggest.insight")}
                          </b>
                        </h2>
                        <p className="detail-page__miss-sub">
                          {t("skillSuggest.here")}
                        </p>

                        {diffTechSkills && diffTechSkills?.length && (
                          <MissingSkill
                            title={t("skillSuggest.your")}
                            skills={
                              diffTechSkills.length > 10
                                ? diffTechSkills?.slice(0, 10)
                                : diffTechSkills
                            }
                          />
                        )}
                        {diffSoftSkills && diffSoftSkills?.length && (
                          <MissingSkill
                            title={t("skillSuggest.yourS")}
                            skills={
                              diffSoftSkills.length > 10
                                ? diffSoftSkills?.slice(0, 10)
                                : diffSoftSkills
                            }
                          />
                        )}

                        <div className="detail-page__resume">
                          <span className="detail-page__resume__title">
                            {t("skillSuggest.make")}
                          </span>
                          <span className="detail-page__resume__sub-title">
                            {t("skillSuggest.change")}
                          </span>

                          <button className="detail-page__resume__button">
                            <Link to="/profile">
                              {t("skillSuggest.update")}
                            </Link>
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="JobDetail__wrapper">
                      <div>
                        <h2 className="jobSectionHeader">
                          <b style={{ fontSize: "1.125rem" }}>
                            {t("jobList.des")}:{" "}
                          </b>
                        </h2>
                        <div
                          dangerouslySetInnerHTML={{ __html: description }}
                        />

                        <h2 className="jobSectionHeader">
                          <b style={{ fontSize: "1.125rem" }}>
                            {t("jobList.roleReq")}:{" "}
                          </b>
                        </h2>
                        <div
                          dangerouslySetInnerHTML={{ __html: requirement }}
                        />

                        <h2 className="jobSectionHeader">
                          <b style={{ fontSize: "1.125rem" }}>
                            {t("jobList.benefit")}:{" "}
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
                        <p style={{ paddingTop: "5px" }}>
                          {i18n.language === "en" && "Original job"}
                        </p>
                      </div>
                      <div>
                        <div>
                          <div>
                            <button
                              className="mosaic-reportcontent-button desktop"
                              type="button"
                            >
                              <i className="fas fa-flag"></i>
                              {t("detail.report")}
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
                        <h2 className="right-title">{t("detail.company")}</h2>
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
                                      {t("detail.follow")}
                                    </button>
                                  </div>
                                  <div className="jobsearch-CompanyAvatar-cta">
                                    {t("detail.jobUpdate")} {company_name}
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
                        <h2 className="right-title">{t("detail.let")}</h2>
                        <div className="body">
                          <div className="jobsearch-CompanyAvatar-form">
                            <div>
                              <div>
                                <div className="jobsearch-CompanyAvatar-buttonContainer">
                                  <div className="jobsearch-CompanyAvatar-cta">
                                    {t("detail.thousand")}
                                  </div>
                                  <div className="jobsearch-CompanyAvatar-button">
                                    <Link
                                      className="icl-Button right-button"
                                      to="/profile"
                                    >
                                      {profile.isHaveResume
                                        ? t("detail.update")
                                        : t("detail.upload")}
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
              <h2 className="sim-name">{t("detail.similar")}</h2>
              <p style={{ fontStyle: "italic" }}>
                {i18n.language === "en" ? "We found" : "Chúng tôi tìm thấy"}{" "}
                {simJob.length}{" "}
                {i18n.language === "en"
                  ? simJob.length > 1
                    ? "similar jobs"
                    : "similar job"
                  : "việc làm tương tự"}
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
                    <Link to="/find-jobs">{t("detail.see")}... </Link>
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
