import axios from "axios";
import React, { useEffect, useState } from "react";

import MovieListStructure from "./MovieListStructure";

const Home = () => {
  const Api_key = process.env.REACT_APP_API_KEY;

  const [MoviesListData, setMoviesData] = useState([]);
  const [loader, setLoader] = useState(false);

  const fetchMovieData = async () => {
    try {
      setLoader(true);
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${Api_key}&language=en-US&page=1`
      );
      console.log(data);
      setMoviesData(data.results);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovieData();
  });
  return (
    <>
      <div>
        <MovieListStructure MovieData={MoviesListData} loader={loader} />
      </div>
    </>
  );
};

export default Home;
