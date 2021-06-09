import React, { useRef, useState, useEffect } from "react";
import "./CandidateProfile.scss";
import FormData from "form-data";
import { useDispatch, useSelector } from "react-redux";
import { uploadCVAction } from "state/actions/index";
import Loading from "components/Loading/Loading";
import {
  Button,
  Input,
  InputNumber,
  Form,
  DatePicker,
  Radio,
  Switch
} from "antd";
import Select from "react-select";
import moment from "moment";
import {
  CloseOutlined,
  PlusOutlined,
  UploadOutlined,
  DownloadOutlined,
  EyeOutlined,
  DeleteOutlined,
  ProfileTwoTone,
  ProfileOutlined,
  RobotOutlined,
  CheckOutlined,
  DeleteTwoTone
} from "@ant-design/icons";

import swal from "sweetalert";

import isEmpty from "lodash/isEmpty";
import {
  toastErr,
  toast,
  formatProvince,
  formatProvinceName
} from "utils/index";
import ContentEditable from "react-contenteditable";

import { getIndexArray } from "utils/index";
import AddSkillSuggest from "components/AddSkillSuggest/AddSkillSuggest";
import AddSoftSkillSuggest from "components/AddSoftSkillSuggest/AddSoftSkillSuggest";

import { getCandidateProfile } from "services/candidateProfileServices";
import {
  getSubcribe,
  updateSubcribe,
  deleteSubcribe
} from "services/jobServices";

import { candidateProfileAction } from "state/actions/profileAction";
import { updateProfileProAction } from "state/actions/profileAction";
import { updateCVProfileAction } from "state/actions/index";
import { Link } from "react-router-dom";

const ACCEPTS = [
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/pdf"
];

const config = {
  rules: [
    {
      type: "object",
      required: true,
      message: "Please choose your date of birth!"
    }
  ]
};

const validateMessages = {
  required: "Please enter ${label}!",
  types: {
    // fullName: "Email không hợp lệ",
    // password: "Mật khẩu"
  }
};

function MyProfile() {
  const dispatch = useDispatch();

  // ref
  const inputRef = useRef();

  const eduFormRef = useRef();
  const exFormRef = useRef();
  const skillFormRef = useRef();
  const softSkillFormRef = useRef();
  const resumeFormRef = useRef();

  const token = useSelector((state) => state.auth.candidate.token);
  const profile = useSelector((state) => state.profile.candidateProfile);

  // state
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState();
  const [subcribe, setSubcribe] = useState(false);
  const [frequency, setFrequency] = useState();

  const [resume, setResume] = useState();
  const [resumeDefault, setResumeDefault] = useState();

  const [eduForm, setEduForm] = useState(false);
  const [exForm, setExForm] = useState(false);
  const [skillForm, setSkillForm] = useState(false);
  const [softSkillForm, setSoftSkillForm] = useState(false);
  const [resumeForm, setResumeForm] = useState(false);
  const [profileForm, setProfileForm] = useState(false);

  // Handle chips
  const [isAdd, setIsAdd] = useState(false);
  const [value, setValue] = useState("");
  const [skills, setSkills] = useState();
  const [defaultSkills, setDefaultSkills] = useState();

  //Handle chip soft skills
  const [isSoftAdd, setIsSoftAdd] = useState(false);
  const [softValue, setSoftValue] = useState("");
  const [softSkills, setSoftSkills] = useState();
  const [defaultSoftSkills, setDefaultSoftSkills] = useState();

  const { RangePicker } = DatePicker;

  const provinces = useSelector((state) =>
    state.cv.provinces.map(({ province_id, province_name }) => ({
      value: province_id,
      label: province_name
    }))
  );

  const provinceList = useSelector((state) => state.cv.provinces)

  const defaultProvince = (id) =>
    provinces.length && provinces.find((item) => item.value === id);

  const onFinish = (fieldsValue) => {
    const values = {
      ...fieldsValue,
      dateOfBirth: fieldsValue["dateOfBirth"].format("YYYY-MM-DD"),
      provinceId:
        fieldsValue.province_id?.value ||
        (!isEmpty(profile) && profile.provinceId)
    };

    delete values.province_id;

    dispatch(updateProfileProAction(values))
      .then(() => {
        dispatch(candidateProfileAction(token));
        setLoading(false);
        setProfileForm(false);
      })
      .catch(() => {
        setLoading(false);
      });
    setLoading(true);
  };

  const toggleEduForm = () => {
    setEduForm(true);
    eduFormRef.current.scrollIntoView();
  };

  const toggleExForm = () => {
    setExForm(true);
    exFormRef.current.scrollIntoView();
  };

  const toggleSkillForm = () => {
    setSkillForm(true);
    skillFormRef.current.scrollIntoView();
  };

  const toggleSoftSkillForm = () => {
    setSoftSkillForm(true);
    softSkillFormRef.current.scrollIntoView();
  };

  const toggleResumeForm = () => {
    setResumeForm(true);
    resumeFormRef.current.scrollIntoView();
  };

  const toggleProFormEdit = () => {
    setProfileForm(true);
  };

  const cancelEdu = () => {
    setEduForm(false);
    setResume((curState) => ({
      ...curState,
      educations: resumeDefault.educations
    }));
  };

  const cancelEx = () => {
    setExForm(false);
    setResume((curState) => ({
      ...curState,
      months_of_experience: resumeDefault.months_of_experience,
      experiences: resumeDefault.experiences
    }));
  };

  const onDelete = (key) => {
    const newSkills =
      skills && skills.length && skills.filter((ele) => ele.key !== key);
    setSkills(newSkills);
  };

  const getNewSkill = (value) => {
    setValue(value);
    setIsAdd(false);
  };

  const onAddSkill = () => {
    const key = skills && skills.length && skills[skills.length - 1].key + 1;
    const newSkills = [...skills, { key, value }];
    setSkills(newSkills);
    setValue("");
    setIsAdd(true);
  };

  const onCancelSkills = () => {
    setSkillForm(false);
    setSkills(defaultSkills);
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
    setSoftValue("");
    setIsSoftAdd(true);
  };

  const onCancelSoftSkills = () => {
    setSoftSkillForm(false);
    setSoftSkills(defaultSoftSkills);
  };

  // Hanlde upload file
  const handleSelectFile = () => {
    inputRef.current.click();
  };

  const handleInputChange = async (e) => {
    const file = e.target.files[0];

    if (!ACCEPTS.includes(file.type)) {
      toast({ type: "error", message: "Định dạng tệp không hợp lệ" });
    } else {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      dispatch(uploadCVAction(formData));
    }
  };

  const handleChangeResume = (name, value) => {
    setResume((curState) => ({
      ...curState,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    setLoading(true);
    const values = skills.map((ele) => ele.value);
    const softValues = softSkills.map((ele) => ele.value);

    dispatch(
      updateCVProfileAction({
        resumeId: resume.id,
        education: resume.educations,
        experience: resume.experiences,
        values,
        softValues,
        monthEx: resume.months_of_experience
      })
    )
      .then(() => {
        setLoading(false);
        resume.educations !== resumeDefault.educations && setEduForm(false);
        (resume.experiences !== resumeDefault.experiences ||
          resume.months_of_experience !== resumeDefault.months_of_experience) &&
          setExForm(false);
        values.length !== defaultSkills.length && setSkillForm(false);
        softValues.length !== defaultSoftSkills.length &&
          setSoftSkillForm(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onFinishRadio = (fieldsValue) => {
    console.log("values", fieldsValue);
  };

  //Handle email notification
  const setValueRadio = async (value) => {
    setFrequency(value);
    const status = subcribe.status ? 1 : 0;

    await updateSubcribe(
      subcribe.topic,
      subcribe.province_id,
      value,
      status,
      token
    )
      .then((res) => {
        toast({ type: "success", message: "Update frequency successful" });
      })
      .catch((err) => console.log(err));
  };

  const onSelect = async (value) => {
    console.log("select", value);
    setActive(!active);

    const status = value ? 1 : 0;

    await updateSubcribe(
      subcribe.topic,
      subcribe.province_id,
      frequency,
      status,
      token
    )
      .then((res) => {
        toast({ type: "success", message: "Update status successful" });
      })
      .catch((err) => console.log(err));
  };

  const onDeleteSubcribe = () => {
    swal({
      title: "Are you sure to delete jobs alert?",
      text: "You'll not receive from us in the future!",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true
    })
      .then(async (willDelete) => {
        if (willDelete) {
          await deleteSubcribe(token)
            .then((res) => {
              setSubcribe(null);
              toast({
                type: "success",
                message: "Delete your jobs alert successful"
              });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          swal("Jobs alert is working!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchProfile = async () => {
    setLoading(true);

    await getCandidateProfile(token)
      .then(async (res) => {
        setResume({
          ...res.data.data.resumes[0]
        });
        setResumeDefault({
          ...res.data.data.resumes[0]
        });
        setSkills(getIndexArray(res.data.data.resumes[0].technical_skills));
        setDefaultSkills(
          getIndexArray(res.data.data.resumes[0].technical_skills)
        );
        setSoftSkills(
          getIndexArray(res.data.data.resumes[0].soft_skills?.split("|"))
        );
        setDefaultSoftSkills(
          getIndexArray(res.data.data.resumes[0].soft_skills?.split("|"))
        );
      })
      .catch((err) => {
        // toastErr(err);
      })
      .finally(() => {
        setLoading(false);
      });

    await getSubcribe(token)
      .then(async (res) => {
        console.log(res.data.data);
        setSubcribe(res.data.data);
        setActive(res.data.data.status === 1);
        setFrequency(res.data.data.type);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (token) {
      fetchProfile();
      dispatch(candidateProfileAction(token));
    }
  }, []);

  console.log("active", active);
  return (
    <div className="my-profile">
      <Loading loading={loading} />
      {!isEmpty(profile) && (
        <div className="my-profile__candidate">
          <div className="container" style={{ position: "relative" }}>
            <h2 className="my-profile__candidate__name"> {profile.fullName}</h2>
            <span className="my-profile__candidate__email">
              {" "}
              {profile.email}
            </span>
            <p className="my-profile__candidate__phone"> {profile.phone}</p>
            <button
              onClick={toggleProFormEdit}
              className="my-profile__candidate__button"
            >
              Edit personal details
            </button>

            {profileForm && (
              <div className="col-sm-8 my-profile__candidate__edit edit-mode-container">
                <h3 style={{ paddingLeft: "24px" }}>Edit personal details</h3>
                <h4 className="my-profile__candidate__edit__title">
                  Email address
                </h4>
                <span className="my-profile__candidate__edit__email">
                  {profile.email}
                </span>
                <Form
                  layout="vertical"
                  name="nest-messages"
                  validateMessages={validateMessages}
                  onFinish={onFinish}
                  className="candidate-login__container__left__form my-profile__candidate__edit__form"
                  fields={[
                    {
                      name: ["fullName"],
                      value: profile.fullName
                    },
                    {
                      name: ["phone"],
                      value: profile.phone
                    },
                    {
                      name: ["dateOfBirth"],
                      value: moment(profile.dateOfBirth, "DD/MM/YYYY")
                    },
                    {
                      name: ["gender"],
                      value: profile.gender
                    }
                  ]}
                >
                  <Form.Item
                    label="Fullname"
                    name="fullName"
                    rules={[{ required: true }]}
                  >
                    <Input className="candidate-login__container__left__form__input " />
                  </Form.Item>

                  {/* Email */}
                  <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[
                      { required: true },
                      {
                        pattern: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
                        message: "Your phone number is invalid"
                      }
                    ]}
                  >
                    <Input className="candidate-login__container__left__form__input" />
                  </Form.Item>

                  {/* Date of birth  */}
                  <div className="row">
                    <Form.Item
                      className="col-sm"
                      name="dateOfBirth"
                      label="Date of birth"
                      // defaultValue={moment(deadline)}
                      {...config}
                    >
                      <DatePicker
                        defaultValue={moment(profile.dateOfBirth, "DD/MM/YYYY")}
                        className="my-profile__candidate__edit__form__date"
                      />
                    </Form.Item>

                    {/* Gender  */}
                    <Form.Item
                      className="col-sm"
                      style={{ paddingLeft: "40px" }}
                      rules={[
                        { required: true, message: "Please choose gender!" }
                      ]}
                      name="gender"
                      label="Gender"
                    >
                      <Radio.Group defaultValue={profile.gender}>
                        <Radio value={true}>Male</Radio>
                        <Radio value={false}>Female</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>

                  <Form.Item name="province_id" label=" Lives in">
                    <Select
                      defaultValue={defaultProvince(profile.provinceId)}
                      options={provinces}
                      size="large"
                    />
                  </Form.Item>

                  <div className="profile-button-gr">
                    <button
                      className="save-btn profile-button"
                      onClick={toggleProFormEdit}
                    >
                      Save
                    </button>
                    <button
                      className="profile-button-cancel"
                      onClick={() => setProfileForm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="my-profile__resume container">
        <div className="my-profile__resume__upload row">
          <div className="my-profile__resume__upload__left">
            <h4 className="profile-title">
              Create a new resume from your FASTJOB Profile
            </h4>
            <div className="my-profile__resume__upload__left__btn-gr row">
              <button
                className="my-profile__resume__upload__left__btn-gr__start"
                onClick={() => resumeFormRef.current.scrollIntoView()}
              >
                Upload your resume
              </button>
            </div>
          </div>

          <div className="my-profile__resume__upload__right">
            <img src="/assets/img/profile.png" alt="CV" />
          </div>
        </div>

        {/* Resume information  */}
        <div className="row">
          <div
            className="col-sm-8"
            style={{ marginTop: profileForm && "255px" }}
          >
            {!isEmpty(resume) && (
              <>
                {/* Education  */}
                <div
                  ref={eduFormRef}
                  className={
                    "my-profile__resume__education profile-section " +
                    (eduForm && "edit-mode-container")
                  }
                >
                  <h4
                    className="profile-title"
                    style={{ fontWeight: "700", marginBottom: "32px" }}
                  >
                    Education
                  </h4>
                  <div
                    className={
                      eduForm
                        ? "wizard-page-children my-profile__resume__education__content-edit edit-mode"
                        : "wizard-page-children my-profile__resume__education__content"
                    }
                  >
                    <ContentEditable
                      html={resume.educations} // innerHTML of the editable div
                      disabled={!eduForm} // use true to disable edition
                      onChange={(evt) =>
                        handleChangeResume("educations", evt.target.value)
                      } // handle innerHTML change
                    />
                    <div className="profile-gradient"></div>
                  </div>
                  <div className="profile-button-gr">
                    <button
                      className={
                        eduForm ? "save-btn profile-button" : "profile-button"
                      }
                      onClick={!eduForm ? toggleEduForm : handleSubmit}
                    >
                      {!eduForm ? "Edit education" : "Save"}
                    </button>
                    {eduForm && (
                      <button
                        className="profile-button-cancel"
                        onClick={cancelEdu}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>

                {/* Experience  */}
                <div
                  ref={exFormRef}
                  className={
                    "my-profile__resume__education profile-section " +
                    (exForm && "edit-mode-container")
                  }
                >
                  <h4 className="profile-title" style={{ fontWeight: "700" }}>
                    Experience
                  </h4>
                  <div className="wizard-page-children my-profile__resume__education__content">
                    <div className="rv-content">
                      <div
                        className="custom"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center"
                        }}
                      >
                        <div className="heading-margin sg-heading3 title">
                          Kinh nghiệm thực tế
                        </div>

                        <div>
                          <InputNumber
                            min={0}
                            max={500}
                            bordered={exForm}
                            readOnly={!exForm}
                            value={resume.months_of_experience}
                            onChange={(val) => {
                              handleChangeResume("months_of_experience", val);
                            }}
                          />
                          <span style={{ marginLeft: "10px" }}>
                            tháng <span className="text-danger">*</span>
                          </span>
                        </div>
                      </div>
                      <div
                        className={exForm && "wizard-page-children edit-mode"}
                      >
                        <ContentEditable
                          html={resume.experiences} // innerHTML of the editable div
                          disabled={!exForm} // use true to disable edition
                          onChange={(evt) =>
                            handleChangeResume("experiences", evt.target.value)
                          } // handle innerHTML change
                        />
                      </div>
                    </div>
                  </div>
                  <div className="profile-button-gr">
                    <button
                      className={
                        exForm ? "save-btn profile-button" : "profile-button"
                      }
                      onClick={!exForm ? toggleExForm : handleSubmit}
                    >
                      {!exForm ? "Edit Experience" : "Save"}
                    </button>
                    {exForm && (
                      <button
                        className="profile-button-cancel"
                        onClick={cancelEx}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>

                {/* Skills */}
                <div
                  className={
                    "my-profile__resume__skills " +
                    (skillForm && "edit-mode-container")
                  }
                >
                  <h4
                    className="profile-title"
                    style={{ fontWeight: "700", marginBottom: "32px" }}
                  >
                    Skills
                  </h4>
                  <div className="chip" style={{ marginTop: "20px" }}>
                    {skills &&
                      skills.length &&
                      skills.map(({ key, value }) => (
                        <Skill
                          skill={value}
                          key={key}
                          id={key}
                          onDelete={onDelete}
                          isAction={skillForm}
                        />
                      ))}
                  </div>

                  {skillForm && (
                    <div className="my-profile__resume__skills__add__sub">
                      Click add to add more skills help employers find you
                    </div>
                  )}
                  <div
                    className="inline-skill-container is-compact my-profile__resume__skills__add"
                    style={{
                      marginRight: "40px",
                      display: skillForm && "flex"
                    }}
                  >
                    <div className="inline-skill-input">
                      <div className="TextInput-wrapper">
                        <AddSkillSuggest
                          handleAdd={getNewSkill}
                          isAdd={isAdd}
                          isCorner={true}
                        />
                      </div>
                    </div>
                    <div className="inline-skill-button">
                      <Button
                        className="my-profile__resume__skills__add__btn"
                        type="primary"
                        size="large"
                        disabled={!value}
                        icon={<PlusOutlined />}
                        onClick={onAddSkill}
                      >
                        Add skill
                      </Button>
                    </div>
                  </div>

                  {/* Button  */}
                  <div className="profile-button-gr">
                    <button
                      ref={skillFormRef}
                      className={
                        skillForm ? "save-btn profile-button" : "profile-button"
                      }
                      onClick={!skillForm ? toggleSkillForm : handleSubmit}
                    >
                      {!skillForm ? "Add skills" : "Save"}
                    </button>
                    {skillForm && (
                      <button
                        className="profile-button-cancel"
                        onClick={onCancelSkills}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>

                <div
                  className={
                    "my-profile__resume__skills " +
                    (softSkillForm && "edit-mode-container")
                  }
                >
                  <h4
                    className="profile-title"
                    style={{ fontWeight: "700", marginBottom: "32px" }}
                  >
                    Soft Skills
                  </h4>
                  <div className="chip" style={{ marginTop: "20px" }}>
                    {softSkills &&
                      softSkills.length &&
                      softSkills.map(({ key, value }) => (
                        <Skill
                          skill={value}
                          key={key}
                          id={key}
                          onDelete={onSoftDelete}
                          isAction={softSkillForm}
                        />
                      ))}
                  </div>

                  {softSkillForm && (
                    <div className="my-profile__resume__skills__add__sub">
                      Click add to add more soft skills help employers find you
                    </div>
                  )}
                  <div
                    className="inline-skill-container is-compact my-profile__resume__skills__add"
                    style={{
                      marginRight: "40px",
                      display: softSkillForm && "flex"
                    }}
                  >
                    <div className="inline-skill-input">
                      <div className="TextInput-wrapper">
                        <AddSoftSkillSuggest
                          handleAddSoft={getNewSoftSkill}
                          isAddSoft={isSoftAdd}
                          isCorner={true}
                        />
                      </div>
                    </div>
                    <div className="inline-skill-button">
                      <Button
                        className="my-profile__resume__skills__add__btn"
                        type="primary"
                        size="large"
                        disabled={!softValue}
                        icon={<PlusOutlined />}
                        onClick={onAddSoftSkill}
                      >
                        Add skill
                      </Button>
                    </div>
                  </div>

                  {/* Button  */}
                  <div className="profile-button-gr">
                    <button
                      ref={softSkillFormRef}
                      className={
                        softSkillForm
                          ? "save-btn profile-button"
                          : "profile-button"
                      }
                      onClick={
                        !softSkillForm ? toggleSoftSkillForm : handleSubmit
                      }
                    >
                      {!softSkillForm ? "Add skills" : "Save"}
                    </button>
                    {softSkillForm && (
                      <button
                        className="profile-button-cancel"
                        onClick={onCancelSoftSkills}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Resume file*/}
            <div
              ref={resumeFormRef}
              className={
                "my-profile__resume__info profile-section " +
                (resumeForm && "edit-mode-container")
              }
            >
              <h4 className="profile-title" style={{ fontWeight: "700" }}>
                Resume
              </h4>

              {/* Resume exist */}
              {!isEmpty(resume) ? (
                <>
                  <div className="my-profile__resume__info__row">
                    <img
                      className="cv-item__img"
                      src="/assets/img/CV-default.png"
                      alt="Ảnh CV"
                    />

                    <div className="my-profile__resume__info__row__left">
                      <div className="my-profile__resume__info__tag">
                        Default
                      </div>

                      <a
                        href={resume.download_url}
                        className="my-profile__resume__info__name"
                      >
                        {resume.resume_filename +
                          "." +
                          resume.resume_file_extension}
                        <DownloadOutlined className="cv-item__info__bottom__btn__icon" />
                      </a>
                      <div className="my-profile__resume__info__days">
                        Added 2 days ago
                      </div>
                    </div>
                  </div>

                  {resumeForm && (
                    <>
                      <div className="row cv-item__info__bottom ">
                        <button
                          type="button"
                          className="cv-item__info__bottom__btn btn btn-outline-secondary"
                          onClick={() =>
                            window.open(resume.store_url, "_blank")
                          }
                        >
                          <EyeOutlined className="cv-item__info__bottom__btn__icon" />
                          Watch online
                        </button>

                        <a
                          href={resume.download_url}
                          className="cv-item__info__bottom__btn btn btn-sm btn-outline-secondary "
                        >
                          <DownloadOutlined className="cv-item__info__bottom__btn__icon" />
                          Download
                        </a>

                        <button
                          type="button"
                          className="cv-item__info__bottom__btn btn btn-sm  btn-outline-secondary"
                          // onClick={handleDelete}
                        >
                          <DeleteOutlined className="cv-item__info__bottom__btn__icon" />
                          Delete
                        </button>
                      </div>

                      {/* Handle upload resume  */}
                    </>
                  )}
                </>
              ) : (
                <div className="my-profile__resume__upload-file">
                  <p className="my-profile__resume__upload-file__note">
                    Add 1 resume. Accepted file types: Microsoft Word (.doc or
                    .docx) or Adobe PDF (.pdf)
                  </p>
                  <div
                    className="my-profile__resume__upload-file__box"
                    onClick={handleSelectFile}
                  >
                    <ProfileOutlined
                      style={{
                        fontSize: "50px",
                        color: "#707070"
                      }}
                    />
                    <span className="my-profile__resume__upload-file__box__add">
                      To add a resume, click here or simply browse for a file.
                    </span>
                    <Button
                      // onClick={handleSelectFile}
                      icon={<UploadOutlined />}
                      className="my-profile__resume__upload-file__box__btn"
                    >
                      Upload
                      <input
                        type="file"
                        name="CV"
                        className="d-none"
                        accept=".doc,.docx,.pdf"
                        onChange={handleInputChange}
                        ref={inputRef}
                      />
                    </Button>
                  </div>
                </div>
              )}

              {!isEmpty(resume) && (
                <div className="profile-button-gr">
                  {!resumeForm ? (
                    <button
                      className="profile-button"
                      onClick={toggleResumeForm}
                    >
                      About resume
                    </button>
                  ) : (
                    <button
                      className="save-btn profile-button"
                      onClick={() => setResumeForm(false)}
                    >
                      Done
                    </button>
                  )}
                </div>
              )}
              {/* <button
                    className="profile-button"
                    style={{ marginTop: "32px" }}
                    onClick={() => window.open(resume.store_url, "_blank")}
                  >
                    View online
                  </button> */}
            </div>
          </div>
          <div className="col-sm-4">
            <div className="my-profile__resume__right-info">
              <div className="my-profile__resume__right-info__top">
                <div className="row my-profile__resume__right-info__group">
                  <h3 className="profile-title" style={{ fontSize: "20px" }}>
                    Profile visibility
                  </h3>
                  <ProfileTwoTone
                    style={{
                      fontSize: "32px",
                      marginLeft: "20px",
                      paddingBottom: "7px"
                    }}
                  />
                </div>

                <p className="my-profile__resume__right-info__subtitle">
                  Your profile is the only one in the system, employers can
                  approach you with job opportunities.
                </p>
                <p className="my-profile__resume__right-info__weight">
                  Standard
                </p>
                <span className="my-profile__resume__right-info__last">
                  For all information you provided, your Profile including any
                  verified credentials will be sent to the employer with your
                  applications.
                </span>
              </div>

              <div className="my-profile__resume__right-info__bottom">
                <div className="row my-profile__resume__right-info__group">
                  <h3 className="profile-title" style={{ fontSize: "20px" }}>
                    Receive Job Invitationy
                  </h3>
                </div>

                <p className="my-profile__resume__right-info__subtitle">
                  Job Alert Email{" "}
                  <RobotOutlined
                    style={{
                      fontSize: "20px",
                      marginLeft: "7px"
                    }}
                  />
                </p>
                {!isEmpty(subcribe) ? (
                  <>
                    <div className="my-profile__resume__right-info__res">
                      <span
                        style={{
                          fontSize: "15px",
                          maxWidth:"80%"
                        }}
                      >
                        <span
                          className="my-profile__resume__right-info__weight"
                          style={{ fontSize: "15px", textTransform: 'capitalize' }}
                        >
                          {subcribe.topic}
                        </span>{" "}
                        {subcribe.province_id && (
                          <>
                            <span> in </span>
                            <span
                              className="my-profile__resume__right-info__weight"
                              style={{ fontSize: "15px" }}
                            >
                              {formatProvinceName(formatProvince(provinceList, subcribe.province_id))}
                            </span>
                          </>
                        )}
                      </span>

                      <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        defaultChecked={subcribe.status === 1}
                        onChange={(checked) => onSelect(checked)}
                      />
                    </div>

                    <p
                      className="my-profile__resume__right-info__last"
                      style={{ color: " #6f6f6f" }}
                    >
                      {active ? "Active" : "Paused"}
                    </p>

                    <span
                      className="my-profile__resume__right-info__last"
                      style={{ marginRight: "15px" }}
                    >
                      Frequency:
                    </span>
                    <Form
                      layout="vertical"
                      name="nest-messages"
                      onFinish={onFinishRadio}
                      fields={[
                        {
                          name: ["frequency"],
                          value: frequency
                        }
                      ]}
                    >
                      <Form.Item className="col-sm" name="frequency">
                        <Radio.Group
                          defaultValue={subcribe?.frequency}
                          onChange={(e) => setValueRadio(e.target.value)}
                        >
                          <Radio value={0}>Daily</Radio>
                          <Radio value={1}>Weekly</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </Form>
                    <div className="my-profile__resume__right-info__bottom__edit">
                      <div
                        style={{ color: "#DB183F", cursor: "pointer" }}
                        onClick={onDeleteSubcribe}
                      >
                        <DeleteTwoTone
                          twoToneColor="#DB183F"
                          style={{ marginRight: "3px" }}
                        />{" "}
                        Delete this alert
                      </div>
                    </div>
                  </>
                ) : (
                  <div
                    style={{ marginTop: "15px" }}
                    className="job-list-receiving"
                  >
                    <Link
                      to="/find-jobs"
                      className="job-list-receiving__link"
                      style={{ color: "#1890FF" }}
                    >
                      Active email to receive more jobs from us
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;

const Skill = ({ id, skill, onDelete, isAction }) => {
  return (
    <div className="chip-skill__item">
      <div
        className="container-fluid"
        // style={{ paddingLeft: "0", paddingRight: "0" }}
      >
        <div className="row">
          <div className="skill-editable">
            <ContentEditable
              className="content-editable chip-skill__item__content"
              html={skill} // innerHTML of the editable div
              disabled={true} // use true to disable edition
            />
          </div>
          <div className="float-right chip-skill__item__delete">
            {isAction && (
              <button className=" delete-button">
                <CloseOutlined
                  className="chip-skill__item__delete__icon"
                  onClick={() => onDelete(id)}
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
