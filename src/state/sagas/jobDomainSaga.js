import { takeEvery, call, put } from "redux-saga/effects";
import {
  getJobDomain,
  getJobSkill,
  getSoftSkill
} from "services/hrJobServices";
import { getCareerRole, getCareerSkill } from "services/careerService";
import {
  GET_JOB_DOMAIN,
  GET_JOB_DOMAIN_SUCCESS,
  GET_JOB_SKILL,
  GET_JOB_SKILL_SUCCESS,
  GET_SOFT_SKILL,
  GET_SOFT_SKILL_SUCCESS,
  GET_CAREER_ROLE_SUCCESS,
  GET_CAREER_SKILL_SUCCESS
} from "state/reducers/jobDomainReducer";
import { toastErr, getMessage } from "utils/index";
import {
  rejectPromiseAction,
  resolvePromiseAction
} from "@adobe/redux-saga-promise";
import {
  getCareerRoleProAction,
  getCareerSkillProAction
} from "state/actions/careerAction";
import i18n from "i18next";

export function* getJobDomainSaga() {
  try {
    const result = yield call(getJobDomain);
    const response = result.data.data;

    yield put({ type: GET_JOB_DOMAIN_SUCCESS, response });
  } catch (err) {
    yield toastErr({ err: i18n.language === "vi" ? getMessage(err, "vi") : getMessage(err, "en") });
  }
}

export function* getJobSkillSaga() {
  try {
    const result = yield call(getJobSkill);
    const response = result.data.data;

    yield put({ type: GET_JOB_SKILL_SUCCESS, response });
  } catch (err) {
    yield toastErr({ err: i18n.language === "vi" ? getMessage(err, "vi") : getMessage(err, "en") });
  }
}

export function* getSoftSkillSaga() {
  try {
    const result = yield call(getSoftSkill);
    const response = result.data.data;

    yield put({ type: GET_SOFT_SKILL_SUCCESS, response });
  } catch (err) {
    yield toastErr({ err: i18n.language === "vi" ? getMessage(err, "vi") : getMessage(err, "en") });
  }
}

export function* getCareerRoleProSaga(action) {
  try {
    const { domain_id } = action.payload;

    const result = yield call(getCareerRole, domain_id);

    const response = result.data.data;

    yield put({ type: GET_CAREER_ROLE_SUCCESS, response });

    yield call(resolvePromiseAction, action);
  } catch (err) {
    yield toastErr({ err: i18n.language === "vi" ? getMessage(err, "vi") : getMessage(err, "en") });
    yield call(rejectPromiseAction, action);
  }
}

export function* getCareerSkillProSaga(action) {
  try {
    const { skill } = action.payload;

    const result = yield call(getCareerSkill, skill);

    const response = result.data.data;

    yield put({ type: GET_CAREER_SKILL_SUCCESS, response });

    yield call(resolvePromiseAction, action);
  } catch (err) {
    yield toastErr({ err: i18n.language === "vi" ? getMessage(err, "vi") : getMessage(err, "en") });
    yield call(rejectPromiseAction, action);
  }
}

export default function* jobDomainSaga() {
  yield takeEvery(GET_JOB_DOMAIN, getJobDomainSaga);
  yield takeEvery(GET_JOB_SKILL, getJobSkillSaga);
  yield takeEvery(GET_SOFT_SKILL, getSoftSkillSaga);
  yield takeEvery(getCareerRoleProAction, getCareerRoleProSaga);
  yield takeEvery(getCareerSkillProAction, getCareerSkillProSaga);
}
