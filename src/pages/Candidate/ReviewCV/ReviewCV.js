import ConfirmModal from "components/Modals/ConfirmModal/ConfirmModal";
import React, { useEffect, useState } from "react";
import ProgressBar from "components/ProgressBar/ProgressBar";
import EducationForm from "components/Forms/ReviewForm/EducationForm";
import ExperienceForm from "components/Forms/ReviewForm/ExperienceForm";
import SkillForm from "components/Forms/ReviewForm/SkillForm";
import { useTranslation } from "react-i18next";

function CandidateReviewCV() {
  const { t, i18n } = useTranslation();

  const [visible, setVisible] = useState(false);
  const [curStep, setStep] = useState(1);
  const [progress, setProgress] = useState(0);

  const STEPS = [
    { step: 1, label: i18n.language === "en" ? "Education" : "Học vấn" },
    { step: 2, label: i18n.language === "en" ? "Experience" : "Kinh nghiệm thực tế" },
    { step: 3, label: i18n.language === "en" ? "Skills" : "Các kĩ năng" }
  ];

  const handleChangeStep = (step) => {
    setStep(step);
    setProgress(((step - 1) * 100) / (STEPS.length - 1));
  };

  useEffect(() => {
    setVisible(true);
  }, []);

  const toggleModal = () => setVisible(false);

  const renderContent = () => {
    switch (curStep) {
      case 1:
        return (
          <EducationForm
            curStep={curStep}
            handleChangeStep={handleChangeStep}
          />
        );

      case 2:
        return (
          <ExperienceForm
            curStep={curStep}
            handleChangeStep={handleChangeStep}
          />
        );

      case 3:
        return (
          <SkillForm curStep={curStep} handleChangeStep={handleChangeStep} />
        );

      default:
        return null;
    }
  };

  return (
    <div
      style={{ maxWidth: "700px", margin: "35px auto 0", paddingBottom: 60 }}
    >
      <ProgressBar
        steps={STEPS}
        curStep={curStep}
        progress={progress}
        handleChangeStep={handleChangeStep}
      />

      {renderContent()}

      <ConfirmModal
        visible={visible}
        onCancel={toggleModal}
        onOk={toggleModal}
      />
    </div>
  );
}

export default CandidateReviewCV;
