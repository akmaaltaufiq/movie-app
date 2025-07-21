import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../services/api";
import MovieCard from "../components/MovieCard";

export default function Search() {
  const [params] = useSearchParams();
  const query = params.get("q") || "";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setError("Masukkan kata kunci pencarian.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    searchMovies(query)
      .then((data) => {
        if (data && Array.isArray(data.results)) {
          setResults(data.results);
          if (data.results.length === 0) {
            setError("Tidak ditemukan hasil untuk pencarian ini.");
          }
        } else {
          setResults([]);
          setError("Data hasil pencarian tidak valid.");
        }
      })
      .catch(() => {
        setResults([]);
        setError("Terjadi kesalahan saat mencari film.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query]);

  return (
    <div className="pt-24 px-4 max-w-7xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Search Results for "{query}"</h2>

      {loading && <p className="text-blue-600">Loading search results...</p>}

      {!loading && error && <p className="text-red-600">{error}</p>}

      {!loading && !error && results.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
