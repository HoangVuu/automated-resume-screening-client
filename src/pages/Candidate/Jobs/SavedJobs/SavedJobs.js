import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SavedJobs.scss";
import {
  DollarCircleOutlined,
  ClockCircleOutlined,
  PlusOutlined
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { getSaveJobs, saveJob } from "services/jobServices.js";
import { Tooltip, Pagination } from "antd";
import { formatDateTime } from "utils";
import ApplyModal from "components/Modals/Apply/ApplyModal";
import { toast, toastErr } from "utils/index";
import Loading from "components/Loading/Loading";
import { Input } from "antd";
import swal from "sweetalert";
import { addJobNote, deleteJobNote } from "services/candidateServices";
import { useTranslation } from "react-i18next";

function CandidateSavedJobs() {
  const { t, i18n } = useTranslation();

  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [unsaved, setUnsaved] = useState(0);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState();
  const [currentProvince, setCurrentProvince] = useState();
  const [currentCompany, setCurrentCompany] = useState();
  const [currentJob, setCurrentJob] = useState();

  const { token } = useSelector((state) => state.auth.candidate);
  const province_list = useSelector((state) => state.cv.provinces);

  const onChange = (page) => {
    setPage(page);
  };

  const toggleModal = (
    jpId,
    provinceName,
    provinceNameEn,
    companyName,
    jobTitle
  ) => {
    setCurrentId(jpId);
    setCurrentProvince(i18n.language === "vi" ? provinceName : provinceNameEn);
    setCurrentCompany(companyName);
    setCurrentJob(jobTitle);

    setShow(!show);
  };

  const onSubmitModal = (isSubmit) => {
    setUnsaved(unsaved + 1);
    console.log(isSubmit);
  };

  const mapResponseToState = (data) =>
    data.map(
      ({
        id,
        created_on,
        job_post: {
          id: job_id,
          company_logo,
          company_name,
          deadline,
          salary,
          provinces,
          job_title,
          description
        },
        note,
        is_applied
      }) => {
        const province_names = provinces.map((id) => {
          const p = province_list.find((p) => p.province_id === id);
          return p ? p.province_name : "";
        });

        const province_names_en = provinces.map((id) => {
          const p = province_list.find((p) => p.province_id === id);
          return p ? p.province_name_en : "";
        });

        return {
          id,
          job_title,
          created_on,
          company_name,
          salary,
          deadline,
          province: province_names.join(", "),
          company_logo,
          job_id,
          description,
          note,
          is_applied,
          provinceEn: province_names_en.join(", ")
        };
      }
    );

  useEffect(() => {
    setLoading(true);
    const fetchJobs = async () => {
      await getSaveJobs(page, token)
        .then((res) => {
          const {
            data,
            pagination: { total }
          } = res.data;

          setJobs(mapResponseToState(data));
          setTotal(total);
        })
        .catch((err) => console.log(err))
        .then(() => {
          setLoading(false);
        });
    };

    if (province_list.length) {
      fetchJobs();
    }
  }, [page, province_list, unsaved]);

  const handleUnsaved = async (job_id) => {
    swal({
      title:
        i18n.language === "en"
          ? "Are you sure unsave this job?"
          : "Bạn có chắc chắn muốn hủy lưu việc làm này",
      text:
        i18n.language === "en"
          ? "You'll delete this job from saved jobs list!"
          : "Bạn sẽ xóa việc làm này ra khỏi danh sách việc làm làm đã lưu",
      icon: "warning",
      buttons: [t("profile.cancel"), t("profile.delete")],
      dangerMode: true
    })
      .then(async (willDelete) => {
        if (willDelete) {
          await saveJob(job_id, 0, token)
            .then((res) => {
              setUnsaved(unsaved + 1);
              toast({
                type: "success",
                message:
                  i18n.language === "en"
                    ? "Unsave job successful"
                    : "Hủy lưu thành công"
              });
            })
            .catch((err) => {
              toastErr(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container saved-jobs">
      {total ? (
        <div>
          <div className="box box--white saved-jobs__title">
            <div className="search-meta">
              <h1
                className="text-primary bold"
                style={{ fontSize: 21, marginBottom: 0 }}
              >
                {`${t("myJob.saved")} ${total} ${
                  total > 1 ? t("myJob.jobs") : t("myJob.job")
                }`}
              </h1>
            </div>
          </div>
        </div>
      ) : null}

      <div className="row">
        <Loading loading={loading} />
        <div className="col-md-12">
          <div className="job-list search-result">
            {!jobs.length ? (
              <EmptyJob />
            ) : (
              jobs.map((job, i) => (
                <Job
                  key={i}
                  {...job}
                  lastChild={i === jobs.length - 1}
                  toggleModal={toggleModal}
                  show={show}
                  token={token}
                  handleUnsaved={handleUnsaved}
                />
              ))
            )}
          </div>
          {total > 10 && (
            <div className="text-center">
              <Pagination current={page} onChange={onChange} total={total} />
            </div>
          )}
        </div>
      </div>

      <ApplyModal
        visible={show}
        onCancel={toggleModal}
        company_name={currentCompany}
        job_title={currentJob}
        location={currentProvince}
        token={token}
        jp_id={currentId}
        onSubmitModal={onSubmitModal}
      />
    </div>
    // </div>
  );
}

export default CandidateSavedJobs;

const Job = ({
  job_title,
  created_on,
  company_name,
  salary,
  deadline,
  province,
  provinceEn,
  company_logo,
  lastChild,
  toggleModal,
  show,
  job_id,
  token,
  handleUnsaved,
  description,
  note,
  is_applied
}) => {
  const { t, i18n } = useTranslation();

  const { TextArea } = Input;

  const [isOpen, setIsOpen] = useState(false);
  const [noteValue, setNoteValue] = useState();
  const [currentNote, setCurrentNote] = useState(note);

  const getLangSalary = (salary) => {
    if (salary) {
      if (salary === "Thoả thuận") {
        salary = i18n.language === "vi" ? "Thoả thuận" : "Wage agreement";
      } else if (salary.includes("Lên đến")) {
        salary =
          i18n.language === "vi"
            ? salary
            : salary.replaceAll("Lên đến", "Up to ");
      } else if (salary.includes("Từ")) {
        salary =
          i18n.language === "vi" ? salary : salary.replaceAll("Từ", "From ");
      }
    }

    return salary;
  };

  const onDeleteNote = () => {
    swal({
      title:
        i18n.language === "en"
          ? "Are you sure to delete this note?"
          : "Bạn có chắc chắn muốn xóa ghi chú này?",
      text:
        i18n.language === "en"
          ? "You'll delete note for this job!"
          : "Bạn sẽ xóa ghi chú của việc làm này!",
      icon: "warning",
      buttons: [t("profile.cancel"), t("profile.delete")],
      dangerMode: true
    })
      .then(async (willDelete) => {
        if (willDelete) {
          await deleteJobNote(job_id, token)
            .then((res) => {
              setCurrentNote(null);
              toast({
                type: "success",
                message:
                  i18n.language === "en"
                    ? "Delete saved job's note successful!"
                    : "Xóa ghi chú việc làm thành công!"
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSaveNote = async () => {
    setIsOpen(true);

    await addJobNote(noteValue, job_id, token)
      .then((res) => {
        console.log("note", res.data.data.note);

        toast({
          message:
            i18n.language === "en"
              ? "Add Notes successfull"
              : "Thêm ghi chú thành công"
        });
        setCurrentNote(res.data.data.note);
        setIsOpen(false);
      })
      .catch((err) => {
        toastErr(err);
      });
  };

  return (
    <>
      <div
        className="row job"
        style={{
          borderBottom: lastChild && 0,
          minHeight: "230px",
          paddingTop: "20px"
        }}
      >
        <div className="hidden-xs col-sm-2 col-avatar">
          <div className="company-logo" style={{ margin: "12px auto 0px" }}>
            <img src={company_logo} alt="Company avatar" />
          </div>

          {/* Note  */}
          <div className="note-job">
            {!isOpen && !currentNote && (
              <div className="note-job__none" onClick={() => setIsOpen(true)}>
                <PlusOutlined
                  style={{
                    marginRight: "8px",
                    fontSize: "14px",
                    paddingBottom: "5px"
                  }}
                />
                {t("myJob.addNote")}
              </div>
            )}
          </div>
        </div>
        <div className="col-sm-8">
          <h4 className="job-title">
            <Link to={`/job-detail/${job_id}`}>
              <span
                className="bold transform-job-title"
                style={{ color: "#2765cf" }}
              >
                {job_title}
              </span>
            </Link>
          </h4>
          <div className="row-company text_ellipsis">{company_name}</div>
          <div>
            {t("myJob.saveOn")}: {formatDateTime(created_on)}
          </div>
          <Tooltip
            placement="top"
            title={i18n.language === "vi" ? province : provinceEn}
          >
            <div
              className="address text_ellipsis"
              style={{ marginTop: "10px", color: "rgba(28,28,28,.63)" }}
            >
              <i
                className="fas fa-map-marker-alt mr-5"
                style={{ fontSize: 16, color: "#2557a7" }}
              ></i>
              {i18n.language === "vi" ? province : provinceEn}
            </div>
          </Tooltip>
          <div
            className="summary show-less-des"
            style={{ color: "#666" }}
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
          <div className="row text-dark-gray" id="row-result-info-job">
            <div className="salary col-sm-5" style={{ fontSize: "16px" }}>
              <DollarCircleOutlined
                style={{
                  fontSize: "16px",
                  marginRight: "5px",
                  color: "#2557a7"
                }}
              />
              {getLangSalary(salary)}
            </div>
            <div className="deadline col-sm-5" style={{ fontSize: "16px" }}>
              <ClockCircleOutlined
                style={{
                  fontSize: "16px",
                  marginRight: "5px",
                  color: "#2557a7"
                }}
              />
              {formatDateTime(deadline)}
            </div>
          </div>

          {/* Note area  */}
          <div className="note-job__content">
            {isOpen ? (
              <>
                <strong style={{ fontSize: "16px" }}>{t("myJob.note")}</strong>
                <TextArea
                  className="note-job__content__area"
                  defaultValue={currentNote}
                  rows={4}
                  onChange={(e) => setNoteValue(e.target.value)}
                />
                <p className="note-job__content__only">{t("myJob.only")}</p>

                <div className="note-job__content__button">
                  <div
                    className="note-job__content__button__save"
                    onClick={onSaveNote}
                  >
                    {t("myJob.save")}
                  </div>
                  <div
                    className="note-job__content__button__text"
                    onClick={() => setIsOpen(false)}
                  >
                    {t("myJob.cancel")}
                  </div>
                </div>
              </>
            ) : (
              currentNote && (
                <>
                  <div className="note-job__content__edit">
                    <strong style={{ fontSize: "16px" }}>
                      {t("myJob.note")}
                    </strong>
                    <div
                      className="note-job__content__button__text"
                      onClick={() => setIsOpen(true)}
                    >
                      {t("myJob.edit")}
                    </div>
                    <div
                      className="note-job__content__button__text"
                      onClick={onDeleteNote}
                    >
                      {t("myJob.delete")}
                    </div>
                  </div>
                  <div className="note-job__content__saved">{currentNote}</div>
                </>
              )
            )}
          </div>
        </div>

        <div className="col-sm-2 job-button-group">
          {is_applied ? (
            <button className="view-apply-button saved-job__apply applied">
              {t("myJob.applied")}
            </button>
          ) : (
            <button
              className="view-apply-button saved-job__apply"
              onClick={() => {
                toggleModal(
                  job_id,
                  province,
                  provinceEn,
                  company_name,
                  job_title
                );
              }}
            >
              {t("myJob.apply")}
            </button>
          )}
          <div className="box-save-job">
            <button
              className="btn-unsave unsave"
              style={{
                color: "#2765CF",
                paddingTop: "5px",
                fontSize: "15px",
                paddingBottom: "32px"
              }}
              onClick={() => handleUnsaved(job_id)}
            >
              <i className="fa fa-trash mr-10"></i>
              {t("myJob.remove")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const EmptyJob = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <div className="text-center">
        <img
          src="/assets/svg/Empty.svg"
          alt="empty icon"
          style={{ width: "380px", height: "160px", margin: "50px auto" }}
        />
        <p style={{ paddingBottom: "80px" }}>
          {i18n.language === "vi"
            ? "Bạn chưa lưu tin tuyển dụng nào!"
            : "You haven't saved any job postings yet!"}
        </p>
      </div>
    </>
  );
};
