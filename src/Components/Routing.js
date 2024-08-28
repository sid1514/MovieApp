import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import Home from "./MovieLists/Home";

import TopRated from "./MovieLists/TopRated";
import Upcoming from "./MovieLists/Upcoming";
import MovieData from "./selctedMovie/MovieData";
import SearchMovie from "./MovieLists/SearchMovie";

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/TopRated" element={<TopRated />} />
        <Route path="/Upcoming" element={<Upcoming />} />
        <Route path="/MovieData" element={<MovieData />} />
        <Route path="/SearchMovie" element={<SearchMovie />} />
      </Routes>
    </>
  );
};

export default Routing;
