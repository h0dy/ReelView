import DetailRow from "@/components/movie-page/DetailRow";
import StatCard from "@/components/movie-page/StatCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Movie } from "@/types/movies";
import { BookmarkPlus, Clock, Globe, Play, Share2, Star } from "lucide-react";
import { redirect, useLocation } from "react-router-dom";

const Movie = () => {
  const { state } = useLocation();
  const movie: Movie = state?.movie;

  if (movie == undefined) {
    throw redirect("/");
  }

  const movieReleaseDate = new Date(movie.release_date);
  const formattedVoteCount = new Intl.NumberFormat().format(movie.vote_count);
  const formattedRating = movie.vote_average.toFixed(1);

  return (
    <div className="min-h-screen bg-background">
      {/* hero */}
      <div className="relative h-130 w-full overflow-hidden">
        <img
          src={movie.backdrop_path}
          alt={movie.title}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* gradient overlays */}
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/20 to-transparent" />
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

            {/* title */}
            <h1 className="text-4xl font-bold leading-tight">
              {movie.title}{" "}
              <span className="text-muted-foreground font-normal text-3xl">
                ({movieReleaseDate.getFullYear()})
              </span>
            </h1>

            <p className="text-sm italic text-muted-foreground">
              "Can you survive five nights?"
            </p>

            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              {/* rating */}

              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-foreground font-semibold">
                  {formattedRating}
                </span>
                <span>/10</span>
                <span className="text-xs">({formattedVoteCount} votes)</span>
              </div>

              <Separator orientation="vertical" className="h-4" />

              {/* language */}
              <div className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5" />
                <span className="uppercase text-xs font-medium">
                  {movie.original_language}
                </span>
              </div>

              <Separator orientation="vertical" className="h-4" />

              {/* runtime */}
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>
                  Release:{" "}
                  {movieReleaseDate.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              <Button size="sm" className="gap-2">
                <Play className="w-4 h-4 fill-current" />
                Watch Trailer
              </Button>
              <Button size="sm" variant="secondary" className="gap-2">
                <BookmarkPlus className="w-4 h-4" />
                Add to Watchlist
              </Button>
              <Button size="sm" variant="ghost" className="gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* body */}
      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* overview */}
        <div className="lg:col-span-2 space-y-6">
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              Overview
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              {movie.overview}
            </p>
          </section>

          <Separator />
        </div>

        {/* sidebar details */}
        <aside className="space-y-1">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            details
          </h2>

          <DetailRow label="Original title" value={movie.original_title} />
          <DetailRow
            label="Language"
            value={movie.original_language.toUpperCase()}
          />
          <DetailRow
            label="Release date"
            value={movieReleaseDate.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          />
          <DetailRow label="Genres" value={movie.genre.join(", ")} />
          <DetailRow label="Vote count" value={formattedVoteCount} />
          <DetailRow label="Rating" value={`${formattedRating} / 10`} />

          {/* stat cards */}
          <div className="grid grid-cols-2 gap-2 pt-4">
            <StatCard
              label="Score"
              value={formattedRating}
              sub="out of 10"
              accent
            />
            <StatCard
              label="Votes"
              value={`${(movie.vote_count / 1000).toFixed(0)}K`}
              sub="user ratings"
            />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Movie;
