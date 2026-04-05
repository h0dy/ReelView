import { getMovies } from "@/api/movies";
import type { Movie } from "@/types/movies";
import MovieItem from "./MovieItem";

import GridSkeleton from "@/components/global/GridSkeleton";
import { useQuery } from "@tanstack/react-query";

const MoviesGrid = ({ period = "day" }: { period?: string }) => {
  const {
    data: movies = [],
    isLoading,
    isError,
    error,
  } = useQuery<Movie[], Error>({
    queryKey: ["movies", period],
    queryFn: () => getMovies(period),
  });

  if (isLoading) {
    return <GridSkeleton count={5} />;
  }

  if (isError) {
    console.log(error.message);
    return <p className="text-center">Something went wrong :(</p>;
  }

  const slicedMovies =
    period === "day" ? movies.slice(0, 5) : movies.slice(0, 10);

  return (
    <div className="grid sm:grid-cols-3 lg:grid-cols-5 grid-cols-2 gap-2 place-items-center mt-5">
      {slicedMovies.map((mv) => (
        <MovieItem key={mv.id} movie={mv} />
      ))}
    </div>
  );
};

export default MoviesGrid;
