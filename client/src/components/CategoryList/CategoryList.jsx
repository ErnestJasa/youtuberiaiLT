import {useContext, useEffect} from "react";
import plusSVG from "../../assets/icons/plus.svg"
import minusSVG from "../../assets/icons/minus.svg"
import {AppContext} from "../../context/AppContext";
import Loader from "../Loader/Loader";

function CategoryList({
                          handleCategoryClick,
                          includeCategories = [],
                          excludeCategories = [],
                      }) {
    const {categories, getCategories, categoriesLoading} =
        useContext(AppContext);
    useEffect(() => {
        getCategories();
    }, []);

    return (
        <>
            {categories && categories.length ? (
                <div className="md:p-6 p-2">
                    <div className="flex flex-wrap gap-2 ">
                        {categories.map((category) => (
                            <button
                                key={category.name}
                                onClick={() => handleCategoryClick(category.name)}
                                className={`
                                ${
                                    includeCategories.includes(category.name)
                                        ? "bg-black text-white"
                                        : excludeCategories.includes(category.name)
                                            ? "bg-red-500 text-white"
                                            : "bg-gray-200"
                                }
                                inline-flex items-center rounded-full border  px-2.5 py-0.5 font-semibold transition-colors`}
                            >
                                {
                                    includeCategories.includes(category.name)
                                        ?
                                        <img src={plusSVG} alt="plus-svg" className="w-3 h-3 mr-1"/>

                                        : excludeCategories.includes(category.name)
                                            ? <img src={minusSVG} alt="minus-svg" className="w-3 h-3 mr-1"/>
                                            : ""
                                }
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                !categoriesLoading && (
                    <div className="text-3xl text-center m-2">
                        <h1>Kategorijos nerastos. Problema su serveriu</h1>
                    </div>
                )
            )}
            {categoriesLoading && <Loader/>}
        </>
    );
}

export default CategoryList;
/*

 <div className=" px-2 py-2 flex flex-wrap gap-2">
          {categories.map((category) => {
            return (
              <button
                onClick={() => handleCategoryClick(category.name)}
                className={`${
                  includeCategories.includes(category.name)
                    ? "bg-purple border border-[#7f74c7] text-white"
                    : excludeCategories.includes(category.name)
                    ? "bg-gold border border-[#e6931d] text-white"
                    : "bg-gray-light border border-white"
                } px-2 rounded-full `}
                key={category.name}
              >
                <Category category={category} />
              </button>
            );
          })}
        </div>
 */