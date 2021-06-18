import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import "./ApplyModal.scss";
import { candidateGetResumes } from "services/candidateServices";
import { useDispatch } from "react-redux";
import { candidateApplyAction } from "state/actions/hrJobAction";
import Loading from "components/Loading/Loading";
import { toast } from "utils/index";
import { useTranslation } from "react-i18next";

function ApplyModal({
  visible,
  onCancel,
  company_name,
  job_title,
  token,
  jp_id,
  location,
  onSubmitModal
}) {
  const { t, i18n } = useTranslation();

  const [selected, setSelected] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [clickSubmit, setClickSubmit] = useState(false);


  const dispatch = useDispatch();

  useEffect(() => {
    const fetchResumes = async () => {
      await candidateGetResumes(token).then((res) => {
        setResumes(res.data.data);
      });
    };

    if (token) {
      fetchResumes();
    }
  }, [token]);

  const handleSubmit = () => {
    console.log('id', jp_id);
    console.log(location)
    setLoading(true);
    dispatch(candidateApplyAction({ jp_id: jp_id, resume_id: selected, token }))
      .then(() => {
        onCancel();
        onSubmitModal(true)
      })
      .catch(() => !selected && toast({ type: "error", message: i18n.language === "en" ? "Please select a resume to apply" : "Vui lòng chọn hồ sơ để ứng tuyển" }))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal
      title={t("apply.title")}
      visible={visible}
      onCancel={onCancel}
      okText={t("apply.submit")}
      cancelText={t("apply.return")}
      onOk={handleSubmit}
    >
      <div>
        <Loading loading={loading} />
        <div style={{ marginBottom: "0.5rem" }}>
          <div>
            <div className="apply-headerContainer">
              <div className="apply-title">{job_title}</div>
              <div className="apply-subtitle">
                <span>{company_name}</span>
                {" - "}
                <span>{location}</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div style={{ marginBottom: "1.5rem" }}>
            <div className="resumeSelector-title">{t("apply.choose")}:</div>
            {resumes.map((resume) => (
              <Resume
                key={resume.id}
                selected={selected}
                setSelected={setSelected}
                {...resume}
              />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ApplyModal;

const Resume = ({
  selected,
  id,
  setSelected,
  resume_filename,
  resume_file_extension
  // store_url
}) => (
  <div
    className={`resumeSelector-box ${
      selected === id ? "resumeSelector-box--selected" : ""
    }`}
    onClick={() => setSelected(id)}
  >
    <div className="resumeSelector-information">
      <div className="resumeSelector-resumeIcon">
        {resume_file_extension === "pdf" ? (
          <span className="resumeIcon-pdf"></span>
        ) : (
          <span className="resumeIcon-docx"></span>
        )}
      </div>
      <div className="resumeSelector-resumeTitle">
        <div className="resumeSelector-itemTitle">
          {resume_filename}.{resume_file_extension}
        </div>
      </div>
    </div>
  </div>
);
