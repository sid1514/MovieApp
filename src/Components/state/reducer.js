import {

  SEARCH_MOVIE,
  SELECT_MOVIE,
} from "./action";

const intialState = {
  MovieId: null,
  MovieName: "",
  movieDetails: null,
  loading: false,
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

   
    default:
      return state;
  }
};
