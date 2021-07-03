import {
  rejectPromiseAction,
  resolvePromiseAction
} from "@adobe/redux-saga-promise";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  loginCandidateService,
  loginHrService,
  registerCandidateService,
  registerHrService,
  verifyCandidateService,
  verifyHrService
} from "services/authenticationService";
import {
  loginCandidateProAction,
  loginHrProAction
} from "state/actions/authenticationActions";
import {
  LOGIN_USER_SUCCESS,
  REGISTER_CANDIDATE,
  REGISTER_HR,
  REGISTER_USER_SUCCESS,
  VERIFY_CANDIDATE,
  VERIFY_HR,
  VERIFY_USER_SUCCESS
} from "state/actions/index";
import history from "state/history";
import { setCookie } from "utils/cookies";
import { toast, toastErr, getMessage } from "utils/index";
import jwt_decode from "jwt-decode";
import i18n from "i18next";

export function* registerCandidateSaga({ payload }) {
  try {
    const response = yield call(registerCandidateService, payload);
    const { message } = response.data;

    yield [put({ type: REGISTER_USER_SUCCESS, response })];

    yield toast({ message: i18n.language === "vi" ? getMessage(message, "vi") : getMessage(message, "en") })

    yield history.push("/confirm-mail");
  } catch (err) {
    yield toastErr({ err: i18n.language === "vi" ? getMessage(err, "vi") : getMessage(err, "en") });
  }
}

export function* registerHrSaga({ payload }) {
  try {
    const response = yield call(registerHrService, payload);
    const { message } = response.data;

    yield [put({ type: REGISTER_USER_SUCCESS, response })];

    yield toast({ message: i18n.language === "vi" ? getMessage(message, "vi") : getMessage(message, "en") });

    yield history.push("/confirm-mail");
  } catch (err) {
    yield toastErr({ err: i18n.language === "vi" ? getMessage(err, "vi") : getMessage(err, "en") });
  }
}

export function* verifyCandidateSaga({ payload }) {
  try {
    const response = yield call(verifyCandidateService, payload);
    const { message } = response.data;

    yield [put({ type: VERIFY_USER_SUCCESS, response })];

    yield toast({ message: i18n.language === "vi" ? getMessage(message, "vi") : getMessage(message, "en") });
  } catch (err) {
    yield toastErr({ err: i18n.language === "vi" ? getMessage(err, "vi") : getMessage(err, "en") });
  }
}

export function* verifyHrSaga({ payload }) {
  try {
    const response = yield call(verifyHrService, payload);
    const { message } = response.data;

    yield [put({ type: VERIFY_USER_SUCCESS, response })];

    yield toast({ message: i18n.language === "vi" ? getMessage(message, "vi") : getMessage(message, "en") });
  } catch (err) {
    yield toastErr({ err: i18n.language === "vi" ? getMessage(err, "vi") : getMessage(err, "en") });
  }
}

export function* loginCandidatePromiseSaga(action) {
  try {
    const { user } = action.payload;
    const result = yield call(loginCandidateService, user);
    const { access_token, message } = result.data;

    const {
      identity: { email }
    } = jwt_decode(access_token);

    yield setCookie("candidate_token", access_token, 5);
    yield put({
      type: LOGIN_USER_SUCCESS,
      key: "candidate",
      token: access_token,
      email
    });

    yield toast({ message: i18n.language === "vi" ? getMessage(message, "vi") : getMessage(message, "en") });

    yield call(resolvePromiseAction, action);
  } catch (err) {
    yield toastErr({ err: i18n.language === "vi" ? getMessage(err, "vi") : getMessage(err, "en") });
    yield call(rejectPromiseAction, action);
  }
}

export function* loginHrPromiseSaga(action) {
  try {
    const { user } = action.payload;
    const result = yield call(loginHrService, user);
    const { access_token, message } = result.data;

    const {
      identity: { email }
    } = jwt_decode(access_token);

    yield setCookie("recruiter_token", access_token, 5);
    yield put({
      type: LOGIN_USER_SUCCESS,
      key: "recruiter",
      token: access_token,
      email
    });

    yield toast({ message: i18n.language === "vi" ? getMessage(message, "vi") : getMessage(message, "en") });

    yield call(resolvePromiseAction, action);
  } catch (err) {
    yield toastErr({ err: i18n.language === "vi" ? getMessage(err, "vi") : getMessage(err, "en") });
    yield call(rejectPromiseAction, action);
  }
}

export default function* authSaga() {
  yield takeEvery(REGISTER_CANDIDATE, registerCandidateSaga);
  yield takeEvery(REGISTER_HR, registerHrSaga);
  yield takeEvery(VERIFY_CANDIDATE, verifyCandidateSaga);
  yield takeEvery(VERIFY_HR, verifyHrSaga);

  yield takeEvery(loginCandidateProAction, loginCandidatePromiseSaga);
  yield takeEvery(loginHrProAction, loginHrPromiseSaga);
}
