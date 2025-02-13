import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });


export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const fetchProfile = (token) => API.get("/auth/profile", { headers: { Authorization: token } });


export const submitApplication = (data, token) =>
  API.post("/applications/apply", data, { headers: { Authorization: token } });


export const getPendingApplications = (token) =>
  API.get("/applications/pending", { headers: { Authorization: token } });


export const updateApplicationStatus = (id, status, token) =>
  API.put(`/applications/update/${id}`, { status }, { headers: { Authorization: token } });


export const getMyApplications = (token) =>
  API.get("/applications/my-applications", { headers: { Authorization: token } });

export const createCourse = (data, token) =>
    API.post("/courses/course", data, { headers: { Authorization: token } });
  
  export const getAllCourses = (page = 1, limit = 10, token) =>
    API.get(`/courses/allCourses?page=${page}&limit=${limit}`, {
      headers: { Authorization: token },
    });
  
  export const getTotalCourses = (token) =>
    API.get("/courses/totalCourses", { headers: { Authorization: token } });
export default API;
