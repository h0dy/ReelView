import type { MovieDetails } from "@/types/movies";
import axios from "axios";

export const getMovie = async (id: string): Promise<MovieDetails> => {
  const res = await axios.get(`/api/movies/${id}`);
  console.log(res);
  const movieDetails: MovieDetails = res.data;
  return movieDetails;
};
