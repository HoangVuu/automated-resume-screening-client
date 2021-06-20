import React from "react";
import { Link } from "react-router-dom";
import "./Home.scss";

const INSIDERS = [
  {
    label:
      "Kế hoạch triển khai & Concept Year End Party 2020 đáng nhớ cho doanh nghiệp",
    timestamp: "13-01-2021"
  },
  {
    label:
      "Chiến lược tuyển dụng IT hiệu quả trong kỷ nguyên số: Công thức thu hút nhân tài công nghệ dành riêng cho doanh nghiệp Việt",
    timestamp: "11-01-2021"
  },
  {
    label:
      "Khởi đầu vững chắc, bứt phá thành công với ưu đãi tốt từ TopCV ngay trong tháng đầu năm 2021",
    timestamp: "07-01-2021"
  },
  {
    label:
      "Nền tảng công nghệ tuyển dụng công bố bảng giá dịch vụ mới cho năm 2021",
    timestamp: "06-01-2021"
  },
  {
    label: "Chính sách lao động – tiền lương, BHXH, BHYT có hiệu lực từ 2021",
    timestamp: "05-01-2021"
  },
  {
    label:
      "Thực trạng về trải nghiệm nhân viên tại Việt Nam năm 2020 và xu hướng trong năm 2021",
    timestamp: "02-01-2021"
  }
];

function HRInsider() {
  return (
    <div className="panel panel-default panel-dashboard panel-stats">
      <div className="panel-body">
        <div style={{fontSize: '22px', color: "#333333"}} >HR Insider</div>
        <div className="row">
          <div className="border"></div>
        </div>
        {INSIDERS.map((ins, index) => (
          <HRItem key={index} index={index} {...ins} />
        ))}
        <div className="row hr-item" style={{ marginTop: 20 }}>
          <div className="col-md-12 text-center">
            <Link to="#">Xem tất cả</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HRInsider;

const HRItem = ({ index, label, timestamp }) => (
  <div className="row hr-item" style={{ marginTop: 20 }}>
    <div className="col-md-3" style={{ padding: 0 }}>
      <Link to="#">
        <img
          src={`/assets/img/hr-item-${index + 1}.jpg`}
          alt="hr insider img"
          className="img-responsive"
        />
      </Link>
    </div>
    <div className="col-md-9">
      <Link to="#" className="text-insider" style={{ fontWeight: "bold" }}>
        {label}
      </Link>
      <small>{timestamp}</small>
    </div>
  </div>
);
