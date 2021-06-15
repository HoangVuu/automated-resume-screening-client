import React, { useEffect, useState } from "react";

import "../MatchSkill.scss";
import MatchSkillSubModal from "./MatchSkillSubModal";
import { useTranslation } from "react-i18next";

const MatchSkillSub = ({ matchedSkills, mainSkills, name }) => {
  const { t, i18n } = useTranslation();

  const [show, toggleShow] = useState(false);
  const toggleModal = () => {
    toggleShow(true);
  };

  return (
    <>
      <div onClick={toggleModal} className="match-skill__sub row" style={{maxWidth: i18n.language === 'vi' && "283px"}}>
        <div className="match-skill__sub__title">{t("matchedJob.numberSkillMatch")}</div>
        <div className="match-skill__sub__number">
          <span>{matchedSkills.length}</span>
        </div>
      </div>
      <MatchSkillSubModal
        show={show}
        toggleModal={() => toggleShow(false)}
        matchedSkills={matchedSkills}
        mainSkills={mainSkills}
        name={name}
      />
    </>
  );
};

export default MatchSkillSub;
