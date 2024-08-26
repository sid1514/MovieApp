import React from "react";

const MovieCard = ({
  MovieImg,
  MovieName,
  MovieRating,
  MovieId,
  showMovieData,
}) => {
  return (
    <div
      className="md:w-[25%] mt-4 md:h-min w-[50%] mb-1 hover:bg-neutral-700 rounded"
      onClick={() => showMovieData(MovieId)}
    >
      <div className="flex justify-center align-center">
        <div className="w-2/3 md:w-1/2 shadow-lg p-1">
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500${MovieImg}`}
              alt={MovieName}
              className="h-1/2"
            />
          </div>
          <div className=" md:text-auto text-sm text-center">
            <p>{MovieName}</p>
            <p>{MovieRating.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
