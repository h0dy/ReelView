import { useSearchParams } from "react-router-dom";

const SearchMoviesPage = () => {
  const [searchParams] = useSearchParams();

  return <div>your search is: {searchParams}</div>;
};

export default SearchMoviesPage;
