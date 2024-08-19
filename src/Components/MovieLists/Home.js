import axios from "axios";
import React, { useEffect, useState } from "react";
import MovieCard from "../MovieCard/MovieCard";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectMovie } from "../state/action";

const Home = () => {
  const Api_key = process.env.REACT_APP_API_KEY;

  const [MoviesListData, setMoviesData] = useState([]);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const fetchMovieData = async () => {
    try {
      setLoader(true);
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${Api_key}&language=en-US&page=1`
      );
      // console.log(data);
      setMoviesData(data.results);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  const showMovieData = (MovieId) => {
    console.log(MovieId);
    //const id = MovieId.toString()
    dispatch(selectMovie(MovieId));
    nav("/MovieData");
  };

  useEffect(() => {
    fetchMovieData();
  },);
  return (
    <>
      <div className="flex flex-wrap pt-4 justify-center text-white ">
        {loader & !MoviesListData ? (
          <div>
            <img src="Loader.gif" alt="" />
          </div>
        ) : null}
        {MoviesListData.map((m) => (
          <MovieCard
            MovieId={m.id}
            MovieImg={m.poster_path}
            MovieName={m.original_title}
            MovieRating={m.vote_average}
            showMovieData={showMovieData}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
