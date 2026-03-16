import DetailsCard from "@/components/movie-page/DetailsCard";
import MovieHero from "@/components/movie-page/Hero";
import MainSection from "@/components/movie-page/MainSection";
import UserActions from "@/components/movie-page/UserActions";
import type { MovieDetails } from "@/types/movies";
import { redirect } from "react-router-dom";

const MoviePage = () => {
  const data: MovieDetails = {
    movie: {
      id: "509417ce-f93d-4252-8de9-226d1e814924",
      imdb_id: "tt1375666",
      tmdb_id: 27205,
      original_title: "Inception",
      title: "Inception",
      poster_path:
        "https://image.tmdb.org/t/p/original/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg",
      backdrop_path:
        "https://image.tmdb.org/t/p/original/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
      overview:
        "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: \"inception\", the implantation of another person's idea into a target's subconscious.",
      release_date: "2010-07-15 00:00:00 +0000 +0000",
      vote_average: 8.37,
      vote_count: 38833,
      revenue: 839030630,
      homepage: "https://www.warnerbros.com/movies/inception",
      genre: [
        { id: 28, name: "Action" },
        { id: 878, name: "Science Fiction" },
        { id: 12, name: "Adventure" },
      ],
      runtime: 148,
      tagline: "Your mind is the scene of the crime.",
    },
    reviews: [
      {
        id: "33c53523-495d-472e-891a-237ebe14f09d",
        movie_id: "509417ce-f93d-4252-8de9-226d1e814924",
        review: "Great movie! I loved it.",
        rating: 8,
        is_spoiler: false,
        created_at: "2026-03-14T03:11:03.438927Z",
        updated_at: "2026-03-14T03:11:03.438927Z",
        user: {
          id: "244e6012-24a6-4062-a92b-33ed4e9bfd49",
          username: "hody",
          name: "hody",
          created_at: "2026-03-14T03:11:03.438927Z",
          updated_at: "2026-03-14T03:11:03.438927Z",
          email: "hody@gmail.com",
          is_premium: true,
        },
      },
      {
        id: "99eebb9c-3606-4d91-bf8b-10ea1dd9f947",
        movie_id: "509417ce-f93d-4252-8de9-226d1e814924",
        review:
          "I think the ending was a bit predictable, and that the whole movie was a dream but overall a good watch.",
        rating: 5,
        is_spoiler: true,
        created_at: "2026-03-14T03:12:51.217837Z",
        updated_at: "2026-03-14T03:12:51.217837Z",
        user: {
          id: "82b7318e-9b00-4d86-970a-e1f4a42b24f3",
          username: "khalid",
          name: "khalid",
          created_at: "2026-03-14T03:12:51.217837Z",
          updated_at: "2026-03-14T03:12:51.217837Z",
          email: "khalid@gmail.com",
          is_premium: false,
        },
      },
    ],
  };

  if (data == undefined) {
    throw redirect("/");
  }

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
