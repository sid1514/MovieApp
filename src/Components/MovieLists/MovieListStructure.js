import React, { useEffect, useState } from "react";
import MovieCard from "../MovieCard/MovieCard";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectMovie } from "../state/action";
import axios from "axios";

const MovieListStructure = ({ MovieData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, settotalPages] = useState();
  const dispatch = useDispatch();
  const nav = useNavigate();

  const showMovieData = (MovieId) => {
    //console.log(MovieId);
    //const id = MovieId.toString()
    dispatch(selectMovie(MovieId));

    nav("/MovieData");
  };

  const Api_key = process.env.REACT_APP_API_KEY;

  const [MoviesListData, setMoviesData] = useState([]);
  const [loader, setLoader] = useState(false);

  const fetchMovieData = async () => {
    try {
      setLoader(true);
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${MovieData}?api_key=${Api_key}&language=en-US&page=${currentPage}`
      );
      //console.log(data);
      setMoviesData(data.results);
      settotalPages(data.total_pages);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMovieData();
  }, [currentPage, MovieData]);

  const handlePageChange = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1); // Corrected typo: setCurrentPag -> setCurrentPage
    }
  };
  const handlePageChangeback = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1); // Corrected typo: setCurrentPag -> setCurrentPage
    }
  };

  return (
    <div>
      <div className="flex flex-wrap pt-4 justify-center text-white md:h-full">
        {loader & !MoviesListData.length ? (
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
      <div className="flex justify-center pt-3 align-center text-white ">
        <div className="flex justify-center pt-3 align-center space-x-2">
          <button
            className={`${currentPage === 1 ? "blur-sm" : "none"} `}
            onClick={handlePageChangeback}
            disabled={currentPage === 1}
          >
            <img src="leftarrow.png" alt="left" className="w-8 h-8" />
          </button>
          <div className="flex text-white">
            <p className=" px-2 h-6 rounded text-sm">{currentPage}</p>
            <p>.....</p>
            <p className=" px-2 h-6 rounded text-sm">{totalPages}</p>
          </div>

          <button
            onClick={handlePageChange}
            disabled={currentPage === totalPages}
            className={`${currentPage === totalPages ? "blur-sm" : "none"} `}
          >
            <img
              src="leftarrow.png"
              alt="right"
              className="rotate-180 w-8 h-8"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieListStructure;
