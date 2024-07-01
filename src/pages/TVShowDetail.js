import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTVShowDetails } from '../api/tmdb';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { format } from 'date-fns';

const TVShowDetail = () => {
  const { id } = useParams();
  const [tvShow, setTVShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFullCast, setShowFullCast] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tvShowData = await fetchTVShowDetails(id);
        setTVShow(tvShowData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching TV show details:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleViewMoreClick = () => {
    setShowFullCast(true);
  };

  const placeholderImage = 'https://via.placeholder.com/200x300?text=No+Image';

  if (loading) {
    return (
      <div className="bg-gray-900 text-white">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <LoadingSkeleton />
        </div>
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
            src={`https://image.tmdb.org/t/p/original${tvShow.backdrop_path}`}
            alt={tvShow.name}
            className="w-full h-96 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
          <div className="absolute bottom-0 left-0 p-8">
            <h1 className="text-4xl md:text-6xl font-bold">{tvShow.name}</h1>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-3xl font-bold mb-4">Overview</h2>
          <p className="mb-8">{tvShow.overview}</p>
          <h2 className="text-3xl font-bold mb-4">Details</h2>
          <p className="mb-4">First Air Date: {format(new Date(tvShow.first_air_date), 'MMMM dd, yyyy')}</p>
          <p className="mb-4">Rating: {tvShow.vote_average} / 10</p>
          <p className="mb-4">Genres: {tvShow.genres.map(genre => genre.name).join(', ')}</p>
          <h2 className="text-3xl font-bold mb-4">Cast</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {tvShow.actors.slice(0, showFullCast ? tvShow.actors.length : 6).map(actor => (
              <div key={actor.name} className="text-center">
                <img
                  src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : placeholderImage}
                  alt={actor.name}
                  className="w-full h-auto object-cover rounded-lg mb-2"
                />
                <p className="text-lg font-bold">{actor.name}</p>
                <p className="text-sm text-gray-400">{actor.character}</p>
              </div>
            ))}
          </div>
          {!showFullCast && tvShow.actors.length > 6 && (
            <div className="flex justify-center mt-4">
              <button onClick={handleViewMoreClick} className="bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700">
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

export default TVShowDetail;
