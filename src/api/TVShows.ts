import axios from "axios";
import { TVShow } from "../types";

export async function fetchTVShows(): Promise<TVShow[]> {
    return await axios
        .get("https://dolphin-app-2a7vu.ondigitalocean.app/tvshows")
        .then((res) => res.data)
        .catch(console.log);
}

export async function fetchTVShowsById(TVShow: string): Promise<TVShow[]> {
    return await axios
        .get("https://dolphin-app-2a7vu.ondigitalocean.app/tvshows/" + TVShow)
        .then((res) => res.data)
        .catch(console.log);
}

export async function putTVShows(TVShow: TVShow): Promise<TVShow[]> {
    return await axios
        .put("https://dolphin-app-2a7vu.ondigitalocean.app/tvshows/id/" + TVShow.idtvshows, TVShow)
        .then((res) => res.data)
        .catch(console.log);
}

export async function postTVShows(TVShow: TVShow): Promise<TVShow[]> {
    return await axios
        .post("https://dolphin-app-2a7vu.ondigitalocean.app/tvshows", TVShow)
        .then((res) => res.data)
        .catch(console.log);
}

export async function deleteTVShows(
    TVShow: TVShow,
  ) {
    await axios
      .delete("https://dolphin-app-2a7vu.ondigitalocean.app/tvshows", {
        data: TVShow,
        headers: {
          "Content-Type": "application/json"
        },
      })
      .catch(console.log);
  }