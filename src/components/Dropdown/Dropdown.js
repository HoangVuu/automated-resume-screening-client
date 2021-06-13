import React, { useState } from "react";
import { CaretDownOutlined } from "@ant-design/icons";
import "./Dropdown.scss";
import { Input } from "antd";
import OutsideClickWrapper from "components/OutsideClickWrapper/OutsideClickWrapper";
import { Close } from "constants/svg";
import { useTranslation } from "react-i18next";

function Dropdown({ title, options, value, onChange, select = false }) {
  const { t } = useTranslation();

  const [isShowing, setShowing] = useState(false);
  const [input, setInput] = useState(0);

  const openDropdown = () => setShowing(true);
  const closeDropdown = () => setShowing(false);

  const handleSelect = (value) => {
    onChange(value);
    closeDropdown();
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === "" || value === "-") {
      setInput(value);
    }
  };

  const handleUpdate = () => {
    onChange(input);
    closeDropdown();
  };

  if (select && (!options || !options.length)) return null;

  return (
    <div className="dd-wrapper">
      {value === undefined ? (
        <>
          <button className="dd-button" onClick={openDropdown}>
            <span style={{fontSize:'14px'}}>
              {title}
              <span>
                <CaretDownOutlined
                  style={{ fontSize: "10px", marginLeft: "0.2rem", right: 0 }}
                />
              </span>
            </span>
          </button>
          <OutsideClickWrapper
            isShowing={isShowing}
            onClickOutside={closeDropdown}
          >
            {select ? (
              <ul
                className={`dropdown-content dd-menu ${
                  isShowing ? "" : "dd-hidden"
                }`}
              >
                {options.map(({ value, label }) => (
                  <Option
                    key={value}
                    value={value}
                    label={label}
                    handleSelect={handleSelect}
                  />
                ))}
              </ul>
            ) : (
              <div className="salary-selector-wrapper">
                <div
                  className={`salary-selector ${isShowing ? "" : "dd-hidden"}`}
                >
                  <div className="salary-selector-content">
                    <h2 className="salary-header">
                      {title} {t("jobList.desired")}
                    </h2>
                  </div>
                  <Input
                    value={input}
                    suffix={t("jobList.million")}
                    style={{ marginBottom: 16 }}
                    onChange={handleInputChange}
                  />
                  <div id="salary-filter-submission">
                    <span
                      onClick={handleUpdate}
                      tabIndex="0"
                      role="button"
                      className="apply-button"
                    >
                     {t("jobList.update")}
                    </span>
                  </div>
                  <div
                    className="salary-filter-close"
                    role="button"
                    onClick={closeDropdown}
                  >
                    {Close}
                  </div>
                </div>
              </div>
            )}
          </OutsideClickWrapper>
        </>
      ) : (
        <button className="dd-button dd-target blue">
          <span>
            {select
              ? options.find((ele) => ele.value === parseInt(value)).label
              : `${title}: ${value} triệu`}
            <div className="filters-close" onClick={() => onChange(undefined)}>
              <img src="/assets/svg/Close.svg" alt="clear filter" />
            </div>
          </span>
        </button>
      )}
    </div>
  );
}

export default Dropdown;

const Option = ({ value, label, handleSelect }) => (
  <li className="dd-menu-option" onClick={() => handleSelect(value)}>
    <div>
      <span className="rbLabel">{label}</span>
    </div>
  </li>
);
