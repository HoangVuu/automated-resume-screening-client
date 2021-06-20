import React from "react";
import "./ProgressBar.scss";
import { Checked } from "constants/svg";
import { useTranslation } from "react-i18next";

function ProgressBar({ steps, curStep = 1, handleChangeStep, progress }) {
  const { t, i18n } = useTranslation();

  return (
    <>
      <div className="barPadding">
        <div className="barContainer">
          <div className="barProgress">
            <div
              className="barProgressFill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="barInnerDots">
            {steps.map(({ step }) => (
              <Dot
                key={step}
                label={step}
                curStep={curStep}
                onClick={handleChangeStep}
                numsStep={steps.length}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={i18n.language === "vi" ? "barLabelVn" : "barLabel "}>
        {steps.map(({ step, label }) => (
          <Label key={step} step={step} curStep={curStep} label={label} />
        ))}
      </div>
    </>
  );
}

export default ProgressBar;

const Dot = ({ label, curStep, onClick, numsStep }) => (
  <>
    <div
      className={`step-dot ${curStep > label ? "dotChecked" : ""} ${
        curStep === label ? "cur-step" : ""
      }`}
    >
      {curStep <= label ? (
        <div className={`dotInner ${curStep === label ? "curDot" : ""}`}>
          {label}
        </div>
      ) : (
        Checked
      )}
      <button
        onClick={() => onClick(label)}
        className="buttonAsLink dotLink"
        role="link"
      ></button>
    </div>
    {label < numsStep && <div className="step-dash"></div>}
  </>
);

const Label = ({ step, curStep, label }) => (
  <label className={`label-text ${curStep === step ? "labelActive" : ""}`}>
    {label}
  </label>
);
