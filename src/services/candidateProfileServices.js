import API from "utils/axios";

export const getCandidateProfile = async (token) =>
  await API.get("/user/candidate/profile", {
    headers: { Authorization: `Bearer ${token}` }
  });

export const updateCandidateProfile = async (data, token) =>
  await API.post("/user/candidate/profile/update", data, {
    headers: { Authorization: `Bearer ${token}` }
  });