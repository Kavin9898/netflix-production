import React, { useEffect, useState } from "react";
import axios from "axios";

function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:6000/api/movies")
      .then(res => setMovies(res.data));
  }, []);

  return (
    <div>
      <h2>Movies</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {movies.map(movie => (
          <div key={movie._id} style={{ margin: "20px" }}>
            <img src={movie.thumbnail} width="200" alt={movie.title} />
            <h4>{movie.title}</h4>
            <a href={movie.videoUrl} target="_blank" rel="noreferrer">
              ▶ Play
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movies;