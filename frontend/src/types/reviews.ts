import type { AuthUser } from "./users";

export type Review = {
  id: string; // UUID as string
  movie_id: string; // UUID as string
  review: string;
  rating: number;
  is_spoiler: boolean;
  created_at: string;
  updated_at: string;
  user: AuthUser;
};
