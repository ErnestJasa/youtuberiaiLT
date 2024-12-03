import {useCallback, useContext, useEffect, useRef, useState} from "react";
import {AppContext} from "../../context/AppContext";
import Card from "../Card/Card";
import {getChannelsCount} from "../../api";
import Loader from "../Loader/Loader";
import DailyPickCard from "../Card/DailyPickCard/DailyPickCard.jsx";

function CardList() {
    const [pageNumber, setPageNumber] = useState(1);
    const [totalChannelsCount, setTotalChannelsCount] = useState(0);
    let prevLastElId = useRef("");
    const {
        channels,
        channelsLoading,
        searchQuery,
        getMoreChannels,
        getChannelsData,
        setChannelsLoading,
    } = useContext(AppContext);
    const observer = useRef();
    const lastChannelElementRef = useCallback(
        (node) => {
            if (channelsLoading) return;
            if (observer.current) {
                observer.current.disconnect();
            }

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    if (entries[0].target.id === prevLastElId.current) {
                        return;
                    }
                    setPageNumber((prevPage) => prevPage + 1);
                    prevLastElId.current = entries[0].target.id;
                }
            });
            if (node) {
                observer.current.observe(node);
            }
        },
        [channelsLoading]
    );

    useEffect(() => {
        getChannelsData();
        window.scrollTo(0, 0);
        getChannelsCount(searchQuery).then((response) => setTotalChannelsCount(response));
        setPageNumber(1);
    }, [searchQuery]);

    useEffect(() => {
        getChannelsData();
        getChannelsCount(searchQuery).then((response) => setTotalChannelsCount(response));
    }, []);

    useEffect(() => {
        if (
            channels.length < totalChannelsCount &&
            channels.length !== totalChannelsCount
        ) {
            if (pageNumber !== 1) {
                setChannelsLoading(true);
                setTimeout(() => {
                    getMoreChannels(pageNumber);
                    setChannelsLoading(false);
                }, 500);
            }
        }
    }, [pageNumber]);
    return (
        <div className="rounded-lg shadow-sm lg:col-span-3">
            {channels && channels.length ? (
                <>
                    <ul className="p-6 pt-0">
                        <li
                            id="daily-channel"
                            className="w-full mb-2"
                        >
                            <DailyPickCard/>
                        </li>
                        {channels.map((channel, index) => {
                            return (
                                <li
                                    id={channel.id}
                                    className="w-full mb-2"
                                    key={channel.id}
                                    ref={
                                        channels.length === index + 1 ? lastChannelElementRef : null
                                    }
                                >
                                    <Card channel={channel}/>
                                </li>
                            );
                        })}
                    </ul>
                </>
            ) : (
                !channelsLoading && (
                    <div className="text-3xl text-center">
                        <h2>Kanalų nerasta.</h2>
                    </div>
                )
            )}
            {channelsLoading && <Loader/>}
        </div>
    );
}

export default CardList;
