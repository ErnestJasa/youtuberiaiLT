import { useContext, useRef, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { addCategory } from "../../../api";
import { ModerationContext } from "../../../context/ModerationContext";

function AddCategoryForm() {
  const inputRef = useRef(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const { categories, setCategories } = useContext(AppContext);
  const { secretPhrase } = useContext(ModerationContext);

  async function handleAddCategory(e) {
    e.preventDefault();
    const newCategory = inputRef.current.value;
    const response = await addCategory(newCategory, secretPhrase);
    if (response.success) {
      setCategories([...categories, response.data]);
    }
    setSuccess(response.success);
    setMessage(response.message);
  }

  return (
    <>
      <form
        onSubmit={handleAddCategory}
        className="rounded-full bg-slate-300 text-xl flex"
      >
        <input
          ref={inputRef}
          className="rounded-l-full py-1 bg-slate-100 px-3 w-full"
          type="text"
          placeholder="Kategorija..."
        />
        <button
          type="submit"
          className=" px-2 border-l border-black rounded-r-full  hover:bg-emerald-200 active:bg-emerald-400 "
        >
          Pridėti
        </button>
      </form>
      <div className="text-center my-2">
        <h3
          className={`${success ? "text-emerald-400" : "text-red-400"} text-xl`}
        >
          {message}
        </h3>
      </div>
    </>
  );
}
export default AddCategoryForm;
