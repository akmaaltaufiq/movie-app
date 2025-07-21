import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { saveFavorite, removeFavorite, isFavorite } from "../utils/favorites";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";

export default function MovieCard({ movie }) {
  const [fav, setFav] = useState(false);

  useEffect(() => {
    setFav(isFavorite(movie.id));
  }, [movie.id]);

  const toggleFavorite = () => {
    if (fav) {
      removeFavorite(movie.id);
    } else {
      saveFavorite(movie);
    }
    setFav(!fav);
  };

  return (
    <div
      className="
        rounded-lg 
        overflow-hidden 
        group 
        relative 
        shadow-sm 
        transition-transform transition-shadow duration-300 ease-in-out
        hover:shadow-lg
        hover:scale-[1.05]
        hover:border hover:border-blue-400
      "
      style={{ willChange: "transform, box-shadow, border" }}
    >
      {/* Poster */}
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
        className="w-full aspect-[2/3] object-cover"
      />

      {/* Floating Favorite Button */}
      <button
        onClick={toggleFavorite}
        className="absolute top-2 right-2 bg-white/80 hover:bg-white p-1 rounded-full transition-all z-10"
        aria-label="Toggle Favorite"
      >
        {fav ? (
          <SolidHeartIcon className="h-5 w-5 text-red-500" />
        ) : (
          <OutlineHeartIcon className="h-5 w-5 text-gray-700" />
        )}
      </button>

      {/* Info Block */}
      <div className="px-2 py-3 bg-white min-h-[100px] flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-semibold line-clamp-2">{movie.title}</h3>
          <p className="text-xs text-gray-500">
            {movie.release_date || "Unknown"}
          </p>
          <div className="text-xs text-yellow-500 font-medium mt-1">
            ⭐ {movie.vote_average?.toFixed(1) || "0.0"}
          </div>
        </div>

        <Link
          to={`/detail/${movie.id}`}
          className="text-xs text-blue-600 hover:underline mt-2 inline-block"
        >
          Detail
        </Link>
      </div>
    </div>
  );
}
