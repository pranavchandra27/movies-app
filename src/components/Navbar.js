import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          MyMovieApp
        </Link>
        <div>
          <Link to="/movies" className="text-white mx-2">
            Movies
          </Link>
          <Link to="/tv-shows" className="text-white mx-2">
            TV Shows
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
