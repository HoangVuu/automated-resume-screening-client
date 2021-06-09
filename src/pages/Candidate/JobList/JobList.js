/* eslint-disable jsx-a11y/anchor-is-valid */
import Dropdown from "components/Dropdown/Dropdown";
import JobSearchAdvance from "components/Forms/JobSearchAdvance/JobSearchAdvance";
import JobItem from "components/JobItem/JobItem";
import { CONTACTS, PAGE_SIZES, DATES } from "constants/index";
import React, { useEffect, useState } from "react";
import "./JobList.scss";
import { Pagination, Select } from "antd";
import { findJobs, subcribe } from "services/jobServices";
import { formatSearchHistory, toastErr } from "utils/index";
import { getFormValues } from "redux-form";
import { FORM_KEY_JOB_SEARCH } from "state/reducers/formReducer";
import { useSelector } from "react-redux";
import ContentLoader from "react-content-loader";
import qs from "query-string";
import { Link, useLocation } from "react-router-dom";
import { Input } from "antd";
import { toast } from "utils/index";
import isEmpty from "lodash/isEmpty";
import { getSubcribe } from "services/jobServices";

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={410}
    height={600}
    viewBox="0 0 410 600"
    backgroundColor="#b7b3b3"
    foregroundColor="#ffffff"
    {...props}
  >
    <rect x="0" y="10" rx="0" ry="0" width="400" height="20" />
    <rect x="0" y="40" rx="0" ry="0" width="300" height="16" />
    <rect x="0" y="90" rx="0" ry="0" width="150" height="14" />
    <rect x="0" y="112" rx="0" ry="0" width="400" height="14" />
    <rect x="0" y="135" rx="0" ry="0" width="400" height="14" />
    <rect x="0" y="177" rx="0" ry="0" width="400" height="20" />
    <rect x="0" y="207" rx="0" ry="0" width="300" height="16" />
    <rect x="0" y="246" rx="0" ry="0" width="150" height="14" />
    <rect x="0" y="271" rx="0" ry="0" width="400" height="14" />
    <rect x="0" y="296" rx="0" ry="0" width="400" height="14" />
    <rect x="0" y="344" rx="0" ry="0" width="400" height="20" />
    <rect x="0" y="376" rx="0" ry="0" width="300" height="16" />
    <rect x="0" y="414" rx="0" ry="0" width="150" height="14" />
    <rect x="0" y="438" rx="0" ry="0" width="400" height="14" />
    <rect x="0" y="464" rx="0" ry="0" width="400" height="14" />
  </ContentLoader>
);

function CandidateJobList({ history }) {
  const [curSelect, setCurSelect] = useState(null);
  const [top, setTop] = useState(0);
  const [bottom, setBottom] = useState(-1);
  const [jobs, setJobs] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0
  });

  // const [email, setSubcribe] = useState();
  const [isActive, setIsActive] = useState();

  const [filter, setFilter] = useState({
    posted_date: undefined,
    contract_type: undefined,
    min_salary: undefined,
    max_salary: undefined,
    "job-domain": undefined
  });

  const token = useSelector((state) => state.auth.candidate.token);
  const profile = useSelector((state) => state.profile.candidateProfile);

  const params = useLocation().search;

  const formValues = useSelector((state) =>
    getFormValues(FORM_KEY_JOB_SEARCH)(state)
  );
  const { domains } = useSelector((state) => state.jobDomain);
  const { provinces } = useSelector((state) => state.cv);

  const mapResponseToState = (data) => {
    return data.map(
      ({
        company_name,
        contact_type,
        job_description,
        job_post_id,
        job_title,
        last_edit,
        province_id,
        salary,
        posted_in
      }) => ({
        jobId: job_post_id,
        jobTitle: job_title,
        company: company_name,
        salary,
        contractType: contact_type,
        jobDescription: job_description,
        lastEdit: last_edit,
        provinceId: province_id,
        postedIn: posted_in
      })
    );
  };

  const handleSubcribe = async () => {
    if (!token) {
      toast({ type: "info", message: "Please login to receive jobs alert" });
    } else {
      // setLoadingSave(true);

      // const status = save ? 0 : 1;
      let filter = qs.parse(params);
      let { q, location } = filter;
      console.log(q);

      if (q) {
        await subcribe(q, location, token)
          .then((res) => {
            console.log(res);
            setIsActive(true);
            toast({
              type: "success",
              message: "Send jobs alert successful"
            });
          })
          .catch((err) => toastErr(err));
        // .finally(() => setLoadingSave(false));
      } else {
        toast({
          type: "info",
          message: "Job title is required to receive jobs alert"
        });
      }
    }
  };

  useEffect(() => {
    const searchHistory = JSON.parse(localStorage.getItem("search-history"));
    setSearchHistory(searchHistory);

    const fetchJobs = async () => {
      setLoading(true);
      setCurSelect(null);

      const search = qs.parse(params);
      let {
        q,
        location,
        page,
        limit,
        posted_date,
        contract_type,
        min_salary,
        max_salary,
        "job-domain": job_domain_id
      } = search;

      page = page || 1;
      limit = parseInt(limit) || 10;

      if (q || location) {
        const saveQuery = qs.stringify({ q, location }, { skipNull: true });
        const item = {
          url: `/find-jobs?${saveQuery}`,
          label: formatSearchHistory(q, provinces, location)
        };

        if (searchHistory) {
          const index = searchHistory.findIndex(
            (ele) => ele.label === item.label
          );
          if (index < 0) {
            const newHistory = [item, ...searchHistory];
            localStorage.setItem(
              "search-history",
              JSON.stringify(newHistory.slice(0, 10))
            );
          }
        } else {
          localStorage.setItem("search-history", JSON.stringify([item]));
        }
      }

      await findJobs(
        page,
        limit,
        q,
        location,
        posted_date,
        contract_type,
        min_salary,
        max_salary,
        job_domain_id
      )
        .then((res) => {
          setJobs(mapResponseToState(res.data.data));
          setPagination({
            ...pagination,
            total: res.data.pagination.total,
            page,
            pageSize: limit
          });
          setFilter({
            posted_date,
            contract_type,
            min_salary,
            max_salary,
            "job-domain": job_domain_id
          });
        })
        .catch((err) => {
          toastErr(err);
        })
        .finally(() => {
          setLoading(false);
        });

      await getSubcribe(token)
        .then(async (res) => {
          console.log(res.data.data.length);
          res.data.data.length !==0 ? setIsActive(true) : setIsActive(false)
        })
        .catch((err) => console.log(err));
    };

    fetchJobs();
  }, [params, token]);

  const handleSubmit = async () => {
    const job_title = formValues
      ? formValues.job_title || undefined
      : undefined;
    const province_id = formValues
      ? formValues.location
        ? formValues.location.value
        : undefined
      : undefined;

    let filter = qs.parse(params);
    filter = { ...filter, location: province_id, q: job_title };
    const query = qs.stringify(filter, { skipNull: true });

    history.push({ search: `?${query}` });

    setFilter({ ...filter, job_title, province_id: province_id });
    setPagination({ ...pagination, page: 1 });
  };

  const onFilterChange = (key, value) => {
    let filter = qs.parse(params);

    filter = { ...filter, [key]: value };

    const query = qs.stringify(filter, { skipNull: true });
    history.push({ search: `?${query}` });
  };

  const onChangeSelect = (jobId) => setCurSelect(jobId);

  const { page, pageSize, total } = pagination;
  const {
    posted_date,
    contract_type,
    min_salary,
    max_salary,
    "job-domain": job_domain_id
  } = filter;

  return (
    <>
      <div id="search-jobs-wrapper">
        <div
          id="search-jobs"
          className="search-jobs-container search-jobs-widget search-jobs-widget-blue"
        >
          <div className="container">
            <JobSearchAdvance onSubmit={handleSubmit} history={history} />

            <div className="filters">
              <Dropdown
                title="Date posted"
                options={DATES}
                value={posted_date}
                onChange={(value) => onFilterChange("posted_date", value)}
                select
              />
              <Dropdown
                title="Job types"
                options={CONTACTS}
                value={contract_type}
                onChange={(value) => onFilterChange("contract_type", value)}
                select
              />
              <Dropdown
                title="Minimum salary"
                value={min_salary}
                onChange={(value) => onFilterChange("min_salary", value)}
              />
              <Dropdown
                title="Maximum salary"
                value={max_salary}
                onChange={(value) => onFilterChange("max_salary", value)}
              />
              <Dropdown
                title="Job domains"
                options={domains.map((d) => ({ value: d.id, label: d.name }))}
                value={job_domain_id}
                onChange={(value) => onFilterChange("job-domain", value)}
                select
              />
            </div>
          </div>
        </div>
        <div>
          <div className="container">
            <table id="searchContent" className="serpContainerMinHeight">
              <tbody>
                <tr role="main" style={{ verticalAlign: "top" }}>
                  <td id="resultCol">
                    <div style={{ paddingTop: "6px" }}></div>
                    {total ? (
                      <div className="resultsTop">
                        <div className="secondRow">
                          <div>
                            Show:{" "}
                            <span style={{ display: "inline-block" }}>
                              <Select
                                style={{ width: 140 }}
                                options={PAGE_SIZES}
                                value={pageSize}
                                onChange={(value) =>
                                  onFilterChange("limit", value)
                                }
                              />
                            </span>
                          </div>
                          <div className="searchCountContainer">
                            <div id="searchCountPages">Total {total} jobs</div>
                          </div>
                        </div>
                      </div>
                    ) : null}
                    {loading ? (
                      <MyLoader />
                    ) : !jobs.length ? (
                      <EmptyJob />
                    ) : (
                      jobs.map((job) => (
                        <JobItem
                          {...job}
                          key={job.jobId}
                          curSelect={curSelect}
                          onChangeSelect={onChangeSelect}
                          top={top}
                          bottom={bottom}
                          provinces={provinces}
                        />
                      ))
                    )}
                    {total ? (
                      <nav>
                        <div className="vjs-pagination">
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
                  </td>
                  {curSelect === null && (
                    <td role="region" id="auxCol">
                      <div id="jobalertswrapper">
                        <div id="jobalerts" className="open jaui">
                          <div className="jobalertlabel">
                            <div id="jobalertlabel" className="jobalerts_title">
                              <div>Be the first to see new jobs via email</div>
                            </div>
                          </div>
                          <div id="jobalertform" className="jaform">
                            <span id="jobalertsending"></span>
                            <div id="jobalertmessage">
                              <label className="jobAlertFormLabel-contrast-color">
                                Email address
                              </label>
                              <Input
                                id="alertmail"
                                disabled={isEmpty(profile)}
                                value={profile?.email}
                              />
                              <span className="serp-button">
                                <span className="serp-button-inner">
                                  {isActive ? (
                                    <div
                                      style={{ marginTop: "15px" }}
                                      className="job-list-receiving"
                                    >
                                      <Link
                                        to="/profile"
                                        className="job-list-receiving__link"
                                      >
                                        You actived email to receive jobs alert from us via
                                        email
                                      </Link>
                                    </div>
                                  ) : (
                                    <button
                                      id="alertsubmit"
                                      className="serp-button-label"
                                      onClick={handleSubcribe}
                                    >
                                      Active
                                    </button>
                                  )}
                                </span>
                              </span>
                              <div style={{ marginTop: "12px" }}>
                                <span>
                                  By creating a job alert, you agree to our
                                  Terms. You can change your consent settings at
                                  any time by unsubscribing or as detailed in
                                  our terms.
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {searchHistory && searchHistory.length && (
                        <div id="recentsearches" className="no-left-rail">
                          <div className="rsh">My recent searches</div>
                          <ul className="rsList">
                            {searchHistory.map(({ url, label }) => (
                              <li>
                                <Link to={url}>{label}</Link>
                              </li>
                            ))}
                          </ul>
                          <div>
                            <a
                              className="sl"
                              title="Xoá toàn bộ tìm kiếm của bạn"
                              href=""
                              onClick={(e) => {
                                e.preventDefault();
                                setSearchHistory(null);
                                localStorage.removeItem("search-history");
                              }}
                            >
                              » Clear searches
                            </a>
                          </div>
                        </div>
                      )}
                    </td>
                  )}
                  <td id="applyCol"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default CandidateJobList;

const EmptyJob = () => (
  <div style={{ backgroundColor: "white", marginTop: "1rem" }}>
    <div className="text-center">
      <img
        src="/assets/svg/Empty.svg"
        alt="empty icon"
        style={{ width: "380px", height: "160px", margin: "50px auto" }}
      />
      <p style={{ paddingBottom: "20px" }}>No job vacancies! </p>
    </div>
    <div>
      <p style={{ padding: "20px", color: "#555" }}>
        <b>Search suggestions:</b>
        <ul style={{ paddingTop: "10px" }}>
          <li>Try more general keywords</li>
          <li>Check your spelling</li>
          <li>Replace abbreviations with the entire word</li>
        </ul>
      </p>
    </div>
  </div>
);
