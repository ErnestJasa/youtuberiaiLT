import { useContext, useRef, useState } from "react";
import { addChannel } from "../../../api";
import { AppContext } from "../../../context/AppContext";
import { ModerationContext } from "../../../context/ModerationContext";

function AddChannelForm() {
  const inputRef = useRef(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const { setChannels, channels } = useContext(AppContext);
  const { secretPhrase } = useContext(ModerationContext);
  async function handleAddChannel(e) {
    e.preventDefault();
    const channelId = inputRef.current.value;
    const response = await addChannel(channelId, secretPhrase);
    if (response.success) {
      inputRef.current.value = "";
      setChannels([response.data, ...channels]);
    }
    setSuccess(response.success);
    setMessage(response.message);
  }

  return (
    <>
      <form
        onSubmit={handleAddChannel}
        className="rounded-full bg-slate-300 text-xl flex"
      >
        <input
          ref={inputRef}
          className="rounded-l-full py-1 bg-slate-100 px-3 w-full"
          type="text"
          placeholder="Kanalo ID..."
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
export default AddChannelForm;
