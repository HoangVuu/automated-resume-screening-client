export const GET_CANDIDATE_PROFILE = "GET_CANDIDATE_PROFILE";
export const GET_CANDIDATE_PROFILE_SUCCESS = "GET_CANDIDATE_PROFILE_SUCCESS";
export const RESET_CANDIDATE_PROFILE = "RESET_CANDIDATE_PROFILE";

const initialState = {
  candidateProfile: {}
};

export default function profileReducer(state = initialState, action = {}) {
  const newState = { ...state };

  switch (action.type) {
    case GET_CANDIDATE_PROFILE_SUCCESS:
      const { response } = action;

      newState.candidateProfile = response;
      return newState;

    case RESET_CANDIDATE_PROFILE:
      newState.candidateProfile = {};
      return newState;

    default:
      return newState;
  }
}
