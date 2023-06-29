/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line
import { useEffect, useState } from "react";
import { MAX_STORIES, STORY_LIMIT } from "../config/constants";
import { calculateTime } from "../config/func/calculateTime";
import { getItem, getShowIds } from "../config/func/getStory";
import { Link } from "react-router-dom";

export default function ShowStories() {
  const Shows = ({ showId, no }) => {
    const [shows, setShows] = useState({});

    useEffect(() => {
      getItem(showId).then((data) => data && data.url && setShows(data));
    }, []);

    return shows && shows.url ? (
      <div className=" px-4 py-2 border border-b-1 border-black flex gap-3" style={{padding:"10px"}}>
        <p>{no + 1}.</p>
        <div className="w-full">
          <div className="flex gap-3">
            <a
              href={shows.url}
              target="_blank"
              className="hover:underline"
              rel="noreferrer"
            >
              {shows.title}
            </a>
          </div>
          <div className="flex gap-3">
            <p> {shows.score} point </p>
            <p>
              by :
              <span className="hover:underline cursor-pointer">{shows.by}</span>
            </p>
            <p>{calculateTime(shows.time)} ago </p>
            <Link to={`/comments/${shows.id}`}>
            <p> comments : {shows.descendants}</p>
            </Link>
          </div>
        </div>
      </div>
    ) : null;
  };

  const ShowsList = () => {
    const [showsIds, setShowsIds] = useState([]);

    useEffect(() => {
      getShowIds().then((data) => setShowsIds(data));
    }, [count]);

    return showsIds
      .slice(0, count)
      .map((showId, idx) => (
        <Shows key={showId} showId={showId} no={idx} />
      ));
  };

  const [count, setCount] = useState(STORY_LIMIT);
  const handleMore = () => {
    if (count + STORY_LIMIT >= MAX_STORIES) {
      setCount(MAX_STORIES);
    } else {
      setCount(count + STORY_LIMIT);
    }
  };

  return (
    <>
      <ShowsList />
      <div className=" border border-b-1 border-black" style={{padding:"10px"}}>
        <button onClick={handleMore}>more ....</button>
      </div>
    </>
  );
}
