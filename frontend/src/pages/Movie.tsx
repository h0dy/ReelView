import MovieDetailsCard from "@/components/movie-page/MovieDetailsCard";
import MovieHero from "@/components/movie-page/MovieHero";
import MovieOverview from "@/components/movie-page/MovieOverview";
import MovieUserAction from "@/components/movie-page/MovieUserAction";
import type { Movie } from "@/types/movies";
import { redirect, useLocation } from "react-router-dom";

const Movie = () => {
  const { state } = useLocation();
  const movie: Movie = state?.movie;

  if (movie == undefined) {
    throw redirect("/");
  }

  return (
    <div className="min-h-screen bg-background">
      <MovieHero movie={movie} />

      <div className="mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MovieOverview movie={movie} />

        {/* Right sidebar */}
        <aside className="space-y-4">
          {/* User actions card */}
          <MovieUserAction />

          {/* Details card */}
          <MovieDetailsCard movie={movie} />
        </aside>
      </div>
    </div>
  );
};

export default Movie;
