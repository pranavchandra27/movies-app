import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Movies from "./Movies";
import { fetchMovies } from "../api/tmdb";

jest.mock("../api/tmdb");

test("renders popular movies", async () => {
  fetchMovies.mockResolvedValueOnce({
    results: [
      {
        id: 1,
        title: "Test Movie",
        poster_path: "/test.jpg",
        release_date: "2024-06-30",
      },
    ],
  });

  render(<Movies />);

  await waitFor(() => {
    expect(screen.getByText("Test Movie")).toBeInTheDocument();
    expect(screen.getByText("2024-06-30")).toBeInTheDocument();
  });
});
