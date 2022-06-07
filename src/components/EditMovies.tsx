import "../styles/EditForm.css";
import { useRef, useState } from "react";
import { Movie } from "../types";
import { deleteMovies, putMovies } from "../api";
import { Movies } from "../pages";

export default function EditMovies(movie: Movie) {
  const [editingState, setEditingState] = useState(false);

  let nameInput = useRef(null);
  let synopsisInput = useRef(null);
  let idInput = useRef(null);
  let ratingInput = useRef(null);
  let releaseDateInput = useRef(null);
  let isAdultInput = useRef(null);

  async function updateMovie() {
    await putMovies({
      idmovies: movie.idmovies,
      name: nameInput.current.value,
      synopsis: synopsisInput.current.value,
      rating: ratingInput.current.value,
      release_date: releaseDateInput.current.value,
      is_adult: isAdultInput.current.value,
    });
    window.location.reload();
  }

  async function removeMovie() {
    await deleteMovies(movie);
    window.location.reload();
    console.log(movie)
  }

  return (
    <>
      <p onClick={() => setEditingState(true)}>Edit</p>

      {editingState ? (
        <form>
          <div className="edit-form">
            <h1 className="edit-form-title">Update Movie Information</h1>

            <div className="edit-form-inputs">
              <div className="edit-form-label">Name</div>
              <input
                className="edit-form-input"
                ref={nameInput}
                defaultValue={movie.name}
              />
            </div>
            <div className="edit-form-inputs">
              <div className="edit-form-label">Synopsis</div>
              <input
                className="edit-form-input"
                ref={synopsisInput}
                defaultValue={movie.synopsis}
              />
            </div>
            <div className="edit-form-inputs">
              <div className="edit-form-label">Rating</div>
              <input
                className="edit-form-input"
                ref={ratingInput}
                defaultValue={movie.rating}
              />
            </div>
            <div className="edit-form-inputs">
              <div className="edit-form-label">Release Date</div>
              <input
                className="edit-form-input"
                ref={releaseDateInput}
                defaultValue={movie.release_date}
              />
            </div>
            <div className="edit-form-inputs">
              <div className="edit-form-label">Is Adult?</div>
              <input
                className="edit-form-input"
                ref={isAdultInput}
                defaultValue={movie.is_adult}
              />
            </div>
            <div className="edit-form-btns">
              <div onClick={() => setEditingState(false)}>
                <button type="button">Cancel</button>
              </div>
              <div onClick={updateMovie}>
                <button type="button">Update</button>
              </div>
              <div onClick={removeMovie}>
                <button type="button">Delete</button>
              </div>
            </div>
          </div>
          <div
            onClick={() => setEditingState(false)}
            className="edit-form-block"
          />
        </form>
      ) : null}
    </>
  );
}
