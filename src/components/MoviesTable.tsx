import "../styles/Home.css";
import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { fetchMovies, postMovies } from "../api";
import { Movie } from "../types";
import { EditMovies } from ".";

export default function MoviesTable() {
  const [sortKey, setSortKey] = useState<SortKeys>("idmovies");
  const [sortOrder, setSortOrder] = useState<SortOrder>("ascn");
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetchMovies().then((data) => {
      setMovies([...data]);
    });
  }, []);

  type Data = typeof movies;

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

    const sortedData = movies.sort((a, b) => {
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
    { key: "idmovies", label: "Id" },
    { key: "name", label: "Name" },
    { key: "synopsis", label: "Synopsis" },
    { key: "rating", label: "Rating" },
    { key: "release_date", label: "Release Date" },
    { key: "is_adult", label: "Is Adult?" },
  ];

  const sortedData = useCallback(
    () =>
      sortData({ tableData: movies, sortKey, reverse: sortOrder === "desc" }),
    [movies, sortKey, sortOrder]
  );

  function changeSort(key: SortKeys) {
    setSortOrder(sortOrder === "ascn" ? "desc" : "ascn");

    setSortKey(key);
  }
  let nameInput = useRef(null);
  let synopsisInput = useRef(null);
  let idInput = useRef(null);
  let ratingInput = useRef(null);
  let releaseDateInput = useRef(null);
  let isAdultInput = useRef(null);


  async function createMovies() {
    await postMovies({
      idmovies: idInput.current.value,
      name: nameInput.current.value,
      synopsis: synopsisInput.current.value,
      rating: ratingInput.current.value,
      release_date: releaseDateInput.current.value,
      is_adult: isAdultInput.current.value,
      
    });
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
          <div className="create-form">Synopsis</div>
          <input className="create-form-input" ref={synopsisInput} />
        </td>
        <td className="create-form-inputs">
          <div className="create-form">Rating</div>
          <input className="create-form-input" ref={ratingInput} />
        </td>
        <td className="create-form-inputs">
          <div className="create-form">Release Date</div>
          <input className="create-form-input" ref={releaseDateInput} />
        </td>
        <td className="create-form-inputs">
          <div className="create-form">Adult Film?</div>
          <input className="create-form-input" ref={isAdultInput} />
        </td>

        <td className="createButton" onClick={createMovies}>
          Create
        </td>
      </tbody>

      <tbody>
        {sortedData().map((movie) => {
          var id = Number(movie.idmovies);
          return (
            <tr key={id}>
              <td>{id}</td>
              <td>
                <p>{movie.name}</p>
              </td>
              <td>
                <p>{movie.synopsis}</p>
              </td>
              <td>{movie.rating}</td>
              <td>{movie.release_date}</td>
              <td>{movie.is_adult}</td>
              <td>
                <EditMovies {...movie} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
