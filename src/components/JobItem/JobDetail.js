import React from "react";
import { useWindowSize } from "utils/window";
import "./JobDetail.scss";
import { CloseOutlined, HeartOutlined } from "@ant-design/icons";

function JobDetail({ top, onChangeSelect }) {
  const size = useWindowSize();
  const padding = (size.width - 1140) / 2;

  return (
    <div
      id="vjs-container"
      tabIndex="-1"
      style={{
        left: `${padding + 441}px`,
        top: `${top > 0 ? top : 0}px`,
        bottom: "-1px"
      }}
    >
      <Header onChangeSelect={onChangeSelect} />
      <div id="vjs-content">
        <div id="vjs-tab-top">
          <div className="job-detail-section">
            <div
              id="jobDetailsSection"
              className="job-detail-section-container"
            >
              <div className="job-detail-section-title">
                <div className="job-detail-section-title--main text-bold">
                  Thông tin tuyển dụng
                </div>
              </div>
              <div className="job-detail-section-item">
                <div className="job-detail-section-itemKey text-bold">
                  Salary
                </div>
                <span>$48,500 - $96,000 a year</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetail;

const Header = ({ onChangeSelect }) => (
  <div id="vjs-header" className="vjs-header-no-shadow">
    <div id="vjs-image-wrapper">
      <img
        src="https://d2q79iu7y748jz.cloudfront.net/s/_headerimage/4f7e526ffce014a5ce9c88a348fb9f33"
        alt="company background"
        className="vjs-header-background"
      />
      <img
        src="https://d2q79iu7y748jz.cloudfront.net/s/_squarelogo/d09f1a897f4f8d8b56478c6af2e7ddd3"
        alt="company logo"
        className="vjs-header-logo"
      />
    </div>
    <div id="vjs-header-jobinfo">
      <div id="vjs-jobinfo">
        <div id="vjs-jobtitle">
          Front End Developer (JavaScript, HTML, CSS) - Good English Skill
        </div>
        <div>
          <span id="vjs-cn">ICONIC Co,.Ltd.</span>
          <span id="vjs-loc">
            <span> - </span>Thành phố Hồ Chí Minh
          </span>
        </div>
      </div>
    </div>
    <div id="vjs-x">
      <button
        className="CloseButton vjs-x-button-close"
        onClick={() => onChangeSelect(null)}
      >
        <CloseOutlined />
      </button>
    </div>
    <div id="apply-button-container">
      <div className="job-footer-button-row">
        <button className="view-apply-button blue-button">
          Ứng tuyển ngay
        </button>
        <span id="state-picker-container" className="dd-wrapper">
          <button className="state-picker-button">
            <span>
              <HeartOutlined style={{ fontSize: "18px", fontWeight: "700" }} />
            </span>
          </button>
        </span>
      </div>
    </div>
  </div>
);
