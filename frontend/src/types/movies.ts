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
