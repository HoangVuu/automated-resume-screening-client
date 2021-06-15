import React from "react";
import "./ExploreWithSkills.scss";
import { useTranslation } from "react-i18next";

const MatchSkillNone = ({ isNeedCV = false }) => {
  const { t } = useTranslation();

  return (
    <div className="match-none">
      <div className="match-none__container">
        <p className="match-none__container__sorry">
        {t("explore.sorry")}
        </p>
        <div className="match-none__container__self">
        {t("explore.self")}
        </div>
      </div>
    </div>
  );
};

export default MatchSkillNone;
