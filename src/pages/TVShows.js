import React, { useEffect, useState } from "react";
import { fetchTVShows } from "../api/tmdb";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MovieCard from "../components/MovieCard";
import LoadingSkeleton from "../components/LoadingSkeleton";

const TVShows = () => {
  const [tvShows, setTVShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tvShowsData = await fetchTVShows(page);
        setTVShows(tvShowsData.results);
        setTotalPages(tvShowsData.total_pages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching TV shows:", error);
      }
    };

    fetchData();
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      setLoading(true);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      setLoading(true);
    }
  };

  return (
    <div className="bg-gray-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Popular TV Shows</h1>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <LoadingSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tvShows.map((tvShow) => (
              <MovieCard key={tvShow.id} movie={tvShow} type="tv-show" />
            ))}
          </div>
        )}
        <div className="flex justify-between mt-8">
          <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            className="bg-gray-700 text-white py-2 px-4 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className="bg-gray-700 text-white py-2 px-4 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TVShows;
