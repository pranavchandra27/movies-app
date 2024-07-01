import React from "react";
import Slider from "react-slick";
import MovieCard from "./MovieCard";

const Carousel = ({ items, type }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {items.map((item) => (
        <div key={item.id} className="p-2">
          <MovieCard movie={item} type={type} />
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
