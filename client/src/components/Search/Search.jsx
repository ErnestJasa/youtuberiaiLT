import {useContext, useEffect, useRef, useState} from "react";
import searchSVG from "../../assets/icons/search.svg";
import xCircleSVG from "../../assets/icons/xCircle.svg";
import {AppContext} from "../../context/AppContext";
import CategoryList from "../CategoryList/CategoryList";
import SortSelection from "../SortSelection/SortSelection";
import {removeFromArray} from "../../helpers/ArrayHelpers";
import ModerationCategoryList from "../CategoryList/ModerationCategoryList.jsx/ModerationCategoryList";

function Search({moderation = false}) {
    const inputRef = useRef(null);
    const [showCategories, setShowCategories] = useState(false);

    const {searchQuery, setSearchQuery} = useContext(AppContext);

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
            sortOrder: sortBy
        }));
    }

    function clearInput() {
        inputRef.current.value = "";
    }

    return (
        <div
            className="md:ml-4 lg:col-span-2  sticky top-0 md:top-24 bg-white max-h-[35%]  pt-6 z-10 "
            style={{maxHeight: "calc(-2rem + 100vh)", overflowY: "auto"}}
        >
            <div className="rounded-lg border px-2">
                {moderation ? (
                    <ModerationCategoryList
                        handleCategoryClick={handleCategorySearch}
                        includeCategories={searchQuery.includeCategories}
                        excludeCategories={searchQuery.excludeCategories}
                    />
                ) : (
                    <>
                        <div className={`${showCategories ? "block" : "hidden"} md:block text-[15px]`}>
                            <CategoryList
                                handleCategoryClick={handleCategorySearch}
                                includeCategories={searchQuery.includeCategories}
                                excludeCategories={searchQuery.excludeCategories}
                            />
                        </div>
                        <button
                            onClick={() => setShowCategories(!showCategories)}
                            className="bg-black text-white rounded-full mx-auto w-full mt-2 md:hidden"
                        >
                            Kategorijos
                        </button>
                    </>
                )}
                <div className="h-[2px] bg-[#e8e8e8] w-[85%] rounded-full mt-2 mx-auto"></div>
                <form onSubmit={handleSearchSubmit}
                      className="w-full my-3 lg:flex gap-2 ">
                    <div className="w-full flex relative">
                        <input
                            ref={inputRef}
                            className=" py-1 rounded-l-md border border-gray-200  focus:outline-none focus:border focus:border-r hover:border-[#edd6b7] focus:border-[#e1a44f] w-full bg-inherit pl-3 text-xl font-normal"
                            type="text"
                            placeholder="Ieškoti kanalo..."
                        />
                        <button
                            type="submit"
                            className="flex items-center justify-center border md:w-[35%] lg:w-auto px-4 border-l-0 border-gray-200 rounded-r-md hover:border-l hover:bg-gray-100 hover:border-[#e1a44f] active:bg-[#8573dea6]   hover:opacity-100"
                        >
                            <img className="w-6 sm:w-5" src={searchSVG} alt="search-svg"/>
                        </button>
                        <button onClick={clearInput}
                                type="button"
                                className="absolute right-14 md:right-[100px] lg:right-14 top-2 opacity-50 hover:opacity-100 active:opacity-100">
                            <img className="w-6" src={xCircleSVG} alt="clear-input-svg"/>
                        </button>
                    </div>
                    <div className="w-full lg:w-[60%] my-2 lg:-my-0">
                        <SortSelection
                            handleSortingChange={handleSortingChange}
                            sortBy={searchQuery.sortOrder}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Search;
/*

 */