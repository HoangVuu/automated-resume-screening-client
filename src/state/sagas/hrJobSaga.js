import { takeEvery, select, call } from "redux-saga/effects";
import { toast, toastErr } from "utils/index";
import { getFormValues } from "redux-form";
import { FORM_KEY_JOB_POST } from "state/reducers/formReducer";
import { addNewJob, updateJob } from "services/hrJobServices";
import {
  candidateApplyAction,
  hrPostJobAction,
  hrUpdateJobAction
} from "state/actions/hrJobAction";
import {
  rejectPromiseAction,
  resolvePromiseAction
} from "@adobe/redux-saga-promise";
import history from "state/history";
import { candidateApply } from "services/candidateServices";

export function* postJobSaga(action) {
  try {
    const {
      amount,
      benefit_text,
      contract_type,
      deadline,
      description_text,
      job_domain_id,
      job_title,
      requirement_text,
      min_salary,
      max_salary,
      education_level,
      majors,
      provinces
    } = yield select((state) => getFormValues(FORM_KEY_JOB_POST)(state));

    const { token, email } = yield select((state) => state.auth.recruiter);

    const formValue = {
      benefit_text,
      contract_type,
      deadline,
      description_text,
      job_domain_id,
      job_title,
      requirement_text,
      min_salary: min_salary || null,
      max_salary: max_salary || null,
      recruiter_email: email,
      amount: amount ? parseInt(amount) : 0,
      education_level,
      majors: majors ? majors.join(",") : String(majors),
      province_id: provinces.join(",")
    };

    const result = yield call(addNewJob, formValue, token);
    const { message } = result.data;

    yield toast({ message });
    yield call(resolvePromiseAction, action);

    yield history.push("/recruiter/jobs");
  } catch (err) {
    yield toastErr(err);
    yield call(rejectPromiseAction, action);
  }
}

export function* updateJobSaga(action) {
  try {
    const {
      amount,
      benefit_text,
      contract_type,
      deadline,
      description_text,
      job_domain_id,
      job_title,
      requirement_text,
      min_salary,
      max_salary,
      education_level,
      majors,
      provinces
    } = yield select((state) => getFormValues(FORM_KEY_JOB_POST)(state));

    const { token, email } = yield select((state) => state.auth.recruiter);
    const { id } = action.payload;

    const formValue = {
      benefit_text,
      contract_type,
      deadline,
      description_text,
      job_domain_id,
      job_title,
      requirement_text,
      min_salary: min_salary || null,
      max_salary: max_salary || null,
      recruiter_email: email,
      amount: amount ? parseInt(amount) : 0,
      education_level,
      majors: majors ? majors.join(",") : String(majors),
      province_id: provinces.join(",")
    };

    const result = yield call(updateJob, formValue, id, token);
    const { message } = result.data;

    yield toast({ message });
    yield call(resolvePromiseAction, action);

    yield history.push("/recruiter/jobs");
  } catch (err) {
    yield toastErr(err);
    yield call(rejectPromiseAction, action);
  }
}

export function* candidateApplySaga(action) {
  try {
    const { jp_id, resume_id, token } = action.payload;
    const result = yield call(candidateApply, jp_id, resume_id, token);
    const { message } = result.data;

    yield toast({ message });
    yield call(resolvePromiseAction, action);
  } catch (err) {
    yield toastErr(err);
    yield call(rejectPromiseAction, action);
  }
}

export default function* hrJobSaga() {
  yield takeEvery(hrPostJobAction, postJobSaga);
  yield takeEvery(hrUpdateJobAction, updateJobSaga);
  yield takeEvery(candidateApplyAction, candidateApplySaga);
}
