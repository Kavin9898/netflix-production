function MovieCard({ movie }) {
  return (
    <div style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
      <h3>{movie.title}</h3>
      <p>{movie.description}</p>
    </div>
  );
}

export default MovieCard;
