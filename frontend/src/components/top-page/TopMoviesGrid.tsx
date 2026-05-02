import { getMovies } from "@/api/movies";
import { useSuspenseQuery } from "@tanstack/react-query";
import MovieItem from "../landing-page/MovieItem";

const TopMoviesGrid = ({ period }: { period: string }) => {
  const { data: movies } = useSuspenseQuery({
    queryKey: ["movies", period],
    queryFn: () => getMovies(period),
    staleTime: 1000 * 60 * 30, // data fresh for 30 min
  });

  return (
    <div className="grid sm:grid-cols-3 lg:grid-cols-5 grid-cols-2 gap-2 place-items-center">
      {movies.map((m, i) => (
        <div
          className=""
          style={{
            animation: "fadeSlideIn 0.5s ease forwards",
            animationDelay: `${i * 80}ms`,
            opacity: 0,
          }}
        >
          <MovieItem key={m.id} movie={m} />
        </div>
      ))}
    </div>
  );
};

export default TopMoviesGrid;
