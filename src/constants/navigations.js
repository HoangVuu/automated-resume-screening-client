import {
  FileTextOutlined,
  PlusSquareOutlined,
  SearchOutlined,
  FileDoneOutlined
} from "@ant-design/icons";
import React from "react";

export const NAVIGATIONS = [
  { title: "Tìm việc", url: "/find-jobs", link: true },
  { title: "Việc làm đã lưu", url: "/saved-jobs", link: true },
  { title: "Việc làm đã ứng tuyển", url: "/applied-jobs", link: true },
  { title: "Quản lý CV", url: "/profile", link: true }
];

export const CANDIDATE_NAV = [
  { title: "jobSearch", url: "/find-jobs", link: true, isCareer: false },
  { title: "profile", url: "/profile", link: true, isCareer: false },
  { title: "careerAdvice", url: "/career-advice", link: true, isCareer: true }
];

export const CANDIDATE_NAV_EXTEND = [
  { title: "Profile", url: "/profile", link: true },
  { title: "Saved Jobs", url: "/saved-jobs", link: true },
  { title: "Applied Jobs", url: "/applied-jobs", link: true },
  { title: "Recommend Jobs", url: "/find-jobs", link: true }
];

export const RECRUITER_NAV = [
  { title: "Tìm ứng viên", url: "/recruiter/find-candidates", link: true },
  { title: "Tin tuyển dụng", url: "/recruiter/jobs", link: true }
];

export const JOBS_MENU = [
  {
    href: "/recruiter/jobs",
    icon: <FileTextOutlined />,
    label: "Danh sách tin tuyển dụng"
  },
  {
    href: "/recruiter/new-job",
    icon: <PlusSquareOutlined />,
    label: "Đăng tin tuyển dụng mới"
  }
];

export const CANDIDATES_MENU = [
  {
    href: "/recruiter/find-candidates",
    icon: <SearchOutlined />,
    label: "Bộ lọc ứng viên"
  },
  {
    href: "/recruiter/new-filter",
    icon: <PlusSquareOutlined />,
    label: "Tạo bộ lọc mới"
  },
  {
    href: "/recruiter/save-candidates",
    icon: <FileDoneOutlined />,
    label: "Ứng viên đang theo dõi"
  }
];
