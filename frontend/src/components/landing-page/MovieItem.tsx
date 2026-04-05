import type { Movie } from "@/types/movies";
import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";

const MovieItem = ({ movie }: { movie: Movie }) => {
  return (
    <Link
      to={`movies/${movie.id}`}
      state={{ movie }}
      className="relative group overflow-hidden block"
    >
      <img
        src={movie.poster_path}
        alt=""
        className="object-cover h-auto w-full transition-transform duration-300 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div
        className={`absolute top-3/5 ${
          movie.genre.length > 4 ? "sm:top-3/5" : "sm:top-3/4"
        } left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2 w-full px-4`}
      >
        <h3 className="text-gray-200 text-xl sm:text-2xl font-semibold text-center">
          {movie.title}
        </h3>

        <div className="flex flex-wrap justify-center gap-1">
          {movie.genre.map((g) => (
            <Badge variant="secondary" key={g} className="">
              {g}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default MovieItem;
