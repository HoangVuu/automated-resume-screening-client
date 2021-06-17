// import { Button } from "antd";
import { RECRUITER_NAV } from "constants/index";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUserAction } from "state/actions/authenticationActions";
// import history from "state/history";
import { checkCookie, setCookie } from "utils/cookies";
import "./NavBar.scss";
import {
  UpOutlined,
  DownOutlined,
  SmileTwoTone,
  HeartTwoTone,
  CheckCircleTwoTone,
  LikeTwoTone
} from "@ant-design/icons";

function RecruiterNavBar() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.recruiter.token);
  const [info, setInfo] = useState(false);
  const [clickItem, setClickItem] = useState();

  //Handle logout
  const logOut = () => {
    setCookie("recruiter_token", accessToken, 0);
    dispatch(logoutUserAction("recruiter"));
  };

  const toggleInfo = () => {
    setInfo(!info);
  };

  const handleClick = (i) => {
    setClickItem(i);
  };

  return (
    <div
      id="navBar"
      className="collapse navbar-collapse header__navbar-collapse py-0"
    >
      <ul className="navbar-nav header__navbar-nav">
        {RECRUITER_NAV.map(({ title, url, link, button }, index) => {
          const isActive = clickItem === index;
          return (
            <NavItem
              key={title}
              {...{ title, url, link, button, isActive }}
              linkClick={() => handleClick(index)}
            />
          );
        })}
        {checkCookie("recruiter_token") ? (
          <div className="header__navbar__info" onClick={toggleInfo}>
            <span className="header__navbar__info__name">Name</span>
            {info ? (
              <UpOutlined className="header__navbar__info__icon" />
            ) : (
              <DownOutlined className="header__navbar__info__icon" />
            )}
            {info && (
              <div className="header__navbar__info__group">
                <div className="header__navbar__info__group__item">
                  <span>Profile</span>
                  <SmileTwoTone />
                </div>

                <div className="header__navbar__info__group__item">
                  <span>Saved Jobs</span>
                  <HeartTwoTone twoToneColor="#eb2f96" />
                </div>

                <div className="header__navbar__info__group__item">
                  <span>Applied Jobs</span>
                  <CheckCircleTwoTone twoToneColor="#52c41a" />
                </div>

                <div className="header__navbar__info__group__item">
                  <span>Recommend Jobs</span>
                  <LikeTwoTone twoToneColor="#81B677" />
                </div>

                <div className="header__navbar__info__group__item">
                  <span>Setting</span>
                </div>

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
              title: "Đăng nhập",
              url: "/recruiter/sign-in",
              button: true
            }}
          />
        )}
        {/* <span className="nav-separator nav-separator--grey"></span> */}
        {/* <Button
          type="primary"
          size="large"
          onClick={() => history.push("/recruiter")}
        >
          Nhà tuyển dụng
        </Button> */}
      </ul>
    </div>
  );
}

export default RecruiterNavBar;

const NavItem = ({
  title,
  url,
  link = false,
  button = false,
  btnClick,
  linkClick,
  isActive
}) => (
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
      </Link>
    )}
    {button && (
      <Link onClick={btnClick} to={url} className="nav-link header__nav-button">
        {title}
      </Link>
    )}
  </li>
);
