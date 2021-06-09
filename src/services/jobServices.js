import API from "utils/axios";
import qs from "query-string";

export const findJobs = async (
  page,
  pageSize,
  job_title,
  province_id,
  posted_date,
  contract_type,
  min_salary,
  max_salary,
  job_domain_id
) => {
  const query = qs.stringify(
    {
      page,
      "page-size": pageSize,
      q: job_title || undefined,
      province_id: province_id || undefined,
      posted_date: posted_date || undefined,
      contract_type: contract_type || undefined,
      min_salary: min_salary || undefined,
      max_salary: max_salary || undefined,
      job_domain_id: job_domain_id || undefined
    },
    { skipNull: true }
  );

  return await API.post(`/job-posts/cand?${query}`);
};

export const getJobDetail = async (id, token) =>
  !token
    ? await API.get(`/job-posts/${id}/cand`)
    : await API.get(`/job-posts/${id}/cand`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-cache"
        }
      });

export const getSaveJobs = async (page = 1, token) =>
  await API.get(`/user/job-posts/save?page=${page}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const getApplyJobs = async (page = 1, token) =>
  await API.get(`/user/job-posts/apply?page=${page}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const saveJob = async (jp_id, status, token) => {
  await API.post(
    "/user/job-posts/save",
    {
      job_post_id: jp_id,
      status
    },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
};

export const getSimilarJob = async (job_post_id) =>
  await API.get(`/job-posts/similar?job_post_id=${job_post_id}`);

export const getSuggestJob = async (domain_id, province_id, page, token) =>
  await API.get(
    `/job-posts/suggest?domain_id=${domain_id}&province_id=${province_id}&page=${page}`,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );

// Subcribe email
export const subcribe = async (topic, province_id, token) => {
  await API.post(
    "/subcribe",
    {
      topic,
      province_id
    },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
};

export const getSubcribe = async (token) =>
  await API.get("/subcribe", { headers: { Authorization: `Bearer ${token}` } });

export const updateSubcribe = async (
  topic,
  province_id,
  type,
  status,
  token
) => {
  await API.post(
    "/subcribe/update",
    {
      topic,
      province_id,
      type,
      status
    },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
};

export const deleteSubcribe = async (token) =>
await API.delete("/subcribe", { headers: { Authorization: `Bearer ${token}` } });