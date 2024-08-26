import React, { useEffect, useState } from "react";
import MovieCard from "../MovieCard/MovieCard";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectMovie } from "../state/action";

const Upcoming = () => {
  const Api_key = process.env.REACT_APP_API_KEY;
  const dispatch = useDispatch();
  const [MoviesListData, setMoviesData] = useState([]);
  const [currentPage, setCurrentPag] = useState(1);
  const [loader, setLoader] = useState(false);
  const nav = useNavigate();
  const fetchMovieData = async () => {
    try {
      setLoader(true);
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${Api_key}&language=en-US&page=1`
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
  });
  const lastMovieCard = currentPage * 8;
  const firstMovieCard = lastMovieCard - 8;
  const currentUpcomingList = MoviesListData.slice(firstMovieCard, lastMovieCard);
  const handlePageChange = () => {
    setCurrentPag(currentPage + 1);
  };
  const handlePageChangeback = () => {
    setCurrentPag(currentPage - 1);
  };
  return (
    <>
      <div className="flex flex-wrap pt-4 justify-center text-white ">
        {loader && !MoviesListData ? (
          <div>
            <img src="Loader.gif" alt="" />
          </div>
        ) : null}
        {currentUpcomingList.map((m) => (
          <MovieCard
            MovieId={m.id}
            MovieImg={m.poster_path}
            MovieName={m.original_title}
            MovieRating={m.vote_average}
            showMovieData={showMovieData}
          />
        ))}
      </div>
      <div className="flex justify-center pt-3 align-center text-white">
        <div className="flex justify-center pt-3 align-center space-x-2">
          <button
            className={`${currentPage === 1 ? "blur-sm" : "none"} `}
            onClick={handlePageChangeback}
            disabled={currentPage === 1}
          >
            <img src="leftarrow.png" alt="left" className="w-10 h-10" />
          </button>
          <p className="border px-2 h-8">{currentPage}</p>
          <button
            onClick={handlePageChange}
            disabled={currentPage === 3}
            className={`${currentPage === 3 ? "blur-sm" : "none"} `}
          >
            <img
              src="leftarrow.png"
              alt="right"
              className="rotate-180 w-10 h-10"
            />
          </button>
        </div>
      </div>
      <div className="flex justify-center mt-2">
        <div className="flex space-x-1">
          <div
            className={`w-4 h-4 rounded-full ${
              currentPage === 1 ? "bg-black" : "bg-white"
            } `}
          ></div>
          <div
            className={`w-4 h-4 rounded-full ${
              currentPage === 2 ? "bg-black" : "bg-white"
            } `}
          ></div>
          <div
            className={`w-4 h-4 rounded-full ${
              currentPage === 3 ? "bg-black" : "bg-white"
            } `}
          ></div>
        </div>
      </div>
    </>
  );
};

export default Upcoming;
