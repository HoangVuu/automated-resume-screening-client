import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

function Footer() {
  return (
    <footer id="footer">
      <div className="container">
        <div className="footer-left">
          <h3 className="footer-logo">
            <img src="/assets/img/main-logo.jpg" />
          </h3>
          <p className="footer-links">
            <Link to="/" className="mr-5">
              Trang chủ
            </Link>
            <span className="mr-5">-</span>
            <Link to="#" className="mr-5">
              Giới thiệu
            </Link>
            <span className="mr-5">-</span>
            <Link to="#" className="mr-5">
              Liên hệ
            </Link>
            <span className="mr-5">-</span>
            <Link to="#" className="mr-5">
              Hỏi đáp
            </Link>
          </p>
        </div>
        <div className="footer-center">
          <div>
            <i className="fas fa-map-marker-alt" />
            <p>Đại học Công nghệ thông tin, ĐHQG TP HCM <br/> Khu phố 6, Linh Trung, Thủ Đức Thành phồ Hồ Chí Minh</p>
          </div>
          <div>
            <i className="fa fa-phone" />
            <p>0399699977</p>
          </div>
          <div>
            <i className="fa fa-envelope" />
           <a href="mailto:17521270@gm.uit.edu.vn">17521270@gm.uit.edu.vn</a>  <span>-</span> <a href="mailto:17520700@gm.uit.edu.vn">17520700@gm.uit.edu.vn</a>
          </div>
        
        </div>
        <div className="footer-right">
          <p className="footer-company-about">
            <span>Về FASTJOB</span>
            Đây là sản phẩm khoá luận tốt nghiệp của nhóm sinh viên Khoa CNPM: <br/> 
            <strong>Lê Nguyễn Hoàng Vũ - Trần Hữu Lộc</strong>
          </p>
          <div className="footer-icons">
            <a href="https://www.facebook.com/vule2703/" target="_blank">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" target="_blank" style={{marginLeft:'5px'}}>
              <i className="fab fa-twitter" />
            </a>
            <a href="#" target="_blank" style={{marginLeft:'5px'}}>
              <i className="fab fa-linkedin-in" />
            </a>
            <a href="https://github.com/HoangVuu" target="_blank" style={{marginLeft:'5px'}}>
              <i className="fab fa-github" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
