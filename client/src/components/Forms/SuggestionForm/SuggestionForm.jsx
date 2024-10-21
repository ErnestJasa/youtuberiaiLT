import { useRef, useState } from "react";
import CategoryList from "../../CategoryList/CategoryList";
import { removeFromArray } from "../../../helpers/ArrayHelpers";
import { postSuggestion } from "../../../api";
import Loader from "../../Loader/Loader";

function SuggestionForm() {
  const inputRef = useRef(null);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [canSuggest, setCanSuggest] = useState(true);
  const [categories, setCategories] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (inputRef.current.value.trim() === "" || inputRef.current.length <= 0) {
      setMessage("Pasiūlymo laukas yra privalomas.");
      setSuccess(false);
      return;
    }
    setLoading(true);
    if (canSuggest) {
      setCanSuggest(false);
      const response = await postSuggestion(inputRef.current.value, categories);
      setSuccess(response.success);
      setMessage(response.message);
      if (response.success) {
        inputRef.current.value = "";
        setCategories([]);
      }
      setTimeout(() => {
        setCanSuggest(true);
      }, 5000);
    } else {
      setSuccess(false);
      setMessage(
        "Neseniai pateikėte pasiūlymą, prašome palaukti, prieš pateikiant dar vieną. Ačiū."
      );
    }
    setLoading(false);
  }

  function handleCategoryClick(category) {
    if (categories.includes(category)) {
      setCategories(removeFromArray(categories, category));
      if (categories.length <= 5) {
        setMessage("");
      }
      return;
    } else {
      if (categories.length >= 5) {
        setSuccess(false);
        setMessage("Maksimalus kategorijų skaičius yra 5.");
        return;
      } else {
        setCategories([...categories, category]);
        return;
      }
    }
  }

  return (
    <div className="flex flex-col md:w-[50%] gap-3">
      <div>
        <CategoryList
          handleCategoryClick={handleCategoryClick}
          includeCategories={categories}
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-full bg-slate-300 text-xl flex "
      >
        <input
          ref={inputRef}
          required
          className="rounded-l-full py-1 bg-slate-100 px-3 w-full"
          type="text"
          placeholder="Pasiūlymas..."
        />

        <button
          type="submit"
          className=" px-2 border-l border-black rounded-r-full  hover:bg-emerald-200 active:bg-emerald-400"
        >
          Pateikti
        </button>
      </form>
      {loading && <Loader />}
      {message && !loading && (
        <div
          className={`${
            success ? "text-emerald-400" : " text-red-400"
          } text-center text-xl`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
export default SuggestionForm;
