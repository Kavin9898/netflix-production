import { useEffect, useState } from "react";
import api from "../services/api";
import MovieCard from "../components/MovieCard";

function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    api.get("/movies")
      .then((res) => setMovies(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Movies 🍿</h2>
      {movies.map((movie) => (
        <MovieCard key={movie._id} movie={movie} />
      ))}
    </div>
  );
}

export default Movies;
