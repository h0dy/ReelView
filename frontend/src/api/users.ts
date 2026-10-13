import type { UserWithDetails } from "@/types/users";
import api from "./api";

export const getUser = async (username: string): Promise<UserWithDetails> => {
  const res = await api.get<UserWithDetails>(`/api/users/${username}`);
  return res.data;
};
