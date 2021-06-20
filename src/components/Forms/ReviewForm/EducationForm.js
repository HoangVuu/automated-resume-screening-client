import React, { useState } from "react";
import ContentEditable from "react-contenteditable";
import { Button } from "antd";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { UPDATE_CV_VALUES } from "state/reducers/cvReducer";
import "./ReviewForm.scss";
import { useTranslation } from "react-i18next";

function EducationForm({ curStep, handleChangeStep, hideBtn = false }) {
  const { t, i18n } = useTranslation();

  const education = useSelector((state) => state.cv.education, shallowEqual);
  const dispatch = useDispatch();

  const [html, setHtml] = useState(education);

  const handleChange = (evt) => {
    setHtml(evt.target.value);
  };

  const handleSubmit = () => {
    dispatch({ type: UPDATE_CV_VALUES, key: "education", value: html });
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
            <div className="container-fluid">
              {/* <div className="heading-margin sg-heading3 title">Học vấn</div> */}
              <div className="heading-margin sg-heading3 title">
                {i18n.language === "en"
                  ? "Review your education"
                  : "Xem lại học vấn của bạn"}
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

export default EducationForm;
