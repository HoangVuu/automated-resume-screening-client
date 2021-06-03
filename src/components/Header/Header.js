import NavBar from "components/NavBar/NavBar";
import RecruiterNavBar from "components/NavBar/RecruiterNavbar";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const { t, i18n } = useTranslation();

  const [currEn, setCurrEn] = useState(localStorage.getItem("lang") === "en");
  const [currVi, setCurrVi] = useState(localStorage.getItem("lang") === "vi");
  const [dropdown, setDropdown] = useState(false);

  const { pathname } = window.location;

  const recruiter = pathname.startsWith("/recruiter");

  const handleClick = (lang) => {
    i18n.changeLanguage(lang);
  };

  console.log("i18", i18n);

  const onEnglish = () => {
    handleClick("en");
    localStorage.setItem("lang", "en");
    setCurrEn(true);
    setCurrVi(false);
    setDropdown(false);
  };

  const onVi = () => {
    handleClick("vi");
    setCurrVi(true);
    setCurrEn(false);
    localStorage.setItem("lang", "vi");
    setDropdown(false);
  };

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  useEffect(() => {
    handleClick(localStorage.getItem("lang"));
  }, []);

  return (
    <header id="header" className="header">
      <div className="header__section">
        <div className="container">
          <nav className="navbar navbar-expand-lg header__navbar">
            {/* Header section */}
            <div className="header__navbar-brand-wrapper">
              <Link
                to={`${recruiter ? "/recruiter/home" : "/"}`}
                className="navbar-brand header__navbar-brand"
                style={{ width: "fit-content" }}
              >
                <h3>
                  Automated&nbsp;<span>Screening</span>
                </h3>
              </Link>
            </div>

            {/* Navbar section */}
            {recruiter ? <RecruiterNavBar /> : <NavBar />}

            <div className="lang">
              <a className="lang__toggle" onClick={toggleDropdown}>
                <span
                  className={"flag " + (currVi ? "flag-vi" : "flag-en")}
                ></span>
                <FontAwesomeIcon icon={faCaretDown} color="#555" />
              </a>

              {dropdown && (
                <ul className="lang__dropdown">
                  <li>
                    <a
                      className={
                        "lang__dropdown__item " + (currEn && "active-lang")
                      }
                      onClick={onEnglish}
                    >
                      <span className=" flag flag-en"></span>English
                    </a>
                  </li>

                  <li>
                    <a
                      className={
                        "lang__dropdown__item " + (currVi && "active-lang")
                      }
                      onClick={onVi}
                    >
                      <span className=" flag flag-vi"></span> Tiếng Việt
                    </a>
                  </li>
                </ul>
              )}
              {/* <button >English</button>
              <button onClick={() => handleClick("vn")}>Vietnamese</button> */}
            </div>

            {/* <p>{t("Thanks.a")}</p>
            <p>{t("Why.a")}</p> */}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
