import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../api/tmdb";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MovieDetailSkeleton from "../components/MovieDetailSkeleton";
import { format } from "date-fns";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFullCast, setShowFullCast] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieData = await fetchMovieDetails(id);
        setMovie(movieData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleViewMoreClick = () => {
    setShowFullCast(true);
  };

  const placeholderImage = "https://via.placeholder.com/200x300?text=No+Image";

  if (loading) {
    return (
      <div className="bg-gray-900 text-white">
        <Navbar />
        <MovieDetailSkeleton />
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="relative">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-96 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
          <div className="absolute bottom-0 left-0 p-8">
            <h1 className="text-4xl md:text-6xl font-bold">{movie.title}</h1>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-3xl font-bold mb-4">Overview</h2>
          <p className="mb-8">{movie.overview}</p>
          <h2 className="text-3xl font-bold mb-4">Details</h2>
          <p className="mb-4">
            Release Date:{" "}
            {format(new Date(movie.release_date), "MMMM dd, yyyy")}
          </p>
          <p className="mb-4">Rating: {movie.vote_average} / 10</p>
          <p className="mb-4">
            Genres: {movie.genres.map((genre) => genre.name).join(", ")}
          </p>
          <h2 className="text-3xl font-bold mb-4">Cast</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {movie.actors
              .slice(0, showFullCast ? movie.actors.length : 6)
              .map((actor) => (
                <div key={actor.name} className="text-center">
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                        : placeholderImage
                    }
                    alt={actor.name}
                    className="w-full h-auto object-cover rounded-lg mb-2"
                  />
                  <p className="text-lg font-bold">{actor.name}</p>
                  <p className="text-sm text-gray-400">{actor.character}</p>
                </div>
              ))}
          </div>
          {!showFullCast && movie.actors.length > 6 && (
            <div className="flex justify-center mt-4">
              <button
                onClick={handleViewMoreClick}
                className="bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700"
              >
                View More
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MovieDetail;
