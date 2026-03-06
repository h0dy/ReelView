import { useParams } from "react-router-dom";

const Movie = () => {
  const { id } = useParams<{ id: string }>();
  return <h2>Movie's ID: {id}</h2>;
};

export default Movie;
