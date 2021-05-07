import { Tabs, Tab } from "react-bootstrap";
import ContentEditable from "react-contenteditable";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./ExploreWithSkills.scss";
import "components/SearchSuggest/SearchSuggest.scss";

import MatchSkill from "components/MatchSkill/MatchSkill";
import { getIndexArray } from "utils/index";
import qs from "query-string";
import Loading from "components/Loading/Loading";

import { SearchOutlined } from "@ant-design/icons";
import Select from "react-select";
import { GET_JOB_DOMAIN, GET_JOB_SKILL } from "state/reducers/jobDomainReducer";
import history from "state/history";
import { exploreSkillsProAction } from "state/actions/candidateJobAction";
import ContentLoader from "react-content-loader";
import SearchSuggest from "components/SearchSuggest/SearchSuggest";
import AddSkillSuggest from "components/AddSkillSuggest/AddSkillSuggest";

const ExploreWithSkills = ({ profile }) => {
  const dispatch = useDispatch();

  const domains = useSelector((state) => state.jobDomain.domains);
  const skillsData = useSelector((state) => state.jobDomain.skills);
  const exploreSkillsData = useSelector(
    (state) => state.candidateJob.candidateExploreSkills
  );

  const [loading, setLoading] = useState(false);
  const [loadContent, setLoadContent] = useState(true);

  const [value, setValue] = useState("");

  const [role, setRole] = useState(null);
  const [isAdd, setIsAdd] = useState(false);


  const [resume, setResume] = useState(profile);

  const [searchRole, setSearchRole] = useState({
    loadingSelect: false,
    fetch: false,
    jobDomains: []
  });

  const [searchSkill, setSearchSkill] = useState({
    loadingSkillSelect: false,
    fetchSkill: false,
    jobSkills: []
  });

  const { technical_skills } = resume;

  const [skills, setSkills] = useState(getIndexArray(technical_skills));

  const { loadingSelect, fetch, jobDomains } = searchRole;
  const { loadingSkillSelect, fetchSkill, jobSkills } = searchSkill;

  const onChangeSkills = (key, value) => {
    const skill = skills.find((ele) => ele.key === key);
    let newSkills = skills.filter((ele) => ele.key !== key);
    const newSkill = { ...skill, value };
    newSkills.push(newSkill);
    newSkills.sort((a, b) => a.key - b.key);

    setSkills(newSkills);
  };

  const onDelete = (key) => {
    const newSkills = skills.filter((ele) => ele.key !== key);
    setSkills(newSkills);
  };

  const getNewSkill = (value) => {
    console.log("new skill", value);
    setValue(value);
    setIsAdd(false);
  };

  const onAddSkill = () => {
    console.log("new skill", value);

    const key = skills.length && skills[skills.length - 1].key + 1;
    const newSkills = [...skills, { key, value }];
    setSkills(newSkills);
    setValue("");
    setIsAdd(true);
  };

  const submitSearchSkill = (value) => {
    console.log("submit", value);
  };

  const handleMatch = () => {
    let skillsList = skills.map((item) => item.value);
    setLoading(true);

    dispatch(exploreSkillsProAction({ skills: skillsList }))
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        // setIsLoading(false);
      });
  };

  const submit1 = (e) => {
    e.preventDefault();

    let filter = { role: role.value };
    const query = qs.stringify(filter, { skipNull: true });
    const win = window.open(`/career-advice/direction?${query}`, "_blank");
    win.focus();
    // history.push(`/career-advice/direction?${query}`);
  };

  useEffect(() => {
    history.push("/career-advice");

    let skillsList = skills.length && skills.map((item) => item.value);

    dispatch(exploreSkillsProAction({ skills: skillsList }))
      .then(() => {
        setLoadContent(false);
      })
      .catch(() => {
        setLoadContent(true);
      });
    console.log("exploreSkillsData", exploreSkillsData && exploreSkillsData);

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

    if (!skillsData.length) {
      dispatch({ type: GET_JOB_SKILL });
      setSearchSkill((curState) => ({ ...curState, loadingSkillSelect: true }));
    } else {
      setSearchSkill((curState) => ({
        ...curState,
        jobSkills: skillsData.map(({ id, name }) => ({
          value: id,
          label: name
        }))
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

  if (!fetchSkill) {
    if (skillsData.length && loadingSkillSelect) {
      setSearchSkill((curState) => ({
        ...curState,
        loadingSkillSelect: false,
        fetchSkill: true,
        jobSkills: skillsData.map(({ id, name }) => ({
          value: id,
          label: name
        }))
      }));
    }
  }

  return (
    <div className="explore">
      <Loading loading={loading} />

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
          <h2 className="explore__content__title">Your career so far</h2>
          <div className="explore__content__key">
            <p>Key skills</p>
          </div>
          <div className="explore__content__skills">
            <p className="explore__content__skills__intro">
              Using skills listed in your Profile, we’ll help you discover
              career options.
            </p>

            <div className="chip" style={{ marginTop: "20px" }}>
              {skills.length &&
                skills.map(({ key, value }) => (
                  <Skill
                    skill={value}
                    key={key}
                    id={key}
                    onChange={onChangeSkills}
                    onDelete={onDelete}
                  />
                ))}
            </div>

            <div className="inline-skill-container is-compact explore__content__skills__add">
              <div className="inline-skill-input">
                <div className="TextInput-wrapper">
                  {/* <Input
                    className="explore__content__skills__add__input"
                    placeholder="Add skill"
                    size="large"
                    value={value}
                    onChange={(evt) => setValue(evt.target.value)}
                  /> */}
                  <AddSkillSuggest handleAdd={getNewSkill} isAdd={isAdd} />
                </div>
              </div>
              <div className="inline-skill-button">
                <Button
                  className="explore__content__skills__add__btn"
                  type="primary"
                  size="large"
                  disabled={!value}
                  icon={<PlusOutlined />}
                  onClick={onAddSkill}
                >
                  Add skill
                </Button>
              </div>
            </div>

            <div className="explore__content__skills__match">
              <button
                className="btn explore-look__btn"
                style={{ fontWeight: 700 }}
                onClick={handleMatch}
              >
                Save and Match now
              </button>
            </div>

            <div className="explore__content__match">
              <h2 className="explore__content__title">
                Your matched opportunities
              </h2>

              <div className="explore__content__match__tabs">
                <Tabs className="child-tabs" defaultActiveKey="1">
                  <Tab eventKey="1" title="Most skill matches">
                    {loadContent ? (
                      <MyLoader />
                    ) : (
                      exploreSkillsData.length &&
                      exploreSkillsData.map(
                        (
                          {
                            domain,
                            matchedSkills,
                            salary,
                            totalCount,
                            mainSkills
                          },
                          index
                        ) => (
                          <MatchSkill
                            key={index}
                            domain={domain}
                            matchedSkills={matchedSkills}
                            salary={salary}
                            totalCount={totalCount}
                            mainSkills={mainSkills}
                          />
                        )
                      )
                    )}
                  </Tab>
                  <Tab eventKey="2" title="What you're good at">
                    <MatchSkill />
                  </Tab>
                  <Tab eventKey="3" title="What you enjoy">
                    <MatchSkill />
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
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
            What role do you want to focus on?
          </h2>

          <form>
            <div className="row">
              <div className="col-md-8 explore-look__input">
                <div className="dropdown pr-10" style={{ zIndex: 5 }}>
                  <Select
                    value={role}
                    onChange={(value) => setRole(value)}
                    options={jobDomains}
                    placeholder="Enter a role..."
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
          </form>
        </div>

        <div style={{ height: "80px" }}></div>

        <SearchSuggest handleSubmit={submitSearchSkill} />

        {/* <SearchSuggest/> */}
      </div>
    </div>
  );
};

export default ExploreWithSkills;

const Skill = ({ id, skill, onChange, onDelete }) => {
  const handleChange = (evt) => {
    const value = evt.target.value;

    onChange(id, value);
  };

  return (
    <div className="chip__item">
      <div className="container-fluid">
        <div className="row">
          <div className="skill-editable">
            <ContentEditable
              className="content-editable chip__item__content"
              html={skill} // innerHTML of the editable div
              disabled={true} // use true to disable edition
              onChange={handleChange} // handle innerHTML change
            />
          </div>
          <div className="float-right chip__item__delete">
            <button className=" delete-button">
              <CloseOutlined onClick={() => onDelete(id)} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={1000}
    height={600}
    viewBox="0 0 1000  600"
    backgroundColor="#b7b3b3"
    foregroundColor="#ffffff"
    {...props}
  >
    <rect x="0" y="10" rx="0" ry="0" width="900" height="20" />
    <rect x="0" y="40" rx="0" ry="0" width="300" height="16" />
    <rect x="0" y="90" rx="0" ry="0" width="150" height="14" />
    <rect x="0" y="112" rx="0" ry="0" width="900" height="14" />
    <rect x="0" y="135" rx="0" ry="0" width="900" height="14" />
    <rect x="0" y="177" rx="0" ry="0" width="900" height="20" />
    <rect x="0" y="207" rx="0" ry="0" width="300" height="16" />
    <rect x="0" y="246" rx="0" ry="0" width="150" height="14" />
    <rect x="0" y="271" rx="0" ry="0" width="900" height="14" />
    <rect x="0" y="296" rx="0" ry="0" width="900" height="14" />
    <rect x="0" y="344" rx="0" ry="0" width="900" height="20" />
    <rect x="0" y="376" rx="0" ry="0" width="300" height="16" />
    <rect x="0" y="414" rx="0" ry="0" width="150" height="14" />
    <rect x="0" y="438" rx="0" ry="0" width="900" height="14" />
    <rect x="0" y="464" rx="0" ry="0" width="900" height="14" />
  </ContentLoader>
);
