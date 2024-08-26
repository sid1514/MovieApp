import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { searchMovie, SearchPageNum } from "./state/action";

const NavComp = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [MovieName, setMovieName] = useState("");
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [Active, SetActive] = useState("Popular");
  const handleSearchInput = () => {
    if (MovieName) {
      dispatch(searchMovie(MovieName));
      nav("/SearchMovie");
      dispatch(SearchPageNum(1));
      setMovieName("");
    }
  };

  const handleInputChange = (e) => {
    setMovieName(e.target.value);
    dispatch(SearchPageNum(1));
  };
  const ResNavContainerCss = `${
    showMenu ? "flex-col text-white " : "hidden"
  } md:flex md:flex-row md:py-0 py-4 space-x-4`;

  const navMenuCss = "hover:text-white underline-offset-4 text-neutral-400";

  return (
    <>
      <div className="flex md:h-16 h-10 max-h-max p-6 bg-neutral-900 text-white align-center shadow-lg">
        <div
          className="flex-1 md:mr-0 mr-6"
          onClick={() => setShowMenu(false)}
        >
          <NavLink to="/" exact>
            <h1>MovieDB</h1>
          </NavLink>
        </div>
        <div className="bg-neutral-700 md:bg-transparent flex ">
          <div className={ResNavContainerCss}>
            <nav className="md:w-[100%] w-full md:w-auto md:bg-transparent bg-neutral-800 text-white ">
              <ul className="md:flex md:flex-row flex-col md:space-x-4 ml-10 pt-6 md:pt-0 md:space-y-0 space-y-6">
                <li
                  className={`${navMenuCss} ${
                    Active === "Popular" ? "underline" : null
                  }`}
                  onClick={() => SetActive("Popular")}
                >
                  <NavLink to="/" exact>
                    Popular
                  </NavLink>
                </li>
                <li
                  className={`${navMenuCss} ${
                    Active === "Top Rated" ? "underline" : null
                  }`}
                  onClick={() => SetActive("Top Rated")}
                >
                  <NavLink to="/TopRated">Top Rated</NavLink>
                </li>
                <li
                  className={`${navMenuCss} ${
                    Active === "Upcoming" ? "underline" : null
                  }`}
                  onClick={() => SetActive("Upcoming")}
                >
                  <NavLink to="/Upcoming">Upcoming</NavLink>
                </li>
                <li
                  className={`${navMenuCss} ${
                    Active === "Search" ? "underline" : null
                  }`}
                  onClick={() => SetActive("Search")}
                >
                  <input
                    type="text"
                    placeholder="search movie"
                    className="px-2 md:w-auto text-sm md:text-auto rounded h-6 text-black"
                    value={MovieName}
                    onChange={handleInputChange}
                  />
                  <button
                    className="w-16 text-sm md:text-auto bg-gray-500 rounded p-1 md:my-0 my-3 mb-4 hover:bg-gray-700"
                    onClick={handleSearchInput}
                  >
                    Search
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          <div
            className="md:hidden block z-10 absolute right-10"
            onClick={() => setShowMenu(!showMenu)}
          >
            <img
              src="https://img.icons8.com/?size=100&id=8113&format=png&color=FFFFFF"
              alt="menu"
              className="w-6 h-6 "
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NavComp;
