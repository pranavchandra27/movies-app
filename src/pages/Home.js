import React, { useEffect, useState } from "react";
import {
  fetchMovies,
  fetchTVShows,
  fetchMovieDetails,
  fetchUpcomingMovies,
  fetchTopRatedMovies,
  // fetchLatestMovies,
  fetchNowPlayingMovies,
} from "../api/tmdb";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Carousel from "../components/Carousel";
import LoadingSkeletonCarousel from "../components/LoadingSkeletonCarousel";

const Home = () => {
  const [topMovies, setTopMovies] = useState([]);
  const [topTVShows, setTopTVShows] = useState([]);
  const [heroMovies, setHeroMovies] = useState(null);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  // const [latestMovies, setLatestMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moviesData = await fetchMovies();
        const heroMoviesData = await Promise.all(
          moviesData.results
            .slice(0, 5)
            .map((movie) => fetchMovieDetails(movie.id))
        );
        const upcomingData = await fetchUpcomingMovies();
        const topRatedData = await fetchTopRatedMovies();
        // const latestData = await fetchLatestMovies();
        const nowPlayingData = await fetchNowPlayingMovies();

        setTopMovies(moviesData.results);
        setHeroMovies(heroMoviesData);
        setUpcomingMovies(upcomingData.results);
        setTopRatedMovies(topRatedData.results);
        // setLatestMovies([latestData]); // Latest endpoint typically returns a single movie
        setNowPlayingMovies(nowPlayingData.results);

        const tvShowsData = await fetchTVShows();
        setTopTVShows(tvShowsData.results);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-900 text-white">
      <Navbar />
      {loading ? (
        <div className="h-[80vh] bg-gray-800 animate-pulse"></div>
      ) : (
        <HeroSection movies={heroMovies} />
      )}
      <div className="container mx-auto px-8 py-8">
        <h2 className="text-2xl font-bold mb-4">Top Movies</h2>
        {loading ? (
          <LoadingSkeletonCarousel />
        ) : (
          <Carousel items={topMovies} type="movie" />
        )}
        <h2 className="text-2xl font-bold mb-4 mt-8">Top TV Shows</h2>
        {loading ? (
          <LoadingSkeletonCarousel />
        ) : (
          <Carousel items={topTVShows} type="tv-show" />
        )}
        <h2 className="text-2xl font-bold mb-4 mt-8">Upcoming Movies</h2>
        {loading ? (
          <LoadingSkeletonCarousel />
        ) : (
          <Carousel items={upcomingMovies} type="movie" />
        )}
        <h2 className="text-2xl font-bold mb-4 mt-8">Top Rated Movies</h2>
        {loading ? (
          <LoadingSkeletonCarousel />
        ) : (
          <Carousel items={topRatedMovies} type="movie" />
        )}
        {/* <h2 className="text-2xl font-bold mb-4 mt-8">Latest Movies</h2>
        {loading ? (
          <LoadingSkeletonCarousel />
        ) : (
          <Carousel items={latestMovies} type="movie" />
        )} */}
        <h2 className="text-2xl font-bold mb-4 mt-8">Now Playing Movies</h2>
        {loading ? (
          <LoadingSkeletonCarousel />
        ) : (
          <Carousel items={nowPlayingMovies} type="movie" />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
