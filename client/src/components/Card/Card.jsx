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
                <div className="text-sm text-muted-foreground py-2" data-id="134">
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

