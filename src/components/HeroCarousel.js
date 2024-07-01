import React from "react";
import Slider from "react-slick";
import { format } from "date-fns";

const HeroCarousel = ({ movies }) => {
  const settings = {
    dots: true,
    speed: 500,
    arrows: false,
    infinite: true,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
  };

  return (
    <Slider {...settings}>
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="relative h-[80vh] bg-cover bg-center -mb-2"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.bzackdrop_path})`,
          }}
        >
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="object-cover h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black opacity-70 to-black"></div>
          <div className="absolute bottom-0 left-0 p-8 max-w-4xl h-full w-full">
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">
              {movie.title}
            </h1>
            <p className="text-white mb-4 min-h-28 font-thin md:text-lg">
              {movie.overview}
            </p>
            <div className="flex sm:space-x-4">
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="sm:!block !hidden h-full object-cover rounded-lg"
              />
              <div className="text-white space-y-2 md:text-lg">
                <p className="font-semibold">
                  Release Date:{" "}
                  <span className="font-thin">
                    {format(new Date(movie.release_date), "MMMM dd, yyyy")}
                  </span>
                </p>
                <p className="font-semibold">
                  Actors:{" "}
                  <span className="font-thin">
                    {movie.actors && movie.actors.length > 0
                      ? movie.actors
                          .slice(0, 5)
                          .map((actor) => actor.name)
                          .join(", ")
                      : "Not available"}
                  </span>
                </p>
                <p className="font-semibold">
                  Production:{" "}
                  <span className="font-thin">
                    {movie.production_companies[0].name}
                  </span>
                </p>
                <p className="font-semibold">
                  Platform:{" "}
                  <span className="font-thin">
                    {movie.platform || "Not available"}
                  </span>
                </p>
                <p className="font-semibold">
                  Rating:{" "}
                  <span className="font-thin">{movie.vote_average} / 10</span>
                </p>
                <p className="font-semibold">
                  Genres:{" "}
                  <span className="font-thin">
                    {movie.genres.map((genre) => genre.name).join(", ")}
                  </span>
                </p>
                <div className="flex space-x-4">
                  <button className="bg-red-600 px-6 py-2.5 rounded text-white hover:bg-red-700">
                    Watch Now
                  </button>
                  <button className="bg-gray-600 px-6 py-2.5 rounded text-white hover:bg-gray-700">
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default HeroCarousel;
