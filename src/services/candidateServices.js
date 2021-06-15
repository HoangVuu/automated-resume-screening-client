import API from "utils/axios";

export const candidateGetResumes = async (token) =>
  await API.get("/user/candidates/resumes", {
    headers: { Authorization: `Bearer ${token}` }
  });

export const candidateApply = async (jp_id, resume_id, token) =>
  await API.post(
    `/job-posts/${jp_id}/apply`,
    { resume_id },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );

export const candidateUnapply = async (jp_id, token) =>
  await API.delete(`/job-posts/${jp_id}/unapply`, {
    headers: { Authorization: `Bearer ${token}` }
  });

// Saved Note
export const addJobNote = async (note, jp_id, token) =>
  await API.post(
    `/job-posts/${jp_id}/note`,
    { note },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );

export const deleteJobNote = async (jp_id, token) =>
  await API.delete(`/job-posts/${jp_id}/note`, {
    headers: { Authorization: `Bearer ${token}` }
  });
