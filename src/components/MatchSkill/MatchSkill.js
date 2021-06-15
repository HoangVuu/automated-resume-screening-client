import React, { useEffect, useState } from "react";

import "./MatchSkill.scss";
import MatchSkillCard from "./MatchSkillCard/MatchSkillCard";
import MatchSkillChips from "./MatchSkillChips/MatchSkillChips";
import MatchSkillSub from "./MatchSkillSub/MatchSkillSub";
import isEmpty from "lodash/isEmpty";
import { useTranslation } from "react-i18next";

const MatchSkill = ({
  domain,
  matchedSkills,
  salary,
  totalCount,
  mainSkills
}) => {
  const { t } = useTranslation();

  return (
    <div className="match-skill">
      <div className="match-skill__left">
        {!isEmpty(domain) && !isEmpty(salary) && (
          <MatchSkillCard
            id={domain.id}
            name={domain.name}
            logo={domain.logo}
            content={domain.content}
            min={salary.min}
            max={salary.max}
          />
        )}
      </div>

      <div className="match-skill__right">
        <div className="match-skill__right__chip">
          <p className="match-skill__right__chip__title">{t("matchedJob.matchSkills")}</p>
          {matchedSkills?.length && (
            <MatchSkillChips chipList={matchedSkills} />
          )}
        </div>

        <div className="match-skill__right__see">
          {matchedSkills?.length && mainSkills?.length && !isEmpty(domain) && (
            <MatchSkillSub
              matchedSkills={matchedSkills}
              mainSkills={mainSkills.map((item) => item.name)}
              name={domain.name}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchSkill;
