import axios from "axios";

const api = axios.create({
   baseURL: "https://xeneva.onrender.com/api",
  
  headers: { "Content-Type": "application/json" },
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("xenova_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("xenova_token");
      localStorage.removeItem("xenova_user");
    }
    return Promise.reject(err);
  },
);

export const authAPI = {
  login: (data) => api.post("/auth/login", data),
  register: (data) => api.post("/auth/register", data),
  getMe: () => api.get("/auth/me"),
  saveQuizScore: (data) => api.post("/auth/quiz-score", data),
  getMyScores: () => api.get("/auth/scores"),
};

export const artifactAPI = {
  getAll: (params) => api.get("/artifacts", { params }),
  getById: (id) => api.get(`/artifacts/${id}`),
  create: (data) =>
    api.post("/artifacts", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  update: (id, data) =>
    api.put(`/artifacts/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  delete: (id) => api.delete(`/artifacts/${id}`),
};

export const planetAPI = {
  getAll: () => api.get("/planets"),
  getById: (id) => api.get(`/planets/${id}`),
};

export const quizAPI = {
  getAll: () => api.get("/quiz"),
  submit: (answers) => api.post("/quiz/submit", { answers }),
};

export default api;
