import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../MovieCard/MovieCard";
import { useNavigate } from "react-router-dom";
import { selectMovie } from "../state/action";

const SearchMovie = () => {
  const searchName = useSelector((state) => state.MovieName);
  const [totalPages, settotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(
    useSelector((state) => state.searchPage)
  );
  const Api_key = process.env.REACT_APP_API_KEY;
  const [MovieData, setMovieData] = useState([]);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleMovieSearch = async () => {
    try {
      setLoader(true);
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${Api_key}&language=en-US&query=${searchName}&page=${currentPage}`
      );
      setMovieData(data.results);
      settotalPages(data.total_pages)
      console.log(data);
      setLoader(false);
    } catch (error) {
      console.group(error);
    }
  };

  useEffect(() => {
    if (searchName) {
      handleMovieSearch();
    }
  });
  const showMovieData = (MovieId) => {
    console.log(MovieId);
    //const id = MovieId.toString()
    dispatch(selectMovie(MovieId));
    nav("/MovieData");
  };
  const handlePageChange = () => {
    setCurrentPage(currentPage + 1);
  };
  const handlePageChangeback = () => {
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchName]);
  return (
    <div>
      <p className="m-4 md:text-xl text-white">Search for: {searchName}</p>

      <div className="flex flex-wrap pt-4 justify-center text-white ">
        {loader & !MovieData ? (
          <div>
            <img src="Loader.gif" alt="" />
          </div>
        ) : null}
        {MovieData.map((m) => (
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
        {MovieData.length > 8 ? (
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
              disabled={currentPage === MovieData.total_pages}
              className={`${
                currentPage === MovieData.total_pages ? "blur-sm" : "none"
              } `}
            >
              <img
                src="leftarrow.png"
                alt="right"
                className="rotate-180 w-8 h-8"
              />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SearchMovie;
