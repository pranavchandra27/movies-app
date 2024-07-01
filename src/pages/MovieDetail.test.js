// src/pages/MovieDetail.test.js
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import MovieDetail from "./MovieDetail";
import { fetchMovieDetails } from "../api/tmdb";

jest.mock("../api/tmdb");

test("renders movie details", async () => {
  const mockMovieDetails = {
    id: 1,
    title: "Test Movie",
    poster_path: "/test.jpg",
    overview: "Test overview",
    release_date: "2021-01-01",
  };
  fetchMovieDetails.mockResolvedValueOnce(mockMovieDetails);

  render(
    <MemoryRouter initialEntries={["/movie/1"]}>
      <Route path="/movie/:id">
        <MovieDetail />
      </Route>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText("Test Movie")).toBeInTheDocument();
    expect(screen.getByText("Test overview")).toBeInTheDocument();
    expect(screen.getByText("Release Date: 2021-01-01")).toBeInTheDocument();
  });
});
