import {

  SEARCH_MOVIE,
  SEARCH_PAGE,
  SELECT_MOVIE,
} from "./action";

const intialState = {
  MovieId: null,
  MovieName: "",
  movieDetails: null,
  loading: false,
  searchPage:1,
};

export const MoveiReducer = (state = intialState, action) => {
  switch (action.type) {
    case SELECT_MOVIE:
      return {
        ...state,
        MovieId: action.payload,
      };
    case SEARCH_MOVIE:
      return {
        ...state,
        MovieName: action.payload,
      };

    case SEARCH_PAGE:
      return {
        ...state,
        searchPage: action.payload,
      };
    default:
      return state;
  }
};
