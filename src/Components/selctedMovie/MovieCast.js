import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MovieCast = () => {
  //
  const [MovieCasts, setMovieCasts] = useState([]);
  const [loader, setLoader] = useState(false);
  const MovieId = useSelector((state) => state.MovieId);
  const Api_key = process.env.REACT_APP_API_KEY;
  const fetchMovieCasts = async () => {
    try {
      setLoader(true);
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${MovieId}/credits?api_key=${Api_key}&language=en-US`
      );
      console.log(data);
      setMovieCasts(data.cast);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovieCasts();
  });
  return (
    <>
      <div className="w-full h-full p-6 bg-neutral-600 md:flex flex flex-wrap ">
        {MovieCasts.slice(0, 8).map((m) => (
          <div key={m.id} className="md:w-1/4 my-2 ">
            <div className="">
              <img
                src={`https://image.tmdb.org/t/p/w500${m.profile_path}`}
                alt={m.name}
                className="md:w-[48%] w-[30%] md:h-[20%] h-[25%] "
              />
            </div>
            <div className="text-sm md:text-auto md:w-[45%] w-30%">
              <p>{m.name}</p>
              <p>character:{m.character}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MovieCast;
