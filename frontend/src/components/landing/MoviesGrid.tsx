import type { Movie } from "@/types/movies";
import MovieItem from "./MovieItem";

const movies: Movie[] = Array.from({ length: 10 }, () => ({
  backdrop_path: "/8XeUEIXiZiRNqz0EcKC65vje8Th.jpg",
  genre_ids: [878, 27, 35],
  genre: ["Science Fiction", "Horror", "Comedy"],
  id: 1159831,
  original_language: "en",
  original_title: "The Bride!",
  overview:
    "A lonely Frankenstein travels to 1930s Chicago to ask groundbreaking scientist Dr. Euphronious to create a companion for him. The two revive a murdered young woman and The Bride is born. But what ensues is beyond what either of them imagined.",
  poster_path:
    "https://image.tmdb.org/t/p/original/lV8YHwGkYZsm6EfIqnhaSz2avKt.jpg",
  release_date: "2026-03-04",
  title: "The Bride!",
  vote_average: 8,
  vote_count: 13,
}));

const MoviesGrid = () => {
  return (
    <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-5 place-items-center mt-5">
      {movies.map((mv) => {
        return <MovieItem movie={mv} />;
      })}
    </div>
  );
};

export default MoviesGrid;
