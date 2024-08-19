import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MovieCast from "./MovieCast";

const MovieData = () => {
  const [MovieDetails, setMovieDetails] = useState([]);
  const [loader, setLoader] = useState(false);
  const MovieId = useSelector((state) => state.MovieId);
  const Api_key = process.env.REACT_APP_API_KEY;
  const fetchSelctedMovie = async () => {
    try {
      setLoader(true);
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${MovieId}?api_key=${Api_key}&language=en-US`
      );
      //console.log(data);
      setMovieDetails(data);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSelctedMovie();
  }, []);

  return (
    <>
      <div className="w-full h-full text-white md:p-4 bg-grey-600">
        {loader & !MovieDetails ? (
          <div>
            <img src="Loader.gif" alt="" />
          </div>
        ) : null}
        <div
          className="bgImgSize md:m-4 md:p-4 flex md:bg-right bg-auto bg-no-repeat bg-blend-screen w-11/12"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500${MovieDetails.backdrop_path})`,
          }}
        >
          <div className="md:w-1/2 ">
            <div className="flex my-6 ">
              <div className="w-2/3 flex space-x-4 pl-6 md:pl-0">
                <img
                  src={`https://image.tmdb.org/t/p/w500${MovieDetails.poster_path}`}
                  alt=""
                  className="h-10/12 w-1/3 shadow-lg"
                />
                <div className="text-sm md:text-auto font-bold">
                  <p>{MovieDetails.original_title}</p>
                  <p>{MovieDetails.vote_average}</p>
                  <p>{MovieDetails.runtime}</p>
                </div>
              </div>
            </div>
            <div className="md:w-2/3 text-sm md:text-auto mb-4 md:mt-0 mt-24">
              <p>Overview</p>
              <p>{MovieDetails.overview}</p>
            </div>
          </div>
        </div>
        <div className="w-11/12">
          <MovieCast />
        </div>
      </div>
    </>
  );
};

export default MovieData;
