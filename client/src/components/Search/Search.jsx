import { useContext, useRef, useState } from "react";
import searchSVG from "../../assets/icons/search.svg";
import { AppContext } from "../../context/AppContext";
import CategoryList from "../CategoryList/CategoryList";
import SortSelection from "../SortSelection/SortSelection";
import { removeFromArray } from "../../helpers/ArrayHelpers";
import ModerationCategoryList from "../CategoryList/ModerationCategoryList.jsx/ModerationCategoryList";
function Search({ moderation = false }) {
  const inputRef = useRef(null);
  const { searchQuery, setSearchQuery } = useContext(AppContext);

  function handleSearchSubmit(e) {
    e.preventDefault();
    const searchTerm = inputRef.current.value;
    setSearchQuery((prevQuery) => ({
      ...prevQuery,
      search: searchTerm,
    }));
  }

  function handleCategorySearch(categoryName) {
    const prevIncludeCategories = searchQuery.includeCategories;
    const prevExcludeCategories = searchQuery.includeCategories;

    // add to includes array
    if (
      !searchQuery.includeCategories.includes(categoryName) &&
      !searchQuery.excludeCategories.includes(categoryName)
    ) {
      setSearchQuery((prevQuery) => ({
        ...prevQuery,
        includeCategories: [...prevIncludeCategories, categoryName],
      }));
      return;
    }

    // remove from includes and add to excludes array
    if (searchQuery.includeCategories.includes(categoryName)) {
      const tempIncludeCategories = removeFromArray(
        searchQuery.includeCategories,
        categoryName
      );
      setSearchQuery((prevQuery) => ({
        ...prevQuery,
        includeCategories: tempIncludeCategories,
        excludeCategories: [...prevExcludeCategories, categoryName],
      }));
      return;
    }

    // remove from excludes array
    if (searchQuery.excludeCategories.includes(categoryName)) {
      const tempExcludeCategories = removeFromArray(
        searchQuery.excludeCategories,
        categoryName
      );
      setSearchQuery((prevQuery) => ({
        ...prevQuery,
        excludeCategories: tempExcludeCategories,
      }));
      return;
    }
  }

  async function handleSortingChange(sortBy) {
    setSearchQuery((prevQuery) => ({
      ...prevQuery,
      sortOrder: sortBy,
    }));
  }
  return (
    <>
      {moderation ? (
        <ModerationCategoryList
          handleCategoryClick={handleCategorySearch}
          includeCategories={searchQuery.includeCategories}
          excludeCategories={searchQuery.excludeCategories}
        />
      ) : (
        <CategoryList
          handleCategoryClick={handleCategorySearch}
          includeCategories={searchQuery.includeCategories}
          excludeCategories={searchQuery.excludeCategories}
        />
      )}
      <form onSubmit={handleSearchSubmit} className="w-full my-3">
        <div className="w-full flex bg-[#e8e8e8] rounded-full ">
          <input
            ref={inputRef}
            // onChange={(e) => setSearchTerm(e.target.value)}
            className="py-1 focus:outline-none border border-r-0 focus:border focus:border-r-0 focus:border-[#e1a44f] w-full rounded-l-full  bg-inherit pl-3 text-xl font-normal"
            type="text"
            placeholder="Paieška..."
          />
          <button
            type="submit"
            className="border border-r-0 border-y-0 px-5 rounded-r-full border-black hover:bg-[#998be24d] hover:border-[#e1a44f] active:bg-[#8573dea6]  opacity-60 hover:opacity-100"
          >
            <img className="w-6" src={searchSVG} alt="" />
          </button>
        </div>
        <div className="h-[2px] bg-[#e8e8e8] w-[85%] rounded-full mt-2 mx-auto"></div>
        <SortSelection
          handleSortingChange={handleSortingChange}
          sortOrder={searchQuery.sortOrder}
        />
      </form>
    </>
  );
}
export default Search;
