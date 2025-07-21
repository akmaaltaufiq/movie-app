// components/SortFilter.jsx
import React from "react";

export default function SortFilter({ sortBy, setSortBy }) {
  return (
    <div className="mb-4">
      <label htmlFor="sort" className="mr-2 font-semibold text-sm">
        Sort by:
      </label>
      <select
        id="sort"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="border px-2 py-1 rounded-md text-sm"
      >
        <option value="popularity.desc">Popularity Desc</option>
        <option value="popularity.asc">Popularity Asc</option>
        <option value="vote_average.desc">Rating Desc</option>
        <option value="vote_average.asc">Rating Asc</option>
        <option value="release_date.desc">Newest</option>
        <option value="release_date.asc">Oldest</option>
      </select>
    </div>
  );
}
