import type { Review } from "./reviews";

export type MovieDetails = {
  movie: MovieDetail;
  reviews: Review[];
};

export type MovieDetail = {
  id: string;
  imdb_id: string;
  tmdb_id: number;
  original_title: string;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  revenue: number;
  homepage: string;
  genre: Array<{
    id: number;
    name: string;
  }>;
  trailer: string;
  runtime: number;
  tagline: string;
};

export type Movie = {
  backdrop_path: string;
  genre_ids: Array<number>;
  genre: Array<string>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
};

export const genreColors: Record<string, string> = {
  Action: "border-orange-500/40 text-orange-300 bg-orange-500/10",
  "Science Fiction": "border-cyan-500/40 text-cyan-300 bg-cyan-500/10",
  Adventure: "border-emerald-500/40 text-emerald-300 bg-emerald-500/10",
  Drama: "border-violet-500/40 text-violet-300 bg-violet-500/10",
  Crime: "border-rose-500/40 text-rose-300 bg-rose-500/10",
  Thriller: "border-yellow-500/40 text-yellow-300 bg-yellow-500/10",
};
