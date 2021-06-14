import { Tabs, Tab } from "react-bootstrap";
import ContentEditable from "react-contenteditable";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./ExploreWithSkills.scss";
import "components/SearchSuggest/SearchSuggest.scss";

import MatchSkill from "components/MatchSkill/MatchSkill";
import { getIndexArray } from "utils/index";
import Loading from "components/Loading/Loading";

import history from "state/history";
import { exploreSkillsProAction } from "state/actions/candidateJobAction";
import ContentLoader from "react-content-loader";
import AddSkillSuggest from "components/AddSkillSuggest/AddSkillSuggest";
import MatchSkillNone from "./MatchSkillNone";
import { useTranslation } from "react-i18next";

const ExploreWithSkills = ({ profile }) => {
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();

  const domains = useSelector((state) => state.jobDomain.domains);
  const skillsData = useSelector((state) => state.jobDomain.skills);
  const exploreSkillsData = useSelector(
    (state) => state.candidateJob.candidateExploreSkills
  );

  const [loading, setLoading] = useState(false);
  const [loadContent, setLoadContent] = useState(true);
  const [listData, setListData] = useState(0);

  const [value, setValue] = useState("");

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

  const onDelete = (key) => {
    const newSkills = skills.filter((ele) => ele.key !== key);
    setSkills(newSkills);
  };

  const getNewSkill = (value) => {
    setValue(value);
    setIsAdd(false);
  };

  const onAddSkill = () => {
    const key = skills.length && skills[skills.length - 1].key + 1;
    const newSkills = [...skills, { key, value }];
    setSkills(newSkills);
    setValue("");
    setIsAdd(true);
  };

  const handleMatch = () => {
    let skillsList = skills.map((item) => item.value);
    setLoading(true);

    dispatch(exploreSkillsProAction({ skills: skillsList }))
      .then(() => {
        setListData(listData + 1);
        setLoading(false);
      })
      .catch(() => {
        // setIsLoading(false);
      });
  };

  const sortData = (data) => {
    let res = data.sort(function (a, b) {
      return b.matchedSkills.length - a.matchedSkills.length;
    });

    return res;
  };

  const getGood = (data) => {
    const filteredArray = data?.filter((item) => {
      const listMain = item.mainSkills.map((item) => item.name);
      let filter = item?.matchedSkills.filter((value) =>
        listMain.includes(value)
      );
      let ratio = filter.length / item.mainSkills.length;
      if (ratio > 0.7) {
        return item;
      }
    });

    return filteredArray;
  };

  const getEnjoy = (data) => {
    const filteredArray = data?.filter((item) => {
      const listMain = item.mainSkills.map((item) => item.name);
      let filter = item?.matchedSkills.filter((value) =>
        listMain.includes(value)
      );
      let ratio = filter.length / item.mainSkills.length;
      if (ratio > 0.5) {
        return item;
      }
    });

    return filteredArray;
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
  }, [listData]);

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
          <h1
            className="explore__title__big"
            style={{ width: "80%", lineHeight: "1.08" }}
          >
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
          <div className="explore__content__skills">
            <p className="explore__content__skills__intro">
              {t("explore.smallTitle")}
            </p>

            <div className="chip" style={{ marginTop: "20px" }}>
              {skills &&
                skills?.length &&
                skills.map(({ key, value }) => (
                  <Skill skill={value} key={key} id={key} onDelete={onDelete} />
                ))}
            </div>

            <div className="inline-skill-container is-compact explore__content__skills__add">
              <div className="inline-skill-input">
                <div className="TextInput-wrapper">
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
                  {t("explore.addSkill")}
                </Button>
              </div>
            </div>

            <div className="explore__content__skills__match">
              <button
                className="btn explore-look__btn"
                style={{ fontWeight: 700 }}
                onClick={handleMatch}
              >
                {t("explore.Save")}
              </button>
            </div>

            <div className="explore__content__match">
              <h2 className="explore__content__title">
                {t("explore.matchedTitle")}
              </h2>

              <div className="explore__content__match__tabs">
                <Tabs className="child-tabs" defaultActiveKey="1">
                  <Tab eventKey="1" title={t("explore.mostMatches")}>
                    {loadContent ? (
                      <MyLoader />
                    ) : (
                      exploreSkillsData &&
                      exploreSkillsData?.length &&
                      (sortData(exploreSkillsData).length > 0 ? (
                        sortData(exploreSkillsData)
                          .slice(0, 5)
                          .map(
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
                      ) : (
                        <MatchSkillNone />
                      ))
                    )}
                  </Tab>
                  <Tab eventKey="2" title={t("explore.goodSkill")}>
                    {loadContent ? (
                      <MyLoader />
                    ) : (
                      exploreSkillsData &&
                      exploreSkillsData?.length &&
                      (getGood(exploreSkillsData).length > 0 ? (
                        getGood(
                          exploreSkillsData
                        ).map(
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
                      ) : (
                        <MatchSkillNone />
                      ))
                    )}
                  </Tab>
                  <Tab eventKey="3" title={t("explore.enjoy")}>
                    {loadContent ? (
                      <MyLoader />
                    ) : (
                      exploreSkillsData &&
                      exploreSkillsData?.length &&
                      (getEnjoy(exploreSkillsData).length > 0 ? (
                        getEnjoy(
                          exploreSkillsData
                        ).map(
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
                      ) : (
                        <MatchSkillNone />
                      ))
                    )}
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreWithSkills;

const Skill = ({ id, skill, onChange, onDelete }) => {
  return (
    <div className="chip__item">
      <div className="container-fluid">
        <div className="row">
          <div className="skill-editable">
            <ContentEditable
              className="content-editable chip__item__content"
              html={skill} // innerHTML of the editable div
              disabled={true} // use true to disable edition
            />
          </div>
          <div className="float-right chip__item__delete">
            <button className="delete-button">
              <CloseOutlined
                className="chip__item__delete__icon"
                onClick={() => onDelete(id)}
              />
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
