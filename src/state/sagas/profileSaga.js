import { takeEvery, call, select, put } from "redux-saga/effects";
import {
  getCandidateProfile,
  updateCandidateProfile
} from "services/candidateProfileServices";
import {
  GET_CANDIDATE_PROFILE,
  GET_CANDIDATE_PROFILE_SUCCESS
} from "state/reducers/profileReducer";
import { toastErr } from "utils/index";
import {
  rejectPromiseAction,
  resolvePromiseAction
} from "@adobe/redux-saga-promise";
import { toast } from "utils/index";
import { updateProfileProAction } from "state/actions/profileAction";

export function* getCandidateProfileSaga({ payload }) {
  try {
    const result = yield call(getCandidateProfile, payload);

    const response = result.data.data;

    yield put({ type: GET_CANDIDATE_PROFILE_SUCCESS, response });
  } catch (err) {
    // yield toastErr(err);
  }
}

export function* updateProfileSaga(action) {
  try {
    const { token } = yield select((state) => state.auth.candidate);

    const data = action.payload;

    const result = yield call(updateCandidateProfile, data, token);
    
    const { message } = result.data;

    yield toast({ message });

    yield call(resolvePromiseAction, action);
  } catch (err) {
    yield toastErr(err);
    yield call(rejectPromiseAction, action);
  }
}

export default function* candidateProfileSaga() {
  yield takeEvery(GET_CANDIDATE_PROFILE, getCandidateProfileSaga);
  yield takeEvery(updateProfileProAction, updateProfileSaga);
}
