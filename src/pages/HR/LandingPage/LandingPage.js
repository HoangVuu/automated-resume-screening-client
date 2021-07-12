import Dashboard from "pages/HR/Home/Dashboard";
import HRInsider from "pages/HR/Home/HRInsider";
import React, { useEffect, useState } from "react";
import "./LandingPage.scss";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HRLandingPage = () => {
  const { t, i18n } = useTranslation();

  const [left, setLeft] = useState(window.innerWidth * 0.95);
  const [hiddenLang, setHiddenLang] = useState(true);
  useEffect(() => {
    function handleResize() {
      setLeft(window.innerWidth * 0.95);
    }
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <div className="hr-landing">
      <div className="bumblebee">
        <header className="hire-hero bg-white" data-tn-section="header">
          <div className="container" style={{paddingTop: '100px'}}>
            <div className="hire-hero--text-body">
              <div className="hire-hero--text">
                <h1 className="">
                  {i18n.language === "en" ?  "Let's make your next great hire." : "Cùng bắt đầu với cuộc tuyển dụng tuyệt vời tiếp theo của bạn." } <em>{i18n.language === "en" ? "Fast." : "Nhanh chóng"}</em>
                </h1>
                <div className="subtitle hire-hero-subtitle en-subtitle">
                  <p className="lead single-row">
                  {i18n.language === "en" ? "You know who you're looking for." :  "Bạn biết người bạn đang tìm kiếm."}
                    <br />
                    {i18n.language === "en" ? "We'll help you find them." : "Chúng tôi sẽ giúp bạn tìm ra họ." }
                  </p>
                </div>
                <div className="hire-hero-button-container">
                  <button
                    className="icl-Button icl-Button--primary icl-Button--lg postJobCta scroll-start"
                    id="hireHeroPostJobButton"
                    data-tn-element="hireHeroPostJobButton"
                    data-tn-link="redirect"
                    data-shield="hire-hero-post-job-button"
                    type="button"
                  >
                   {i18n.language === "en" ?  "Post a job" : "Đăng một việc làm" }
                  </button>
                </div>
              </div>
              <div id="bannerList"></div>
            </div>
            <div className="hire-hero-card-wrapper" id="hire-hero-card-wrapper">
              <div className="hire-hero-card">
                <div className="hire-hero-card-header">
                  <h3>1</h3>
                </div>
                <div className="hire-hero-card-body">
                  <h4>
                  {i18n.language === "en" ? "Create your" : "Tạo"}
                    <br />
                    {i18n.language === "en" ? "free account" : "tài khoản miễn phí"}
                  </h4>
                  <p>
                  {i18n.language === "en" ? "All you need is your email address to create an account and start building your job post." : "Tất cả những gì bạn cần là địa chỉ email để tạo tài khoản và bắt đầu xây dựng bài đăng tuyển dụng của mình." } 
                  </p>
                </div>
              </div>
              <div className="hire-hero-card">
                <div className="hire-hero-card-header">
                  <h3>2</h3>
                </div>
                <div className="hire-hero-card-body">
                  <h4>
                  {i18n.language === "en" ? "Build your" : "Xây dựng"}
                    <br />
                    {i18n.language === "en" ? "job post" : "bài tuyển dụng" }
                  </h4>
                  <p>
                  {i18n.language === "en" ?  "Then just add a title, description, and location to your job post, and you're ready to go." : "Sau đó, chỉ cần thêm tiêu đề, mô tả và vị trí vào tin tuyển dụng của bạn và bạn đã sẵn sàng." }
                  </p>
                </div>
              </div>
              <div className="hire-hero-card">
                <div className="hire-hero-card-header">
                  <h3>3</h3>
                </div>
                <div className="hire-hero-card-body">
                  <h4>
                  {i18n.language === "en" ? "Post" : "Đăng" }
                    <br />
                  {i18n.language === "en" ? "your job" : "việc làm của bạn" }
                  </h4>
                  <p>
                  {i18n.language === "en" ? "After you post your job use our state of the art tools to help you find dream talent." : "Sau khi bạn đăng tuyển dụng, hãy sử dụng các công cụ hiện đại của chúng tôi để giúp bạn tìm thấy tài năng trong mơ. " }
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="_1HNvZ">
            <div className="FYwKg d7v3r _1QKvi_4">
              <div className="FYwKg _7dJpR_4">
                <div className="FYwKg b1Kg1 ">
                  <h2 className="FYwKg C6ZIU_4 _3nVJR_4 _1H36Y_4 _2DNlq_4 _1NXQv_4">
                  {i18n.language === "en" ?  "We make it quicker and easier to find the right people" : "Chúng tôi giúp tìm đúng người nhanh hơn và dễ dàng hơn" }
                  </h2>
                </div>
              </div>
              <div className="FYwKg _7dJpR_4 container">
                <div className="FYwKg _2Bz3E _2II51_4 _1lyEa IC4bo_4 _3ucB1_4">
                  <div className="FYwKg _3VCZm _1uk_1 _3Ve9Z">
                    <div className="FYwKg _1GAuD _7dJpR_4 _2JU1c_4 hLznC_4 _2Bz3E rNAgI _1tfFt">
                      <div className="FYwKg _3hukI">
                        <div className="FYwKg d7v3r UJoTY_4">
                          <div className="FYwKg _6Gmbl_4">
                            <div className="_1_OYy">
                              <svg
                                id="icon1__Layer_1"
                                data-name="Layer 1"
                                viewBox="0 0 100 86"
                              >
                                <path
                                  className="icon1__cls-1"
                                  d="M50.52 67.06h-34a1 1 0 000 2h34a1 1 0 100-2zm-14.35 5.66l-19.64-.21a1 1 0 00-1 1 1 1 0 001 1l19.64.21a1 1 0 000-2z"
                                ></path>
                                <path
                                  className="icon1__cls-1"
                                  d="M82.35 56H11.18a7 7 0 00-7 7v15.8a7 7 0 007 7h71.17a7 7 0 007-7V63a7 7 0 00-7-7zm5 22.77a5 5 0 01-5 5H11.18a5 5 0 01-5-5V63a5 5 0 015-5h71.17a5 5 0 015 5z"
                                ></path>
                                <path
                                  d="M91.29 48.82l-1.07-17.77a5.91 5.91 0 00-6.28-5.52L6 30.88a5.92 5.92 0 00-5.49 6.27l1.07 17.77a5.91 5.91 0 006.27 5.52l77.91-5.35a5.92 5.92 0 005.53-6.27z"
                                  fill="#b8e1f7"
                                ></path>
                                <path
                                  className="icon1__cls-1"
                                  d="M98.35 19.36l-1.77.26a1 1 0 00-.64.38c0 .05-3.45 4.42-7.21 5.71-4 1.37-13.46 8.61-14.81 9.66l-8.31 2.5a2.72 2.72 0 01.13-1.63c.48-1.23 2.09-3 7.07-4.36a1 1 0 00.52-.35l1.38-1.73c3-3.78 4.85-6.07 5-8.27a11.23 11.23 0 00-2.87-7.37A3.91 3.91 0 0073.63 13c-3.4.43-11.43 4.8-11.77 5a1 1 0 00-.45.52c-.15.4-3.74 9.84-4.2 11.27a2.43 2.43 0 01-1.35 1.28L60 15.4l5.59-5.18a1 1 0 00-1.19-1.6c-.57.34-14 8.26-16.2 9.74-2 1.36-3.6 1.11-4.55.61 3.39-2 12.05-7.41 14.05-8.66a1 1 0 00.4-1.23 1 1 0 00-1.1-.59c-.09 0-9.08 2.09-10.9 2.34a3.5 3.5 0 01-3.65-1.44C45.82 8.54 55.9 6 64.05 4.32h.11a.88.88 0 00.4-.1 74.64 74.64 0 019.79-1.63c4-.13 13.2 3.09 13.29 3.12a1 1 0 00.9-.12l5.13-3.51a1 1 0 00.25-1.4 1 1 0 00-1.39-.26l-4.71 3.23C85.8 3 78.14.45 74.29.58A79.13 79.13 0 0063.8 2.32L47.66 3a1 1 0 00-.92 1.28 4.56 4.56 0 001 1.74c-3.85.94-6.64 1.65-7 1.73A1 1 0 0040.06 9a5.45 5.45 0 006.3 3.84c.85-.11 3.06-.58 5.29-1.07-4.7 2.92-9.55 5.89-10.07 6.14a1 1 0 00-.57.64 1 1 0 00.14.85c.77 1.09 3.9 3.54 8.21.65 1.08-.72 5.07-3.12 8.81-5.35l-4.64 17.35a1 1 0 00.84 1.25 4.7 4.7 0 004.74-2.89c.4-1.23 3.37-9.07 4-10.82 2.46-1.32 8.33-4.28 10.73-4.58a1.94 1.94 0 011.56.61 9.34 9.34 0 012.24 5.8c-.09 1.56-1.86 3.78-4.54 7.14L72 30c-4.48 1.3-7.21 3.15-8.11 5.52a4.76 4.76 0 00.34 4.08 1 1 0 00.84.45 1 1 0 00.29 0l9.35-2.82a1 1 0 00.33-.17c.1-.08 10.49-8.12 14.38-9.46 3.73-1.28 7-4.94 7.88-6.06l1.39-.21a1 1 0 10-.3-2zM51 5.16a1.87 1.87 0 01-1.44-.25l3.39-.14-1.65.4a.76.76 0 00-.3-.01z"
                                ></path>
                                <path
                                  d="M48.17 39.18l-33.95 2.07a1 1 0 00.06 2h.06l34-2.07a1 1 0 00-.12-2zm-14.03 6.75l-19.62 1a1 1 0 00.05 2l19.62-1a1 1 0 10-.1-2z"
                                  fill="#fff"
                                ></path>
                              </svg>
                            </div>
                          </div>
                          <div className="FYwKg _6Gmbl_4">
                            <span className="FYwKg _2Bz3E C6ZIU_4 _6ufcS_4 _3KSG8_4 _29m7__4 _2WTa0_4">
                          {i18n.language === "en" ?  "Attract the best people with tips and guidance to help you write a great job ad." : "Thu hút những người giỏi nhất bằng các mẹo và hướng dẫn để giúp bạn viết một quảng cáo tuyển dụng tuyệt vời." }
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="FYwKg _3VCZm _1uk_1 _3Ve9Z">
                    <div className="FYwKg _1GAuD _7dJpR_4 _2JU1c_4 hLznC_4 _2Bz3E rNAgI _1tfFt">
                      <div className="FYwKg _3hukI">
                        <div className="FYwKg d7v3r UJoTY_4">
                          <div className="FYwKg _6Gmbl_4">
                            <div className="_1_OYy">
                              <svg
                                id="icon2__Layer_1"
                                data-name="Layer 1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 100 86"
                              >
                                <circle
                                  cx="50"
                                  cy="42.88"
                                  r="42.5"
                                  fill="#fad0dd"
                                ></circle>
                                <path
                                  className="icon2__cls-1"
                                  d="M49.3 49c8.91 0 18-10.51 18-20.82a18 18 0 1 0-35.95 0C31.33 38.45 40.4 49 49.3 49zm0-36.8a16 16 0 0 1 16 16c0 9.15-8.21 18.82-16 18.82s-16-9.67-16-18.82a16 16 0 0 1 16-16.04zM68.29 53.74a86.82 86.82 0 0 0-18.66-2.57 86.47 86.47 0 0 0-18.7 2.47c-8.74 2-15.08 11.56-15.08 22.74v8.24a1 1 0 1 0 2 0v-8.24c0-10.25 5.69-19 13.53-20.78a83.71 83.71 0 0 1 18.25-2.43 85.42 85.42 0 0 1 18.22 2.52c6.31 1.44 11.43 7.53 13 15.5a1 1 0 1 0 2-.39c-1.76-8.75-7.48-15.44-14.56-17.06z"
                                ></path>
                                <path
                                  className="icon2__cls-1"
                                  d="M67.06 71.42H57a3.17 3.17 0 1 1 0-6.33h10.06a3.17 3.17 0 0 1 0 6.33zM57 67.09a1.17 1.17 0 1 0 0 2.33h10.06a1.17 1.17 0 0 0 0-2.33z"
                                ></path>
                              </svg>
                            </div>
                          </div>
                          <div className="FYwKg _6Gmbl_4">
                            <span className="FYwKg _2Bz3E C6ZIU_4 _6ufcS_4 _3KSG8_4 _29m7__4 _2WTa0_4">
                            {i18n.language === "en" ? "Connect with relevant people from our talent database." :  "Kết nối với những người có liên quan từ tài năng của chúng tôi cơ sở dữ liệu."}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="FYwKg _3VCZm _1uk_1 _3Ve9Z">
                    <div className="FYwKg _1GAuD _7dJpR_4 _2JU1c_4 hLznC_4 _2Bz3E rNAgI _1tfFt">
                      <div className="FYwKg _3hukI">
                        <div className="FYwKg d7v3r UJoTY_4">
                          <div className="FYwKg _6Gmbl_4">
                            <div className="_1_OYy">
                              <svg
                                id="icon3__Layer_1"
                                data-name="Layer 1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 100 86"
                              >
                                <rect
                                  className="icon3__cls-1"
                                  x="0.5"
                                  y="18.65"
                                  width="86.73"
                                  height="66.98"
                                  rx="9.87"
                                ></rect>
                                <rect
                                  className="icon3__cls-2"
                                  x="12.38"
                                  y="30.67"
                                  width="19.74"
                                  height="19.74"
                                  rx="7.99"
                                ></rect>
                                <path
                                  className="icon3__cls-2"
                                  d="M12.45,63h34a1,1,0,1,0,0-2h-34a1,1,0,0,0,0,2Z"
                                ></path>
                                <path
                                  className="icon3__cls-2"
                                  d="M46.83,65.87H12.45a1,1,0,0,0,0,2H46.83a1,1,0,0,0,0-2Z"
                                ></path>
                                <path
                                  className="icon3__cls-2"
                                  d="M32.3,70.8H12.38a1,1,0,1,0,0,2H32.3a1,1,0,0,0,0-2Z"
                                ></path>
                                <path
                                  className="icon3__cls-3"
                                  d="M85.5,26.44a3.17,3.17,0,0,0,.32-2.4c-.55-1.66-1.79-2.4-4-2.4H79.35a15.77,15.77,0,0,0,.75-8.26,3.66,3.66,0,0,0-3.24-3A2.69,2.69,0,0,0,74.2,12c-.21.52-.47,1.23-.77,2a46.63,46.63,0,0,1-2.6,6.23,8.1,8.1,0,0,1-2.2,2.47,1,1,0,0,0,1.14,1.64,9.79,9.79,0,0,0,2.77-3.08,47.81,47.81,0,0,0,2.77-6.57c.29-.78.54-1.47.75-2a.78.78,0,0,1,.7-.26c.63,0,1.15.58,1.42,1.51a13.81,13.81,0,0,1-1.25,8.22,1,1,0,0,0,0,1,1,1,0,0,0,.86.49h4c1.76,0,1.94.53,2.11,1A1.66,1.66,0,0,1,83.4,26a1,1,0,0,0,.39,1.65.37.37,0,0,1,.24.24,1.42,1.42,0,0,1,0,1,1.82,1.82,0,0,1-.85.71,1,1,0,0,0-.77.74,1,1,0,0,0,.35,1,.79.79,0,0,1,.08.3,4.58,4.58,0,0,1-.84.94,1,1,0,0,0-.67.58,1,1,0,0,0,.13,1,1,1,0,0,1-.07.4c-.81,1.35-2.82,1.62-6,1.62H69c-1.45,0-1.86-.31-2-.44-.27-.33-.09-1.29.08-2.21.07-.38.15-.78.21-1.18s.13-.89.22-1.43c.13-.84.31-1.91.54-3.54,0-.35.11-.65.16-.92.16-.89.3-1.66-.21-2.28a2.09,2.09,0,0,0-1.7-.62H64.42c-1.53,0-3.2.28-3.66,3.53,0,.05-.76,5-1.14,6.83-.24,1.2-.39,2.54.34,3.43a2.74,2.74,0,0,0,2.17.83H64a1,1,0,0,0,0-2H62.13c-.51,0-.62-.1-.62-.1s-.22-.29.07-1.77c.38-1.91,1.13-6.72,1.16-6.93.26-1.82.65-1.82,1.68-1.82h2c0,.17-.06.36-.09.54s-.12.62-.17,1c-.23,1.61-.4,2.67-.54,3.5-.09.56-.16,1-.22,1.47s-.13.74-.19,1.09c-.26,1.38-.53,2.81.34,3.86.66.79,1.77,1.16,3.51,1.16h6.31c3.26,0,6.3-.2,7.74-2.59A2.94,2.94,0,0,0,83.4,34a5.12,5.12,0,0,0,1.25-1.63,2.35,2.35,0,0,0,0-1.34,3.22,3.22,0,0,0,1.17-3.92A2.48,2.48,0,0,0,85.5,26.44Z"
                                ></path>
                                <path
                                  className="icon3__cls-3"
                                  d="M24.53,35.18h-4.3A3.26,3.26,0,0,0,17,38.44v2.1a1,1,0,0,0,2,0v-2.1a1.26,1.26,0,0,1,1.26-1.26h4.3a1.27,1.27,0,0,1,1.26,1.26v4.3A1.27,1.27,0,0,1,24.53,44h-3a1,1,0,1,0,0,2h3a3.27,3.27,0,0,0,3.26-3.26v-4.3A3.27,3.27,0,0,0,24.53,35.18Z"
                                ></path>
                                <path
                                  className="icon3__cls-3"
                                  d="M73.47.37a26,26,0,1,0,26,26A26.06,26.06,0,0,0,73.47.37Zm0,50.06a24,24,0,1,1,24-24A24.06,24.06,0,0,1,73.47,50.43Z"
                                ></path>
                              </svg>
                            </div>
                          </div>
                          <div className="FYwKg _6Gmbl_4">
                            <span className="FYwKg _2Bz3E C6ZIU_4 _6ufcS_4 _3KSG8_4 _29m7__4 _2WTa0_4">
                            {i18n.language === "en" ? "Quality candidates are listed first so you can contact them sooner." :  "Các ứng viên chất lượng được liệt kê đầu tiên để bạn có thể liên hệ với họ sớm hơn."}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="FYwKg _7dJpR_4">
                <div className="FYwKg _2Bz3E _2II51_4 _3i7ia">
                  <div className="FYwKg d7v3r _3QaJd_4">
                    <div className="FYwKg _2Bz3E _2II51_4 _1lyEa IC4bo_4 _1q9J3 _3Aa4F_4">
                      <div
                        className="FYwKg _1uk_1 _3RtnC_4 _37N5v_4 _2Bz3E rNAgI"
                        style={{ marginBottom: "50px" }}
                      >
                        <button className="_btn111"> {i18n.language === "en" ? "Create a job ad" : "Tạo một quảng cáo việc làm" }</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <section className="hire-features">
          <div className="container" style={{paddingBottom: '0'}}>
            <h2>{i18n.language === "en" ? "Save time and effort in your hiring journey." : "Tiết kiệm thời gian và công sức trong hành trình tuyển dụng của bạn."}</h2>
            <p className="lead">
            {i18n.language === "en" ?  "Finding the best fit for the job shouldn’t be a full-time job. FASTJOB's simple and powerful tools let you source, screen, and hire faster." : "Tìm kiếm sự phù hợp nhất cho công việc không phải là một công việc toàn thời gian. Các công cụ đơn giản và mạnh mẽ của FASTJOB cho phép bạn tìm nguồn, sàng lọc và thuê nhanh hơn."}
            </p>
          </div>
          <div className="hire-features-card-wrapper">
            <div className="container"  style={{paddingTop: '30px'}}>
              <div className="row">
                <div className="hire-features-card feature-card-desktop">
                  <div className="hire-features-card-header">
                    <img
                      alt="Increase visibility"
                      src="https://d3fw5vlhllyvee.cloudfront.net/allspark/static/images/visibility-aurora-bb1da9.svg"
                      role="presentation"
                    />
                  </div>
                  <div className="hire-features-card-body card-body-en">
                    <h4>{i18n.language === "en" ? "Get more visibility" : "Tăng khả năng hiển thị"}</h4>
                    <p>
                      <span>
                        <a
                          id="clickToSponsor"
                          href="#"
                          data-tn-element="sponsorYourJob"
                          data-shield="sponsor-your-job"
                        >
                        {i18n.language === "en" ?  "Sponsor your job" : "Tài trợ cho công việc của bạn" }
                        </a>{" "}
                        {i18n.language === "en" ?   "to ensure it gets seen by the right people." : "để đảm bảo nó được nhìn thấy bởi những người phù hợp."}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="hire-features-card feature-card-desktop">
                  <div className="hire-features-card-header">
                    <img
                      alt="Quality applicants"
                      src="https://d3fw5vlhllyvee.cloudfront.net/allspark/static/images/quality-aurora-0eafff.svg"
                      role="presentation"
                    />
                  </div>
                  <div className="hire-features-card-body card-body-en">
                    <h4> {i18n.language === "en" ?  "Find quality applicants" : "Tìm ứng viên chất lượng"}</h4>
                    <p>
                    {i18n.language === "en" ?  "List your required skills for the job so relevant candidates apply." : "Liệt kê các kỹ năng cần thiết của bạn cho công việc để các ứng viên có liên quan áp dụng."}
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="hire-features-card feature-card-desktop">
                  <div className="hire-features-card-header">
                    <img
                      alt="Assess candidates"
                      src="https://d3fw5vlhllyvee.cloudfront.net/allspark/static/images/find-aurora-2c9aa0.svg"
                      role="presentation"
                    />
                  </div>
                  <div className="hire-features-card-body card-body-en">
                    <h4> {i18n.language === "en" ? "Verify their abilities" : "Xác minh khả năng của họ"}</h4>
                    <p>
                    {i18n.language === "en" ?  "Add screener questions and assessments to test applicants’skills." : "Thêm các câu hỏi và bài đánh giá của người sàng lọc để kiểm tra kỹ năng của người nộp đơn."}
                    </p>
                  </div>
                </div>
                <div className="hire-features-card feature-card-desktop">
                  <div className="hire-features-card-header">
                    <img
                      alt="Organize candidates"
                      src="https://d3fw5vlhllyvee.cloudfront.net/allspark/static/images/organize-aurora-83e77c.svg"
                      role="presentation"
                    />
                  </div>
                  <div className="hire-features-card-body card-body-en">
                    <h4>{i18n.language === "en" ? "Organize your candidates" : "Tổ chức các ứng cử viên của bạn"}</h4>
                    <p>
                    {i18n.language === "en" ? "View and sort resumes, send messages, and schedule interviews—all on FASTJOB." : "Xem và sắp xếp hồ sơ, gửi tin nhắn và lên lịch phỏng vấn — tất cả đều có trên FASTJOB."}
                    </p>
                  </div>
                </div>
              </div>
              <div className="hire-features-footer">
                <button
                  className="icl-Button icl-Button--primary icl-Button--lg postJobCta"
                  id="hireFeaturePostJobButton"
                  data-tn-element="hireFeaturePostJobButton"
                  data-tn-link="redirect"
                  data-shield="hire-feature-post-job-button"
                  type="button"
                >
                    {i18n.language === "en" ?  "Get started" : "Bắt đầu"}
                </button>
                <p className="hire-features-footer-text">
                  <span>
                  {i18n.language === "en" ?  "You control your posts 24/7—edit, add, pause, or close them whenever you want." : "Bạn kiểm soát bài đăng của mình 24/7 — chỉnh sửa, thêm, tạm dừng hoặc đóng chúng bất cứ khi nào bạn muốn."}
                   {" "}
                    <a
                      href="/hire/post-job?hl=en&amp;co=VN"
                      data-tn-element="learnMoreAboutPosting"
                      data-tn-link="redirect"
                      data-shield="learn-more-about-posting"
                      id="skbltfy4c6m"
                    >
                  {i18n.language === "en" ?  "Learn more about posting." : "Tìm hiểu thêm về đăng bài."}
                    </a>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div
        className="FYwKg _3gJU3_4 _1yPon_4 hhBFx_4 _36Yi4_4 _1WtCj_4 _2OnNp_4 FLByR_4 _2QIfI_4"
        id="media-advice"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <div className="FYwKg _3VCZm _3ZvRy_4 _2lrrP">
          <div className="FYwKg _2Bz3E _2II51_4 _1lyEa _1FEyf_4 _3ucB1_4 _1-_Yr_4">
            <div className="FYwKg _3VCZm _1uk_1 _3Ve9Z">
              <div className="FYwKg _1GAuD _3gJU3_4 _2JU1c_4 hLznC_4 _85X-f_4 _2Bz3E rNAgI _1tfFt">
                <div className="LAnn3 _1Nuj7">
                  <img
                    src="https://talent.seek.com.au/static/hirer-shopfront/assets/b580058518f52faaf7958f4fd9a13b59.jpg"
                    alt=""
                    className="_2PbPl"
                  />
                </div>
              </div>
            </div>
            <div className="FYwKg _3VCZm _1uk_1 _3Ve9Z">
              <div className="FYwKg _1GAuD _3gJU3_4 _2JU1c_4 hLznC_4 _85X-f_4 _2Bz3E rNAgI _1tfFt">
                <div className="FYwKg _1GAuD _36-qN_4 _3XuYF_4 _3ftyQ _3O7rA">
                  <div className="FYwKg d7v3r _3BZ6E_4">
                    <div className="FYwKg _3gJU3_4">
                      <h2 className="FYwKg C6ZIU_4 _3nVJR_4 _1H36Y_4 _2DNlq_4 _1NXQv_4">
                  {i18n.language === "en" ?  "Hiring for the first time?" : "Lần đầu tiên tuyển dụng?"}
                      </h2>
                    </div>
                    <div className="FYwKg _3gJU3_4">
                      <span className="FYwKg _2Bz3E C6ZIU_4 _8QVx6_4 _3KSG8_4 _29m7__4 _3srVf_4">
                  {i18n.language === "en" ?  "Finding the right person doesn’t have to be the hardest part of your job. FASTJOB's Hiring Advice helps make it easy." : "Tìm đúng người không phải là phần khó nhất trong công việc của bạn. Tư vấn tuyển dụng của FASTJOB giúp việc này trở nên dễ dàng."}
                      </span>
                    </div>
                    <div className="FYwKg _3gJU3_4">
                      <div className="FYwKg d7v3r _3QaJd_4">
                        <div className="FYwKg _2Bz3E _2II51_4 _1lyEa IC4bo_4 _1q9J3 _3Aa4F_4">
                          <div className="FYwKg _1uk_1 _3RtnC_4 _37N5v_4 _2Bz3E rNAgI">
                            <button className="_btn111"> {i18n.language === "en" ?  "Create a job ad" : "Tạo một quảng cáo việc làm"}</button>
                          </div>
                          <div className="FYwKg _1uk_1 _3RtnC_4 _37N5v_4 _2Bz3E rNAgI">
                            <div className="FYwKg _2Cp5K">
                              <a
                                className="_link111"
                                style={{ border: "none" }}
                              >
                                 {i18n.language === "en" ?  "Get started" : "Bắt đầu"}
                              </a>
                              <div className="FYwKg _20Cd9_4 S6rFp_4 _2ZhMR_4 _3ra6Y _1gtjJ _20ezv _2d6vb _1HFUg _31bXc _37GT- _3GMzN"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        data-reach-popover=""
        style={{ position: "absolute", left: left - 120 + "px", top: "150px" }}
        hidden={hiddenLang}
      >
        <div
          dir="ltr"
          id="downshift-0-menu"
          role="listbox"
          aria-labelledby="downshift-0-label"
          tabindex="-1"
          className="css-yw2k7b e1u34eib0"
        >
          <div className="css-jphqc5 e1o7jwm50">
            <div
              data-has-selection="false"
              role="option"
              aria-selected="false"
              id="downshift-0-item-0"
              className="css-1jql5on ehvvxyn0"
            >
              <div className="css-1ptgkim e37uo190">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  focusable="false"
                  role="img"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="css-tcesgz e18c60hj0"
                >
                  <path d="M18.365 8.818a.5.5 0 000-.707l-.707-.707a.5.5 0 00-.707 0l-6.719 6.718L7.05 10.94a.5.5 0 00-.707 0l-.707.707a.5.5 0 000 .708l4.243 4.242a.499.499 0 00.709 0l7.778-7.778z"></path>
                </svg>
              </div>
              <span className="css-199rhmw e1wnkr790">VI</span>
            </div>
          </div>
        </div>
      </div>
      <div
        className="FYwKg _3gJU3_4 _2JU1c_4 _3oVlh_4 FLByR_4 _2QIfI_4"
        id="marketing-campaign-covid19-resources"
        style={{ backgroundColor: "#96dccf" }}
      >
        <div className="FYwKg _3VCZm _3ZvRy_4 _2lrrP">
          <div className="FYwKg _2Bz3E _2II51_4 _1lyEa IC4bo_4 _3O7rA _3ucB1_4">
            <div className="FYwKg _3VCZm _1uk_1 _3Ve9Z">
              <div className="FYwKg _1GAuD _3gJU3_4 _2JU1c_4 hLznC_4 _2Bz3E rNAgI _1tfFt">
                <div className="FYwKg d7v3r UJoTY_4">
                  <div className="FYwKg _6Gmbl_4">
                    <svg
                      id="prefix__Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      viewBox="0 0 405 48"
                      aria-labelledby="bannerText"
                    >
                      <title id="prefix__bannerText">
                        { i18n.language === "en" ? 
                          "Get helpful advice and resources to support your business through COVID-19" : "Nhận lời khuyên hữu ích và tài nguyên để hỗ trợ doanh nghiệp của bạn thông qua COVID-19"
                        }
                      </title>
                      <style />
                      <g id="prefix__Page-1">
                        <g id="prefix__Employer-banner">
                          <g className="prefix__background">
                            <path
                              className="prefix__headingColor"
                              d="M538.8 2647c-.6.7-1.4 1.2-2.5 1.6-1.1.4-2.2.6-3.5.6-1.4 0-2.5-.3-3.6-.9-1-.6-1.8-1.4-2.4-2.6-.6-1.1-.8-2.4-.9-4v-1.1c0-1.6.3-2.9.8-4.1.5-1.1 1.3-2 2.3-2.6 1-.6 2.2-.9 3.5-.9 1.9 0 3.3.4 4.4 1.3 1 .9 1.7 2.2 1.9 3.9h-3.1c-.1-.9-.5-1.6-1-2-.5-.4-1.2-.6-2-.6-1.1 0-1.9.4-2.5 1.2-.6.8-.9 2-.9 3.7v1c0 1.6.3 2.9.9 3.7s1.5 1.3 2.7 1.3c1.2 0 2.1-.3 2.6-.8v-2.7h-2.9v-2.4h6.2v6.4zm7.7 2.2c-1.7 0-3.1-.5-4.2-1.6-1.1-1-1.6-2.4-1.6-4.2v-.3c0-1.2.2-2.2.7-3.1.5-.9 1.1-1.6 1.9-2.1.8-.5 1.8-.7 2.8-.7 1.6 0 2.8.5 3.8 1.5s1.4 2.4 1.4 4.3v1.3h-7.4c.1.8.4 1.4.9 1.8s1.1.7 1.9.7c1.2 0 2.1-.4 2.8-1.3l1.5 1.7c-.5.7-1.1 1.2-1.9 1.5-.7.3-1.6.5-2.6.5zm-.3-9.5c-.6 0-1.1.2-1.5.6-.4.4-.6 1-.7 1.8h4.3v-.2c0-.7-.2-1.2-.6-1.6-.4-.4-.9-.6-1.5-.6zm10.6-5.2v2.9h2v2.3h-2v5.8c0 .4.1.7.2.9.2.2.5.3.9.3.3 0 .6 0 .9-.1v2.4c-.6.2-1.2.3-1.9.3-2.2 0-3.3-1.1-3.3-3.3v-6.3H552v-2.3h1.7v-2.9h3.1zm12.2 4.1c.8-1 1.9-1.5 3.1-1.5 2.5 0 3.8 1.5 3.8 4.4v7.4h-3.1v-7.4c0-.7-.1-1.2-.4-1.5-.3-.3-.8-.5-1.4-.5-.9 0-1.6.4-2 1.1v8.3h-3.1v-16.5h3.1v6.2zm14.6 10.6c-1.7 0-3.1-.5-4.2-1.6-1.1-1-1.6-2.4-1.6-4.2v-.3c0-1.2.2-2.2.7-3.1.5-.9 1.1-1.6 1.9-2.1.8-.5 1.8-.7 2.8-.7 1.6 0 2.8.5 3.8 1.5s1.4 2.4 1.4 4.3v1.3H581c.1.8.4 1.4.9 1.8s1.1.7 1.9.7c1.2 0 2.1-.4 2.8-1.3l1.5 1.7c-.5.7-1.1 1.2-1.9 1.5-.7.3-1.6.5-2.6.5zm-.3-9.5c-.6 0-1.1.2-1.5.6-.4.4-.6 1-.7 1.8h4.3v-.2c0-.7-.2-1.2-.6-1.6-.3-.4-.9-.6-1.5-.6zm10.2 9.3h-3.1v-16.5h3.1v16.5zm13-5.7c0 1.8-.4 3.2-1.2 4.3-.8 1.1-1.9 1.6-3.3 1.6-1.2 0-2.1-.4-2.8-1.2v5.5H596v-16.1h2.9l.1 1.1c.8-.9 1.7-1.4 2.9-1.4 1.4 0 2.5.5 3.3 1.6s1.2 2.5 1.2 4.4v.2zm-3.1-.2c0-1.1-.2-1.9-.6-2.5-.4-.6-.9-.9-1.7-.9-1 0-1.6.4-2 1.1v4.8c.4.8 1.1 1.2 2 1.2 1.5-.1 2.3-1.3 2.3-3.7zm5.9 5.9v-9.3h-1.7v-2.3h1.7v-1c0-1.3.4-2.3 1.1-3 .7-.7 1.8-1.1 3.1-1.1.4 0 1 .1 1.6.2v2.4c-.3-.1-.6-.1-.9-.1-1.2 0-1.8.6-1.8 1.7v.9h2.3v2.3h-2.3v9.3h-3.1zm13.9-1.2c-.8.9-1.8 1.4-3.2 1.4-1.2 0-2.2-.4-2.9-1.1s-1-1.8-1-3.1v-7.6h3.1v7.5c0 1.2.6 1.8 1.7 1.8s1.8-.4 2.2-1.1v-8.2h3.1v11.6h-2.9l-.1-1.2zm8.7 1.2h-3.1v-16.5h3.1v16.5zm14.7 0c-.1-.3-.2-.6-.3-1-.8.8-1.7 1.3-2.9 1.3-1.1 0-2.1-.3-2.8-1-.7-.7-1.1-1.5-1.1-2.5 0-1.2.5-2.2 1.4-2.8s2.2-1 4-1h1.4v-.7c0-.5-.1-1-.4-1.3-.3-.3-.7-.5-1.3-.5-.5 0-.9.1-1.2.4-.3.3-.4.6-.4 1h-3.1c0-.7.2-1.3.6-1.9.4-.6 1-1 1.8-1.3.8-.3 1.6-.5 2.6-.5 1.4 0 2.6.4 3.4 1.1.8.7 1.3 1.7 1.3 3v5c0 1.1.2 1.9.5 2.5v.2h-3.5zm-2.5-2.2c.5 0 .9-.1 1.3-.3.4-.2.7-.5.9-.8v-2H645c-1.6 0-2.4.5-2.5 1.6v.2c0 .4.1.7.4 1 .3.2.7.3 1.2.3zm7.1-3.7c0-1.8.4-3.3 1.2-4.3.8-1.1 1.9-1.6 3.3-1.6 1.1 0 2.1.4 2.8 1.3v-5.9h3.1v16.5h-2.8l-.2-1.2c-.8 1-1.8 1.5-3 1.5-1.4 0-2.5-.5-3.3-1.6-.7-1.3-1.1-2.8-1.1-4.7zm3.1.2c0 1.1.2 1.9.6 2.5.4.6.9.9 1.7.9 1 0 1.6-.4 2-1.2v-4.6c-.4-.8-1.1-1.2-2-1.2-1.5 0-2.3 1.2-2.3 3.6zm14.2 1.9l2.2-7.8h3.2L670 2649h-3l-3.9-11.6h3.2l2.2 7.8zm6.7-10.8c0-.5.2-.8.5-1.1s.7-.5 1.3-.5c.5 0 1 .2 1.3.5.3.3.5.7.5 1.1 0 .5-.2.9-.5 1.2-.3.3-.7.5-1.3.5-.5 0-.9-.2-1.3-.5-.3-.4-.5-.8-.5-1.2zm3.3 14.6h-3.1v-11.6h3.1v11.6zm7.4-2.3c.6 0 1-.2 1.4-.5.4-.3.5-.7.6-1.3h2.9c0 .8-.2 1.5-.6 2.2-.4.7-1 1.2-1.7 1.5-.7.4-1.5.5-2.4.5-1.7 0-3-.5-3.9-1.6-1-1.1-1.4-2.5-1.4-4.4v-.2c0-1.8.5-3.2 1.4-4.3 1-1.1 2.3-1.6 3.9-1.6 1.5 0 2.6.4 3.5 1.2.9.8 1.3 1.9 1.3 3.3H688c0-.6-.2-1.1-.6-1.5-.4-.4-.8-.6-1.4-.6-.7 0-1.3.3-1.6.8-.4.5-.6 1.4-.6 2.6v.3c0 1.2.2 2.1.5 2.6s.8 1 1.6 1zm12 2.5c-1.7 0-3.1-.5-4.2-1.6-1.1-1-1.6-2.4-1.6-4.2v-.3c0-1.2.2-2.2.7-3.1.5-.9 1.1-1.6 1.9-2.1.8-.5 1.8-.7 2.8-.7 1.6 0 2.8.5 3.8 1.5s1.4 2.4 1.4 4.3v1.3h-7.4c.1.8.4 1.4.9 1.8s1.1.7 1.9.7c1.2 0 2.1-.4 2.8-1.3l1.5 1.7c-.5.7-1.1 1.2-1.9 1.5-.8.3-1.7.5-2.6.5zm-.4-9.5c-.6 0-1.1.2-1.5.6-.4.4-.6 1-.7 1.8h4.3v-.2c0-.7-.2-1.2-.6-1.6-.3-.4-.8-.6-1.5-.6zm19.1 9.3c-.1-.3-.2-.6-.3-1-.8.8-1.7 1.3-2.9 1.3-1.1 0-2.1-.3-2.8-1-.7-.7-1.1-1.5-1.1-2.5 0-1.2.5-2.2 1.4-2.8s2.2-1 4-1h1.4v-.7c0-.5-.1-1-.4-1.3-.3-.3-.7-.5-1.3-.5-.5 0-.9.1-1.2.4-.3.3-.4.6-.4 1h-3.1c0-.7.2-1.3.6-1.9.4-.6 1-1 1.8-1.3.8-.3 1.6-.5 2.6-.5 1.4 0 2.6.4 3.4 1.1.8.7 1.3 1.7 1.3 3v5c0 1.1.2 1.9.5 2.5v.2h-3.5zm-2.5-2.2c.5 0 .9-.1 1.3-.3.4-.2.7-.5.9-.8v-2H715c-1.6 0-2.4.5-2.5 1.6v.2c0 .4.1.7.4 1 .3.2.7.3 1.2.3zm10.4-9.4l.1 1.3c.8-1 1.9-1.6 3.3-1.6 1.2 0 2.1.4 2.8 1.1s.9 1.8.9 3.2v7.5h-3.1v-7.5c0-.7-.1-1.1-.4-1.4-.3-.3-.8-.4-1.4-.4-.9 0-1.5.4-2 1.1v8.2h-3.1v-11.6h2.9zm9 5.7c0-1.8.4-3.3 1.2-4.3s1.9-1.6 3.3-1.6c1.1 0 2.1.4 2.8 1.3v-5.9h3.1v16.5h-2.8l-.2-1.2c-.8 1-1.8 1.5-3 1.5-1.4 0-2.5-.5-3.3-1.6-.7-1.3-1.1-2.8-1.1-4.7zm3.1.2c0 1.1.2 1.9.6 2.5.4.6.9.9 1.7.9 1 0 1.6-.4 2-1.2v-4.6c-.4-.8-1.1-1.2-2-1.2-1.5 0-2.3 1.2-2.3 3.6zm21.8-3c-.4-.1-.8-.1-1.1-.1-1.2 0-1.9.4-2.3 1.2v7.6h-3.1v-11.6h2.9l.1 1.4c.6-1.1 1.5-1.6 2.6-1.6.3 0 .7 0 1 .1l-.1 3zm6.7 8.9c-1.7 0-3.1-.5-4.2-1.6s-1.6-2.4-1.6-4.2v-.3c0-1.2.2-2.2.7-3.1.5-.9 1.1-1.6 1.9-2.1.8-.5 1.8-.7 2.8-.7 1.6 0 2.8.5 3.8 1.5.9 1 1.4 2.4 1.4 4.3v1.3h-7.4c.1.8.4 1.4.9 1.8.5.5 1.1.7 1.9.7 1.2 0 2.1-.4 2.8-1.3l1.5 1.7c-.5.7-1.1 1.2-1.9 1.5-.8.3-1.7.5-2.6.5zm-.4-9.5c-.6 0-1.1.2-1.5.6-.4.4-.6 1-.7 1.8h4.3v-.2c0-.7-.2-1.2-.6-1.6-.3-.4-.8-.6-1.5-.6zm13.2 6.1c0-.4-.2-.7-.6-.9-.4-.2-1-.4-1.8-.6-2.8-.6-4.1-1.8-4.1-3.5 0-1 .4-1.9 1.3-2.6.9-.7 2-1 3.4-1 1.5 0 2.7.3 3.5 1 .9.7 1.3 1.6 1.3 2.7h-3.1c0-.4-.1-.8-.4-1.1-.3-.3-.7-.4-1.3-.4-.5 0-.9.1-1.2.4s-.4.5-.4.9c0 .3.2.6.5.8.3.2.9.4 1.6.5.8.2 1.4.3 2 .5 1.6.6 2.5 1.6 2.5 3.1 0 1.1-.5 1.9-1.4 2.6-.9.7-2.1 1-3.5 1-1 0-1.8-.2-2.6-.5s-1.3-.8-1.8-1.4c-.4-.6-.6-1.3-.6-2h2.9c0 .6.2 1 .6 1.3.4.3.9.4 1.5.4s1-.1 1.3-.3c.2-.3.4-.5.4-.9zm4.5-2.7c0-1.2.2-2.2.7-3.1.4-.9 1.1-1.6 1.9-2.1.8-.5 1.8-.7 2.9-.7 1.6 0 2.8.5 3.8 1.4 1 1 1.5 2.3 1.7 3.9v.8c0 1.8-.5 3.2-1.5 4.3-1 1.1-2.3 1.6-4 1.6s-3-.5-4-1.6-1.5-2.5-1.5-4.4v-.1zm3.1.2c0 1.1.2 1.9.6 2.5.4.6 1 .9 1.8.9s1.3-.3 1.8-.9.6-1.5.6-2.8c0-1.1-.2-1.9-.6-2.5-.4-.6-1-.9-1.8-.9s-1.3.3-1.8.9-.6 1.6-.6 2.8zm16.8 4.5c-.8.9-1.8 1.4-3.2 1.4-1.2 0-2.2-.4-2.9-1.1-.7-.7-1-1.8-1-3.1v-7.6h3.1v7.5c0 1.2.6 1.8 1.7 1.8s1.8-.4 2.2-1.1v-8.2h3.1v11.6h-2.9l-.1-1.2zm11.9-7.5c-.4-.1-.8-.1-1.1-.1-1.2 0-1.9.4-2.3 1.2v7.6h-3.1v-11.6h2.9l.1 1.4c.6-1.1 1.5-1.6 2.6-1.6.3 0 .7 0 1 .1l-.1 3zm6.1 6.4c.6 0 1-.2 1.4-.5s.5-.7.6-1.3h2.9c0 .8-.2 1.5-.6 2.2-.4.7-1 1.2-1.7 1.5-.7.4-1.5.5-2.4.5-1.7 0-3-.5-3.9-1.6-1-1.1-1.4-2.5-1.4-4.4v-.2c0-1.8.5-3.2 1.4-4.3s2.3-1.6 3.9-1.6c1.5 0 2.6.4 3.5 1.2.9.8 1.3 1.9 1.3 3.3h-2.9c0-.6-.2-1.1-.6-1.5s-.8-.6-1.4-.6c-.7 0-1.3.3-1.6.8-.4.5-.6 1.4-.6 2.6v.3c0 1.2.2 2.1.5 2.6s.9 1 1.6 1zm12 2.5c-1.7 0-3.1-.5-4.2-1.6-1.1-1-1.6-2.4-1.6-4.2v-.3c0-1.2.2-2.2.7-3.1.5-.9 1.1-1.6 1.9-2.1.8-.5 1.8-.7 2.8-.7 1.6 0 2.8.5 3.8 1.5.9 1 1.4 2.4 1.4 4.3v1.3h-7.4c.1.8.4 1.4.9 1.8.5.5 1.1.7 1.9.7 1.2 0 2.1-.4 2.8-1.3l1.5 1.7c-.5.7-1.1 1.2-1.9 1.5-.8.3-1.6.5-2.6.5zm-.4-9.5c-.6 0-1.1.2-1.5.6-.4.4-.6 1-.7 1.8h4.3v-.2c0-.7-.2-1.2-.6-1.6s-.8-.6-1.5-.6zm13.2 6.1c0-.4-.2-.7-.6-.9-.4-.2-1-.4-1.8-.6-2.8-.6-4.1-1.8-4.1-3.5 0-1 .4-1.9 1.3-2.6.9-.7 2-1 3.4-1 1.5 0 2.7.3 3.5 1 .9.7 1.3 1.6 1.3 2.7H845c0-.4-.1-.8-.4-1.1-.3-.3-.7-.4-1.3-.4-.5 0-.9.1-1.2.4s-.4.5-.4.9c0 .3.2.6.5.8.3.2.9.4 1.6.5.8.2 1.4.3 2 .5 1.6.6 2.5 1.6 2.5 3.1 0 1.1-.5 1.9-1.4 2.6-.9.7-2.1 1-3.5 1-1 0-1.8-.2-2.6-.5s-1.3-.8-1.8-1.4c-.4-.6-.6-1.3-.6-2h2.9c0 .6.2 1 .6 1.3s.9.4 1.5.4 1-.1 1.3-.3c.3-.3.4-.5.4-.9zm14.3-11.3v2.9h2v2.3h-2v5.8c0 .4.1.7.2.9s.5.3.9.3c.3 0 .6 0 .9-.1v2.4c-.6.2-1.2.3-1.9.3-2.2 0-3.3-1.1-3.3-3.3v-6.3h-1.7v-2.3h1.7v-2.9h3.2zm2.9 8.6c0-1.2.2-2.2.7-3.1s1.1-1.6 1.9-2.1c.8-.5 1.8-.7 2.9-.7 1.6 0 2.8.5 3.8 1.4 1 1 1.5 2.3 1.7 3.9v.8c0 1.8-.5 3.2-1.5 4.3-1 1.1-2.3 1.6-4 1.6s-3-.5-4-1.6-1.5-2.5-1.5-4.4v-.1zm3.1.2c0 1.1.2 1.9.6 2.5.4.6 1 .9 1.8.9s1.3-.3 1.8-.9.6-1.5.6-2.8c0-1.1-.2-1.9-.6-2.5-.4-.6-1-.9-1.8-.9s-1.3.3-1.8.9-.6 1.6-.6 2.8z"
                              transform="translate(-525 -2633)"
                            />
                          </g>
                          <g className="prefix__background">
                            <path
                              className="prefix__headingColor"
                              d="M532.5 2671.8c0-.4-.2-.7-.6-.9-.4-.2-1-.4-1.8-.6-2.8-.6-4.1-1.8-4.1-3.5 0-1 .4-1.9 1.3-2.6.9-.7 2-1 3.4-1 1.5 0 2.7.3 3.5 1 .9.7 1.3 1.6 1.3 2.7h-3.1c0-.4-.1-.8-.4-1.1-.3-.3-.7-.4-1.3-.4-.5 0-.9.1-1.2.4-.3.2-.4.5-.4.9 0 .3.2.6.5.8.3.2.9.4 1.6.5.8.2 1.4.3 2 .5 1.6.6 2.5 1.6 2.5 3.1 0 1.1-.5 1.9-1.4 2.6-.9.7-2.1 1-3.5 1-1 0-1.8-.2-2.6-.5s-1.3-.8-1.8-1.4c-.4-.6-.6-1.3-.6-2h2.9c0 .6.2 1 .6 1.3.4.3.9.4 1.5.4s1-.1 1.3-.3c.2-.3.4-.5.4-.9zm12 2c-.8.9-1.8 1.4-3.2 1.4-1.2 0-2.2-.4-2.9-1.1s-1-1.8-1-3.1v-7.6h3.1v7.5c0 1.2.6 1.8 1.7 1.8s1.8-.4 2.2-1.1v-8.2h3.1v11.6h-2.9l-.1-1.2zm15.8-4.5c0 1.8-.4 3.2-1.2 4.3-.8 1.1-1.9 1.6-3.3 1.6-1.2 0-2.1-.4-2.8-1.2v5.5h-3.1v-16.1h2.9l.1 1.1c.8-.9 1.7-1.4 2.9-1.4 1.4 0 2.5.5 3.3 1.6s1.2 2.5 1.2 4.4v.2zm-3.1-.2c0-1.1-.2-1.9-.6-2.5-.4-.6-.9-.9-1.7-.9-1 0-1.6.4-2 1.1v4.8c.4.8 1.1 1.2 2 1.2 1.5-.1 2.3-1.3 2.3-3.7zm15.5.2c0 1.8-.4 3.2-1.2 4.3-.8 1.1-1.9 1.6-3.3 1.6-1.2 0-2.1-.4-2.8-1.2v5.5h-3.1v-16.1h2.9l.1 1.1c.8-.9 1.7-1.4 2.9-1.4 1.4 0 2.5.5 3.3 1.6s1.2 2.5 1.2 4.4v.2zm-3.1-.2c0-1.1-.2-1.9-.6-2.5-.4-.6-.9-.9-1.7-.9-1 0-1.6.4-2 1.1v4.8c.4.8 1.1 1.2 2 1.2 1.5-.1 2.3-1.3 2.3-3.7zm4.5 0c0-1.2.2-2.2.7-3.1.4-.9 1.1-1.6 1.9-2.1.8-.5 1.8-.7 2.9-.7 1.6 0 2.8.5 3.8 1.4 1 1 1.5 2.3 1.7 3.9v.8c0 1.8-.5 3.2-1.5 4.3-1 1.1-2.3 1.6-4 1.6s-3-.5-4-1.6-1.5-2.5-1.5-4.4v-.1zm3.1.2c0 1.1.2 1.9.6 2.5.4.6 1 .9 1.8.9s1.3-.3 1.8-.9c.4-.6.6-1.5.6-2.8 0-1.1-.2-1.9-.6-2.5-.4-.6-1-.9-1.8-.9s-1.3.3-1.8.9c-.4.6-.6 1.6-.6 2.8zm16.4-3c-.4-.1-.8-.1-1.1-.1-1.2 0-1.9.4-2.3 1.2v7.6H587v-11.6h2.9l.1 1.4c.6-1.1 1.5-1.6 2.6-1.6.3 0 .7 0 1 .1v3zm5.7-5.8v2.9h2v2.3h-2v5.8c0 .4.1.7.2.9.2.2.5.3.9.3.3 0 .6 0 .9-.1v2.4c-.6.2-1.2.3-1.9.3-2.2 0-3.3-1.1-3.3-3.3v-6.3h-1.7v-2.3h1.7v-2.9h3.2zm13.5 10.1l2.1-7.2h3.3l-4.7 13.4-.3.6c-.7 1.5-1.8 2.3-3.4 2.3-.5 0-.9-.1-1.4-.2v-2.4h.5c.6 0 1-.1 1.3-.3s.5-.5.7-.9l.4-1-4.1-11.7h3.3l2.3 7.4zm6.1-1.5c0-1.2.2-2.2.7-3.1.4-.9 1.1-1.6 1.9-2.1.8-.5 1.8-.7 2.9-.7 1.6 0 2.8.5 3.8 1.4 1 1 1.5 2.3 1.7 3.9v.8c0 1.8-.5 3.2-1.5 4.3-1 1.1-2.3 1.6-4 1.6s-3-.5-4-1.6-1.5-2.5-1.5-4.4v-.1zm3.1.2c0 1.1.2 1.9.6 2.5.4.6 1 .9 1.8.9s1.3-.3 1.8-.9c.4-.6.6-1.5.6-2.8 0-1.1-.2-1.9-.6-2.5-.4-.6-1-.9-1.8-.9s-1.3.3-1.8.9c-.4.6-.6 1.6-.6 2.8zm16.8 4.5c-.8.9-1.8 1.4-3.2 1.4-1.2 0-2.2-.4-2.9-1.1s-1-1.8-1-3.1v-7.6h3.1v7.5c0 1.2.6 1.8 1.7 1.8s1.8-.4 2.2-1.1v-8.2h3.1v11.6h-2.9l-.1-1.2zm11.9-7.5c-.4-.1-.8-.1-1.1-.1-1.2 0-1.9.4-2.3 1.2v7.6h-3.1v-11.6h2.9l.1 1.4c.6-1.1 1.5-1.6 2.6-1.6.3 0 .7 0 1 .1l-.1 3zm17.4 3c0 1.9-.4 3.3-1.2 4.4-.8 1-1.9 1.6-3.3 1.6-1.3 0-2.3-.5-3-1.5l-.1 1.2h-2.8v-16.5h3.1v5.9c.7-.8 1.7-1.3 2.8-1.3 1.4 0 2.5.5 3.3 1.6.8 1 1.2 2.5 1.2 4.4v.2zm-3.1-.2c0-1.2-.2-2-.6-2.6-.4-.5-.9-.8-1.7-.8-1 0-1.7.4-2 1.2v4.6c.4.8 1.1 1.2 2.1 1.2s1.7-.5 2-1.5c.1-.4.2-1.2.2-2.1zm12 4.7c-.8.9-1.8 1.4-3.2 1.4-1.2 0-2.2-.4-2.9-1.1s-1-1.8-1-3.1v-7.6h3.1v7.5c0 1.2.6 1.8 1.7 1.8s1.8-.4 2.2-1.1v-8.2h3.1v11.6h-2.9l-.1-1.2zm11.6-2c0-.4-.2-.7-.6-.9-.4-.2-1-.4-1.8-.6-2.8-.6-4.1-1.8-4.1-3.5 0-1 .4-1.9 1.3-2.6.9-.7 2-1 3.4-1 1.5 0 2.7.3 3.5 1 .9.7 1.3 1.6 1.3 2.7h-3.1c0-.4-.1-.8-.4-1.1-.3-.3-.7-.4-1.3-.4-.5 0-.9.1-1.2.4-.3.2-.4.5-.4.9 0 .3.2.6.5.8.3.2.9.4 1.6.5.8.2 1.4.3 2 .5 1.6.6 2.5 1.6 2.5 3.1 0 1.1-.5 1.9-1.4 2.6-.9.7-2.1 1-3.5 1-1 0-1.8-.2-2.6-.5s-1.3-.8-1.8-1.4c-.4-.6-.6-1.3-.6-2h2.9c0 .6.2 1 .6 1.3.4.3.9.4 1.5.4s1-.1 1.3-.3c.3-.3.4-.5.4-.9zm5-11.4c0-.5.2-.8.5-1.1s.7-.5 1.3-.5c.5 0 1 .2 1.3.5.3.3.5.7.5 1.1 0 .5-.2.9-.5 1.2-.3.3-.7.5-1.3.5-.5 0-.9-.2-1.3-.5-.3-.4-.5-.8-.5-1.2zm3.3 14.6h-3.1v-11.6h3.1v11.6zm5.4-11.6l.1 1.3c.8-1 1.9-1.6 3.3-1.6 1.2 0 2.1.4 2.8 1.1s.9 1.8.9 3.2v7.5h-3.1v-7.5c0-.7-.1-1.1-.4-1.4-.3-.3-.8-.4-1.4-.4-.9 0-1.5.4-2 1.1v8.2h-3.1v-11.6h2.9zm14.8 11.8c-1.7 0-3.1-.5-4.2-1.6-1.1-1-1.6-2.4-1.6-4.2v-.3c0-1.2.2-2.2.7-3.1.5-.9 1.1-1.6 1.9-2.1.8-.5 1.8-.7 2.8-.7 1.6 0 2.8.5 3.8 1.5s1.4 2.4 1.4 4.3v1.3h-7.4c.1.8.4 1.4.9 1.8s1.1.7 1.9.7c1.2 0 2.1-.4 2.8-1.3l1.5 1.7c-.5.7-1.1 1.2-1.9 1.5-.7.3-1.6.5-2.6.5zm-.3-9.5c-.6 0-1.1.2-1.5.6-.4.4-.6 1-.7 1.8h4.3v-.2c0-.7-.2-1.2-.6-1.6-.3-.4-.9-.6-1.5-.6zm13.2 6.1c0-.4-.2-.7-.6-.9-.4-.2-1-.4-1.8-.6-2.8-.6-4.1-1.8-4.1-3.5 0-1 .4-1.9 1.3-2.6.9-.7 2-1 3.4-1 1.5 0 2.7.3 3.5 1 .9.7 1.3 1.6 1.3 2.7h-3.1c0-.4-.1-.8-.4-1.1-.3-.3-.7-.4-1.3-.4-.5 0-.9.1-1.2.4-.3.2-.4.5-.4.9 0 .3.2.6.5.8.3.2.9.4 1.6.5.8.2 1.4.3 2 .5 1.6.6 2.5 1.6 2.5 3.1 0 1.1-.5 1.9-1.4 2.6-.9.7-2.1 1-3.5 1-1 0-1.8-.2-2.6-.5s-1.3-.8-1.8-1.4c-.4-.6-.6-1.3-.6-2h2.9c0 .6.2 1 .6 1.3.4.3.9.4 1.5.4s1-.1 1.3-.3c.2-.3.4-.5.4-.9zm11.3 0c0-.4-.2-.7-.6-.9-.4-.2-1-.4-1.8-.6-2.8-.6-4.1-1.8-4.1-3.5 0-1 .4-1.9 1.3-2.6.9-.7 2-1 3.4-1 1.5 0 2.7.3 3.5 1s1.3 1.6 1.3 2.7h-3.1c0-.4-.1-.8-.4-1.1-.3-.3-.7-.4-1.3-.4-.5 0-.9.1-1.2.4-.3.2-.4.5-.4.9 0 .3.2.6.5.8.3.2.9.4 1.6.5.8.2 1.4.3 2 .5 1.6.6 2.5 1.6 2.5 3.1 0 1.1-.5 1.9-1.4 2.6-.9.7-2.1 1-3.5 1-1 0-1.8-.2-2.6-.5s-1.3-.8-1.8-1.4c-.4-.6-.6-1.3-.6-2h2.9c0 .6.2 1 .6 1.3s.9.4 1.5.4 1-.1 1.3-.3c.2-.3.4-.5.4-.9zm14.2-11.3v2.9h2v2.3h-2v5.8c0 .4.1.7.2.9s.5.3.9.3c.3 0 .6 0 .9-.1v2.4c-.6.2-1.2.3-1.9.3-2.2 0-3.3-1.1-3.3-3.3v-6.3h-1.7v-2.3h1.7v-2.9h3.2zm6.8 4.1c.8-1 1.9-1.5 3.1-1.5 2.5 0 3.8 1.5 3.8 4.4v7.4h-3.1v-7.4c0-.7-.1-1.2-.4-1.5s-.8-.5-1.4-.5c-.9 0-1.6.4-2 1.1v8.3h-3.1v-16.5h3.1v6.2zm15.8 1.7c-.4-.1-.8-.1-1.1-.1-1.2 0-1.9.4-2.3 1.2v7.6h-3.1v-11.6h2.9l.1 1.4c.6-1.1 1.5-1.6 2.6-1.6.3 0 .7 0 1 .1l-.1 3zm.6 2.8c0-1.2.2-2.2.7-3.1.4-.9 1.1-1.6 1.9-2.1.8-.5 1.8-.7 2.9-.7 1.6 0 2.8.5 3.8 1.4 1 1 1.5 2.3 1.7 3.9v.8c0 1.8-.5 3.2-1.5 4.3-1 1.1-2.3 1.6-4 1.6s-3-.5-4-1.6-1.5-2.5-1.5-4.4v-.1zm3.1.2c0 1.1.2 1.9.6 2.5.4.6 1 .9 1.8.9s1.3-.3 1.8-.9.6-1.5.6-2.8c0-1.1-.2-1.9-.6-2.5-.4-.6-1-.9-1.8-.9s-1.3.3-1.8.9-.6 1.6-.6 2.8zm16.8 4.5c-.8.9-1.8 1.4-3.2 1.4-1.2 0-2.2-.4-2.9-1.1-.7-.7-1-1.8-1-3.1v-7.6h3.1v7.5c0 1.2.6 1.8 1.7 1.8s1.8-.4 2.2-1.1v-8.2h3.1v11.6h-2.9l-.1-1.2zm4.9-4.7c0-1.8.4-3.2 1.3-4.3.8-1.1 2-1.6 3.4-1.6 1.3 0 2.3.4 3 1.3l.1-1.1h2.8v11.2c0 1-.2 1.9-.7 2.7-.5.8-1.1 1.3-1.9 1.7s-1.8.6-2.9.6c-.9 0-1.7-.2-2.5-.5s-1.4-.8-1.8-1.3l1.4-1.9c.8.9 1.7 1.3 2.8 1.3.8 0 1.5-.2 1.9-.7.5-.4.7-1.1.7-1.9v-.6c-.7.8-1.7 1.2-2.8 1.2-1.4 0-2.5-.5-3.4-1.6-.9-1.1-1.3-2.5-1.3-4.3v-.2zm3.1.2c0 1.1.2 1.9.6 2.5.4.6 1 .9 1.7.9.9 0 1.6-.4 2-1.1v-4.9c-.4-.7-1.1-1.1-2-1.1-.7 0-1.3.3-1.8.9-.3.7-.5 1.6-.5 2.8zm12.9-4.7c.8-1 1.9-1.5 3.1-1.5 2.5 0 3.8 1.5 3.8 4.4v7.4h-3.1v-7.4c0-.7-.1-1.2-.4-1.5s-.8-.5-1.4-.5c-.9 0-1.6.4-2 1.1v8.3h-3.1v-16.5h3.1v6.2zm27.3 5.2c-.1 1.7-.7 3-1.9 4-1.1 1-2.6 1.5-4.4 1.5-2 0-3.6-.7-4.7-2-1.2-1.3-1.7-3.2-1.7-5.6v-1c0-1.5.3-2.8.8-4s1.3-2 2.3-2.6c1-.6 2.1-.9 3.4-.9 1.8 0 3.3.5 4.4 1.5s1.7 2.3 1.9 4.1h-3.2c-.1-1-.4-1.7-.8-2.2-.5-.5-1.2-.7-2.2-.7-1.1 0-1.9.4-2.4 1.2-.5.8-.8 2-.8 3.6v1.2c0 1.7.3 2.9.8 3.7.5.8 1.3 1.2 2.4 1.2 1 0 1.7-.2 2.2-.7.5-.5.8-1.2.8-2.1h3.1zm14.9-2.3c0 1.5-.3 2.9-.8 4s-1.3 2.1-2.3 2.7c-1 .6-2.2.9-3.5.9-1.3 0-2.5-.3-3.5-.9s-1.8-1.5-2.4-2.7c-.6-1.2-.8-2.5-.8-4v-.8c0-1.5.3-2.9.8-4.1.6-1.2 1.3-2.1 2.4-2.7 1-.6 2.2-.9 3.5-.9s2.5.3 3.5.9c1 .6 1.8 1.5 2.4 2.7.6 1.2.8 2.5.8 4.1v.8zm-3.3-.7c0-1.6-.3-2.9-.9-3.7s-1.4-1.3-2.5-1.3-1.9.4-2.5 1.3c-.6.8-.9 2.1-.9 3.7v.8c0 1.6.3 2.8.9 3.7s1.4 1.3 2.5 1.3 1.9-.4 2.5-1.3c.6-.8.9-2.1.9-3.7v-.8zm11.2 4.3l3.5-11.8h3.6l-5.4 15.6h-3.4l-5.4-15.6h3.6l3.5 11.8zm12 3.9h-3.2v-15.6h3.2v15.6zm3 0v-15.6h4.8c1.4 0 2.6.3 3.7.9 1.1.6 1.9 1.5 2.5 2.6.6 1.1.9 2.4.9 3.9v.7c0 1.5-.3 2.7-.9 3.9-.6 1.1-1.4 2-2.5 2.6s-2.3.9-3.7.9h-4.8zm3.2-13v10.4h1.6c1.3 0 2.2-.4 2.9-1.2s1-2 1-3.5v-.8c0-1.6-.3-2.8-1-3.6-.7-.8-1.6-1.2-2.9-1.2h-1.6zm16.9 7.6h-6v-2.5h6v2.5zm10 5.4h-3.1v-12l-3.7 1.1v-2.5l6.5-2.3h.3v15.7zm12.3-6.3c-.8.8-1.8 1.2-2.8 1.2-1.4 0-2.5-.5-3.3-1.4-.8-.9-1.2-2.2-1.2-3.8 0-1 .2-2 .7-2.8.4-.9 1.1-1.5 1.9-2 .8-.5 1.7-.7 2.7-.7 1 0 1.9.3 2.8.8s1.4 1.3 1.9 2.2.7 2.1.7 3.3v1.1c0 2.6-.6 4.7-1.9 6.1s-3.1 2.3-5.5 2.4h-.8v-2.6h.7c2.4-.1 3.9-1.3 4.1-3.8zm-2.1-1.1c.5 0 .9-.1 1.3-.4.4-.3.6-.6.8-.9v-1.3c0-1.1-.2-1.9-.6-2.4s-.9-.9-1.6-.9c-.6 0-1.1.3-1.5.9-.4.6-.6 1.3-.6 2.1 0 .9.2 1.6.6 2.1.4.5.9.8 1.6.8z"
                              transform="translate(-525 -2633)"
                            />
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div className="FYwKg _6Gmbl_4">
                    <div className="FYwKg _3ftyQ _3i7ia _1d5GB_4">
                      <div className="FYwKg d7v3r _3QaJd_4">
                        <div className="FYwKg _2Bz3E _2II51_4 _1lyEa IC4bo_4 _1q9J3 _3Aa4F_4">
                          <div className="FYwKg _1uk_1 _3RtnC_4 _37N5v_4 _2Bz3E rNAgI">
                            <a
                              style={{
                                backgroundColor: "#2765cf",
                                color: "white",
                                padding: "12px 20px"
                              }}
                              href="https://www.seek.com.au/employer/hiring-advice/"
                            >
                                  { i18n.language === "en" ?  "Explore Hiring Advice" : "Khám phá lời khuyên về việc tuyển dụng" }
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="FYwKg _3VCZm _1uk_1 _3Ve9Z">
              <div className="FYwKg _1GAuD _3gJU3_4 _2JU1c_4 hLznC_4 _2Bz3E rNAgI _1tfFt">
                {" "}
                <svg
                  viewBox="0 0 3252 3187"
                  xmlns="http://www.w3.org/2000/svg"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit={10}
                  display="block"
                >
                  <g fillRule="nonzero">
                    <path
                      d="M1845.6 736.3h-344s8.3-280.9 172-281.4c163.7.6 172 281.4 172 281.4z"
                      fill="#9556b7"
                    />
                    <path
                      d="M1803.9 736.3h-260.5s6.3-231.2 130.2-231.6c124 .5 130.3 231.6 130.3 231.6z"
                      fill="#d8527e"
                    />
                    <path
                      d="M1760.2 736.3H1587s4.2-176.2 86.6-176.5c82.4.3 86.6 176.5 86.6 176.5z"
                      fill="#ef642f"
                    />
                    <path
                      d="M1726.7 736.3h-106.1s2.6-122.7 53.1-122.9c50.4.3 53 122.9 53 122.9z"
                      fill="#ffc600"
                    />
                    <path
                      d="M1698.4 736.8h-49.5s1.2-78.7 24.8-78.9c23.5.2 24.7 78.9 24.7 78.9z"
                      fill="#b99cff"
                    />
                  </g>
                  <path
                    d="M1491.1 636.2l-.3-1.7v-.4.2-.2.4l-.3 1.7c-.9 2.8-3.6 4.9-6.7 4.9 3.1 0 5.8 2.1 6.7 4.9l.3 1.7v.4-.2.2-.4l.3-1.7c.9-2.8 3.6-4.9 6.7-4.9-3.1 0-5.8-2.1-6.7-4.9zm10.9-145.6l-.3-1.7v-.4.2-.2.4l-.3 1.7c-.9 2.8-3.6 4.9-6.7 4.9 3.1 0 5.8 2.1 6.7 4.9l.3 1.7v.4-.2.2-.4l.3-1.7c.9-2.8 3.6-4.9 6.7-4.9-3.2 0-5.8-2.1-6.7-4.9zm261.5-78.7l-.3-1.7v-.4.2-.2.4l-.3 1.7c-.9 2.8-3.6 4.9-6.7 4.9 3.1 0 5.8 2.1 6.7 4.9l.3 1.7v.4-.2.2-.4l.3-1.7c.9-2.8 3.6-4.9 6.7-4.9-3.2 0-5.8-2.1-6.7-4.9zm-133.5 2.8l-.3-1.7v-.4.2-.2.4l-.3 1.7c-.9 2.8-3.6 4.9-6.7 4.9 3.1 0 5.8 2.1 6.7 4.9l.3 1.7v.4-.2.2-.4l.3-1.7c.9-2.8 3.6-4.9 6.7-4.9-3.2 0-5.8-2.1-6.7-4.9zm212.2 179.2l-.3-1.7v-.4.2-.2.4l-.3 1.7c-.9 2.8-3.6 4.9-6.7 4.9 3.1 0 5.8 2.1 6.7 4.9l.3 1.7v.4-.2.2-.4l.3-1.7c.9-2.8 3.6-4.9 6.7-4.9-3.2 0-5.8-2.1-6.7-4.9zm-81.6-76.3l-.3-1.7v-.4.2-.2.4l-.3 1.7c-.9 2.8-3.6 4.9-6.7 4.9 3.1 0 5.8 2.1 6.7 4.9l.3 1.7v.4-.2.2-.4l.3-1.7c.9-2.8 3.6-4.9 6.7-4.9-3.1 0-5.8-2.1-6.7-4.9zm-136.7 121.2l-.3-1.7v-.4.2-.2.4l-.3 1.7c-.9 2.8-3.6 4.9-6.7 4.9 3.1 0 5.8 2.1 6.7 4.9l.3 1.7v.4-.2.2-.4l.3-1.7c.9-2.8 3.6-4.9 6.7-4.9-3.1 0-5.7-2.1-6.7-4.9z"
                    fill="#f1f1f1"
                    fillRule="nonzero"
                    stroke="#f1f1f1"
                    strokeWidth={5.94}
                  />
                  <path
                    d="M1767.7 999.4l-5.2-.6-170.8-19.4 28.2-81.9 53-162.1 94.8 264z"
                    fill="#00a5ad"
                    fillRule="nonzero"
                  />
                  <path
                    d="M1674.2 782.5l-.2-12h-2.2l-.1 12h2.5zm-.2-17.2l-.1-8.8h-1.9l-.1 8.8h2.1zm-2-12.2h1.8v-6.3h-1.7l-.1 6.3zm2.4 51.9l-.1-14.5h-2.7l-.2 14.5h3zm1.3 80.6l-.7-28.3v-1.6h-4.2v1.6l-.7 28.3h5.6zm-.9-47.6l-.2-20.7h-3.3l-.3 20.7h3.8zm10.1 431.6l-2.6-107.6h-18.8l-2.6 107.6h24zM1673.7 744v-5.3h-1.5l-.1 5.3h1.6zm4 227l-1.2-50.3h-7.2l-1.2 50.3h9.6zm3 121.3l-1.9-77.6h-11.7l-1.9 77.6h15.5z"
                    fill="#eee"
                    fillRule="nonzero"
                  />
                  <path
                    d="M1762.5 998.8l-170.8-19.4 28.2-82c26.9 15.8 89.7 54.3 142.6 101.4z"
                    fill="#212121"
                    fillOpacity={0.2}
                    fillRule="nonzero"
                  />
                  <path
                    d="M3131.1 1040.7c-69 153-219 150-219 150h-287.9s268.7-75 289.7-240c10-78.1-23-139.4-60.4-182.3-23-26.4-47.8-45.8-65.3-57.9-14.2-9.8-23.6-14.8-23.6-14.8h165.5c56.1 0 107.5 25.9 146.5 66.2 67.3 69.5 98.1 181.9 54.5 278.8z"
                    fill="#00a5ad"
                    fillRule="nonzero"
                  />
                  <path
                    d="M3076.6 761.9l-223.2 6.5c-23-26.4-47.8-45.8-65.3-57.9-7.3-6.2-12-10.2-12-10.2 4.4-1.6 8.8-3.1 13-4.6H2930c56.2 0 107.6 25.9 146.6 66.2z"
                    fill="#212121"
                    fillOpacity={0.2}
                    fillRule="nonzero"
                  />
                  <path
                    d="M2425.7 932.4s72.4-2.8 180.4 75.2 153 183 267 183h-310.9s-63 9-144-111-148.1-126-238.1-117c.1.1 194.7-28.3 245.6-30.2z"
                    fill="#eee"
                    fillRule="nonzero"
                  />
                  <path
                    d="M2425.7 932.4s-118.1 11.2-209.6 129.2c-91.6 118-162.8 180.6-261.8 233.5-7.2 3.9-14.7 7.6-22.3 11.1-25.7 12-53.7 22.1-84.5 29.6-7.8 1.9-15.8 3.6-23.9 5.1-25.5 4.8-52.9 7.9-82.5 8.8l-9.4-158.4s31.2 2.1 81.8-15.5c16-5.5 34-13 53.5-23.2 8.5-4.4 17.3-9.4 26.4-14.8.7-.4 1.3-.8 2-1.2 33-20.1 69.6-47.7 108.2-85.3 152.1-147.9 234.1-118.9 422.1-118.9z"
                    fill="#00a5ad"
                    fillRule="nonzero"
                  />
                  <path
                    d="M1741.9 1253s114.9 7.5 245.7-120.3c130.8-127.8 218-185 296.8-198.9"
                    fill="none"
                    stroke="#eee"
                    strokeWidth={6}
                    strokeDasharray="40,40"
                  />
                  <path
                    d="M1932 1306.3c.3-.2.6-.4.9-.7-8.8-80.5-23.8-134.2-37.5-168.9-.7.4-1.3.8-2 1.2-9.1 5.5-17.9 10.4-26.4 14.8-19.6 14.4-37.5 25-53.5 32.9v52.8s4.2 50.1 10 102.6l108.5-34.7z"
                    fill="#212121"
                    fillOpacity={0.2}
                    fillRule="nonzero"
                  />
                  <path
                    d="M487.7 823.5s42-12 62-16c0 0-88-94-210-6 0 0 96 14 148 22z"
                    fill="#212121"
                    fillRule="nonzero"
                  />
                  <path
                    d="M909 908.8s37.3-9.3 16 5.3c-68.9 47.3-224-41.3-298.7-88-74.7-46.7-171.2 4-176.5 106.7-5.3 102.7 91.2 182.7 256.5 162.7 0 0-300 68.1-405.3-59.9-105.3-128 44-380.1 357.3-236.1 313.3 144 221.4 115.9 250.7 109.3zm1207.5-235.3s-83.5-1-187.5-1-132.8 165.1-185.8 268.2c-29.3 56.9-78.8 56.3-100.3 21.4-18.1-29.5-40.6-31.9-40.6-31.9l-20.6 65.3 137.3 133c192 0 252.4-316.9 288-396 31-69 110-58.7 110-58.7l-.5-.3z"
                    fill="#eee"
                    fillRule="nonzero"
                  />
                  <path
                    d="M902 880.9c-53-15.3-95.7-47.4-141.4-81.2-37.4-27.6-82.3-43.1-128.8-44.8-78.3-2.7-187.1-14-260.8 26.4 0 0 102.1-53.9 188.7 34.1 76.1 77.3 210.7 172 357.3 124 0 0 68-24 104-48 0 .1-66 4.8-119-10.5z"
                    fill="#00a5ad"
                    fillRule="nonzero"
                  />
                  <path
                    d="M1412.2 770.7s-96.5 3.5-192 75c-116.7 87.5-191.9 105.8-365.9 105.8 0 0 123.7-11.7 225.3-112 96.9-95.8 203.6-122.8 332.6-68.8z"
                    fill="#eee"
                    fillRule="nonzero"
                  />
                  <path
                    d="M1210.1 935.8c-49.3 0-70.7 19.4-111.3 54.6-13.4 11.6-28.9 24.9-48.1 39.8-26.3 20.4-59.7 43.7-104.4 69.7-166.1 96.6-548.8-4.3-548.8-4.3 81.8 19.3 268.2-9.3 458.6-122.8 1.9-1.1 3.7-2.2 5.6-3.4 68.4-41.1 130-36 130-36l60.2.6 158.2 1.8z"
                    fill="#00a5ad"
                    fillRule="nonzero"
                  />
                  <path
                    d="M1098.7 990.4c-13.4 11.6-28.9 24.9-48.1 39.8-33-57.1-35.6-61.5-81.5-72.8-45.9-11.3-79.3 6.1-96.6 10.9l-16.4 4.5c1.9-1.1 3.7-2.2 5.6-3.4 68.4-41.1 130-36 130-36l60.2.6c17.4 11.6 33.4 29.6 46.8 56.4z"
                    fill="#212121"
                    fillOpacity={0.2}
                    fillRule="nonzero"
                  />
                  <path
                    d="M1055.3 940.7s-77.9 18.1-182.1 90.3c-85.5 59.3-162.3 96.2-220.6 107.2"
                    fill="none"
                    stroke="#eee"
                    strokeWidth={6}
                    strokeDasharray="40,40"
                  />
                  <path
                    d="M987.7 933.5c29.1 1.4 66.1 18.8 86 70 42 108 138 336 458 336l175.6-145.8s-217.6 40.8-311.6-49.2c-94-90-97.5-211-199.5-211H987.7z"
                    fill="#eee"
                    fillRule="nonzero"
                  />
                  <path
                    d="M167.2 3192.5c166-196 220-622 220-622h.6c3.8-25.3 80.2-522.3 263-655.4 23.8-17.3 49.4-28.5 76.8-31.6 187.1-21.5 233.1 27.6 300.2-74.5 20.5-31.1 42.9-76.2 71.8-141.5 124-280 196-192 256-168 25.1 10 48.8-3.7 71.2-32.3 31-39.6 59.3-107.6 84.8-179.7 31.3-88.2 79.5-89.2 82.8-141.5v-1c2-21.2-3.8-48.3-32.8-75.5-62-58-122-70-190-166s-136-165.3-212-125.3l22.9-13.1c1.3-.7 2.5-1.4 3.8-2.1 27.4-14.9 58.4-21.6 89.6-20.2l99.8 4.3c30.6 1.3 59.7 13.7 81.9 34.8 34.8 33.1 84.6 81 94.1 91.7 41.2 46.6 118.8 78.7 181.2 122.2l.2-.2c36.7 24 138.1 75.2 176.6 292 13.2 74.2 42.8 140.9 76.9 179.7 25.4 29 53.4 42.5 79.1 32.3 60-24 132-112 256 168 14.6 33.1 27.6 61 39.5 84.5 11.6 22.9 22.2 41.7 32.3 57.1 22.6 34.4 42.8 51.6 66.9 60.2 47.3 16.8 109.3.1 233.3 14.3 27.4 3.1 53 14.3 76.8 31.6 82.5 60 143.3 194.2 185.6 325.7 42.4 131.9 66.1 261.1 74.3 310.1 2.2 13.2 3.3 20.6 3.3 20.6h-.3c3 22.8 58.6 430.5 219.9 621H167.2v-.2z"
                    fill="#00a5ad"
                    fillRule="nonzero"
                  />
                  <path
                    d="M1700.8 1755.2h-58.6l-10.1 319.7h77.4l-8.7-319.7zm-17.2-331.8h-23.5l-18.7 193.7h53l-10.8-193.7zm33.6 973.7h-89.3l-15.4 487.6h118m1187.2-2189s-94.5-7.9-170 53.8c-79.1 64.7-198 212-482 88 0 0 134 2 222-72s102-76 204-76 226 6.2 226 6.2z"
                    fill="#eee"
                    fillRule="nonzero"
                  />
                  <path
                    d="M1353.7 751.5s76.2 95.4 168 176c82 72 189 98 180.4 266.2M2917 715.5s149.9 67.3 117.9 243.3-253.9 212.7-253.9 212.7M562.2 753.7s86.4 11.8 174.5 97 213.7 82.6 213.7 82.6"
                    fill="none"
                    stroke="#eee"
                    strokeWidth={6}
                    strokeDasharray="40,40"
                  />
                  <path
                    d="M1668.5 1364.4c.1-2.9.3-5.5.6-8.2.2-2.7.5-5.4.8-8.1.6-5.4 1.3-10.7 2.1-16.1.8-5.3 1.8-10.7 2.9-16 1.1-5.3 2.4-10.6 3.8-15.8l9.5 2.2c-.9 5.1-1.8 10.2-2.4 15.4-.7 5.2-1.2 10.4-1.6 15.6-.4 5.2-.7 10.4-.8 15.6-.1 2.6-.1 5.2-.1 7.8 0 2.6 0 5.2.1 7.7l-14.9-.1zm19.9-107c1.5-4.2 2.9-8.3 4.3-12.4.7-2.1 1.4-4.1 2-6.2l.9-3c.1-.5.3-1 .3-1.4l.1-.7.2-1c.3-1.7 1.9-2.9 3.6-2.6 1.5.3 2.6 1.6 2.6 3.1v1.1l-.1 1c0 .6-.1 1.2-.2 1.8-.2 1.2-.3 2.3-.5 3.4l-1.2 6.6c-.8 4.4-1.8 8.7-2.7 13-.6 2.6-3.1 4.3-5.8 3.7-2.6-.6-4.3-3.1-3.7-5.8.1-.2.1-.4.2-.6z"
                    fill="#eee"
                    fillRule="nonzero"
                  />
                  <g transform="translate(-222 -653)">
                    <clipPath id="prefix__a">
                      <path d="M2722.3 1539.1s-107.6-14.6-206.8-124.8c-65.2-72.5-103.9-87.6-119.8-88.5-68.7-4-212.8 0-256.7 0 0 0 62-3.6 114.4 31.3 48.9 32.6 78.6 83.6 112 117 53 53 143.9 65 356.9 65z" />
                    </clipPath>
                    <g clipPath="url(#prefix__a)">
                      <path
                        d="M2722.3 1539.1s-107.6-14.6-206.8-124.8c-65.2-72.5-103.9-87.6-119.8-88.5-68.7-4-212.8 0-256.7 0 0 0 62-3.6 114.4 31.3 48.9 32.6 78.6 83.6 112 117 53 53 143.9 65 356.9 65z"
                        fill="#00a5ad"
                        fillRule="nonzero"
                      />
                    </g>
                    <clipPath id="prefix__b">
                      <path d="M2722.3 1539.1s-107.6-14.6-206.8-124.8c-65.2-72.5-103.9-87.6-119.8-88.5-68.7-4-212.8 0-256.7 0 0 0 62-3.6 114.4 31.3 48.9 32.6 78.6 83.6 112 117 53 53 143.9 65 356.9 65z" />
                    </clipPath>
                    <g clipPath="url(#prefix__b)">
                      <path
                        d="M2305.5 1321.2s60.1 3.8 96.5 80.1 77.5 125.8 158.1 135.5"
                        fill="none"
                        stroke="#eee"
                        strokeWidth={6}
                        strokeDasharray="40,40"
                      />
                    </g>
                  </g>
                  <path
                    d="M960.9 1868.3h491.4l-392.2-117.2c-11.6 22.9-22.2 41.7-32.3 57.1-22.6 34.3-42.9 51.6-66.9 60.1zm-570 681.7h1111.7L465.2 2239.9C422.8 2371.8 399 2501 390.9 2550zM1678.9 2023.9c115.1 0 115.4-80.5 112.9-180.9-1.7-68.1 6.2-130.9-7.2-152.8-13.4-21.8-33.4-49.3-111-49.3h.7c-77.6 0-97.6 27.5-111 49.3-13.4 21.8-5.5 84.6-7.2 152.8-2.5 100.4-2.2 180.9 112.9 180.9"
                    fill="#212121"
                    fillOpacity={0.2}
                    fillRule="nonzero"
                  />
                  <path fill="#9556b7" d="M1648.5 1296.6h126v72h-126z" />
                  <path
                    d="M1487.4 1752h372.4"
                    fill="none"
                    stroke="#202020"
                    strokeWidth={19.68}
                  />
                  <path
                    d="M1783.7 1696.4v73.1h25l9-7.2-2.4-7 14.2-8.7 2.4 5.5 31.6-22.8v-7c0-2-.1-4.1-.4-6.1-.6-4.6-2-9.1-4.2-13.1-2.9-5.3-7.5-10.5-14.3-11.4-14.9-2-23.1 3.7-23.1 3.7l-37.8 1z"
                    fill="#b75c29"
                    fillRule="nonzero"
                  />
                  <path
                    d="M1783.7 1754.4v15.2h25l9-7.2-2.4-7 14.2-8.7 2.4 5.5 31.6-22.8v-7c0-2-.1-4.1-.4-6.1l-57.2 38.1h-22.2z"
                    fill="#b75c29"
                    fillOpacity={0.5}
                    fillRule="nonzero"
                  />
                  <path
                    d="M1778.5 1538.4l-11.7 146.6s6.1 18.2 41.6 20.4c38.5 2.5 49.2-25.2 49.2-25.2l10.5-150.1 2.8-37.9s4.6-46.2-51.5-46.2c-2 0-4.1.1-6.2.3-26.2 2.6-64.4 20.8-141.4 57.2l-6.1 77.2c0 .1 68.9 12.2 112.8-42.3z"
                    fill="#0d3880"
                    fillRule="nonzero"
                  />
                  <path
                    d="M1812.5 1449.5c0 3 1.7 5.9 4.6 7.3l8.7 4.1c10.5 4.9 17.9 14.4 20.3 25.4.5 2.5.8 5.1.8 7.7v19.5c0 9.2 7.4 16.6 16.6 16.6h4.6l2.5-34 .3-3.9s4.6-46.2-51.5-46.2c-2 0-4.1.1-6.2.3-.5 1.1-.7 2.1-.7 3.2z"
                    fill="#d6d6d6"
                    fillRule="nonzero"
                  />
                  <g transform="translate(-222 -653)">
                    <path
                      d="M2059.8 1991.7l-6.5 42.6c-32.3-64.5-38.7-100.5-70.5-104.7-24.4-3.2-37.9 20.4-37.9 20.4l-37 163h31.3c26.2 0 37.3-21.2 37.3-21.2l4.3-70.7s30 94.9 85.5 80.7c55.5-14.1 35.8-88.9 34-109.1-1.3-14.3-5-22.3-4.6-24.7l-35.9 23.7z"
                      fill="#0d3880"
                      fillRule="nonzero"
                    />
                    <path
                      d="M2020.9 2088.7c5.9 5.3 12.4 9.6 19.6 12.2 7 2.5 14.5 3.4 22.6 1.9 1.1-.2 2.1-.4 3.2-.7 14-3.6 23.2-11 29.1-20.4l-4.9-5.1c-2.1-2.2-5.6-2.2-7.8-.1-4.8 4.6-13.9 11.7-24.7 12.4-10.6.7-18.6-3.9-22.9-7.2-2.2-1.6-5.2-1.5-7.2.3l-7 6.7z"
                      fill="#898989"
                      fillRule="nonzero"
                    />
                    <path
                      d="M2101.2 1951.7c-4.3-5.8-10.4-2.4-10.4-2.4-4.5-5.6-11.6-2-11.6-2-5-5.1-11.6.1-11.6.1-.2-.8-5.4-1.2-6.9-1.4l.6-.8c7.1-8 14.1-1.8 14.1-1.8 7.8-5.9 12.2 1.6 12.2 1.6 8.7-4.5 12.2 2.9 12.2 2.9l1.4 3.8z"
                      fill="#f49e92"
                      fillRule="nonzero"
                    />
                    <path
                      d="M1789.2 2349.4v73.1h-25l-9-7.2 2.4-7-14.2-8.7-2.4 5.5-31.6-22.8v-7c0-2 .1-4.1.4-6.1.6-4.6 2-9.1 4.2-13.1 2.9-5.3 7.5-10.5 14.3-11.4 14.9-2 23.1 3.7 23.1 3.7l37.8 1z"
                      fill="#b75c29"
                      fillRule="nonzero"
                    />
                    <path
                      d="M1789.2 2407.4v15.2h-25l-9-7.2 2.4-7-14.2-8.7-2.4 5.5-31.6-22.8v-7c0-2 .1-4.1.4-6.1l57.2 38.1h22.2z"
                      fill="#b75c29"
                      fillOpacity={0.5}
                      fillRule="nonzero"
                    />
                    <path
                      d="M1775.7 1895.9l39.6 90.1"
                      fill="none"
                      stroke="#ffc830"
                      strokeWidth={5.15}
                    />
                    <path
                      d="M1791.2 1882.4c0 12.6-10 22.8-22.3 22.8s-22.3-10.2-22.3-22.8c0-12.6 10-22.8 22.3-22.8 12.4-.1 22.3 10.2 22.3 22.8z"
                      fill="#eee"
                      fillRule="nonzero"
                    />
                    <path
                      d="M1768.9 1905.2c-12.3 0-22.3-10.2-22.3-22.8 0-12.6 10-22.8 22.3-22.8 12.4-.1 12.4 45.6 0 45.6z"
                      fill="#f49e92"
                      fillRule="nonzero"
                    />
                    <path
                      d="M2010.5 1895.9l-39.6 90.1"
                      fill="none"
                      stroke="#747575"
                      strokeWidth={5.15}
                    />
                    <path
                      d="M1994.9 1882.4c0 12.6 10 22.8 22.3 22.8s22.3-10.2 22.3-22.8c0-12.6-10-22.8-22.3-22.8-12.3-.1-22.3 10.2-22.3 22.8z"
                      fill="#eee"
                      fillRule="nonzero"
                    />
                    <path
                      d="M2017.3 1905.2c12.3 0 22.3-10.2 22.3-22.8 0-12.6-10-22.8-22.3-22.8-12.4-.1-12.4 45.6 0 45.6z"
                      fill="#f49e92"
                      fillRule="nonzero"
                    />
                    <circle
                      cx={2017.2}
                      cy={1882.4}
                      r={23.6}
                      fill="none"
                      stroke="#898989"
                      strokeWidth={5.56}
                      strokeLinecap="butt"
                      strokeLinejoin="miter"
                    />
                    <path
                      d="M1758.6 1952.1l14-1.1 100.6 92.4"
                      fill="none"
                      stroke="#ffc830"
                      strokeWidth={21.2}
                    />
                    <path
                      d="M1753 1951.5c0-4.9 3.3-9 7.8-10.3l-57.7 8.2c-.8.1-1.6.3-2.3.6l-12.6 1.8c-5.8.8-9.8 6.2-9 12 .8 5.3 5.3 9.1 10.5 9.1.5 0 1 0 1.5-.1l63.6-9.1c.8-.1 1.6-.3 2.3-.6l6.6-.9c-5.9 0-10.7-4.8-10.7-10.7z"
                      fill="#202020"
                      fillRule="nonzero"
                    />
                    <path
                      d="M2037.5 1952.1l-14-1.1-100.7 92.4"
                      fill="none"
                      stroke="#0079bf"
                      strokeWidth={21.2}
                    />
                    <path
                      d="M2106.4 1962.4l-63.6-9.1"
                      fill="none"
                      stroke="#202020"
                      strokeWidth={21.2}
                    />
                    <path
                      d="M2066.6 1947.2c6.7-6.1 13.1-.6 13.1-.6 6.6-3.4 11.8 1.9 11.8 1.9 15.7-5 11.6 20.8 11.6 20.8-2.1 15-2.6 24.8-2.6 24.8s-3.5-7.4-16.6-8.9c-14-1.7-24.6 7.5-24.6 7.5-.3-12.6.9-18.1-3.7-20.2 0 0-2.2-2.2-.6-6 1.5-3.7 3.9-5.4 3.9-5.4s5.7-1.3 7.6-7.3c1.7-5.1.1-6.6.1-6.6z"
                      fill="#e60278"
                      fillRule="nonzero"
                    />
                    <path
                      d="M2058.9 1961.1s-6.5 6.6-3.7 11.2c0 0-4.2-1.4-7.1-3.5-2.8-2.1-2.4-3.3-1.6-4.7.7-1.4 3.4-4.7 12.4-3z"
                      fill="#f49e92"
                      fillRule="nonzero"
                    />
                    <path
                      d="M1795.3 2191.4L1807 2338s-6.1 18.2-41.6 20.4c-38.5 2.5-49.2-25.2-49.2-25.2l-10.5-150.1-2.8-37.9s-4.6-46.2 51.5-46.2c2 0 4.1.1 6.2.3 26.2 2.6 64.4 20.8 141.4 57.2l6.1 77.2c0 .1-68.9 12.2-112.8-42.3z"
                      fill="#0d3880"
                      fillRule="nonzero"
                    />
                    <path
                      d="M1891.1 2111.5h-31.3c-8.3 0-15.1-2.1-20.5-5-11.7-6.3-16.9-16.2-16.9-16.2l-.3-5.2-.3-4.9-.6-10.2v-.6l-1.2-20.4-.4-6.6-1-17.1-.3-5.5s-1.2 3.8-3.6 9.9v.1c-1.4 3.6-3.2 7.9-5.5 12.6-.5 1-.9 2-1.4 3l-.3.5-9.9 17.5-1.2 2c-3.1 4.7-6.5 9.3-10.2 13.6-1.3 1.5-2.6 2.9-4 4.3-1.3 1.3-2.6 2.6-4 3.8-5.9 5.3-12.4 9.6-19.6 12.2-7 2.5-14.5 3.4-22.6 1.9-1.1-.2-2.1-.4-3.2-.7-14-3.6-23.2-11-29.1-20.4-17.3-27.4-6.6-71.9-5-87.8v-.2c0-.2 0-.5.1-.7.8-9.2 2.7-15.8 3.8-20 .6-2.3 1-3.8.9-4.7l5.8 3.8 30.3 19.7.1.7 6.4 41.9c5.3-10.5 9.9-20.3 14-29.3 8.3-18.1 14.7-33.1 21-44.9 4.4-8.2 8.8-14.8 13.8-19.7 6-6 12.9-9.6 21.7-10.8 7.9-1 14.7.8 20.2 3.6.7.3 1.3.7 1.9 1.1 4.7 2.8 8.4 6.3 11 9.3 3.1 3.6 4.8 6.4 4.8 6.4l6.8 30.1 14.8 65.1 3.9 17.3.5 2.3 1.8 7.8 1.4 6.3 2.6 11.4 1.8 8.1.4 2 2.6 12.6z"
                      fill="#0d3880"
                      fillRule="nonzero"
                    />
                    <path
                      d="M1778.1 2087c-5.9 5.3-12.4 9.6-19.6 12.2-7 2.5-14.5 3.4-22.6 1.9-1.1-.2-2.1-.4-3.2-.7-14-3.6-23.2-11-29.1-20.4l4.9-5.1c2.1-2.2 5.6-2.2 7.8-.1 4.8 4.6 13.9 11.7 24.7 12.4 10.6.7 18.6-3.9 22.9-7.2 2.2-1.6 5.2-1.5 7.2.3l7 6.7z"
                      fill="#898989"
                      fillRule="nonzero"
                    />
                    <g fillRule="nonzero">
                      <path
                        d="M1740.1 1959.4s6.5 6.6 3.7 11.2c0 0 4.3-1.4 7.1-3.5s2.4-3.3 1.6-4.7c-.8-1.4-3.4-4.7-12.4-3zm-42.3-9.3c4.3-5.8 10.4-2.4 10.4-2.4 4.5-5.6 11.6-2 11.6-2 5-5.1 11.6.1 11.6.1.2-.8 5.4-1.2 6.9-1.4l-.6-.8c-7.1-8-14.1-1.8-14.1-1.8-7.8-5.9-12.2 1.6-12.2 1.6-8.7-4.5-12.2 2.9-12.2 2.9l-1.4 3.8z"
                        fill="#f49e92"
                      />
                      <path
                        d="M1732.4 1945.5c-6.7-6.1-13.1-.6-13.1-.6-6.6-3.4-11.8 1.9-11.8 1.9-15.7-5-11.6 20.8-11.6 20.8 2.1 15 2.6 24.8 2.6 24.8s3.5-7.4 16.6-8.9c14-1.7 24.6 7.6 24.6 7.6.3-12.6-.8-18.1 3.7-20.2 0 0 2.2-2.2.6-6-1.5-3.7-3.9-5.4-3.9-5.4s-5.7-1.3-7.6-7.3c-1.7-5.2-.1-6.7-.1-6.7z"
                        fill="#e60278"
                      />
                    </g>
                    <path
                      d="M1958.2 2117.1l-4.6 36.4-61.4 8.3h-27.5l-25.9-32 2.8-9 81.2-.9 35.4-2.8z"
                      fill="#0d3880"
                      fillRule="nonzero"
                    />
                    <path
                      d="M1935.4 1938.6s-5.5 3.9-7.9-1.1c-2.4-5.1-9.5-37.6-9.5-37.6l-13.3-2.1v-.1h-.6v.1l-6.4 1-6.4-1v-.1h-.6v.1l-13.3 2.1s-7.1 32.6-9.5 37.6c-2.4 5.1-7.9 1.1-7.9 1.1-2.9 31.6 26.2 36.5 30.7 37v.1h.6v-.1c1-.1 3.4-.5 6.4-1.3 3 .9 5.3 1.2 6.4 1.3v.1h.6v-.1c4.5-.5 33.6-5.3 30.7-37z"
                      fill="#f49e92"
                      fillRule="nonzero"
                    />
                    <path
                      d="M1849.8 1934.5s47.7 25.5 83.3 0l13.6 25.2s-56 34.1-59.8 28.8c-3.8-5.3-37.9-12.1-38.6-14.4-.8-2.3 1.5-39.6 1.5-39.6z"
                      fill="#0d3880"
                      fillRule="nonzero"
                    />
                    <path
                      d="M1868.2 1876.1c0 6.5-3.6 11.7-7.9 11.7-4.4 0-7.9-5.3-7.9-11.7 0-6.5 3.6-11.7 7.9-11.7 4.3-.1 7.9 5.2 7.9 11.7z"
                      fill="#ed7d77"
                      fillRule="nonzero"
                    />
                    <path
                      d="M1937.1 1870.8c0 21.5-17.5 39-39 39s-39-17.5-39-39 17.5-39 39-39 39 17.4 39 39z"
                      fill="#f49e92"
                      fillRule="nonzero"
                    />
                    <path
                      d="M1995.4 2110.3c-1.5 13.1-8.5 22.6-25.6 22.2-4.9-.1-9.4-.3-13.4-.6-3.1-.2-5.9-.5-8.5-.9-19.3-2.4-28.7-6.8-49.6-6.8-15.7 0-32 5.8-47.9 8-3 .4-5.9.7-8.9.8-8.7.3-17.3-1.2-25.5-5.9-10.8-6.2-15.7-12.2-17.7-17.5-1.5-3.9-1.4-7.5-.9-10.7.4-2.7 1-5.1 1.2-7.1.1-1.7.8-4.2 2-7.4.6-1.7 1.3-3.6 2-5.7.9-2.3 1.8-4.8 2.8-7.5.6-1.5 1.1-3.1 1.7-4.7 1.3-3.6 2.7-7.6 4-11.8.7-2.3 1.5-4.8 2.2-7.3l1.2-4.5c1-3.7 1.9-7.6 2.8-11.6.4-1.9.8-4 1.3-6.3 1.6-7.8 3.5-17.2 5.4-27 2-10.2 4.1-20.8 5.9-30.6 3.2-16.8 5.8-31 6.6-35.8.2-.9.2-1.5.2-1.7l4.4 1.5 8.7 3c.1 1.4 2.2 8 10.5 13.9 1.1.8 2.4 1.6 3.8 2.3 7.2 4 17.9 7.2 33.7 7.5 13.5-.2 23.2-2.6 30.3-5.8 2.8-1.3 5.2-2.6 7.2-4.1.6-.4 1.1-.8 1.6-1.2.8-.6 1.5-1.2 2.1-1.8 5.3-4.9 6.7-9.7 6.8-10.9l5.3-1.8 4.7-1.6 3.1-1.1c0 .8.3 8.3 1.8 20.9.3 2.6.7 5.4 1.1 8.4 1.6 11.2 4 25.3 7.6 41.5 2.5 11 5.5 22.9 9.3 35.6l2.1 6.9c.5 1.5.9 3 1.4 4.5.8 2.5 1.6 5.1 2.5 7.6.6 1.9 1.3 3.9 2 5.8.6 1.8 1.2 3.6 1.8 5.5l1.5 4.8c.8 2.7 1.5 5.4 2.2 8.1.3 1.4.7 2.8 1 4.3 1.2 5.5 2.1 11 2.4 16.3.2 3.7.1 7.1-.2 10.3z"
                      fill="#ef642f"
                      fillRule="nonzero"
                    />
                    <path
                      d="M1928.1 1950.7v47.8h22.9v-67l-8.7 3c-.1 1.4-2.2 8-10.5 13.9-1.1.8-2.4 1.5-3.7 2.3z"
                      fill="#898989"
                      fillRule="nonzero"
                    />
                    <path
                      d="M2078.5 1909.7c-35.4-10.5-39.1-28.7-67-25.1-40.8 5.3-27.9-35.2-69.1-22.8-37 11.1-82.1 2.5-82.1 2.5s-6.2 23.7 13.5 29.8c19.7 6.1 23.2 12.6 27.8 24.7 4.5 12.1 18.7 24.7 33.3 27.8 14.6 3 13.1 25.7 13.6 37.9.5 12.1 3 55.5 47.9 54 0 0 17.2.8 22.1-13.2 4.9-14 5.3-17 12.9-20.4 7.6-3.4 15.1-5.3 15.5-20.8.4-15.5 8.7-13.2 18.2-17.8 9.5-4.5 10.2-9.5 9.1-19.7-1.1-10.2 11-6.4 16.3-14.8 4.7-7.7 1-19-12-22.1z"
                      fill="#ffc830"
                      fillRule="nonzero"
                    />
                    <path
                      d="M1952.7 2565.3c0 29.3-23.7 53-53 53s-53-23.7-53-53v-53.5c0-29.3 23.7-53 53-53s53 23.7 53 53v53.5z"
                      fill="#202020"
                      fillRule="nonzero"
                    />
                    <path
                      d="M2005.7 2311v169.6c0 30.2-22.5 55.6-53 63-5.8 1.4-11.8 2.1-18.1 2.1h-74.4c-4.6 0-9.2-.4-13.5-1.2-32.8-5.8-57.5-32.2-57.5-63.9V2311c0-13.8 4.7-26.6 12.6-37.1 5.1-6.8 11.6-12.6 19.1-17.2 11.2-6.9 24.8-10.9 39.3-10.9h74.4c15.8 0 30.5 4.7 42.3 12.8 6.7 4.6 12.5 10.2 17.1 16.5 7.4 10.4 11.7 22.7 11.7 35.9z"
                      fill="#ffc600"
                      fillRule="nonzero"
                    />
                    <path
                      d="M1977 2303.9c0 12.5-10.2 22.7-22.7 22.7h-110.5c-12.5 0-22.7-10.2-22.7-22.7v-62.1h156v62.1h-.1z"
                      fill="#202020"
                      fillRule="nonzero"
                    />
                    <path
                      d="M1977 2276.1c0 12.5-10.2 22.7-22.7 22.7h-110.5c-12.5 0-22.7-10.2-22.7-22.7V2214h156v62.1h-.1z"
                      fill="#9556b7"
                      fillRule="nonzero"
                    />
                    <path
                      d="M1821 2214.1s24.7 18.2 49.5 18.2c24.7 0 23.2-7.6 34.8-7.6v-27.3s-93.9 12.6-93.9 0 9.6 16.7 9.6 16.7z"
                      fill="#0d3880"
                      fillRule="nonzero"
                    />
                    <path
                      d="M1976.5 2214.1s-24.7 18.2-49.5 18.2-23.2-7.6-34.8-7.6v-27.3s93.9 12.6 93.9 0c-.1-12.6-9.6 16.7-9.6 16.7z"
                      fill="#0d3880"
                      fillRule="nonzero"
                    />
                    <path
                      d="M1920.4 2502.8c0 11.4-9.3 20.7-20.7 20.7-11.4 0-20.7-9.3-20.7-20.7v-59.5c0-11.4 9.3-20.7 20.7-20.7 11.4 0 20.7 9.3 20.7 20.7v59.5z"
                      fill="#202020"
                      fillRule="nonzero"
                    />
                    <path
                      d="M1920.4 2517.9c0 11.4-9.3 20.7-20.7 20.7-11.4 0-20.7-9.3-20.7-20.7v-59.6c0-11.4 9.3-20.7 20.7-20.7 11.4 0 20.7 9.3 20.7 20.7v59.6z"
                      fill="#e60278"
                      fillRule="nonzero"
                    />
                    <path
                      d="M1761.3 2102.5c0 3-1.7 5.9-4.6 7.3l-8.7 4.1c-10.5 4.9-17.9 14.4-20.3 25.4-.5 2.5-.8 5.1-.8 7.7v19.5c0 9.2-7.4 16.6-16.6 16.6h-4.6l-2.5-34-.3-3.9s-4.6-46.2 51.5-46.2c2 0 4.1.1 6.2.3.5 1.1.7 2.1.7 3.2z"
                      fill="#d6d6d6"
                      fillRule="nonzero"
                    />
                    <g>
                      <path
                        d="M1995.5 2100.1c-7.2 2.8-17 5-30.6 5.9-25.9 1.8-36.7-2.3-46.2-5.8-5.9-2.2-10.6-4-19.5-4h-2.6c-3.5 0-6.3.3-8.9.7-3.9.7-7 1.9-10.6 3.2l-.9.3c-7.7 2.9-16.6 5.9-33.6 5.9h-3.3c-2.6 0-5.4-.2-8.4-.4-9.7-.7-17.5-2-23.8-3.7-3.8-1-7.1-2.2-9.9-3.5.4-2.7 1-5.1 1.2-7.1.1-1.7.8-4.2 2-7.4.6-1.7 1.3-3.6 2-5.7 1.8 1.4 6 3.8 15.4 5.6 1.3.3 2.7.5 4.2.7 3 .4 6.3.8 10.2 1.1 21.6 1.5 29.5-1.5 37.9-4.6 3.8-1.4 8-3 13.2-4 1.4-.3 2.8-.5 4.3-.7 2.7-.3 5.6-.5 8.9-.5h2.6c12.5 0 19.9 2.8 26.5 5.2 8.4 3.1 16.3 6.1 37.9 4.6 17.3-1.2 25.2-4.4 28.6-6.5.3 1.4.7 2.8 1 4.3 1.3 5.7 2.1 11.2 2.4 16.4z"
                        fill="#898989"
                        fillRule="nonzero"
                      />
                    </g>
                    <g>
                      <path
                        d="M1988.4 2066.6c-6.2 1.7-14 3-23.5 3.6-25.9 1.7-36.7-2.3-46.2-5.9-5.9-2.2-10.6-4-19.5-4h-3.7c-6.7.1-10.9 1.3-15.4 2.9-1 .3-2 .7-3 1.1-8 3-16.8 6.3-34.5 6.3-3.5 0-7.4-.1-11.7-.4-1.5-.1-3-.2-4.5-.4-1.8-.2-3.6-.4-5.3-.6-5.4-.7-10.1-1.6-14.2-2.8 1.3-3.6 2.7-7.6 4-11.8.7-2.3 1.5-4.8 2.2-7.3 1.9.5 4.2 1 6.7 1.4 3.5.6 7.5 1.1 12.3 1.4 2 .1 3.9.2 5.6.3 17.4.6 24.6-2.1 32.2-4.9 1.8-.7 3.6-1.3 5.6-2 5.4-1.8 11.8-3.3 20.9-3.3h2.6c2.1 0 4 .1 5.9.2 9.1.7 15.2 3 20.6 5 8.4 3.1 16.3 6.1 37.9 4.6 8.1-.5 14.1-1.5 18.6-2.7.8 2.5 1.6 5.1 2.5 7.6.6 1.9 1.3 3.9 2 5.8.7 2.2 1.3 4.1 1.9 5.9z"
                        fill="#898989"
                        fillRule="nonzero"
                      />
                    </g>
                    <circle
                      cx={1769.4}
                      cy={1882.4}
                      r={23.6}
                      fill="none"
                      stroke="#898989"
                      strokeWidth={5.56}
                      strokeLinecap="butt"
                      strokeLinejoin="miter"
                    />
                  </g>
                  <path
                    d="M1642 1297.7v47.8h-22.9v-67l8.7 3c.1 1.4 2.2 8 10.5 13.9 1.1.8 2.3 1.5 3.7 2.3z"
                    fill="#898989"
                    fillRule="nonzero"
                  />
                  <path
                    d="M1665.7 1423.8l-11.4 23.8c-7.7 2.9-16.6 5.9-33.6 5.9h-3.3c-2.6 0-5.4-.2-8.4-.4-9.7-.7-17.5-2-23.8-3.7l10.7-18c1.3.3 2.7.5 4.2.7 3 .4 6.3.8 10.2 1.1 21.6 1.5 29.5-1.5 37.9-4.6 3.8-1.4 8-3 13.2-4 1.3-.4 2.8-.7 4.3-.8zm17.4-36.2l-9.5 19.8c-6.7.1-10.9 1.3-15.4 2.9-1 .3-2 .7-3 1.1-8 3-16.8 6.3-34.5 6.3-3.5 0-7.4-.1-11.7-.4-1.5-.1-3-.2-4.5-.4l11.5-19.3c17.4.6 24.6-2.1 32.2-4.9 1.8-.7 3.6-1.3 5.6-2 5.4-1.8 11.8-3.3 20.9-3.3h2.6c2 0 3.9.1 5.8.2z"
                    fill="#eee"
                    fillRule="nonzero"
                  />
                  <path
                    d="M1716.2 1223.1s-4.2 10.8-18.9 16.8c-2.2.9-4.6 1.7-7.3 2.3-1.5.4-3.1.7-4.7.9-2.6.4-5.5.6-8.6.7h-1.4c-3.5-.1-6.7-.4-9.6-.9-1.5-.2-2.9-.5-4.3-.9-2.7-.7-5.1-1.5-7.3-2.4-14.2-6-18.2-16.5-18.2-16.5s-5.9-24.1 6.1-41.4c3.5-5 7.7-8.5 12.1-10.9 2.5-1.4 4.9-2.5 7.3-3.3 1.5-.5 3-.9 4.3-1.3 5.9-1.5 10.3-1.4 10.3-1.4v1.3-1.3s3.9-.1 9.3 1.2c1.5.3 3.1.8 4.7 1.3 2.3.8 4.8 1.8 7.3 3.2 4.6 2.5 9.1 6.1 12.7 11.3 12.1 17.1 6.2 41.3 6.2 41.3z"
                    fill="#0d3880"
                    fillRule="nonzero"
                  />
                  <path
                    d="M1685.3 1165.9v77.1c-2.6.4-5.5.6-8.6.7h-1.4c-3.5-.1-6.7-.4-9.6-.9v-76.7c5.9-1.5 10.3-1.4 10.3-1.4v1.3-1.3c.1.1 3.9 0 9.3 1.2zm-23.8 1.5v74.5c-2.7-.7-5.1-1.5-7.3-2.4v-68.8c2.4-1.4 4.9-2.4 7.3-3.3zm35.8 3v69.4c-2.2.9-4.6 1.7-7.3 2.3v-74.9c2.4.8 4.9 1.8 7.3 3.2z"
                    fill="#9556b7"
                    fillRule="nonzero"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRLandingPage;
