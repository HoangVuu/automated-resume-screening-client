import React, { useState } from "react";
// import { Link } from "react-router-dom";
import "./ProfileCVItem.scss";
import {
  EyeOutlined,
  DownloadOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import ProfileModal from "components/Modals/Profile/Profile";
import { formatDateTime } from "utils/index";

function ProfileCVItem({ image, name, date, url, id, download_url }) {
  const [show, toggleShow] = useState(false);

  return (
    <>
      <div className="cv-item row">
        <div className="col-sm-3">
          <img className=" cv-item__img" src={image} alt="Ảnh CV" />
        </div>
        <div className="col-sm-9 cv-item__info">
          <div className="cv-item__info__top">
            <p className="cv-item__info__top__name">{name}</p>
            <div className="cv-item__info__top__group">
              <img
                className="cv-item__info__top__group mr-5"
                src="assets/img/icon-time.png"
                alt="clock"
              />
              <p className="cv-item__info__top__group__date">
                {formatDateTime(date)}
              </p>
            </div>
          </div>
          <div className="cv-item-url">{url}</div>
          <div className="row cv-item__info__bottom ">
            <button
              type="button"
              className="cv-item__info__bottom__btn btn btn-outline-secondary"
              onClick={() => toggleShow(true)}
            >
              <EyeOutlined className="cv-item__info__bottom__btn__icon" />
              Xem
            </button>

            <a
              href={download_url}
              className="cv-item__info__bottom__btn btn btn-sm btn-outline-secondary "
            >
              <DownloadOutlined className="cv-item__info__bottom__btn__icon" />
              Tải xuống
            </a>

            <button
              type="button"
              className="cv-item__info__bottom__btn btn btn-sm  btn-outline-secondary"
            >
              <DeleteOutlined className="cv-item__info__bottom__btn__icon" />
              Xóa
            </button>
          </div>
        </div>
      </div>
      <ProfileModal show={show} toggleModal={() => toggleShow(false)} id={id} />
    </>
  );
}

export default ProfileCVItem;
