import type { Movie, MovieDetails } from "@/types/movies";
import api from "./api";

export const getMovieById = async (id: number): Promise<MovieDetails> => {
  const res = await api.get(`/api/movies/${id}`);
  const movieDetails: MovieDetails = res.data;
  return movieDetails;
};

export const getMovies = async (period: string): Promise<Movie[]> => {
  const res = await api.get(`/api/movies?period=${period}`);
  return res.data.results;
};

export const getMoviesByQuery = async (query: string): Promise<Movie[]> => {
  const res = await api.get(`/api/movies?name=${query}`);
  return res.data.results ?? [];
};
