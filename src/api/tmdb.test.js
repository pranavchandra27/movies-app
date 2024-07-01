import { fetchMovies, fetchTVShows, fetchMovieDetails } from "./tmdb";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ results: [{ id: 1, title: "Test Movie" }] }),
  })
);

describe("TMDb API", () => {
  afterEach(() => {
    fetch.mockClear();
  });

  it("fetches popular movies", async () => {
    const movies = await fetchMovies();
    expect(movies).toEqual([{ id: 1, title: "Test Movie" }]);
  });

  it("fetches popular TV shows", async () => {
    const tvShows = await fetchTVShows();
    expect(tvShows).toEqual([{ id: 1, title: "Test Movie" }]);
  });

  it("fetches movie details", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: 1, title: "Test Movie" }),
      })
    );

    const movie = await fetchMovieDetails(1);
    expect(movie).toEqual({ id: 1, title: "Test Movie" });
  });
});
