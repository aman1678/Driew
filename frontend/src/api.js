import axios from "axios";

const api = axios.create({ baseURL: "/api" });

// Attach JWT token to every request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// --- Auth ---
export const registerUser = (data) => api.post("/register", data);
export const loginUser    = (data) => api.post("/login", data);

// --- Dramas ---
export const getDramas    = (params) => api.get("/dramas", { params });
export const getDrama     = (id)     => api.get(`/dramas/${id}`);

// --- Reviews ---
export const getReviews   = (dramaId, page = 1) =>
  api.get(`/reviews/${dramaId}`, { params: { page, per_page: 5 } });
export const postReview   = (data) => api.post("/reviews", data);

// --- Ratings ---
export const getAvgRating   = (dramaId) => api.get(`/ratings/${dramaId}`);
export const submitRating   = (data)    => api.post("/ratings", data);