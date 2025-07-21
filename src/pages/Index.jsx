// pages/index.jsx
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import SortFilter from "../components/SortFilter";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [sortBy, setSortBy] = useState("popularity.desc");

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?sort_by=${sortBy}&api_key=YOUR_API_KEY`
        );
        const data = await res.json();
        setMovies(data.results || []);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    }
    fetchMovies();
  }, [sortBy]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">Trending Movies</h1>
      <SortFilter sortBy={sortBy} setSortBy={setSortBy} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}
