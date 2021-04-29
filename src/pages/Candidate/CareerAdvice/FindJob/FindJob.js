import { PushpinOutlined, EditOutlined } from "@ant-design/icons";
import JobSelectAdvance from "components/Forms/JobSelectAdvance/JobSelectAdvance";
import { getFormValues } from "redux-form";
import { FORM_KEY_JOB_SEARCH } from "state/reducers/formReducer";
import { Tabs, Tab } from "react-bootstrap";
import Statistics from "./Statistics";
import { Pagination, Select } from "antd";

import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import "./FindJob.scss";
import qs from "query-string";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import SimJob from "components/SimJob/SimJob";
import { toastErr } from "utils/index";
import ContentLoader from "react-content-loader";

import { candidateJobSuggestProAction } from "state/actions/candidateJobAction";
import { getSuggestJob } from "services/jobServices";

const FindJob = ({ history }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const profile = useSelector((state) => state.profile.candidateProfile);
  const formValues = useSelector((state) =>
    getFormValues(FORM_KEY_JOB_SEARCH)(state)
  );

  const token = useSelector((state) => state.auth.candidate.token);
  const provinceTotal = useSelector((state) => state.cv.provinces);
  const suggestJobs = useSelector(
    (state) => state.candidateJob?.candidateSuggestJob
  );

  const params = useLocation().search;

  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0
  });

  const { page, pageSize, total } = pagination;

  const [currentSelected, setCurrentSelected] = useState({
    domain: null,
    province: null
  });

  const onClickRole = () => {
    window.scrollTo(0, 0);
    setOverlay(true);
  };

  const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79"
  };

  const handleSubmit = async () => {
    const job_id = formValues
      ? formValues.job_title
        ? formValues.job_title.value
        : undefined
      : undefined;
    const province_id = formValues
      ? formValues.location
        ? formValues.location.value
        : undefined
      : undefined;
    let filter = qs.parse(params);
    filter = { ...filter, location: province_id, q: job_id };
    console.log(filter);
    // const query = qs.stringify(filter, { skipNull: true });

    // let province = formatProvince(provinces, province_id);
    // let domainCurr = domains?.find((p) => p.id === job_id);
    // let domain = domainCurr && domainCurr.name;
    formValues &&
      setCurrentSelected({
        domain: formValues.job_title.label,
        province: formValues.location.label
      });

    formValues &&
      dispatch(
        candidateJobSuggestProAction({
          domain_id: formValues?.job_title?.value,
          province_id: formValues?.location?.value
        })
      )
        .then()
        .catch((err) => console.log("err", err));

    setOverlay(false);
    setPagination({ ...pagination, page: 1 });
    localStorage.setItem("right-job", JSON.stringify(formValues));
    console.log("total", total);
  };

  const onFilterChange = (key, value) => {
    let filter = qs.parse(params);

    filter = { ...filter, [key]: value };
    console.log("filter", filter);
    const query = qs.stringify(filter, { skipNull: true });
    history.push({ search: `?${query}` });
  };

  useEffect(() => {
    let preferences = JSON.parse(localStorage.getItem("right-job"));
    let jobId =
      preferences && preferences.job_title && preferences.job_title.label;
    let provinceId =
      preferences && preferences.location && preferences.location.label;
    console.log("preferences", preferences);

    preferences &&
      setCurrentSelected({
        domain: jobId,
        province: provinceId
      });

    dispatch(
      candidateJobSuggestProAction({
        domain_id: preferences?.job_title?.value,
        province_id: preferences?.location?.value
      })
    )
      .then()
      .catch((err) => console.log("err", err));

    const fetchJobs = async () => {
      setLoading(true);

      await getSuggestJob(
        preferences?.job_title?.value,
        preferences?.location?.value,
        token
      )
        .then((res) => {
          console.log("res", res);
          setPagination({
            ...pagination,
            total: res.data.data.totalCount
          });
        })
        .catch((err) => {
          toastErr(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchJobs();
    console.log("total", total);
  }, []);

  // suggestJobs &&
  //   setPagination({
  //     ...pagination,
  //     total: suggestJobs.totalCount
  //   });

  return (
    <>
      <div className="find-job">
        <div
          id="search-jobs"
          className="search-jobs-container search-jobs-widget"
        >
          <div className="container">
            <JobSelectAdvance onSubmit={handleSubmit} history={history} />
          </div>
        </div>
        <div className="container">
          <div className="find-job__greeting">
            <strong>Hi there,</strong>{" "}
            <span>
              ready to explore advice and career options tailored to you?
            </span>
            <PushpinOutlined className="find-job__greeting__pin" />
          </div>
          <div className="find-job__title">Find the right job for me</div>
          {/* If not exist role */}
          {!currentSelected.domain || !currentSelected.province ? (
            <div className="find-job__not-role">
              {profile ? (
                <div className="find-job__not-role__content">
                  <p>
                    Learn what you need to know about a role, from salary to job
                    satisfaction.
                  </p>
                  <div>
                    Get a{" "}
                    <a
                      className="find-job__not-role__content__group"
                      onClick={onClickRole}
                    >
                      role{" "}
                      <EditOutlined className="find-job__not-role__content__group__icon" />
                    </a>{" "}
                    you're interested in to see more.
                  </div>
                </div>
              ) : (
                <div className="find-job__not-role__content">
                  You need to have an resume to use this features
                </div>
              )}

              <img
                src="https://www.seek.com.au/career-advice/assets/c3f39bdb.svg"
                alt="Career Advice"
              />
            </div>
          ) : (
            // Already Has a roles
            <div className="find-job__has-role">
              <div className="find-job__has-role__greeting">
                <div style={{ marginBottom: "20px" }}>
                  Great, you're interested in{" "}
                  <a
                    className="find-job__not-role__content__group"
                    onClick={onClickRole}
                  >
                    {currentSelected && currentSelected.domain}{" "}
                    <EditOutlined className="find-job__not-role__content__group__icon" />
                  </a>{" "}
                  roles.
                </div>

                <div>
                  Find out the facts about this role and others like it in{" "}
                  <a
                    className="find-job__not-role__content__group"
                    onClick={onClickRole}
                  >
                    {currentSelected && currentSelected.province}{" "}
                    <EditOutlined className="find-job__not-role__content__group__icon" />
                  </a>{" "}
                </div>
              </div>
              <div className="find-job__has-role__domains">
                <Tabs className="child-tabs" defaultActiveKey="1">
                  <Tab eventKey="1" title={currentSelected.domain}>
                    <Statistics
                      total={suggestJobs?.totalCount}
                      min={suggestJobs?.salary?.min}
                      max={suggestJobs?.salary?.max}
                    />
                  </Tab>
                  <Tab eventKey="2" title="Web Developer">
                    <Statistics />
                  </Tab>
                  <Tab eventKey="3" title="Fullstack Developer">
                    <Statistics />
                  </Tab>
                  <Tab eventKey="4" title="Developer">
                    <Statistics />
                  </Tab>
                </Tabs>

                {/* JD suggestion  */}
                {loading ? (
                  <MyLoader className="loader" />
                ) : (
                  <div className="find-job__has-role__suggest">
                    {suggestJobs?.items &&
                      suggestJobs?.items?.length !== 0 &&
                      suggestJobs?.items.map(
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
                    {total ? (
                      <nav>
                        <div className="find-job__has-role__suggest__pagination">
                          <Pagination
                            current={page}
                            total={total}
                            showSizeChanger={false}
                            showLessItems
                            pageSize={pageSize}
                            onChange={(page) => onFilterChange("page", page)}
                          />
                        </div>
                      </nav>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Overlay background  */}
        {overlay && (
          <div className="find-job__overlay">
            <div className="container">
              <div className="find-job__overlay__group">
                <p>Update your preferences</p>
                <button
                  onClick={() => setOverlay(false)}
                  type="submit"
                  className="btn btn-outline-primary "
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      )
    </>
  );
};

export default FindJob;

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={860}
    height={600}
    viewBox="0 0 860 600"
    backgroundColor="#b7b3b3"
    foregroundColor="#ffffff"
    {...props}
  >
    <rect x="0" y="10" rx="0" ry="0" width="850" height="20" />
    <rect x="0" y="40" rx="0" ry="0" width="300" height="16" />
    <rect x="0" y="90" rx="0" ry="0" width="150" height="14" />
    <rect x="0" y="112" rx="0" ry="0" width="850" height="14" />
    <rect x="0" y="135" rx="0" ry="0" width="850" height="14" />
    <rect x="0" y="177" rx="0" ry="0" width="850" height="20" />
    <rect x="0" y="207" rx="0" ry="0" width="300" height="16" />
    <rect x="0" y="246" rx="0" ry="0" width="150" height="14" />
    <rect x="0" y="271" rx="0" ry="0" width="850" height="14" />
    <rect x="0" y="296" rx="0" ry="0" width="850" height="14" />
    <rect x="0" y="344" rx="0" ry="0" width="850" height="20" />
    <rect x="0" y="376" rx="0" ry="0" width="300" height="16" />
    <rect x="0" y="414" rx="0" ry="0" width="150" height="14" />
    <rect x="0" y="438" rx="0" ry="0" width="850" height="14" />
    <rect x="0" y="464" rx="0" ry="0" width="850" height="14" />
    <rect x="0" y="376" rx="0" ry="0" width="300" height="16" />
    <rect x="0" y="414" rx="0" ry="0" width="150" height="14" />
    <rect x="0" y="438" rx="0" ry="0" width="850" height="14" />
    <rect x="0" y="464" rx="0" ry="0" width="850" height="14" />
  </ContentLoader>
);
