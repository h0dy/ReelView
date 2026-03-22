import { getMovies } from "@/api/movies";
import { useSuspenseQuery } from "@tanstack/react-query";
import MovieItem from "./MovieItem";

const MoviesGrid = ({ period = "day" }: { period?: string }) => {
  const { data } = useSuspenseQuery({
    queryKey: ["movies", period],
    queryFn: async () => getMovies(period),
  });

  let movies = data;

  if (period === "day") {
    movies = movies.slice(0, 5);
  }

  return (
    <div className="grid sm:grid-cols-3 lg:grid-cols-5 grid-cols-2 gap-5 place-items-center mt-5">
      {movies.map((mv) => {
        return <MovieItem movie={mv} />;
      })}
    </div>
  );
};

export default MoviesGrid;
