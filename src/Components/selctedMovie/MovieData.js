import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MovieCast from "./MovieCast";

const MovieData = () => {
  const [MovieDetails, setMovieDetails] = useState([]);
  const [MovieGenres, setMovieGenres] = useState([]);
  const [loader, setLoader] = useState(false);
  const MovieId = useSelector((state) => state.MovieId);
  const Api_key = process.env.REACT_APP_API_KEY;
  const fetchSelctedMovie = async () => {
    try {
      setLoader(true);
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${MovieId}?api_key=${Api_key}&language=en-US`
      );
     
      setMovieDetails(data);
      setMovieGenres(data.genres)
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };
 console.log(MovieGenres);
  useEffect(() => {
    fetchSelctedMovie();
  }, []);

  return (
    <>
      <div className="w-11/12 h-full text-white md:p-4 bg-gradient-to-r from-neutral-700 via-neutral-800 to-neutral-900 p-2">
        {loader & !MovieDetails ? (
          <div>
            <img src="Loader.gif" alt="" />
          </div>
        ) : null}
        <div
          className="bgImgSize md:m-4 md:p-4 flex md:bg-right bg-auto bg-no-repeat bg-blend-screen"
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
                  className="md:h-10/12 h-9/12 w-1/2 shadow-lg"
                />
                <div className=" md:text-auto w-full">
                  <p className="font-semibold md:text-xl text-auto">
                    {MovieDetails.original_title}
                  </p>
                  <p className="pt-2 text-blue-500 font-semibold text-sm md:text-auto">
                    Rating: {MovieDetails.vote_average}
                  </p>
                  <div className="flex ">
                    <p className="pt-3 text-sm md:text-auto mr-1">
                      {MovieDetails.runtime} min  |
                    </p>
                    {MovieGenres.map((g) => (
                      <p className="pt-3 text-sm "> {g.name},</p>
                    ))}
                  </div>

                  <p className="pt-3 text-sm md:text-auto">
                    Release date:{MovieDetails.release_date}
                  </p>
                </div>
              </div>
            </div>
            <div className="md:w-2/3 text-sm md:text-auto mb-4 md:mt-0 mt-10">
              <p>Overview</p>
              <p>{MovieDetails.overview}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-11/12 text-white">
        <MovieCast />
      </div>
    </>
  );
};

export default MovieData;
