import React, { useEffect, useState } from "react";
import { Button, Input } from "antd";
import { PlusOutlined, DeleteFilled, CloseOutlined } from "@ant-design/icons";
import ContentEditable from "react-contenteditable";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { updateCVAction } from "state/actions/index";
import { GET_JOB_DOMAIN } from "state/reducers/jobDomainReducer";
import Loading from "components/Loading/Loading";
import AddSkillSuggest from "components/AddSkillSuggest/AddSkillSuggest";
import AddSoftSkillSuggest from "components/AddSoftSkillSuggest/AddSoftSkillSuggest";
import { useTranslation } from "react-i18next";
import { toast } from "utils/index";

function SkillForm({ curStep, handleChangeStep }) {
  const { t, i18n } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isSoftAdd, setIsSoftAdd] = useState(false);

  const skill = useSelector((state) => state.cv.skill, shallowEqual) || [];
  const softSkill =
    useSelector((state) => state.cv.softSkill, shallowEqual) || [];

  const dispatch = useDispatch();
  const getIndexArray = (arr) => {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
      newArr.push({ key: i, value: arr[i] });
    }

    return newArr;
  };

  useEffect(() => {
    dispatch({ type: GET_JOB_DOMAIN });
  }, []);

  const [skills, setSkills] = useState(getIndexArray(skill));
  const [softSkills, setSoftSkills] = useState(getIndexArray(softSkill));

  const [value, setValue] = useState("");
  const [softValue, setSoftValue] = useState("");

  const onDelete = (key) => {
    const newSkills =
      skills && skills.length && skills.filter((ele) => ele.key !== key);
    setSkills(newSkills);
  };

  const onAddSkill = () => {
    const key = skills && skills.length && skills[skills.length - 1].key + 1;
    const newSkills = [...skills, { key, value }];
    setSkills(newSkills);
    setValue("");
    setIsAdd(true);
  };

  const getNewSkill = (value) => {
    setValue(value);
    setIsAdd(false);
  };

  // Soft skills hanlde actions
  const onSoftDelete = (key) => {
    const newSkills =
      softSkills &&
      softSkills?.length &&
      softSkills?.filter((ele) => ele.key !== key);
    setSoftSkills(newSkills);
  };

  const getNewSoftSkill = (softValue) => {
    setSoftValue(softValue);
    setIsSoftAdd(false);
  };

  const onAddSoftSkill = () => {
    const key =
      softSkills &&
      softSkills?.length &&
      softSkills[softSkills?.length - 1].key + 1;
    const newSkills = [...softSkills, { key, value: softValue }];
    setSoftSkills(newSkills);
    console.log(newSkills);
    setSoftValue("");
    setIsSoftAdd(true);
  };

  const handleSubmit = () => {
    setLoading(true);
    const values = skills?.length && skills.map((ele) => ele.value);
    const softValues = softSkills?.length && softSkills.map((ele) => ele.value);

    dispatch(updateCVAction({ values, softValues }))
      .catch(() => {
        setLoading(false);
        toast({
          type: "success",
          message:
            i18n.language === "vi"
              ? "Cập nhập hồ sơ thành công"
              : "Update profile successful"
        })
      });
    // dispatch({ type: UPDATE_CV_VALUES, key: "skill", value: values });
    // handleChangeStep(curStep + 1);
  };

  return (
    <>
      <Loading loading={loading} />
      <div className="panel panel--light">
        <div
          className="panel-body"
          style={{ paddingBottom: "60px", paddingTop: "10px" }}
        >
          <div className="rv-content">
            <div className="container-fluid">
              {/* <div className="heading-margin sg-heading3 title">Kỹ năng</div> */}
              <div className="heading-margin sg-heading3 title">
                {i18n.language === "en"
                  ? "Highlight your technical skills"
                  : "Làm nổi bật các kỹ năng kỹ thuật của bạn"}
              </div>
            </div>
            <div
              className="wizard-page-children container-fluid"
              spellCheck="false"
            >
              <div
                className="skill-form__container"
                style={{ marginTop: "20px" }}
              >
                {skills.map(({ key, value }) => (
                  <Skill skill={value} key={key} id={key} onDelete={onDelete} />
                ))}
              </div>

              <div className="inline-skill-container is-compact">
                <div className="inline-skill-input">
                  <div>
                    <div
                      className="TextInput-labelWrapper"
                      style={{ marginTop: "40px" }}
                    >
                      <label className="TextInput-label">
                        {t("explore.addSkill")}
                      </label>
                      <p className="TextInput-helpText">
                        {i18n.language === "en" ? "ex" : "Ví dụ"}: Javascript,
                        Kotlin,...
                      </p>
                    </div>
                    <div className="TextInput-wrapper">
                      <AddSkillSuggest
                        handleAdd={getNewSkill}
                        isAdd={isAdd}
                        isCorner={true}
                      />
                    </div>
                  </div>
                </div>
                <div className="inline-skill-button">
                  <Button
                    type="primary"
                    size="large"
                    disabled={!value}
                    icon={<PlusOutlined />}
                    onClick={onAddSkill}
                  >
                    {i18n.language === "en" ? "Add" : "Thêm"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="panel panel--light">
        <div
          className="panel-body"
          style={{ paddingBottom: "60px", paddingTop: "20px" }}
        >
          <div className="rv-content">
            <div className="container-fluid">
              {/* <div className="heading-margin sg-heading3 title">Kỹ năng</div> */}
              <div className="heading-margin sg-heading3 title">
                {i18n.language === "en"
                  ? "Highlight your soft skills"
                  : "Làm nổi bật các kỹ năng mềm của bạn"}
              </div>
            </div>
            <div
              className="wizard-page-children container-fluid"
              spellCheck="false"
            >
              <div
                className="skill-form__container"
                style={{ marginTop: "20px" }}
              >
                {softSkills?.map(({ key, value }) => (
                  <Skill
                    skill={value}
                    key={key}
                    id={key}
                    onDelete={onSoftDelete}
                  />
                ))}
              </div>

              <div
                className="inline-skill-container is-compact"
                style={{ marginTop: "20px" }}
              >
                <div className="inline-skill-input">
                  <div>
                    <div
                      className="TextInput-labelWrapper"
                      style={{ marginTop: "30px" }}
                    >
                      <label className="TextInput-label">
                        {t("profile.addSSkill")}
                      </label>
                      <p className="TextInput-helpText">
                        {i18n.language === "en" ? "ex" : "Ví dụ"}:
                        Communication, Presentation...
                      </p>
                    </div>
                    <div className="TextInput-wrapper">
                      <AddSoftSkillSuggest
                        handleAddSoft={getNewSoftSkill}
                        isAddSoft={isSoftAdd}
                        isCorner={true}
                      />
                    </div>
                  </div>
                </div>
                <div className="inline-skill-button">
                  <Button
                    type="primary"
                    size="large"
                    disabled={!softValue}
                    icon={<PlusOutlined />}
                    onClick={onAddSoftSkill}
                  >
                    {i18n.language === "en" ? "Add" : "Thêm"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "30px" }}>
        <Button className="form-complete" onClick={handleSubmit}>
          {i18n.language === "vi" ? "Hoàn tất" : "Done"}
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

export default SkillForm;

const Skill = ({ id, skill, onDelete }) => {
  return (
    <div className="chip-skill__item">
      <div className="container-fluid">
        <div className="row">
          <div className="skill-editable">
            <ContentEditable
              className="content-editable chip-skill__item__content"
              html={skill} // innerHTML of the editable div
              disabled={true} // use true to disable edition
            />
          </div>
          <div className="float-right chip-skill__item__delete">
            <button className=" delete-button">
              <CloseOutlined
                className="chip-skill__item__delete__icon"
                onClick={() => onDelete(id)}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
