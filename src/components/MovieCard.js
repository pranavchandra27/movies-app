import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const MovieCard = ({ movie, type }) => {
  const movieTitle = type === "movie" ? movie.title : movie.name;
  const movieReleaseDate =
    type === "movie" ? movie.release_date : movie.first_air_date;
  const placeholderImage = "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <Link
      to={`/${type}/${movie.id}`}
      className="transform transition-transform duration-300 hover:scale-105"
    >
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
              : placeholderImage
          }
          alt={movieTitle}
          className="w-full h-[450px] sm:h-full object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white mb-2 truncate">
            {movieTitle}
          </h3>
          <p className="text-gray-400 text-sm">
            {format(new Date(movieReleaseDate), "MMMM dd, yyyy")}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
