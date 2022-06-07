import axios from "axios";
import { Movie } from "../types";

export async function fetchMovies(): Promise<Movie[]> {
    return await axios
        .get("https://dolphin-app-2a7vu.ondigitalocean.app/movies")
        .then((res) => res.data)
        .catch(console.log);
}

export async function fetchMoviesById(Movie: string): Promise<Movie[]> {
    return await axios
        .get("https://dolphin-app-2a7vu.ondigitalocean.app/movies/" + Movie)
        .then((res) => res.data)
        .catch(console.log);
}

export async function putMovies(Movie: Movie): Promise<Movie[]> {
    return await axios
        .put("https://dolphin-app-2a7vu.ondigitalocean.app/movies/id/" + Movie.idmovies, Movie)
        .then((res) => res.data)
        .catch(console.log);
}

export async function postMovies(Movie: Movie): Promise<Movie[]> {
    return await axios
        .post("https://dolphin-app-2a7vu.ondigitalocean.app/movies", Movie)
        .then((res) => res.data)
        .catch(console.log);
}

export async function deleteMovies(
    Movie: Movie,
  ) {
    await axios
      .delete("https://dolphin-app-2a7vu.ondigitalocean.app/movies", {
        data: Movie,
        headers: {
          "Content-Type": "application/json"
        },
      })
      .catch(console.log);
  }