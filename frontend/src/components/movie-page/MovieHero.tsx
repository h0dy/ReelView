import type { Movie } from "@/types/movies";
import { Play, Share2, Star } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const MovieHero = ({ movie }: { movie: Movie }) => {
  const movieReleaseDate = new Date(movie.release_date);
  const formattedRating = movie.vote_average.toFixed(1);
  return (
    <div className="relative h-130 w-full overflow-hidden">
      <img
        src={movie.backdrop_path}
        alt={movie.title}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* gradient overlays */}
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
          {/* title */}
          <h1 className="text-4xl font-bold leading-tight">
            {movie.title}{" "}
            <span className="text-muted-foreground font-normal text-3xl">
              ({movieReleaseDate.getFullYear()})
            </span>
          </h1>

          <p className="text-sm text-muted-foreground">
            Directed by{" "}
            <span className="text-foreground font-semibold">
              {"Robert Eggers"}
            </span>
          </p>

          <p className="text-sm italic text-muted-foreground">
            "Can you survive five nights?"
          </p>

          <div className="flex flex-wrap gap-2">
            {movie.genre.map((g) => (
              <Badge
                key={g}
                variant="secondary"
                className="bg-white/10 text-white border-white/20 backdrop-blur-sm hover:bg-white/20"
              >
                {g}
              </Badge>
            ))}
          </div>

          {/* meta row */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            {/* rating */}
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-foreground font-semibold">
                {formattedRating}
              </span>
              <span>/10</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            <Button size="sm" className="gap-2">
              <Play className="w-4 h-4 fill-current" />
              Watch Trailer
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
