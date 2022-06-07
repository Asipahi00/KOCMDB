import "../styles/EditForm.css";
import { useRef, useState } from "react";
import { TVShow } from "../types";
import { deleteTVShows, putTVShows } from "../api";

export default function EditTVShows(tvshow: TVShow) {
  const [editingState, setEditingState] = useState(false);

  let nameInput = useRef(null);
  let synopsisInput = useRef(null);
  let idInput = useRef(null);
  let ratingInput = useRef(null);
  let releaseDateInput = useRef(null);
  let isAdultInput = useRef(null);
  let leadInput = useRef(null);

  async function updateTVShow() {
    await putTVShows({
    idtvshows: tvshow.idtvshows,
    name: nameInput.current.value,
    synopsis: synopsisInput.current.value,
    rating: ratingInput.current.value,
    release_date: releaseDateInput.current.value,
    is_adult: isAdultInput.current.value,
    lead: leadInput.current.value,
});
    window.location.reload();
  }

  async function removeTVShow() {
    await deleteTVShows(tvshow);
    window.location.reload();
    console.log(tvshow)
  }

  return (
    <>
      <p onClick={() => setEditingState(true)}>Edit</p>

      {editingState ? (
        <form>
          <div className="edit-form">
            <h1 className="edit-form-title">Update TV Show Information</h1>

            <div className="edit-form-inputs">
              <div className="edit-form-label">Name</div>
              <input
                className="edit-form-input"
                ref={nameInput}
                defaultValue={tvshow.name}
              />
            </div>
            <div className="edit-form-inputs">
              <div className="edit-form-label">Synopsis</div>
              <input
                className="edit-form-input"
                ref={synopsisInput}
                defaultValue={tvshow.synopsis}
              />
            </div>
            <div className="edit-form-inputs">
              <div className="edit-form-label">Rating</div>
              <input
                className="edit-form-input"
                ref={ratingInput}
                defaultValue={tvshow.rating}
              />
            </div>
            <div className="edit-form-inputs">
              <div className="edit-form-label">Release Date</div>
              <input
                className="edit-form-input"
                ref={releaseDateInput}
                defaultValue={tvshow.release_date}
              />
            </div>
            <div className="edit-form-inputs">
              <div className="edit-form-label">Is Adult?</div>
              <input
                className="edit-form-input"
                ref={isAdultInput}
                defaultValue={tvshow.is_adult}
              />
            </div>
            <div className="edit-form-inputs">
              <div className="edit-form-label">Lead Actor</div>
              <input
                className="edit-form-input"
                ref={leadInput}
                defaultValue={tvshow.lead}
              />
            </div>
            <div className="edit-form-btns">
              <div onClick={() => setEditingState(false)}>
                <button type="button">Cancel</button>
              </div>
              <div onClick={updateTVShow}>
                <button type="button">Update</button>
              </div>
              <div onClick={removeTVShow}>
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
