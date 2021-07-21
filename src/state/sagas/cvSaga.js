import { takeEvery, call, select, put } from "redux-saga/effects";
import {
  uploadCVAction,
  updateCVAction,
  updateCVProfileAction,
  uploadCVDocAction
} from "state/actions/index";
import history from "state/history";
import { toast, toastErr,getMessage } from "utils/index";
import {
  rejectPromiseAction,
  resolvePromiseAction
} from "@adobe/redux-saga-promise";
import { updateCV, uploadFile, uploadDoc } from "services/uploadServices";
import { UPLOAD_CV_SUCCESS } from "state/reducers/cvReducer";
import i18n from "i18next";

export function* uploadCVSaga(action) {
  try {
    const formData = action.payload;

    console.log('formData cv', action.payload)
    const { token } = yield select((state) => state.auth.candidate);

    const result = yield call(uploadFile, formData, token);
    console.log('result cv', result)

    yield put({ type: UPLOAD_CV_SUCCESS, response: result.data.data });

    yield history.push("/profile/review");
    yield call(resolvePromiseAction, action);
  } catch (err) {
    yield toastErr(err);
    yield call(rejectPromiseAction, action);
  }
}

export function* uploadDocSaga(action) {
  try {
    const formData = action.payload;

    const { token } = yield select((state) => state.auth.candidate);

    const result = yield call(uploadDoc, formData, token);

    console.log('result', result)
    // yield put({ type: UPLOAD_CV_SUCCESS, response: result.data.data });

    yield call(resolvePromiseAction, action);
  } catch (err) {
    yield toastErr(err);
    yield call(rejectPromiseAction, action);
  }
}

export function* updateResumeSaga(action) {
  try {
    const { values, softValues } = action.payload;

    const { education, experience, id, months_of_experience } = yield select(
      (state) => state.cv
    );
    const { token } = yield select((state) => state.auth.candidate);

    const data = {
      resume_id: id,
      educations: education,
      experiences: experience,
      skills: values.join("|"),
      softskills: softValues.join("|"),
      months_of_experience
    };

    const result = yield call(updateCV, data, token);
    const { message } = result.data;

    // yield toast({ message: i18n.language === "vi" ? getMessage(message, "vi") : getMessage(message, "en") })

    yield history.push("/profile");

    yield call(resolvePromiseAction, action);
  } catch (err) {
    yield toastErr(err);
    yield call(rejectPromiseAction, action);
  }
}

export function* updateCVProfileSaga(action) {
  try {
    const {
      resumeId,
      values,
      softValues,
      education,
      experience,
      monthEx
    } = action.payload;

    const { token } = yield select((state) => state.auth.candidate);

    const data = {
      resume_id: resumeId,
      educations: education,
      experiences: experience,
      skills: values.join("|"),
      softskills: softValues.join("|"),
      months_of_experience: monthEx,
    };

    const result = yield call(updateCV, data, token);
    const { message } = result.data;

    // yield toast({ message: i18n.language === "vi" ? getMessage(message, "vi") : getMessage(message, "en") })

    yield call(resolvePromiseAction, action);
  } catch (err) {
    yield toastErr(err);
    yield call(rejectPromiseAction, action);
  }
}

export default function* cvSaga() {
  yield takeEvery(uploadCVAction, uploadCVSaga);
  yield takeEvery(uploadCVDocAction, uploadDocSaga);
  yield takeEvery(updateCVAction, updateResumeSaga);
  yield takeEvery(updateCVProfileAction, updateCVProfileSaga);
}
