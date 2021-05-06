import ExploreWithSkills from "./ExploreSkills/ExploreWithSkills";
import FindJob from "./FindJob/FindJob";

import { Tabs, Tab } from "react-bootstrap";

import React, { useEffect, useState } from "react";
import "./CareerAdvice.scss";
import { useLocation } from "react-router-dom";
import qs from "query-string";
import { candidateProfileAction } from "state/actions/profileAction";
import { useSelector, useDispatch } from "react-redux";
import { getCandidateProfile } from "services/candidateProfileServices";
import Loading from "components/Loading/Loading";
import SignInDirect from "./SignInDirect/SignInDirect";

import { toastErr } from "utils/index";
import isEmpty from "lodash/isEmpty";
import { GET_JOB_DOMAIN, GET_JOB_SKILL } from "state/reducers/jobDomainReducer";
import Select from "react-select";
import { SearchOutlined } from "@ant-design/icons";
import SearchSuggest from "components/SearchSuggest/SearchSuggest";

function CandidateCareerAdvice({ history }) {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.candidateProfile);
  const token = useSelector((state) => state.auth.candidate.token);
  const domains = useSelector((state) => state.jobDomain.domains);

  const [state, setState] = useState();
  const [loading, setLoading] = useState(false);
  const [resume, setResume] = useState();

  const [searchRole, setSearchRole] = useState({
    loadingSelect: false,
    fetch: false,
    jobDomains: []
  });
  const { loadingSelect, fetch, jobDomains } = searchRole;

  const [role, setRole] = useState(null);

  const selectFind = (key) => setState(key);

  const subitSearch = () => {};

  const submit = (value)=>{
    console.log('submit', value)
  }

  useEffect(() => {
    setState("explore");
    if (token) {
      const fetchProfile = async () => {
        setLoading(true);

        await getCandidateProfile(token)
          .then(async (res) => {
            setResume({
              ...res.data.data.resumes[0]
            });
          })
          .catch((err) => {
            toastErr(err);
          })
          .finally(() => {
            setLoading(false);
          });
      };

      fetchProfile();
      dispatch(candidateProfileAction(token));
    }

    // Explore with search skill and domain
    if (!domains.length) {
      dispatch({ type: GET_JOB_DOMAIN });
      setSearchRole((curState) => ({ ...curState, loadingSelect: true }));
    } else {
      setSearchRole((curState) => ({
        ...curState,
        jobDomains: domains.map(({ id, name }) => ({ value: id, label: name }))
      }));
    }
  }, []);

  if (!fetch) {
    if (domains.length && loadingSelect) {
      setSearchRole((curState) => ({
        ...curState,
        loadingSelect: false,
        fetch: true,
        jobDomains: domains.map(({ id, name }) => ({ value: id, label: name }))
      }));
    }
  }

  return (
    <div className="career-advice">
      <Loading loading={loading} />

      <Tabs
        onSelect={selectFind}
        className="main-tabs"
        defaultActiveKey="explore"
      >
        <Tab eventKey="explore" title="Explore what I can do with my skills">
          {state === "explore" &&
            (token ? (
              !isEmpty(resume) && <ExploreWithSkills profile={resume} />
            ) : (
              <div className="explore">
                <div className="explore__title">
                  <div className="container">
                    <h1 className="explore__title__big">
                      How can you put your skills to work?
                    </h1>
                    <p className="explore__title__small">
                      Explore roles that could suit you based on your skills and
                      experience
                    </p>
                  </div>
                </div>

                <div className="container">
                  <div className="explore__content">
                    <h2 className="explore__content__title">
                      Your career so far
                    </h2>
                    <div className="explore__content__key">
                      <p>Key skills</p>
                    </div>
                    <SignInDirect />
                  </div>
                </div>

                <div className="container">
                  <h2 className="explore__title-look">
                    Looking for a specific role or skill?
                  </h2>
                  <div className="explore__title-sub">
                    Find out more about a role or skill you’re interested in.
                  </div>
                  <div className="explore-look">
                    <h2 className="explore-look__title">
                      What skill do you want to focus on?
                    </h2>

                    <form>
                      <div className="row">
                        <div className="col-md-8 explore-look__input">
                          <div className="dropdown pr-10" style={{ zIndex: 5 }}>
                            <Select
                              value={role}
                              onChange={(value) => setRole(value)}
                              options={jobDomains}
                              placeholder="Địa điểm làm việc"
                              menuPosition="fixed"
                              isClearable={true}
                            />
                            <div className="input-icon">
                              <SearchOutlined style={{ color: "#555" }} />
                            </div>
                          </div>
                        </div>
                        <div className="col-6 col-md-4">
                          <button
                            type="submit"
                            className="btn btn-full-width explore-look__btn"
                            style={{ fontWeight: 700 }}
                            onClick={subitSearch}
                          >
                            Explore
                          </button>
                        </div>
                      </div>
                    </form>

              
                    {/* <form>
                      <div className="row">
                        <div className="col-md-8 explore-look__input">
                          <div className="dropdown pr-10" style={{ zIndex: 5 }}>
                            <Select
                              value={skill}
                              onChange={(value) => setSkill(value)}
                              options={jobSkills}
                              placeholder="Địa điểm làm việc"
                              menuPosition="fixed"
                              isClearable={true}
                            />
                            <div className="input-icon">
                              <SearchOutlined style={{ color: "#555" }} />
                            </div>
                          </div>
                        </div>
                        <div className="col-6 col-md-4">
                          <button
                            type="submit"
                            className="btn btn-full-width explore-look__btn"
                            style={{ fontWeight: 700 }}
                            onClick={submit1}
                          >
                            Explore
                          </button>
                        </div>
                      </div>
                    </form> */}
                  </div>
                  <div style={{ height: "80px" }}></div>
                  {/* <Explore handleSubmit={submit1} history={history} /> */}
                <SearchSuggest handleSubmit={submit}/>

                </div>
              </div>
            ))}
        </Tab>
        <Tab eventKey="find" title="Find the right job for me">
          {state === "find" && <FindJob history={history} />}
        </Tab>
      </Tabs>
    </div>
  );
}

export default CandidateCareerAdvice;
