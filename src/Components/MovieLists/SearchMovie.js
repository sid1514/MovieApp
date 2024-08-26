import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MovieCard from '../MovieCard/MovieCard';
import { useNavigate } from 'react-router-dom';
import { selectMovie } from '../state/action';

const SearchMovie = () => {
    const searchName = useSelector((state) => state.MovieName);
    const Api_key = process.env.REACT_APP_API_KEY;
    const [MovieData, setMovieData] = useState([]);
    const [loader,setLoader]=useState(false)
    const dispatch = useDispatch();
    const nav = useNavigate();
    const handleMovieSearch = async() => {
       
        try {
            setLoader(true)
            const { data } = await axios.get(
              `https://api.themoviedb.org/3/search/movie?api_key=${Api_key}&language=en-US&query=${searchName}&page=1`
            );
            setMovieData(data.results)
            console.log(MovieData.results);
            setLoader(false)
        } catch (error) {
            console.group(error)
        }
    }

    useEffect(() => {
        if (searchName) {
            handleMovieSearch()
        }
    })
    const showMovieData = (MovieId) => {
      console.log(MovieId);
      //const id = MovieId.toString()
      dispatch(selectMovie(MovieId));
      nav("/MovieData");
    };
  return (
    <div>
      <p className="m-4 md:text-xl text-white">Search for: {searchName}</p>

      <div className="flex flex-wrap pt-4 justify-center text-white ">
        {loader & !MovieData ? (
          <div>
            <img src="Loader.gif" alt="" />
          </div>
        ) : null}
        {MovieData
          ? MovieData.map((m) => (
              <MovieCard
                MovieId={m.id}
                MovieImg={m.poster_path}
                MovieName={m.original_title}
                MovieRating={m.vote_average}
                showMovieData={showMovieData}
              />
            ))
          : null}
      </div>
    </div>
    
  );
}

export default SearchMovie;
