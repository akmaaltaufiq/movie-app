import { useEffect, useState } from "react";
import { getPopularMovies } from "../services/api";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";

const SORT_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "title-asc", label: "Title A - Z" },
  { value: "title-desc", label: "Title Z - A" },
  { value: "release-new", label: "Newest Release" },
  { value: "release-old", label: "Oldest Release" },
  { value: "rating", label: "Highest Rating" },
];

const MOVIES_PER_PAGE = 30;

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState("default");
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Ambil dua halaman data (20 + 20 = 40 film)
        const dataPage1 = await getPopularMovies(page * 2 - 1);
        const dataPage2 = await getPopularMovies(page * 2);

        // Gabungkan results 2 halaman jadi 40 film
        const combinedResults = [
          ...(dataPage1.results || []),
          ...(dataPage2.results || []),
        ];

        // Update total results dan total pages berdasarkan total_results API dan per 30 film di UI
        setTotalResults(dataPage1.total_results || 0);
        setTotalPages(
          Math.ceil((dataPage1.total_results || 0) / MOVIES_PER_PAGE)
        );

        // Slice hasil gabungan untuk 30 film per halaman
        const slicedMovies = combinedResults.slice(0, MOVIES_PER_PAGE);

        setMovies(slicedMovies);
      } catch (error) {
        setMovies([]);
        setTotalResults(0);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page]);

  const sortMovies = (type, list) => {
    const sorted = [...list];
    switch (type) {
      case "title-asc":
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case "title-desc":
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      case "release-new":
        return sorted.sort(
          (a, b) => new Date(b.release_date) - new Date(a.release_date)
        );
      case "release-old":
        return sorted.sort(
          (a, b) => new Date(a.release_date) - new Date(b.release_date)
        );
      case "rating":
        return sorted.sort((a, b) => b.vote_average - a.vote_average);
      default:
        return list;
    }
  };

  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };

  const sortedMovies = sortMovies(sortType, movies);

  return (
    <div className="pt-24 px-4 max-w-7xl mx-auto">
      {/* Info total movies dan sort bar di sebelah kanan */}
      <div className="flex justify-end items-center mb-6 space-x-6">
        <div className="text-gray-700 text-sm flex items-center space-x-2 whitespace-nowrap">
          <span>Total Movies:</span>
          <span className="font-semibold">{totalResults.toLocaleString()}</span>
          <span className="ml-4">Sort by:</span>
        </div>

        <select
          id="sort"
          value={sortType}
          onChange={handleSortChange}
          className="px-3 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Movie Grid */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[300px] text-blue-600 text-lg">
          Loading movies...
        </div>
      ) : movies.length === 0 ? (
        <div className="flex justify-center items-center min-h-[300px] text-red-500 text-lg">
          No movies found.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {sortedMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {/* Pagination */}
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
      )}
    </div>
  );
}
