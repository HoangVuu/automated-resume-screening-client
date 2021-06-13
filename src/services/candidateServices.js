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

// Saved Note
export const addSavedNote = async (note, jp_id, token) =>
  await API.post(
    `/job-posts/${jp_id}/save/note`,
    { note },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );

export const deleteSavedNote = async (jp_id, token) =>
  await API.delete(`/job-posts/${jp_id}/save/note`, {
    headers: { Authorization: `Bearer ${token}` }
  });

//Applied Note
export const addAppliedNote = async (note, jp_id, token) =>
  await API.post(
    `/job-posts/${jp_id}/apply/note`,
    { note },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );

export const deleteAppliedNote = async (jp_id, token) =>
  await API.delete(`/job-posts/${jp_id}/apply/note`, {
    headers: { Authorization: `Bearer ${token}` }
  });
