import React, { useState } from "react";
import "./JobDetail";
import "../../pages/Candidate/JobDetail/JobDetail";

import { QuestionOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const MissingSkillItem = ({ title, skills }) => {
  const { t, i18n } = useTranslation();

  const [showMore, setShowMore] = useState();
  const [toggle, setToggle] = useState(false);

  const toggleItem = () => {
    setToggle(!toggle);
  };

  const showMoreItem = () => {
    toggleItem();
    setShowMore(skills);
  };

  const showLessItem = () => {
    toggleItem();
  };

  return (
    <div className="missing-skill" style={{ paddingBottom: "0" }}>
      <div
        className="row"
        style={{
          alignItems: "center",
          marginLeft: "0",
          marginRight: "0",
          border: "none",
          marginBottom: "0"
        }}
      >
        <img
          src="/assets/img/miss.PNG"
          style={{ width: "30px", height: "34px" }}
          alt="icon-miss"
        />
        <span style={{ fontSize: ".875rem", fontWeight: "600" }}>
          {title} ({skills?.length})
        </span>

        <div
          className="missing-skill__show"
          style={{ marginTop: "0", marginLeft: "10px" }}
        >
          {!toggle ? (
            <span className="missing-skill__show__text" onClick={showMoreItem}>
              {t("skillSuggest.more")}
            </span>
          ) : (
            <span className="missing-skill__show__text" onClick={showLessItem}>
              {t("skillSuggest.less")}
            </span>
          )}
        </div>
      </div>

      <div className="missing-skill__items" style={{ paddingBottom: "10px" }}>
        {toggle &&
          showMore?.map((item, index) => {
            return <MissItem key={index} name={item} />;
          })}
      </div>
    </div>
  );
};

export default MissingSkillItem;

const MissItem = ({ name }) => (
  <div className="missing-skill__items__item" style={{ marginTop: "0.5rem" }}>
    <QuestionOutlined
      style={{ color: "#844b17", fontSize: "18px", marginRight: "10px" }}
    />
    <span className="missing-skill__items__item__text">{name}</span>
  </div>
);
