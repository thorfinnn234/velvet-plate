import { create } from "zustand";
import { api } from "../lib/api";

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("auth_user") || "null"),
  token: localStorage.getItem("auth_token") || null,
  loading: false,
  error: "",

  login: async (email, password) => {
    set({ loading: true, error: "" });
    try {
      const res = await api.post("/api/auth/login", { email, password });
      const { token, user } = res.data;
      localStorage.setItem("auth_token", token);
      localStorage.setItem("auth_user", JSON.stringify(user));
      set({ token, user, loading: false });
      return { ok: true };
    } catch (e) {
      set({ loading: false, error: e?.response?.data?.error || e.message });
      return { ok: false };
    }
  },

  register: async (payload) => {
    set({ loading: true, error: "" });
    try {
      const res = await api.post("/api/auth/register", payload);
      const { token, user } = res.data;
      localStorage.setItem("auth_token", token);
      localStorage.setItem("auth_user", JSON.stringify(user));
      set({ token, user, loading: false });
      return { ok: true };
    } catch (e) {
      set({ loading: false, error: e?.response?.data?.error || e.message });
      return { ok: false };
    }
  },

  logout: () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    set({ token: null, user: null });
  },
}));
