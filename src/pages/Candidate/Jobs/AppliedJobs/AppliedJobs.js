import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AppliedJobs.scss";
import "../SavedJobs/SavedJobs.scss";

import { DollarCircleOutlined, ClockCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { getApplyJobs } from "services/jobServices";
import { formatDateTime, toast, toastErr } from "utils/index";
import { Tooltip, Pagination } from "antd";
import Loading from "components/Loading/Loading";
import { Input } from "antd";
import swal from "sweetalert";
import { addAppliedNote, deleteAppliedNote } from "services/candidateServices";

function CandidateAppliedJobs() {
  const [jobs, setJobs] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
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
        note,
      }) => {
        const province_names = provinces?.map((id) => {
          const p = province_list.find((p) => p.province_id === id);
          return p ? p.province_name : "";
        });

        return {
          id,
          job_title,
          created_on: formatDateTime(submit_date),
          company_name,
          salary,
          deadline: formatDateTime(deadline),
          province: province_names?.join(", "),
          company_logo,
          description,
          note,
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
  }, [page, province_list]);

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
                // id="box-result"
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
                    {`Applied ${total} ${total > 1 ? "jobs" : "job"}`}
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
  company_logo,
  lastChild,
  description,
  id,
  note,
  token
}) => {
  const { TextArea } = Input;

  const [isOpen, setIsOpen] = useState(false);
  const [noteValue, setNoteValue] = useState();
  const [currentNote, setCurrentNote] = useState(note)

  const onDeleteNote = () => {
    swal({
      title: "Are you sure to delete this note?",
      text: "You'll delete note for this applied job!",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true
    })
      .then(async (willDelete) => {
        if (willDelete) {
          await deleteAppliedNote(id,token)
            .then((res) => {
              setCurrentNote(null);
              toast({
                type: "success",
                message: "Delete applied job's note successful"
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

    await addAppliedNote(noteValue, id, token)
      .then((res) => {
        console.log('note', res.data.data.note)
        
        toast({ message: "Add Notes successfull" });
        setCurrentNote(res.data.data.note)
        setIsOpen(false)
      })
      .catch((err) => {
        toastErr(err);
      });
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
        <div>Applied on: {formatDateTime(created_on)}</div>
        <Tooltip placement="top" title={province}>
          <div
            className="address text_ellipsis"
            style={{ marginTop: "10px", color: "rgba(28,28,28,.63)" }}
          >
            <i
              className="fas fa-map-marker-alt mr-5"
              style={{ fontSize: 16, color: "#2557a7" }}
            ></i>
            {province}
          </div>
        </Tooltip>
        <div
          className="summary show-less-des"
          style={{ color: "#666" }}
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>
        <div className="row text-dark-gray" id="row-result-info-job">
          <div className="salary col-sm-5"  style={{ fontSize: "16px" }}>
            <DollarCircleOutlined
              style={{marginRight: '5px', color: "#2557a7" }}
            />
            {salary}
          </div>
          <div className="deadline col-sm-5"  style={{ fontSize: "16px" }}>
            <ClockCircleOutlined
              style={{marginRight: '5px', color: "#2557a7" }}
            />
            {formatDateTime(deadline)}
          </div>
        </div>

           {/* Note area  */}
           <div className="note-job__content">
            {isOpen ? (
              <>
                <strong style={{ fontSize: "16px" }}>Notes</strong>
                <TextArea
                  className="note-job__content__area"
                  defaultValue={currentNote}
                  rows={4}
                  onChange={(e) => setNoteValue(e.target.value)}
                />
                <p className="note-job__content__only">
                  Only you can see these notes
                </p>

                <div className="note-job__content__button">
                  <div
                    className="note-job__content__button__save"
                    onClick={onSaveNote}
                  >
                    Save
                  </div>
                  <div
                    className="note-job__content__button__text"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </div>
                </div>
              </>
            ) : (
               currentNote && (
                <>
                  <div className="note-job__content__edit">
                    <strong style={{ fontSize: "16px" }}>Notes</strong>
                    <div
                      className="note-job__content__button__text"
                      onClick={() => setIsOpen(true)}
                    >
                      Edit
                    </div>
                    <div className="note-job__content__button__text" onClick={onDeleteNote}>
                      Delete
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
            // onClick={() => handleUnsaved(id)}
          >
            <i className="fa fa-trash mr-10"></i>
            Remove job
          </button>
        </div>
      </div>
    </div>
  );
};

const Empty = () => (
  <div className="box box-no-padding box--white">
    <div className="row">
      <div className="col-md-8">
        <div className="ap-intro-content-wraper">
          <h3 className="box-title" style={{ color: "#d45541" }}>
            Bạn chưa ứng tuyển công việc nào
          </h3>
          <div className="box-content text-dark-gray">
            <p>Bạn đang tìm kiếm một công việc phù hợp với khả năng?</p>
            <p>
              Chúng tôi cung cấp cho bạn rất nhiều việc làm chất lượng từ hơn
              8000+ Nhà tuyển dụng uy tín.
            </p>
          </div>
          <div className="box-footer">
            <Link to="/find-jobs" className="btn btn-primary">
              Tìm việc ngay
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
