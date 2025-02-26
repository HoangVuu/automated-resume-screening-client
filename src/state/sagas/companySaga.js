import { takeEvery, select, call, put } from "redux-saga/effects";
import history from "state/history";
import { toastErr } from "utils/index";
import { addCompany, updateCompany } from "services/companyServices";
import {
  addCompanyAction,
  updateHRCompanyAction,
  UPDATE_TOKEN
} from "state/actions/index";
import { setCookie } from "utils/cookies";
import {
  rejectPromiseAction,
  resolvePromiseAction
} from "@adobe/redux-saga-promise";

export function* updateHRSaga(action) {
  try {
    const id = action.payload;

    const { token } = yield select((state) => state.auth.recruiter);

    const result = yield call(updateCompany, id, token);

    const newToken = result.data.data;

    yield put({ type: UPDATE_TOKEN, payload: newToken });

    yield setCookie("recruiter_token", newToken, 5);

    yield history.push("/recruiter/jobs");

    yield resolvePromiseAction(action);
  } catch (err) {
    yield toastErr(err);
    yield rejectPromiseAction(action);
  }
}

export function* addCompanySaga(action) {
  try {
    const formData = action.payload;

    const { token } = yield select((state) => state.auth.recruiter);

    const result = yield call(addCompany, formData, token);

    const newToken = result.data.data;

    yield put({ type: UPDATE_TOKEN, key: "recruiter", token: newToken });

    yield setCookie("recruiter_token", newToken, 5);

    yield history.push("/recruiter/jobs");

    yield resolvePromiseAction(action);
  } catch (err) {
    yield toastErr(err);
    yield rejectPromiseAction(action);
  }
}

export default function* companySaga() {
  yield takeEvery(updateHRCompanyAction, updateHRSaga);
  yield takeEvery(addCompanyAction, addCompanySaga);
}
