import API from "utils/axios";

export const uploadFile = async (formData, token) =>
  API.post("/resume/", formData, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const updateCV = async (data, token) =>
  await API.post("/resume/update", data, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const deleteResume = async ( token) =>
  await API.delete("/resume/delete", {
    headers: { Authorization: `Bearer ${token}` }
  });
