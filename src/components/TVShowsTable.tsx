import "../styles/Home.css";
import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { fetchTVShows, postTVShows } from "../api";
import { TVShow } from "../types";
import { EditTVShows } from ".";

export default function TVShowsTable() {
  const [sortKey, setSortKey] = useState<SortKeys>("idtvshows");
  const [sortOrder, setSortOrder] = useState<SortOrder>("ascn");
  const [tvshows, setTVShows] = useState<TVShow[]>([]);

  useEffect(() => {
    fetchTVShows().then((data) => {
      setTVShows([...data]);
    });
  }, []);

  type Data = typeof tvshows;

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

    const sortedData = tvshows.sort((a, b) => {
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
      >▲
      </button>
    );
  }

  const headers: { key: SortKeys; label: string }[] = [
    { key: "idtvshows", label: "Id" },
    { key: "name", label: "Name" },
    { key: "synopsis", label: "Synopsis" },
    { key: "rating", label: "Rating" },
    { key: "release_date", label: "Release Date" },
    { key: "is_adult", label: "Is Adult?" },
    { key: "cast", label: "Cast Members" },
  ];

  const sortedData = useCallback(
    () =>
      sortData({ tableData: tvshows, sortKey, reverse: sortOrder === "desc" }),
    [tvshows, sortKey, sortOrder]
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
  let castInput = useRef(null)


  async function createTVShows() {
    await postTVShows({
      idtvshows: idInput.current.value,
      name: nameInput.current.value,
      synopsis: synopsisInput.current.value,
      rating: ratingInput.current.value,
      release_date: releaseDateInput.current.value,
      is_adult: isAdultInput.current.value,
      cast: castInput.current.value,
      
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
          <div className="create-form">Adult TV Show?</div>
          <input className="create-form-input" ref={isAdultInput} />
        </td>
        <td className="create-form-inputs">
          <div className="create-form">Cast Members</div>
          <input className="create-form-input" ref={castInput} />
        </td>

        <td className="createButton" onClick={createTVShows}>
          Create
        </td>
      </tbody>

      <tbody>
        {sortedData().map((tvshow) => {
          var id = Number(tvshow.idtvshows);
          return (
            <tr key={id}>
              <td>{id}</td>
              <td>
                <p>{tvshow.name}</p>
              </td>
              <td>
                <p>{tvshow.synopsis}</p>
              </td>
              <td>{tvshow.rating}</td>
              <td>{tvshow.release_date}</td>
              <td>{tvshow.is_adult}</td>
              <td>{tvshow.cast}</td>
              <td>
                <EditTVShows {...tvshow} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
