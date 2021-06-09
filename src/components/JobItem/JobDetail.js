import React, { useEffect, useState } from "react";
import "./JobDetail.scss";
import { HeartOutlined, HeartFilled, LoadingOutlined } from "@ant-design/icons";
import { Close } from "constants/svg";
import ContentLoader from "react-content-loader";
import ApplyModal from "components/Modals/Apply/ApplyModal";
import { getJobDetail, saveJob } from "services/jobServices";
import { format_date, toast, toastErr, formatProvince } from "utils/index";
import LoginModal from "components/Modals/LoginModal/LoginModal";
import { useSelector } from "react-redux";
import MissingSkillItem from "./MissingSkillItem";
import { Link } from "react-router-dom";

const DEFAULT = {
  apply: false,
  authen: false
};

function JobDetail({ id, top, onChangeSelect, bottom }) {
  const [showModal, toggleShowModal] = useState(DEFAULT);
  const [job, setJob] = useState({});
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth.candidate);
  const provinceTotal = useSelector((state) => state.cv.provinces);

  const toggleModal = () => {
    if (!token) {
      toggleShowModal({ ...DEFAULT, authen: true });
    } else {
      toggleShowModal({ ...DEFAULT, apply: true });
    }
  };
  const onCancel = () => toggleShowModal(DEFAULT);

  useEffect(() => {
    setLoading(true);
    const fetchJob = async () => {
      await getJobDetail(id, token)
        .then((res) => {
          setJob({
            ...res.data.data.post,
            candSoftSkill: res.data.data.cand_soft_skills?.split("|") || null,
            candTechSkills:
              res.data.data.cand_technical_skills?.split("|") || null,
            saved: res.data.data.saved_date
          });
          console.log("save", res.data.data.saved_date);
        })
        .catch((err) => {
          toastErr(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchJob();
  }, [token, job.saved_date]);

  const {
    job_title,
    description,
    benefit,
    contract_type,
    deadline,
    provinces,
    amount,
    requirement,
    salary,
    company_name,
    company_logo,
    company_background,
    saved_date,
    saved,
    general_skills,
    soft_skills,
    candSoftSkill,
    candTechSkills
  } = job;

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

  return (
    <>
      <div
        id="vjs-container"
        tabIndex="-1"
        style={{
          left: `450px`
        }}
      >
        {!loading ? (
          <>
            <Header
              onChangeSelect={onChangeSelect}
              toggleModal={toggleModal}
              {...{
                job_title,
                deadline,
                company_name,
                company_logo,
                company_background,
                saved_date,
                id,
                token,
                provinces,
                provinceTotal,
                saved
              }}
            />
            <div id="vjs-content">
              <div id="vjs-tab-top">
                <div className="job-detail-section">
                  <div
                    id="jobDetailsSection"
                    className="job-detail-section-container"
                  >
                    <div className="job-detail-section-title">
                      <div className="job-detail-section-title--main text-bold">
                        Job Details
                      </div>
                    </div>
                    <div className="job-detail-section-item">
                      <div className="job-detail-section-itemKey text-bold">
                        Salary:
                      </div>
                      <span>{salary}</span>
                    </div>
                    <div className="job-detail-section-item">
                      <div className="job-detail-section-itemKey text-bold">
                        {/* {"Hình thức làm việc: "} */}
                        Work type:
                      </div>
                      <span>{contract_type}</span>
                    </div>
                    <div className="job-detail-section-item">
                      <div className="job-detail-section-itemKey text-bold">
                        {/* {"Số lượng cần tuyển: "} */}
                        Amount:
                      </div>
                      <span>
                        {amount === 0
                          ? "Không giới hạn số lượng"
                          : `${amount} ứng viên`}
                      </span>
                    </div>
                  </div>

                  <div>
                    {(diffTechSkills?.length || diffSoftSkills?.length) && (
                      <div style={{ marginTop: "5px" }}>
                        <h2 className="jobSectionHeader">
                          <b style={{ fontSize: "1.125rem" }}>
                            Resume insights
                          </b>
                        </h2>
                        <p className="detail-page__miss-sub">
                          Here's how your resume aligns with the job description
                        </p>

                        {diffTechSkills?.length && (
                          <MissingSkillItem
                            title=" Your resume might be missing some technical skills"
                            skills={
                              diffTechSkills.length > 10
                                ? diffTechSkills?.slice(0, 10)
                                : diffTechSkills
                            }
                          />
                        )}
                        {diffSoftSkills?.length && (
                          <MissingSkillItem
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
                  </div>

                  <div id="jobDescriptionTitle">Full Job Description</div>
                  <div id="jobDescriptionText">
                    <p>
                      <b>Description: </b>
                    </p>
                    <div
                      dangerouslySetInnerHTML={{ __html: description }}
                    ></div>
                    <p></p>
                    <br />

                    <p>
                      <b>Role Requirements: </b>
                    </p>
                    <div dangerouslySetInnerHTML={{ __html: requirement }} />

                    <p></p>
                    <br />
                    <p>
                      <b>Perks and Benefits: </b>
                    </p>
                    <div dangerouslySetInnerHTML={{ __html: benefit }} />
                    <p></p>
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <Loading />
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
          location:
            provinces &&
            provinces.length !== 0 &&
            formatProvince(provinceTotal, provinces[0])
        }}
      />

      <LoginModal show={showModal.authen} toggleModal={onCancel} />
    </>
  );
}

export default JobDetail;

const Header = ({
  onChangeSelect,
  toggleModal,
  job_title,
  deadline,
  company_name,
  company_logo,
  company_background,
  saved_date,
  id,
  token,
  provinces,
  provinceTotal,
  saved
}) => {
  const [save, setSave] = useState(saved ? true : false);
  const [loading, setLoading] = useState(false);

  const handleSaveJP = async () => {
    if (!token) {
      toast({ type: "info", message: "Please login to save job" });
    } else {
      setLoading(true);
      setSave(!save);
      const status = save ? 0 : 1;

      await saveJob(id, status, token)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => toastErr(err))
        .finally(() => setLoading(false));
    }
  };

  return (
    <div id="vjs-header" className="vjs-header-no-shadow">
      <div id="vjs-image-wrapper">
        {/* <img
          src={company_background || "/assets/img/company-default-bg.jpg"}
          alt="company background"
          className="vjs-header-background"
        /> */}
        <img
          src={company_logo || "/assets/img/company-default-logo.png"}
          alt="company logo"
          className="vjs-header-logo"
        />
      </div>
      <div id="vjs-header-jobinfo">
        <div id="vjs-jobinfo">
          <div id="vjs-jobtitle">{job_title}</div>
          <div>
            <span id="vjs-cn">{company_name}</span>
            <span id="vjs-loc">
              <span> - </span>
              {provinces &&
                provinces.length !== 0 &&
                formatProvince(provinceTotal, provinces[0])}
            </span>
          </div>
          <div>Hạn nộp hồ sơ: {format_date(deadline)}</div>
        </div>
      </div>
      <div id="vjs-x">
        <button
          className="CloseButton vjs-x-button-close"
          onClick={() => onChangeSelect(null)}
        >
          {Close}
        </button>
      </div>
      <div id="apply-button-container">
        <div className="job-footer-button-row">
          <button
            className="view-apply-button blue-button"
            onClick={toggleModal}
          >
            Apply Now
          </button>
          <span id="state-picker-container" className="dd-wrapper">
            <button className="state-picker-button" onClick={handleSaveJP}>
              <span>
                {loading ? (
                  <LoadingOutlined
                    style={{ fontSize: "18px", fontWeight: "700" }}
                  />
                ) : !save ? (
                  <>
                    <HeartOutlined
                      style={{ fontSize: "18px", fontWeight: "700" }}
                      className="mr-5"
                    />
                    Save Job
                  </>
                ) : (
                  <>
                    <HeartFilled
                      style={{ fontSize: "18px", fontWeight: "700" }}
                      className="mr-5"
                    />
                    Saved Job
                  </>
                )}
              </span>
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

const Loading = (props) => (
  <div style={{ height: "100%", width: "100%", backgroundColor: "#fff" }}>
    <ContentLoader
      speed={2}
      width={684}
      height={400}
      viewBox="0 0 684 400"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="16" y="30" rx="0" ry="0" width="350" height="20" />
      <rect x="16" y="60" rx="0" ry="0" width="177" height="14" />
      <rect x="206" y="60" rx="0" ry="0" width="154" height="12" />
      <rect x="16" y="98" rx="0" ry="0" width="652" height="14" />
      <rect x="16" y="120" rx="0" ry="0" width="652" height="14" />
      <rect x="16" y="143" rx="0" ry="0" width="241" height="14" />
      <rect x="16" y="178" rx="0" ry="0" width="652" height="14" />
      <rect x="16" y="201" rx="0" ry="0" width="652" height="14" />
      <rect x="16" y="225" rx="0" ry="0" width="241" height="14" />
      <rect x="16" y="258" rx="0" ry="0" width="652" height="14" />
      <rect x="16" y="284" rx="0" ry="0" width="652" height="14" />
      <rect x="16" y="310" rx="0" ry="0" width="241" height="14" />
    </ContentLoader>
  </div>
);
