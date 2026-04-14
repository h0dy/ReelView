import Loader from "@/components/global/Loader";
import MoviesCol from "@/components/movie-search-page/MoviesCol";
import { Suspense } from "react";
import { Navigate, useSearchParams } from "react-router-dom";

const MovieSearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  if (!query) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto py-12">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
            Search results for
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-muted-foreground">
            "{query}"
          </h1>
          <div className="mt-3 h-px bg-border" />
        </div>
        <div className="px-5">
          <Suspense fallback={<Loader />}>
            <MoviesCol query={query} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default MovieSearchPage;
