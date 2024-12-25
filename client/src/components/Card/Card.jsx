import { useContext, useEffect, useState } from "react";
import Category from "../Category/Category";
import { updateChannel } from "../../api";
import Loader from "../Loader/Loader";
import { formatNumber } from "../../helpers/NumberFormatting";
import PersonSVG from "../../assets/SVGs/PersonSVG";
import YoutubeSVG from "../../assets/SVGs/YoutubeSVG";
import RefreshSVG from "../../assets/SVGs/RefreshSVG";
import { AppContext } from "../../context/AppContext";
import ArrowRightSVG from "../../assets/SVGs/ArrowRightSVG";

function Card({ channel, todaysPick = false }) {
  const [channelData, setChannelData] = useState(channel);
  const [loading, setLoading] = useState(false);

  const { searchQuery } = useContext(AppContext);
  async function handleUpdateClick(event, channelId) {
    event.preventDefault();
    setLoading(true);
    const response = await updateChannel(channelId);
    if (response !== null) {
      setChannelData(response);
    }
    setLoading(false);
  }

  useEffect(() => {
    setChannelData(channel);
  }, [channel]);
  const [showDescription, setShowDescription] = useState(false);
  return (
    <a
      rel="noopener noreferrer"
      href={`https://www.youtube.com/${channelData.customUrl}`}
      target="_blank"
      className="p- flex w-full border border-black lg:border-white hover:border-black relative group/card"
    >
      <div className="flex gap-1 w-full">
        <img
          src={channelData.thumbnail}
          referrerPolicy="no-referrer"
          alt={channelData.title}
          className="w-16 object-cover"
        />
        <div className="w-full">
          <div className="flex w-[95%] flex-wrap">
            {channelData.categories.map((category) => (
              <div
                key={category.name}
                className={`
                  ${
                    searchQuery.includeCategories.includes(category.name)
                      ? "bg-gray-200 text-gray-900 "
                      : "bg-inherit text-gray-500 "
                  } text-xs uppercase tracking-wide mr-2`}
              >
                {category.name.replace(/\s+/g, "_")}
              </div>
            ))}
          </div>
          <div>
            <h2
              className={`${
                todaysPick && "text-pink-main"
              } text-2xl uppercase font-novecento`}
            >
              {channelData.title}
            </h2>
          </div>
          <div className="flex gap-2 text-xs font-bold w-full">
            <div className=" text-pink-main flex" title="Prenumeratorių sk.">
              <PersonSVG className="w-4" />
              <p>{formatNumber(channelData.subscriberCount)}</p>
            </div>
            <div title="Video sk." className="text-gray-400/80 flex">
              <YoutubeSVG className="w-4" />
              <p className="ml-[2px]">{formatNumber(channelData.videoCount)}</p>
            </div>
            <button
              onClick={(e) => handleUpdateClick(e, channelData.id)}
              className="flex gap-1 ml-auto mr-1 font-normal group/update relative"
            >
              <div className="w-5 m-auto">{loading && <Loader />}</div>
              <RefreshSVG className="w-2" />
              <p>{channelData.lastUpdatedAt}</p>
              <div className="z-10 absolute left-16 -translate-x-1/2 mt-4 px-2 bg-gray-800 text-white text-sm rounded shadow-lg opacity-0 group-hover/update:opacity-100 transition-opacity duration-200">
                Atnaujinti
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="absolute right-3 top-4 block lg:hidden group-hover/card:block">
        <ArrowRightSVG />
      </div>
    </a>
  );
}

export default Card;
