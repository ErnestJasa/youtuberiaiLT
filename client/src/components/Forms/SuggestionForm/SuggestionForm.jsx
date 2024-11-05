import {useRef, useState} from "react";
import CategoryList from "../../CategoryList/CategoryList";
import {removeFromArray} from "../../../helpers/ArrayHelpers";
import {postSuggestion} from "../../../api";
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
        <div className="flex flex-col md:w-[50%] gap-3 mx-2">
            <div className='border rounded-lg text-[15px]'>
                <CategoryList
                    handleCategoryClick={handleCategoryClick}
                    includeCategories={categories}
                />
            </div>

            <form
                onSubmit={handleSubmit}
                className="w-full flex h-[50px]"
            >
                <input
                    ref={inputRef}
                    className=" py-1 rounded-l-md border border-gray-200  focus:outline-none focus:border focus:border-r hover:border-[#edd6b7] focus:border-[#e1a44f] w-full bg-inherit pl-3 text-xl font-normal"
                    type="text"
                    placeholder="Kanalo pavadinimas..."
                />
                <button
                    type="submit"
                    className="flex items-center justify-center border md:w-[35%] lg:w-auto px-4 border-l-0 border-gray-200 rounded-r-md hover:border-l hover:bg-gray-100 hover:border-[#e1a44f] active:bg-[#8573dea6]   hover:opacity-100"
                >
                    Pateikti
                </button>
            </form>
            {loading && <Loader/>}
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
