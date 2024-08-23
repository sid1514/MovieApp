export const SELECT_MOVIE = "SELECT_MOVIE";
export const SEARCH_MOVIE = "SEARCH_MOVIE";

export const selectMovie = (movieId) => ({
  type: SELECT_MOVIE,
  payload: movieId,
});

export const searchMovie = (name) => ({
  type: SEARCH_MOVIE,
  payload: name,
});
