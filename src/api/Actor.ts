import axios from "axios";
import { Actors } from "../types";

export async function fetchActors(): Promise<Actors[]> {
    return await axios
        .get("https://dolphin-app-2a7vu.ondigitalocean.app/actor")
        .then((res) => res.data)
        .catch(console.log);
}