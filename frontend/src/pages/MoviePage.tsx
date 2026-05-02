import { getMovieById } from "@/api/movies";
import Loader from "@/components/global/Loader";
import DetailsCard from "@/components/movie-page/DetailsCard";
import MovieHero from "@/components/movie-page/Hero";
import MainSection from "@/components/movie-page/MainSection";
import UserActions from "@/components/movie-page/UserActions";
import useAuth from "@/context/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const MoviePage = () => {
  const { id } = useParams<{ id: string }>();
  const tmdb_id = Number(id);

  const { isPending } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["movie", tmdb_id],
    queryFn: async () => getMovieById(tmdb_id),
    enabled: !isPending,
  });

  if (isLoading) {
    return <Loader page={true} />;
  }
  if (!data) {
    return <p>Something went wrong</p>;
  }

  const { movie, reviews } = data;

  return (
    <div className="min-h-screen bg-background">
      <MovieHero movie={movie} />

      <div className="mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MainSection movie={movie} reviews={reviews} />

        <aside className="space-y-4">
          <UserActions data={data} />
          <DetailsCard movie={movie} />
        </aside>
      </div>
    </div>
  );
};

export default MoviePage;
