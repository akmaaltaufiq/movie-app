import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieDetail } from "../services/api";

export default function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMovieDetail(id)
      .then(setMovie)
      .catch(() => setError("Error fetching detail"));
  }, [id]);

  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!movie) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4 space-y-4">
      <img
        className="w-full max-w-md mx-auto"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <h1 className="text-2xl font-bold">{movie.title}</h1>
      <p>{movie.overview}</p>
    </div>
  );
}
