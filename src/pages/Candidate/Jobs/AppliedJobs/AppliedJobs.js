import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AppliedJobs.scss";
import "../SavedJobs/SavedJobs.scss";

import {
  DollarCircleOutlined,
  ClockCircleOutlined,
  PlusOutlined
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { getApplyJobs } from "services/jobServices";
import { formatDateTime, toast, toastErr } from "utils/index";
import { Tooltip, Pagination } from "antd";
import Loading from "components/Loading/Loading";
import { Input } from "antd";
import swal from "sweetalert";
import {
  addJobNote,
  deleteJobNote,
  candidateUnapply
} from "services/candidateServices";
import { useTranslation } from "react-i18next";

function CandidateAppliedJobs() {
  const { t, i18n } = useTranslation();

  const [jobs, setJobs] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [unApplied, setUnapplied] = useState(0);
  const [loading, setLoading] = useState(false);

  const { token } = useSelector((state) => state.auth.candidate);
  const province_list = useSelector((state) => state.cv.provinces);

  const onChange = (page) => {
    setPage(page);
  };

  const mapResponseToState = (data) =>
    data?.length &&
    data.map(
      ({
        submit_date,
        job_post: {
          id,
          job_title,
          company_name,
          salary,
          deadline,
          provinces,
          company_logo,
          description
        },
        note
      }) => {
        const province_names = provinces?.map((id) => {
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
          created_on: formatDateTime(submit_date),
          company_name,
          salary,
          deadline: formatDateTime(deadline),
          province: province_names?.join(", "),
          provinceEn: province_names_en?.join(", "),
          company_logo,
          description,
          note
        };
      }
    );

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      await getApplyJobs(1, token)
        .then((res) => {
          const {
            data,
            pagination: { total }
          } = res.data;
          console.log(data);
          setJobs(mapResponseToState(data));
          setTotal(total);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    };

    if (province_list.length) {
      fetchJobs();
    }
  }, [page, province_list, unApplied]);

  const handleUnapply = async (job_id) => {
    swal({
      title:
        i18n.language === "en"
          ? "Are you sure unapply this job?"
          : "Bạn có chắc chắn muốn hủy ứng tuyển việc làm này",
      text:
        i18n.language === "en"
          ? "You'll delete note for this applied job! Maybe employer can not see you"
          : "Bạn sẽ xóa việc làm này ra khỏi danh sách việc làm làm đã ứng tuyển. Nhà tuyển dụng sẽ không thấy bạn",
      icon: "warning",
      buttons: [t("profile.cancel"), t("profile.delete")],
      dangerMode: true
    })
      .then(async (willDelete) => {
        if (willDelete) {
          await candidateUnapply(job_id, token)
            .then((res) => {
              setUnapplied(unApplied + 1);
              toast({
                type: "success",
                message:
                  i18n.language === "en"
                    ? "Unapply job successful"
                    : "Hủy việc làm đã ứng tuyển thành công"
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
    <div className="container saved-jobs" style={{ marginTop: 20 }}>
      <div className="row">
        <Loading loading={loading} />
        <div style={{ width: "100%" }}>
          {!jobs.length ? (
            <Empty />
          ) : (
            <div style={{ width: "100%" }}>
              <div
                className="box box--white"
                style={{ borderBottom: "6px solid #0d3880" }}
              >
                <div className="search-meta">
                  <h1
                    className="text-primary bold"
                    style={{
                      fontSize: 21,
                      marginBottom: 0
                    }}
                  >
                    {`${t("myJob.applied")} ${total} ${
                      total > 1 ? t("myJob.jobs") : t("myJob.job")
                    }`}
                  </h1>
                </div>
              </div>
              <div className="job-list search-result">
                {jobs?.length &&
                  jobs.map((job, index) => (
                    <Job
                      key={index}
                      {...job}
                      token={token}
                      lastChild={index === jobs.length - 1}
                      handleUnapply={handleUnapply}
                    />
                  ))}
              </div>
              {total > 10 && (
                <div className="text-center">
                  <Pagination
                    current={page}
                    onChange={onChange}
                    total={total}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CandidateAppliedJobs;

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
  description,
  id,
  note,
  token,
  handleUnapply
}) => {
  const { t, i18n } = useTranslation();

  const { TextArea } = Input;

  const [isOpen, setIsOpen] = useState(false);
  const [noteValue, setNoteValue] = useState();
  const [currentNote, setCurrentNote] = useState(note);

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
          await deleteJobNote(id, token)
            .then((res) => {
              setCurrentNote(null);
              toast({
                type: "success",
                message:
                  i18n.language === "en"
                    ? "Delete applied job's note successful"
                    : "Xóa ghi chú việc làm thành công"
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

    await addJobNote(noteValue, id, token)
      .then((res) => {
        console.log("note", res.data.data.note);

        toast({ message: "Add Notes successfull" });
        setCurrentNote(res.data.data.note);
        setIsOpen(false);
      })
      .catch((err) => {
        toastErr(err);
      });
  };

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

  return (
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
              Add Notes
            </div>
          )}
        </div>
      </div>
      <div className="col-sm-8">
        <h4 className="job-title">
          <Link to={`/job-detail/${id}`}>
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
          {t("myJob.applyOn")}:{created_on}
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
              style={{ marginRight: "5px", color: "#2557a7" }}
            />
            {getLangSalary(salary)}
          </div>
          <div className="deadline col-sm-5" style={{ fontSize: "16px" }}>
            <ClockCircleOutlined
              style={{ marginRight: "5px", color: "#2557a7" }}
            />
            {deadline}
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

      <div
        className="col-sm-2 job-button-group"
        style={{ justifyContent: "flex-end" }}
      >
        <div className="box-save-job">
          <button
            className="btn-unsave unsave"
            style={{
              color: "#2765CF",
              paddingTop: "5px",
              fontSize: "15px",
              paddingBottom: "30px"
            }}
            onClick={() => handleUnapply(id)}
          >
            <i className="fa fa-trash mr-10"></i>
            {t("myJob.remove")}
          </button>
        </div>
      </div>
    </div>
  );
};

const Empty = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="box box-no-padding box--white">
      <div className="row">
        <div className="col-md-8">
          <div className="ap-intro-content-wraper">
            <h3 className="box-title" style={{ color: "#d45541" }}>
              {i18n.language === "vi"
                ? "Bạn chưa ứng tuyển công việc nào"
                : "You have no applied jobs"}
            </h3>
            <div className="box-content text-dark-gray">
              <p>
                {i18n.language === "vi"
                  ? "Bạn đang tìm kiếm một công việc phù hợp với khả năng?"
                  : "Are you looking for a job that matches your abilities?"}
              </p>
              <p>
                {i18n.language === "vi"
                  ? "Chúng tôi cung cấp cho bạn rất nhiều việc làm chất lượng từ hơn 8000+ Nhà tuyển dụng uy tín."
                  : "We provide you with a lot of quality jobs from more than 8000+ reputable Employers."}
              </p>
            </div>
            <div className="box-footer">
              <Link to="/find-jobs" className="btn btn-primary">
                {i18n.language === "vi" ? "Tìm việc ngay" : "Find a job now"}
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="ap-intro-logo-wraper">
            <img
              src="/assets/img/logo-ap.png"
              style={{ width: "100%", maxWidth: "220px" }}
              alt="find job"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
};
