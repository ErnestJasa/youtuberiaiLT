import { useContext, useEffect, useState } from "react";
import Card from "../Card.jsx";
import { getDailyChannel } from "../../../api.jsx";
import { AppContext } from "../../../context/AppContext.jsx";
import { channels } from "../../../data.js";

function DailyPickCard() {
  const [channel, setChannel] = useState({});
  const [display, setDisplay] = useState(false);
  const { searchQuery } = useContext(AppContext);
  useEffect(() => {
    async function fetchChannel() {
      const response = await getDailyChannel();
      setChannel(response);
    }

    fetchChannel();
  }, []);
  useEffect(() => {
    if (searchQuery && channel.id) {
      if (
        (searchQuery.excludeCategories.length <= 0 &&
          searchQuery.includeCategories.length <= 0 &&
          searchQuery.search === "") ||
        (searchQuery.search.length <= 0 && searchQuery.sortOrder === "") ||
        searchQuery.sortOrder === "Default" ||
        searchQuery.sortOrder === undefined
      ) {
        setDisplay(true);
      } else {
        setDisplay(false);
      }
    }
  }, [searchQuery, channel]);

  return (
    display && (
      <div className=" border border-yellow-400 relative">
        <div
          className="absolute right-20 top-1 md:right-1 md:top-1 flex justify-center items-center px-2.5 py-0.5 text-xs font-semibold bg-yellow-100 text-yellow-800"
          data-id="121"
          data-v0-t="badge"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-star w-3 h-3 mr-1 fill-current"
            data-id="122"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          Today's Pick
        </div>
        <Card todaysPick={true} channel={channel}></Card>
      </div>
    )
  );
}

export default DailyPickCard;
