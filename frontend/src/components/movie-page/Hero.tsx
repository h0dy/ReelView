import type { MovieDetail } from "@/types/movies";
import { Clock, Play, Share2, Star } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const MovieHero = ({ movie }: { movie: MovieDetail }) => {
  const movieReleaseDate = new Date(movie.release_date);
  const formattedRating = movie.vote_average.toFixed(1);

  return (
    <div className="relative h-130 w-full overflow-hidden">
      <img
        src={movie.backdrop_path}
        alt={movie.title}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent" />

      <div className="relative flex h-full max-w-6xl mx-auto px-6 items-end pb-10 gap-8">
        {/* poster */}
        <div className="hidden sm:block shrink-0 translate-y-13">
          <img
            src={movie.poster_path}
            alt={movie.title}
            className="w-52 rounded-xl shadow-2xl border border-white/10 object-cover aspect-2/3"
          />
        </div>

        {/* info */}
        <div className="flex flex-col gap-3 pb-1">
          <h1 className="text-4xl font-bold leading-tight">
            {movie.title}{" "}
            <span className="text-muted-foreground font-normal text-3xl">
              ({movieReleaseDate.getFullYear()})
            </span>
          </h1>

          {movie.tagline && (
            <p className="text-sm italic text-muted-foreground">
              "{movie.tagline}"
            </p>
          )}

          {/* meta row */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-foreground font-semibold">
                {formattedRating}
              </span>
              <span>/10</span>
            </div>
            {movie.runtime > 0 && (
              <>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>
                    {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                  </span>
                </div>
              </>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            <Button size="sm" className="gap-2">
              <Play className="w-4 h-4 fill-current" />
              <a href={movie.trailer} target="_blank" rel="noopener noreferrer">
                Watch Trailer
              </a>
            </Button>

            <Button
              asChild
              size="sm"
              className="bg-[#F5C518] hover:bg-[#F5C518]/90 text-black font-black tracking-tight rounded-sm px-2.5 border-0"
            >
              <a
                href={`https://www.imdb.com/title/${movie.imdb_id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                IMDb
              </a>
            </Button>

            <Button
              asChild
              size="sm"
              className="bg-[#0d253f] hover:bg-[#0d253f]/90 text-[#01b4e4] font-bold tracking-tight rounded-sm px-2.5 border-0"
            >
              <a
                href={`https://www.themoviedb.org/movie/${movie.tmdb_id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                TMDB
              </a>
            </Button>

            <Button size="sm" variant="ghost" className="gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieHero;
