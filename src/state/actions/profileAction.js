import { createPromiseAction } from "@adobe/redux-saga-promise";
import * as types from "./index";

export const candidateProfileAction = (token) => ({
  type: types.GET_CANDIDATE_PROFILE,
  payload: token
});

export const resetProfile = () => ({
  type: types.RESET_CANDIDATE_PROFILE
});

export const candidateProfileProAction = createPromiseAction(
  "GET_CANDIDATE_PROFILE"
);

export const updateProfileAction = (user) => ({
  type: types.UPDATE_CAND_PROFILE,
  payload: user
});

export const updateProfileProAction = createPromiseAction(
  "UPDATE_CAND_PROFILE"
);

export const getSubcribeInfo = () => ({type: types.GET_SUBCRIBE_INFO});
