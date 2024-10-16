import { useState } from "react";
import CategoryList from "../../CategoryList/CategoryList";

function SuggestionForm() {
  const [suggestion, setSuggestion] = useState({
    channel: "",
    categories: [],
  });
  async function handleSubmit(e) {
    e.preventDefault();
  }
  function handleChange(e) {
    setSuggestion({ ...suggestion, channel: e.target.value });
  }
  console.log(suggestion.channel);
  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-full bg-slate-300 text-xl flex "
    >
      <input
        value={suggestion.channel}
        onChange={handleChange}
        className="rounded-l-full py-1 bg-slate-100 px-3 w-full"
        type="text"
        placeholder="Pasiūlymas..."
      />
      <div>
        <CategoryList />
      </div>
      <button
        type="submit"
        className=" px-2 border-l border-black rounded-r-full  hover:bg-emerald-200 active:bg-emerald-400 "
      >
        Pateikti
      </button>
    </form>
  );
}
export default SuggestionForm;
