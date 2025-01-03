import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import Loader from "../Loader/Loader";
import MinusSVG from "../../assets/SVGs/MinusSVG";
import PlusSVG from "../../assets/SVGs/PlusSVG";

function CategoryList({
  handleCategoryClick,
  includeCategories = [],
  excludeCategories = [],
}) {
  const { categories, getCategories, categoriesLoading } =
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
                                    ? " text-pink-main underline"
                                    : ""
                                }
                                border border-gray-300 inline-flex items-center text-lg px-2 py-0.5 transition-all duration-300 uppercase`}
              >
                {/* {includeCategories.includes(category.name) ? (
                  <PlusSVG className="w-3 h-3 mr-1" />
                ) : excludeCategories.includes(category.name) ? (
                  <MinusSVG className="w-3 h-3 mr-1" />
                ) : (
                  ""
                )} */}
                {category.name.replace(/\s+/g, "_")}
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
      {categoriesLoading && <Loader />}
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
