import ExploreWithSkills from "./ExploreSkills/ExploreWithSkills";
import FindJob from "./FindJob/FindJob";

import { Tabs, Tab } from "react-bootstrap";

import React, { useEffect, useState } from "react";
import "./CareerAdvice.scss";
import qs from "query-string";
import { candidateProfileAction } from "state/actions/profileAction";
import { useSelector, useDispatch } from "react-redux";
import { getCandidateProfile } from "services/candidateProfileServices";
import Loading from "components/Loading/Loading";
import SignInDirect from "./SignInDirect/SignInDirect";

import { toastErr } from "utils/index";
import isEmpty from "lodash/isEmpty";
import { GET_JOB_DOMAIN } from "state/reducers/jobDomainReducer";
import Select from "react-select";
import { SearchOutlined } from "@ant-design/icons";
import SearchSuggest from "components/SearchSuggest/SearchSuggest";
import { useTranslation } from "react-i18next";
import { useTitle } from "utils/index";

function CandidateCareerAdvice({ history }) {
  const { t, i18n } = useTranslation();
  useTitle(i18n.language === "en" ? "FASTJOB | Career Advice" : "FASTJOB | Lời khuyên nghề nghiệp")

  const dispatch = useDispatch();
  // const profile = useSelector((state) => state.profile.candidateProfile);
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

  const subitSearch = (e) => {
    e.preventDefault();

    let filter = {
      id: role.value,
      role: role.label.toLowerCase().replaceAll(" ", "-")
    };
    const query = qs.stringify(filter, { skipNull: true });

    window.location.replace(`/career-advice/${query}`);
  };

  const submit = (value) => {
    window.location.replace(`/career-advice/skill=${value.replaceAll(" ", "-")}`);
  };

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
        <Tab eventKey="explore" title={t("careerAdvice.tab1")}>
          {state === "explore" &&
            (token ? (
              !isEmpty(resume) ? (
                <ExploreWithSkills profile={resume} />
              ) : (
                <div className="container">
                  <div className="explore__content">
                    <h2 className="explore__content__title">
                    {t("careerAdvice.contentTitle")}
                    </h2>
                    <div className="explore__content__key">
                      <p>{t("careerAdvice.contentKey")}</p>
                    </div>
                    <SignInDirect isNeedCV={true} />
                  </div>
                </div>
              )
            ) : (
              <div className="explore">
                <div className="explore__title">
                  <div className="container">
                    <h1 className="explore__title__big" style={{ lineHeight: '1.08'}}>
                      {t("careerAdvice.titleBig")}
                    </h1>
                    <p className="explore__title__small">
                    {t("careerAdvice.titleSmall")}
                    </p>
                  </div>
                </div>

                <div className="container">
                  <div className="explore__content">
                    <h2 className="explore__content__title">
                     {t("careerAdvice.contentTitle")}
                    </h2>
                    <div className="explore__content__key">
                      <p>{t("careerAdvice.contentKey")}</p>
                    </div>
                    <SignInDirect />
                  </div>
                </div>
              </div>
            ))}

          <div className="container">
            <h2 className="explore__title-look">
              {t("careerAdvice.lookingFor")}
            </h2>
            <div className="explore__title-sub">
            {t("careerAdvice.findOut")}
            </div>
            <div className="explore-look">
              <h2 className="explore-look__title">
              {t("careerAdvice.whatRole")}
              </h2>

              <form>
                <div className="row">
                  <div className="col-md-8 explore-look__input">
                    <div className="dropdown pr-10" style={{ zIndex: 5 }}>
                      <Select
                        value={role}
                        onChange={(value) => setRole(value)}
                        options={jobDomains}
                        placeholder={t("careerAdvice.form.enterRole")}
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
                      className="btn btn-full-width explore-look__btn"
                      style={{ fontWeight: 700 }}
                      onClick={subitSearch}
                    >
                      {t("careerAdvice.form.explore")}
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div style={{ height: "80px" }}></div>
            <SearchSuggest handleSubmit={submit} />
          </div>
        </Tab>
        <Tab eventKey="find" title={t("careerAdvice.tab2")}>
          {state === "find" && (
            <FindJob history={history} hasResume={!isEmpty(resume)} />
          )}
        </Tab>
      </Tabs>
    </div>
  );
}

export default CandidateCareerAdvice;
