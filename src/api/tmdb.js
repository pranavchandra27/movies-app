const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BEARER_TOKEN = process.env.REACT_APP_TMDB_BEARER_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';

const fetchFromTMDb = async (endpoint) => {
  const url = `${BASE_URL}${endpoint}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${BEARER_TOKEN}`
    }
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export const fetchMovies = async (page = 1) => {
  return fetchFromTMDb(`/movie/popular?page=${page}`);
};

export const fetchTVShows = async (page = 1) => {
  return fetchFromTMDb(`/tv/popular?page=${page}`);
};

export const fetchMovieDetails = async (id) => {
  const movieDetails = await fetchFromTMDb(`/movie/${id}`);
  const credits = await fetchFromTMDb(`/movie/${id}/credits`);
  movieDetails.actors = credits.cast.map(actor => ({
    name: actor.name,
    profile_path: actor.profile_path,
    character: actor.character
  }));
  return movieDetails;
};

export const fetchTVShowDetails = async (id) => {
  const tvShowDetails = await fetchFromTMDb(`/tv/${id}`);
  const credits = await fetchFromTMDb(`/tv/${id}/credits`);
  tvShowDetails.actors = credits.cast.map(actor => ({
    name: actor.name,
    profile_path: actor.profile_path,
    character: actor.character
  }));
  return tvShowDetails;
};

export const fetchUpcomingMovies = async (page = 1) => {
  return fetchFromTMDb(`/movie/upcoming?page=${page}`);
};

export const fetchTopRatedMovies = async (page = 1) => {
  return fetchFromTMDb(`/movie/top_rated?page=${page}`);
};

export const fetchLatestMovies = async (page = 1) => {
  return fetchFromTMDb(`/movie/latest?page=${page}`);
};

export const fetchNowPlayingMovies = async (page = 1) => {
  return fetchFromTMDb(`/movie/now_playing?page=${page}`);
};
