import { getMovie } from "@/api/movies";
import DetailsCard from "@/components/movie-page/DetailsCard";
import MovieHero from "@/components/movie-page/Hero";
import MainSection from "@/components/movie-page/MainSection";
import UserActions from "@/components/movie-page/UserActions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const MoviePage = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useSuspenseQuery({
    queryKey: ["movie", id],
    queryFn: async () => getMovie(id as string),
  });

  const { movie, reviews } = data;

  return (
    <div className="min-h-screen bg-background">
      <MovieHero movie={movie} />

      <div className="mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MainSection movie={movie} reviews={reviews} />

        <aside className="space-y-4">
          <UserActions />
          {/* <BoxOffice revenue={movie.revenue} /> */}
          <DetailsCard movie={movie} />
        </aside>
      </div>
    </div>
  );
};

export default MoviePage;
