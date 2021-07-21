import "./CandidateProfile";
import { AreaChartOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "utils/index";
import { DeleteOutlined } from "@ant-design/icons";
import ContentEditable from "react-contenteditable";
import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editNameDoc } from "services/uploadServices";

const DocumentItem = ({ name, url, docId }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.candidate.token);

  const { t, i18n } = useTranslation();
  const [edit, setEdit] = useState(false);
  const [nameHTML, setNameHTML] = useState(name);

  const handleChange = (evt) => {
    setNameHTML(evt.target.value);
  };

  const toggleClick = () => {
    setEdit(!edit);
  };

  const fetchJobs = async () => {
    console.log('id', docId && docId)
    await editNameDoc (docId, nameHTML, token)
  }

  const editName = () => {
    toggleClick();
    fetchJobs()
  };

  const openNewLink = (url) => {
   !edit && window.open(url, "_blank");
  };

  return (
    <div className="document">
      <div className="document__top">
        <div
          onClick={() => openNewLink(url)}
          className="my-profile__resume__info__name document__top__left"
          style={{ width: "80%", cursor: !edit && 'pointer' }}
        >
          <ContentEditable html={nameHTML} disabled={!edit} onChange={handleChange}/>
          {/* <DownloadOutlined className="cv-item__info__bottom__btn__icon" /> */}
        </div>
        <div className="document__top__right">
          {!edit ? (
            <i
              className="fas fa-edit mr-5"
              style={{ fontSize: 16, color: "#2557a7", cursor: "pointer" }}
              onClick={toggleClick}
            ></i>
          ) : (
            <button
              type="button"
              className="document__top__right__button"
              onClick={editName}
              style={{ marginTop: "0" }}
            >
              {t("profile.save")}
            </button>
          )}

          <DeleteOutlined
            className="cv-item__info__bottom__btn__icon"
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentItem;
