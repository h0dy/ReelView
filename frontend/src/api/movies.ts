import type { Movie, MovieDetails } from "@/types/movies";
import api from "./api";

export const getMovieById = async (id: string): Promise<MovieDetails> => {
  const res = await api.get(`/api/movies/${id}`);
  const movieDetails: MovieDetails = res.data;
  return movieDetails;
};

export const getMovies = async (period: string): Promise<Movie[]> => {
  const res = await api.get(`/api/movies?period=${period}`);
  const movies: Movie[] = res.data.results;
  return movies;
};
