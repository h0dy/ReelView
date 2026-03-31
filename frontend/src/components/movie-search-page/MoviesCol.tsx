import { getMoviesByQuery } from "@/api/movies";
import { useSuspenseQuery } from "@tanstack/react-query";
import MovieCard from "./MovieCard";

const MoviesCol = ({ query }: { query: string }) => {
  const { data } = useSuspenseQuery({
    queryKey: ["movies", query],
    queryFn: async () => getMoviesByQuery(query),
  });

  return (
    <div className="flex flex-col gap-5">
      {data.map((movie, i) => (
        <div
          key={movie.id}
          style={{
            animation: "fadeSlideIn 0.5s ease forwards",
            animationDelay: `${i * 80}ms`,
            opacity: 0,
          }}
        >
          <MovieCard movie={movie} />
        </div>
      ))}
      <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground/50 mt-8">
        {data.length} results
      </p>
    </div>
  );
};

export default MoviesCol;
