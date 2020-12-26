import NavBar from "components/NavBar/NavBar";
import RecruiterNavBar from "components/NavBar/RecruiterNavbar";
import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

function Header() {
  const { pathname } = window.location;

  const recruiter = pathname.startsWith("/recruiter");

  return (
    <header id="header" className="header">
      <div className="header__section">
        <div className="container">
          <nav className="navbar navbar-expand-lg header__navbar">
            {/* Header section */}
            <div className="header__navbar-brand-wrapper">
              <Link
                to={`${recruiter ? "/recruiter" : "/"}`}
                className="navbar-brand header__navbar-brand"
              >
                {recruiter ? (
                  <img
                    src="https://htmlstream.com/preview/space-v1.6.1/assets/svg/logos/logo.svg"
                    alt="logo"
                    className="header__navbar-brand-default"
                  />
                ) : (
                  <img
                    src="https://htmlstream.com/preview/space-v1.6.1/assets/svg/logos/logo.svg"
                    alt="logo"
                    className="header__navbar-brand-default"
                  />
                )}
              </Link>
            </div>

            {/* Navbar section */}
            {recruiter ? <RecruiterNavBar /> : <NavBar />}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
