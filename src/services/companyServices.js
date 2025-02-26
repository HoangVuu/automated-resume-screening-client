import API from "utils/axios";

export const searchCompany = async (name, page) =>
  await API.get(`/company/search?name=${name}&page=${page}`);

export const updateCompany = async (id, token) =>
  await API.put(
    `/company/${id}/update`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );

export const addCompany = async (formData, token) =>
  await API.post("/company", formData, {
    headers: { Authorization: `Bearer ${token}` }
  });
