import { Button } from "antd";
import { CANDIDATE_NAV } from "constants/index";
import {
  UpOutlined,
  DownOutlined,
  SmileTwoTone,
  HeartTwoTone,
  CheckCircleTwoTone,
  LikeTwoTone,
  StarTwoTone
} from "@ant-design/icons";

import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUserAction } from "state/actions/authenticationActions";
import history from "state/history";
import { checkCookie, setCookie } from "utils/cookies";
import "./NavBar.scss";
import { candidateProfileAction, resetProfile } from "state/actions/profileAction";
import isEmpty from "lodash/isEmpty";

function NavBar() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.candidate.token);
  const profile = useSelector((state) => state.profile.candidateProfile);

  const [info, setInfo] = useState(false);
  const [clickItem, setClickItem] = useState(null);

  //Handle logout
  const logOut = () => {
    setCookie("candidate_token", accessToken, 0);
    dispatch(logoutUserAction("candidate"));
    dispatch(resetProfile());
  };

  const toggleInfo = () => {
    setInfo(!info);
  };

  const handleClick = (i) => {
    console.log("i", i);
    setClickItem(i);
  };

  const getTheLastWord = () => {
    if (!isEmpty(profile.fullName)) {
      let n = profile.fullName.lastIndexOf(" ");
      var res = profile.fullName.substring(n);
    }
    console.log(res);
    return res;
  };

  useEffect(() => {
    accessToken && dispatch(candidateProfileAction(accessToken));

    const { pathname } = window.location;

    pathname.startsWith("/find-jobs") && setClickItem(0);
    pathname.startsWith("/profile") && setClickItem(1);
    pathname.startsWith("/career-advice") && setClickItem(2);
    pathname.startsWith("") && setClickItem(null);
  }, [profile.fullName, accessToken]);

  return (
    <div
      id="navBar"
      className="collapse navbar-collapse header__navbar-collapse py-0"
    >
      <ul className="navbar-nav header__navbar-nav">
        {CANDIDATE_NAV.map(({ title, url, link, button, isCareer }, index) => {
          const isActive = clickItem === index;
          return (
            <NavItem
              key={title}
              {...{ title, url, link, button, isActive, isCareer }}
              linkClick={() => handleClick(index)}
            />
          );
        })}
        {checkCookie("candidate_token") ? (
          <div className="header__navbar__info" onClick={toggleInfo}>
            <span className="header__navbar__info__name">
              <b>{getTheLastWord()}</b>
            </span>
            {info ? (
              <UpOutlined className="header__navbar__info__icon" />
            ) : (
              <DownOutlined className="header__navbar__info__icon" />
            )}
            {info && (
              <div className="header__navbar__info__group">
                <Link
                  to="/profile"
                  className="header__navbar__info__group__item"
                >
                  <span>Profile</span>
                  <SmileTwoTone />
                </Link>

                <Link
                  to="/saved-jobs"
                  className="header__navbar__info__group__item"
                >
                  <span>Saved Jobs</span>
                  <HeartTwoTone twoToneColor="#eb2f96" />
                </Link>

                <Link
                  to="/applied-jobs"
                  className="header__navbar__info__group__item"
                >
                  <span>Applied Jobs</span>
                  <CheckCircleTwoTone twoToneColor="#52c41a" />
                </Link>

                {/* <Link className="header__navbar__info__group__item">
                  <span>Recommend Jobs</span>
                  <LikeTwoTone twoToneColor="#81B677" />
                </Link> */}

                <div
                  className="header__navbar__info__group__item"
                  onClick={logOut}
                >
                  <span>Logout</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <NavItem
            {...{
              title: "Login",
              url: "/sign-in",
              button: true
            }}
          />
        )}
        <span className="nav-separator nav-separator--grey"></span>
        <Button
          type="primary"
          size="large"
          onClick={() => history.push("/recruiter/home")}
        >
          Employer
        </Button>
      </ul>
    </div>
  );
}

export default NavBar;

const NavItem = ({
  title,
  url,
  link = false,
  button = false,
  clickItem,
  btnClick,
  linkClick,
  isActive,
  isCareer = false
}) => {
  return (
    <li className="nav-item header__nav-item">
      {link && (
        <Link
          to={url}
          className={
            isActive
              ? "nav-link header__nav-link active"
              : "nav-link header__nav-link"
          }
          onClick={linkClick}
        >
          {title}
          {isCareer && <StarTwoTone className="nav-link__icon" twoToneColor="#F57C00" />}
        </Link>
      )}
      {button && (
        <Link
          onClick={btnClick}
          to={url}
          className="nav-link header__nav-button"
        >
          {title}
        </Link>
      )}
    </li>
  );
};
