import {useEffect, useState} from "react";
import linkSVG from "../../assets/icons/link.svg";
import refreshSVG from "../../assets/icons/refresh.svg";
import tagSVG from "../../assets/icons/tag.svg";
import binderSVG from "../../assets/icons/binder.svg";
import Category from "../Category/Category";
import {updateChannel} from "../../api";
import Loader from "../Loader/Loader";
import {formatNumber} from "../../helpers/NumberFormatting";

function Card({channel}) {
    const [channelData, setChannelData] = useState(channel);
    const [loading, setLoading] = useState(false);

    async function handleUpdateClick(channelId) {
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
    const [showDescription, setShowDescription] = useState(false)
    return (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm relative">
            <div className="flex flex-col space-y-1.5 p-6">
                <div className="flex justify-between items-start">
                    <a target="_blank" href={"https://www.youtube.com/" + channelData.customUrl}
                       className="flex items-center gap-2">
                        <img alt={channelData.title + " thumbnail"} className="w-16 h-16 rounded-full"
                             src={channelData.thumbnail}
                             referrerPolicy="no-referrer"/>
                        <div data-id="119">
                            <h3 className="text-2xl font-semibold leading-none tracking-tight">
                                {channelData.title}
                            </h3>
                        </div>
                        <img
                            className="ml-[-4px] "
                            width={"18px"}
                            src={linkSVG}
                        />
                    </a>

                </div>
                {channelData.description.trim().length > 0 &&
                    <button
                        onClick={() => setShowDescription(!showDescription)}
                        className=" text-center right-0 top-0 absolute md:hidden">
                        <img src={binderSVG} className="w-6 h-6" alt="binder-svg"/>
                    </button>
                }
                <div>

                </div>
                <div className="text-sm text-muted-foreground" data-id="134">
                    {loading ? <Loader/> :
                        <p className={`${showDescription ? 'inline' : 'hidden'} md:inline `}>{channelData.description}</p>}
                </div>
            </div>
            <div className="p-6 pt-0" data-id="135">
                <div className="flex flex-wrap gap-2 mb-2" data-id="136">
                    {channelData.categories.map((category) => (
                        <div
                            key={category.name}
                            className="
                            inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-gray-200 hover:bg-gray-200/80"
                            data-id="137" data-v0-t="badge">
                            <img className="lucide lucide-tag w-3 h-3 mr-1" data-id="138" src={tagSVG} alt=""/>
                            {category.name}
                        </div>
                    ))}
                </div>
                <div className="text-sm text-muted-foreground flex">
                    <button onClick={() => handleUpdateClick(channelData.id)}
                            className="flex gap-1 hover:bg-gray-100 px-1 rounded-full">
                        <img className="mt-[2px]" width={"10px"} src={refreshSVG} alt=""/>
                        Atnaujinta: {channelData.lastUpdatedAt}
                    </button>
                    <p>
                        |
                        {channelData.subscriberCount > 1000 ||
                        channelData.subscriberCount === 0
                            ? " Prenumeratorių"
                            : " Prenumeratoriai"}: {formatNumber(channelData.subscriberCount)}
                    </p>

                </div>
            </div>
        </div>
    );
}

export default Card;

/*

  <div className="bg-gray-dark rounded-b-3xl rounded-t-4xl w-full ">
      <div className="flex bg-gray-light text-black rounded-3xl pt-2 gap-4 w-full relative">
        <img
          className="rounded-3xl object-cover w-24 h-24 sm:w-28 sm:h-28 ml-2 mb-2"
          src={channelData.thumbnail}
          alt=""
          referrerPolicy="no-referrer"
        />
        <div className="mb-2 mr-2 ">
          <div className="flex gap-2 mb-1 ">
            <div className="sm:flex sm:gap-2">
              <a
                className="flex sm:block relative"
                href={"https://www.youtube.com" + channelData.customUrl}
                target="_blank"
              >
                <h2 className="mt-2 sm:mt-[2px] text-2xl font-bold inline">
                  {channelData.title}
                </h2>
                <img
                  className="mt-1 sm:mt-0 sm:absolute sm:right-[-16px] sm:top-0 "
                  width={"18px"}
                  src={linkSVG}
                />
              </a>
              <small className="sm:mt-auto text-purple">
                {formatNumber(channelData.subscriberCount)}
                {channelData.subscriberCount > 1000 ||
                channelData.subscriberCount === 0
                  ? " prenumeratorių"
                  : " prenumeratoriai"}
              </small>
            </div>
          </div>
          <div className="text-ellipsis overflow-hidden line-clamp-6 text-xs ">
            {loading ? <Loader /> : <p>{channelData.description}</p>}
          </div>
        </div>
        <div className="absolute top-1 right-2 flex flex-col ml-auto text-right text-xs mr-1">
          <button
            onClick={() => handleUpdateClick(channelData.id)}
            className="flex gap-1"
          >
            <small className=" ">atnaujinta {channelData.lastUpdatedAt}</small>
            <img width={"10px"} src={refreshSVG} alt="" />
          </button>
        </div>
      </div>
      <div className="px-2 py-2 flex ml-1 flex-wrap gap-2">
        {channelData.categories.map((category) => {
          return (
            <div
              key={category.name}
              className={`text-black px-2 rounded-full bg-[#f8efd9]`}
            >
              <Category category={category} />
            </div>
          );
        })}
      </div>
    </div>

 */