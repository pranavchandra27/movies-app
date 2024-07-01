import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetail from "./pages/MovieDetail";
import TVShows from "./pages/TVShows";
import TVShowDetail from "./pages/TVShowDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/tv-shows" element={<TVShows />} />
        <Route path="/tv-show/:id" element={<TVShowDetail/>} />
        {/* Add routes for other pages */}
      </Routes>
    </Router>
  );
}

export default App;
