import {useState} from "react";

function SortSelection({handleSortingChange, sortBy}) {

    return (
        <>
            <select
                className="focus:outline-none focus:bg-white w-full lg:w-auto bg-white hover:bg-gray-100 flex items-center justify-between rounded-md border border-input px-3 py-2 text-sm"
                onChange={(e) =>
                    handleSortingChange(e.target.value)
                }
                value={sortBy}
                id="sort-select"
            >
                <option className='bg-white hover:bg-gray-100' value="Default">Rūšiuoti</option>
                <option className='bg-white hover:bg-gray-100' value="ByHandle">Pavadinimas</option>
                <option className='bg-white hover:bg-gray-100' value="BySubCount">Prenumeratų sk.</option>
            </select>
        </>
    );
}

export default SortSelection;
/*
    <select
        onChange={(e) => handleSortingChange(e.target.value)}
        value={sortOrder}
        id="sort-select"
      >
        <option value="Default">Rūšiuoti</option>
        <option value="ByHandleAscending">Pavadinimas A-Z</option>
        <option value="ByHandleDescending">Pavadinimas Z-A</option>
        <option value="BySubCountAscending">Prenumeratų sk. Min-Max</option>
        <option value="BySubCountDescending">Prenumeratų sk. Max-Min</option>
      </select>
 */

/*

 */