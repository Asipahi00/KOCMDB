import "../styles/Home.css";
import { MouseEventHandler, useCallback, useEffect, useRef, useState,} from "react";
import { fetchActors } from "../api";
import { Actors } from "../types";

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
        {sortedData().map((actors) => {

          const id = parseInt(actors.idactors)
          const age = parseInt(actors.age)
          const birth_year = parseInt(actors.birth_year)

          return (
            <tr key={actors.idactors}>
              <td>
                {id}
              </td>
              <td>
                <p>{actors.name}</p>
              </td>
              <td>
                <p>{actors.surname}</p>
              </td>
              <td>
                {age}
              </td>
              <td>
                {birth_year}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
