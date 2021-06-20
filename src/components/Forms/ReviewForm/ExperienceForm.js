import React, { useState } from "react";
import ContentEditable from "react-contenteditable";
import { Button } from "antd";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { UPDATE_CV_VALUES } from "state/reducers/cvReducer";
import { InputNumber } from "antd";
import { useTranslation } from "react-i18next";

function ExperienceForm({ curStep, handleChangeStep, hideBtn = false }) {
  const { t, i18n } = useTranslation();

  const experience = useSelector((state) => state.cv.experience, shallowEqual);
  const dispatch = useDispatch();
  const [month, setMonth] = useState(0);

  const [html, setHtml] = useState(experience);

  const handleChange = (evt) => {
    setHtml(evt.target.value);
  };

  const handleSubmit = () => {
    dispatch({ type: UPDATE_CV_VALUES, key: "experience", value: html });
    dispatch({
      type: UPDATE_CV_VALUES,
      key: "months_of_experience",
      value: month
    });
    handleChangeStep(curStep + 1);
  };

  return (
    <>
      <div className="panel panel--light">
        <div
          className="panel-body"
          style={{ paddingTop: "10px", paddingBottom: "40px" }}
        >
          <div className="rv-content">
            <div
              className="container-fluid custom"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <div className="heading-margin sg-heading3 title">
                {i18n.language === "en"
                  ? "Experiences"
                  : "Kinh nghiệm thực tế "}
              </div>

              <div>
                <InputNumber
                  min={0}
                  max={500}
                  value={month}
                  onChange={(value) => {
                    setMonth(value);
                  }}
                />
                <span>
                  {" "}
                  tháng <span className="text-danger">*</span>
                </span>
              </div>
            </div>
            <div className="wizard-page-children container-fluid">
              <ContentEditable
                html={html} // innerHTML of the editable div
                disabled={false} // use true to disable edition
                onChange={handleChange} // handle innerHTML change
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <Button
          className={"form-complete " + (hideBtn && "hide-btn")}
          onClick={handleSubmit}
        >
          {t("review.next")}
        </Button>
        {curStep > 1 && (
          <Button
            className="form-cancel"
            style={{ margin: "0 8px" }}
            onClick={() => handleChangeStep(curStep - 1)}
          >
            {t("review.back")}
          </Button>
        )}
      </div>
    </>
  );
}

export default ExperienceForm;
