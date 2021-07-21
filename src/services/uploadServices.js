import API from "utils/axios";

export const uploadFile = async (formData, token) =>
  API.post("/resume/", formData, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const updateCV = async (data, token) =>
  await API.post("/resume/update", data, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const deleteResume = async (token) =>
  await API.delete("/resume/delete", {
    headers: { Authorization: `Bearer ${token}` }
  });

export const uploadDoc = async (formData, token) =>
  await API.post("/user/candidates/document", formData, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const editNameDoc = async (document_id, name, token) =>
  await API.put(
    "/user/candidates/document",
    {
      params: {
        document_id,
      name
      }
    },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
