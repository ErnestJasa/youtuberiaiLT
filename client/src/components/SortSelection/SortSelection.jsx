import {useState} from "react";

function SortSelection({handleSortingChange, sortBy}) {

    return (
        <>
            <select
                className="col-span-4 focus:outline-none focus:bg-white w-full lg:w-auto bg-white hover:bg-gray-100 flex items-center justify-between rounded-md border border-input px-3 py-2 "
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
