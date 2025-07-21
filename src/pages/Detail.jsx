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
      .catch(() => setError("An error occurred while fetching movie details."));
  }, [id]);

  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!movie) return <p className="p-4 text-gray-300">Loading...</p>;

  return (
    <div className="pt-24 px-4 max-w-6xl mx-auto flex flex-col md:flex-row gap-8 text-gray-100">
      <img
        className="w-full max-w-sm rounded-xl shadow-lg"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />

      <div className="flex-1 space-y-4">
        <h1 className="text-3xl font-bold">{movie.title}</h1>
        {movie.tagline && (
          <p className="text-lg italic text-gray-400">"{movie.tagline}"</p>
        )}
        <p className="text-base leading-relaxed">{movie.overview}</p>

        <div className="mt-6 space-y-2 text-sm md:text-base">
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Duration:</strong> {movie.runtime} minutes
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average} / 10 (
            {movie.vote_count} votes)
          </p>
          <p>
            <strong>Genres:</strong>{" "}
            {movie.genres.map((g) => g.name).join(", ")}
          </p>
          <p>
            <strong>Status:</strong> {movie.status}
          </p>
          <p>
            <strong>Original Language:</strong>{" "}
            {movie.original_language.toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
}
