import "../styles/EditForm.css";
import { useRef, useState } from "react";
import { Actors } from "../types";
import { deleteActors, putActors } from "../api";

export default function EditActors(actor: Actors) {
  const [editingState, setEditingState] = useState(false);

  let nameInput = useRef(null);
  let surnameInput = useRef(null);
  let idInput = useRef(null);
  let birthyearInput = useRef(null);
  let ageInput = useRef(null);

  async function updateActor() {
    await putActors({
      idactors: actor.idactors,
      name: nameInput.current.value,
      surname: surnameInput.current.value,
      age: ageInput.current.value,
      birth_year: birthyearInput.current.value,
    });
    window.location.reload();
  }

  async function removeActor() {
    await deleteActors(actor);
    window.location.reload();
    console.log(actor)
  }

  return (
    <>
      <p onClick={() => setEditingState(true)}>Edit</p>

      {editingState ? (
        <form>
          <div className="edit-form">
            <h1 className="edit-form-title">Update Actor Information</h1>

            <div className="edit-form-inputs">
              <div className="edit-form-label">Name</div>
              <input
                className="edit-form-input"
                ref={nameInput}
                defaultValue={actor.name}
              />
            </div>
            <div className="edit-form-inputs">
              <div className="edit-form-label">Surname</div>
              <input
                className="edit-form-input"
                ref={surnameInput}
                defaultValue={actor.surname}
              />
            </div>
            <div className="edit-form-inputs">
              <div className="edit-form-label">Age</div>
              <input
                className="edit-form-input"
                ref={ageInput}
                defaultValue={actor.age}
              />
            </div>
            <div className="edit-form-inputs">
              <div className="edit-form-label">Birth Year</div>
              <input
                className="edit-form-input"
                ref={birthyearInput}
                defaultValue={actor.birth_year}
              />
            </div>
            <div className="edit-form-btns">
              <div onClick={() => setEditingState(false)}>
                <button type="button">Cancel</button>
              </div>
              <div onClick={updateActor}>
                <button type="button">Update</button>
              </div>
              <div onClick={removeActor}>
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
