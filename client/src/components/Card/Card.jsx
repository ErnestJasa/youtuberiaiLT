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

//  <div className="flex items-center justify-between bg-gray-100 p-4 rounded shadow-md w-full ">
//       <div className="flex items-center space-x-4">
//         {/* Image Section */}
//         <a
//           href={`https://www.youtube.com/${channelData.customUrl}`}
//           target="_blank"
//           className="flex-shrink-0 flex gap-2 text-center hover:underline"
//         >
//           <img
//             src={channelData.thumbnail}
//             referrerPolicy="no-referrer"
//             alt={channelData.title}
//             className="w-16 h-16"
//           />
//           <span className="my-auto">{channelData.title}</span>
//         </a>
//       </div>
//       {/* Text Section */}
//       <div className="flex gap-1">
//         {channelData.categories.map((category) => (
//           <div
//             key={category.name}
//             className="text-xs text-gray-500 uppercase tracking-wide flex"
//           >
//             {category.name}
//           </div>
//         ))}
//       </div>
//       {/* Stats Section */}
//       <div className="text-right text-sm text-gray-700">
//         <div className="flex items-center space-x-2">
//           <span className="text-pink-600 font-bold">239</span>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={1.5}
//             stroke="currentColor"
//             className="w-4 h-4"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M4.5 12.75l6 6 9-13.5"
//             />
//           </svg>
//         </div>
//         <div>9 Comments</div>
//         <div>6,843 Views</div>
//       </div>
//     </div>

//    <div className="rounded-lg border shadow-sm relative">
//             <div className="flex flex-col space-y-1.5 p-6">
//                 <div className="flex justify-between items-start group">
//                     <a target="_blank" href={"https://www.youtube.com/" + channelData.customUrl}
//                        className="flex items-center gap-2">
//                         <img alt={channelData.title + " thumbnail"} className="w-16 h-16 rounded-full"
//                              src={channelData.thumbnail}
//                              referrerPolicy="no-referrer"/>
//                         <div className="group-hover:underline">
//                             <h3 className="text-2xl font-semibold leading-none tracking-tight">
//                                 {channelData.title}
//                             </h3>
//                         </div>
//                         {/*<img*/}
//                         {/*    className="ml-[-4px] "*/}
//                         {/*    width={"18px"}*/}
//                         {/*    src={linkSVG}*/}
//                         {/*/>*/}
//                     </a>
//                 </div>
//                 {channelData.description.trim().length > 0 &&
//                     <button
//                         onClick={() => setShowDescription(!showDescription)}
//                         className=" text-center right-0 top-0 absolute md:hidden">
//                         <img src={binderSVG} className="w-6 h-6" alt="binder-svg"/>
//                     </button>
//                 }
//                 <div className="text-sm text-muted-foreground py-2" data-id="134">
//                     {loading ? <Loader/> :
//                         <p className={`${showDescription ? "inline" : "hidden"} md:inline `}>{channelData.description}</p>}
//                 </div>
//             </div>
//             <div className="p-3 sm:p-6 pt-0">
//                 <div className="flex flex-wrap gap-2 mb-2" data-id="136">
//                     {channelData.categories.map((category) => (
//                         <div
//                             key={category.name}
//                             className="
//                             inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-gray-200 hover:bg-gray-200/80"
//                         >
//                             <img className="w-3 h-3 mr-1" src={tagSVG} alt=""/>
//                             {category.name}
//                         </div>
//                     ))}
//                 </div>
//                 <div className="text-sm flex">
//                     <button onClick={() => handleUpdateClick(channelData.id)}
//                             className="flex gap-1 hover:bg-gray-100 px-1 rounded-full">
//                         <img className="mt-[2px]" width={"10px"} src={refreshSVG} alt=""/>
//                         <span>
//                         Atnaujinta: {channelData.lastUpdatedAt}
//                         </span>
//                     </button>
//                     <p>
//                         <span className="hidden sm:inline">
//                         |
//                         </span>
//                         {channelData.subscriberCount > 1000 ||
//                         channelData.subscriberCount === 0
//                             ? " Prenumeratorių"
//                             : " Prenumeratoriai"}: {formatNumber(channelData.subscriberCount)}
//                     </p>

//                 </div>
//             </div>
//         </div>
