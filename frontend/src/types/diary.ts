import type { MovieDetail } from "./movies";

export type Diary = {
  id: string;
  movie_id: string;
  user_id: string;
  watched_at: string;
  updated_at: string;
  created_at: string;
  movie: MovieDetail;
};
