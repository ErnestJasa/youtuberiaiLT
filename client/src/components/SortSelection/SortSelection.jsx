import { useState } from "react";

function SortSelection({ handleSortingChange, sortBy }) {
  return (
    <>
      <select
        className="uppercase text-lg focus:outline-none focus:bg-white w-full bg-white hover:bg-gray-100 flex items-center justify-between border border-input px-3 py-2 "
        onChange={(e) => handleSortingChange(e.target.value)}
        value={sortBy}
        id="sort-select"
      >
        <option className="bg-white hover:bg-gray-100" value="Default">
          Rūšiuoti
        </option>
        <option
          className="bg-white hover:bg-gray-100"
          value="ByHandleAscending"
        >
          Pavadinimas A-Z
        </option>
        <option
          className="bg-white hover:bg-gray-100"
          value="ByHandleDescending"
        >
          Pavadinimas Z-A
        </option>
        <option
          className="bg-white hover:bg-gray-100"
          value="BySubCountAscending"
        >
          Prenumeratų sk. min-max
        </option>
        <option
          className="bg-white hover:bg-gray-100"
          value="BySubCountDescending"
        >
          Prenumeratų sk. max-min
        </option>
      </select>
    </>
  );
}

export default SortSelection;
