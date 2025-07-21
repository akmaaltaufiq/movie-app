// src/utils/favorite.js

const FAVORITES_KEY = "favorite_movies";

export function getFavorites() {
  const raw = localStorage.getItem(FAVORITES_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveFavorite(movie) {
  const favorites = getFavorites();
  const exists = favorites.find((m) => m.id === movie.id);
  if (!exists) {
    favorites.push(movie);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

export function removeFavorite(id) {
  const favorites = getFavorites().filter((m) => m.id !== id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function isFavorite(id) {
  return getFavorites().some((m) => m.id === id);
}
