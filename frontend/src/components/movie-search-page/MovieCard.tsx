import type { Movie } from "@/types/movies";
import { Link } from "react-router-dom";
import StarsRating from "../movie-page/StarsRating";
import { Badge } from "../ui/badge";

const MovieCard = ({ movie }: { movie: Movie }) => {
  const year = movie.release_date.split("-")[0];

  return (
    <Link
      to={`/movies/${movie.id}`}
      className="group relative flex overflow-hidden cursor-pointer border border-border hover:border-border/80 transition-colors duration-500 bg-card sm:h-50"
    >
      {/* backdrop, desktop only */}
      <img
        src={movie.backdrop_path}
        alt=""
        aria-hidden="true"
        className="hidden sm:block absolute inset-0 w-full h-full object-cover object-[center_30%] transition-all duration-700 dark:brightness-[0.30] saturate-[0.8] dark:group-hover:brightness-[0.50] group-hover:saturate-[1.20] group-hover:scale-[1.03]"
      />
      <div className="hidden sm:block absolute inset-0 bg-linear-to-r from-background via-background/70 to-background/10" />
      <div className="hidden sm:block absolute inset-0 bg-linear-to-t from-background/40 via-transparent to-transparent" />

      {/* poster */}
      <div className="relative shrink-0 w-25 sm:w-auto sm:aspect-2/3">
        <img
          src={movie.poster_path}
          alt={movie.title}
          className="w-full h-full object-cover block"
        />
        <div className="hidden sm:block absolute inset-y-0 right-0 w-10 bg-linear-to-r from-transparent to-background/60" />
      </div>

      {/* details */}
      <div className="relative flex flex-col justify-center gap-2 sm:gap-2.5 min-w-0 p-4 sm:p-6">
        <div className="flex items-baseline gap-2 flex-wrap">
          <h2 className="text-foreground font-bold leading-tight tracking-tight text-base sm:text-xl">
            {movie.title}
          </h2>
          <span className="text-muted-foreground font-normal text-xs sm:text-sm shrink-0">
            ({year})
          </span>
        </div>

        <StarsRating rating={movie.vote_average} />
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {movie.genre?.map((g) => (
            <Badge
              key={g}
              variant="secondary"
              className="text-[10px] sm:text-xs"
            >
              {g}
            </Badge>
          ))}
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 sm:line-clamp-1">
          {movie.overview}
        </p>
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/50">
          {movie.vote_count.toLocaleString()} ratings
        </span>
      </div>
    </Link>
  );
};

export default MovieCard;
