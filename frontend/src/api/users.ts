import type { UserWithDiaries } from "@/types/users";
import api from "./api";

export const getUser = async (username: string): Promise<UserWithDiaries> => {
  const res = await api.get<UserWithDiaries>(`/api/users/${username}`);
  return res.data;
};
