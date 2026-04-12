import { type UserWithToken } from "@/types/users";
import api, { setAccessToken } from "./api";

export const loginUser = async (data: {
  email: string;
  password: string;
}): Promise<UserWithToken> => {
  const res = await api.post<UserWithToken>("/api/login", data);
  return res.data;
};

export const logoutUser = async () => {
  await api.post("/logout");
  setAccessToken(null);
};

export const getMe = async () => {
  const res = await api.get("/api/auth/me");
  return res.data;
};
