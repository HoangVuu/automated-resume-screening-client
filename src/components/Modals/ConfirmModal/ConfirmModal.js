import React from "react";
import { Modal } from "antd";
import "./ConfirmModal.scss";
import { useTranslation } from "react-i18next";

function ConfirmModal({ visible, onCancel }) {
  const { t, i18n } = useTranslation();
  
  return (
    <Modal
      title={t("review.title")}
      centered
      onCancel={onCancel}
      visible={visible}
      footer={null}
    >
      <div className="review-cv--layout review-cv--vertical">
        <button
          className="rv-button rv-button--primary rv-button--lg rv-button--block"
          onClick={onCancel}
        >
          {i18n.language === "en" ? "Review" : "Bắt đầu"}
        </button>
        <div className="message-Xfb-4">
          {/* <h2>We prefilled your editable online resume</h2> */}
          <div className="review-cv__icon">
            <img src="/assets/svg/ChecklistVariant.svg" alt="checklist" />
          </div>
          <ul>
            <li>{t("review.check")}</li>
            <li>{t("review.refine")}</li>
          </ul>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmModal;
