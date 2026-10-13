import type { Diary } from "./diary";
import type { Review } from "./reviews";

export type AuthUser = {
  id: string; // UUID as string
  username: string;
  name: string;
  created_at: string;
  updated_at: string;
  email: string;
  is_premium: boolean;
  bio: string;
};

export type User = {
  email: string;
  password: string;
};

export type NewUser = {
  email: string;
  password: string;
  name: string;
  username: string;
};

export type UserWithDetails = {
  user: AuthUser;
  diaries: Diary[];
  reviews: Review[];
};

export type UserWithToken = {
  user: AuthUser;
  token: string;
};
