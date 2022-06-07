import axios from "axios";
import { Actors } from "../types";

export async function fetchActors(): Promise<Actors[]> {
    return await axios
        .get("https://dolphin-app-2a7vu.ondigitalocean.app/actor")
        .then((res) => res.data)
        .catch(console.log);
}

export async function fetchActorsById(Actor: string): Promise<Actors[]> {
    return await axios
        .get("https://dolphin-app-2a7vu.ondigitalocean.app/actor/" + Actor)
        .then((res) => res.data)
        .catch(console.log);
}

export async function putActors(Actor: Actors): Promise<Actors[]> {
    return await axios
        .put("https://dolphin-app-2a7vu.ondigitalocean.app/actor/id/" + Actor.idactors, Actor)
        .then((res) => res.data)
        .catch(console.log);
}

export async function postActors(Actor: Actors): Promise<Actors[]> {
    return await axios
        .post("https://dolphin-app-2a7vu.ondigitalocean.app/actor", Actor)
        .then((res) => res.data)
        .catch(console.log);
}

export async function deleteActors(
    Actor: Actors,
  ) {
    await axios
      .delete("https://dolphin-app-2a7vu.ondigitalocean.app/actor", {
        data: Actor,
        headers: {
          "Content-Type": "application/json"
        },
      })
      .catch(console.log);
  }