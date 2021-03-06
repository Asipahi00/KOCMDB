import "../styles/Home.css";
import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { fetchActors, postActors } from "../api";
import { Actors } from "../types";
import { EditActors } from ".";

export default function ActorTable() {
  const [sortKey, setSortKey] = useState<SortKeys>("idactors");
  const [sortOrder, setSortOrder] = useState<SortOrder>("ascn");
  const [actors, setActors] = useState<Actors[]>([]);

  useEffect(() => {
    fetchActors().then((data) => {
      setActors([...data]);
    });
  }, []);

  type Data = typeof actors;

  type SortKeys = keyof Data[0];

  type SortOrder = "ascn" | "desc";

  function sortData({
    tableData,
    sortKey,
    reverse,
  }: {
    tableData: Data;
    sortKey: SortKeys;
    reverse: boolean;
  }) {
    if (!sortKey) return tableData;

    const sortedData = actors.sort((a, b) => {
      return a[sortKey] > b[sortKey] ? 1 : -1;
    });

    if (reverse) {
      return sortedData.reverse();
    }

    return sortedData;
  }

  function SortButton({
    sortOrder,
    columnKey,
    sortKey,
    onClick,
  }: {
    sortOrder: SortOrder;
    columnKey: SortKeys;
    sortKey: SortKeys;
    onClick: MouseEventHandler<HTMLButtonElement>;
  }) {
    return (
      <button
        onClick={onClick}
        className={`${
          sortKey === columnKey && sortOrder === "desc"
            ? "sort-button sort-reverse"
            : "sort-button"
        }`}
      >
        ▲
      </button>
    );
  }

  const headers: { key: SortKeys; label: string }[] = [
    { key: "idactors", label: "Id" },
    { key: "name", label: "Name" },
    { key: "surname", label: "Surname" },
    { key: "age", label: "Age" },
    { key: "birth_year", label: "Birth Year" },
  ];

  const sortedData = useCallback(
    () =>
      sortData({ tableData: actors, sortKey, reverse: sortOrder === "desc" }),
    [actors, sortKey, sortOrder]
  );

  function changeSort(key: SortKeys) {
    setSortOrder(sortOrder === "ascn" ? "desc" : "ascn");

    setSortKey(key);
  }
  let nameInput = useRef(null);
  let surnameInput = useRef(null);
  let idInput = useRef(null);
  let birthyearInput = useRef(null);
  let ageInput = useRef(null);
  

  async function createActor() {
    await postActors(
      {
        idactors: idInput.current.value,
        name: nameInput.current.value,
        surname: surnameInput.current.value,
        age: ageInput.current.value,
        birth_year: birthyearInput.current.value,
      }
    );
    window.location.reload();
  }
  return (
    <table>
      <thead>
        <tr>
          {headers.map((row) => {
            return (
              <td key={row.key}>
                {row.label}{" "}
                <SortButton
                  columnKey={row.key}
                  onClick={() => changeSort(row.key)}
                  {...{
                    sortOrder,
                    sortKey,
                  }}
                />
              </td>
            );
          })}
        </tr>
      </thead>
      <tbody>
        <td className="create-form-inputs">
          <div className="create-form">Id</div>
          <input className="create-form-input" ref={idInput} />
        </td>

        <td className="create-form-inputs">
          <div className="create-form">Name</div>
          <input className="create-form-input" ref={nameInput} />
        </td>

        <td className="create-form-inputs">
          <div className="create-form">Surname</div>
          <input className="create-form-input" ref={surnameInput} />
        </td>
        <td className="create-form-inputs">
          <div className="create-form">Age</div>
          <input className="create-form-input" ref={ageInput} />
        </td>
        <td className="create-form-inputs">
          <div className="create-form">Birth Year</div>
          <input className="create-form-input" ref={birthyearInput} />
        </td>

        <td className="createButton" onClick={createActor}>
          Create
        </td>
        
      </tbody>

      <tbody>
        {sortedData().map((actors) => {
          const id = parseInt(actors.idactors);
          const age = parseInt(actors.age);
          const birth_year = parseInt(actors.birth_year);

          return (
            <tr key={actors.idactors}>
              <td>{id}</td>
              <td>
                <p>{actors.name}</p>
              </td>
              <td>
                <p>{actors.surname}</p>
              </td>
              <td>{age}</td>
              <td>{birth_year}</td>
              <td>
               <EditActors {...actors}/>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
