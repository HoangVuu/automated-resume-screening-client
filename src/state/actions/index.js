import { createPromiseAction } from "@adobe/redux-saga-promise";

export const REGISTER_CANDIDATE = "REGISTER_CANDIDATE";
export const REGISTER_HR = "REGISTER_HR";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_ERROR = "REGISTER_USER_ERROR";

export const LOGIN_CANDIDATE = "LOGIN_CANDIDATE";
export const LOGIN_HR = "LOGIN_HR";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_ERROR = "LOGIN_USER_ERROR";

export const VERIFY_CANDIDATE = "VERIFY_CANDIDATE";
export const VERIFY_HR = "VERIFY_HR";
export const VERIFY_USER_SUCCESS = "VERIFY_USER_SUCCESS";

export const LOGOUT = "LOGOUT";

export const INIT_DATA = "INIT_DATA";
export const RESIGN_TOKEN = "RESIGN_TOKEN";

export const GET_CANDIDATE_PROFILE = "GET_CANDIDATE_PROFILE";
export const RESET_CANDIDATE_PROFILE = "RESET_CANDIDATE_PROFILE";
export const GET_CANDIDATE_PROFILE_SUCCESS = "GET_CANDIDATE_PROFILE_SUCCESS";

export const GET_JOB_SIMILAR = "GET_JOB_SIMILAR";
export const GET_JOB_SIMILAR_SUCCESS = "GET_JOB_SIMILAR_SUCCESS";

export const GET_JOB_SUGGEST = "GET_JOB_SUGGEST";
export const GET_JOB_SUGGEST_SUCCESS = "GET_JOB_SUGGEST_SUCCESS";

export const uploadCVAction = createPromiseAction("UPLOAD_CV");
export const updateCVAction = createPromiseAction("UPDATE_CV");
export const updateCVProfileAction = createPromiseAction("UPDATE_CV_PROFILE");

export const updateHRCompanyAction = createPromiseAction("UPDATE_HR_COMPANY");
export const addCompanyAction = createPromiseAction("ADD_COMPANY");

export const UPDATE_TOKEN = "UPDATE_TOKEN";

export const addNewFilterAction = createPromiseAction("ADD_NEW_FILTER");
export const updateFilterAction = createPromiseAction("UPDATE_FILTER");

export const EXPLORE_SKILLS = createPromiseAction("EXPLORE_SKILLS");
export const EXPLORE_SKILLS_SUCCESS = createPromiseAction("EXPLORE_SKILLS_SUCCESS");

export const RESET_SKILLS_ACTION = "RESET_SKILLS_ACTION"

export const UPDATE_CAND_PROFILE = "UPDATE_CAND_PROFILE"
export const UPDATE_CAND_RESUME = "UPDATE_CAND_RESUME"

export const GET_SUBCRIBE_INFO = "GET_SUBCRIBE_INFO"