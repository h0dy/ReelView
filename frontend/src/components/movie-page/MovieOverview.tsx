import type { Movie } from "@/types/movies";
import { Calendar } from "lucide-react";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

const MovieOverview = ({ movie }: { movie: Movie }) => {
  const movieReleaseDate = new Date(movie.release_date);
  return (
    <div className="lg:col-span-2 space-y-5">
      {/* Genres + release date bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {movie.genre.map((g) => (
            <Badge key={g} variant="secondary">
              {g}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Calendar className="w-3.5 h-3.5" />
          <span>
            {movieReleaseDate.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      <Separator />

      {/* Overview */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Overview
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          {movie.overview}
        </p>
      </section>
    </div>
  );
};

export default MovieOverview;
