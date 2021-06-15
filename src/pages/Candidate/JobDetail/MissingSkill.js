import React, { useState } from "react";
import "./JobDetail";
import { QuestionOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const MissingSkill = ({ title, skills }) => {
  const { t, i18n } = useTranslation();

  const [showMore, setShowMore] = useState(skills?.slice(0, 4));
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
    setShowMore(skills.slice(0, 4));
  };

  return (
    <div className="missing-skill">
      <div
        className="row"
        style={{ alignItems: "center", marginLeft: "0", marginRight: "0" }}
      >
        <img
          src="/assets/img/miss.PNG"
          style={{ width: "30px", height: "34px" }}
          alt="icon-miss"
        />
        <span style={{ fontSize: ".875rem", fontWeight: "600" }}>
          {title} ({skills?.length})
        </span>
      </div>

      <div className="missing-skill__items">
        {showMore?.map((item, index) => {
          return <MissItem key={index} name={item} />;
        })}
      </div>

      <div className="missing-skill__show">
        {skills?.length > 4 &&
          (!toggle ? (
            <span className="missing-skill__show__text" onClick={showMoreItem}>
              {t("skillSuggest.more")}
            </span>
          ) : (
            <span className="missing-skill__show__text" onClick={showLessItem}>
              {t("skillSuggest.less")}
            </span>
          ))}
      </div>
    </div>
  );
};

export default MissingSkill;

const MissItem = ({ name }) => (
  <div className="missing-skill__items__item">
    <QuestionOutlined
      style={{ color: "#844b17", fontSize: "18px", marginRight: "10px" }}
    />
    <span className="missing-skill__items__item__text">{name}</span>
  </div>
);
