/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line
import { useEffect, useState } from "react";
import { MAX_STORIES, STORY_LIMIT } from "../config/constants";
import { calculateTime } from "../config/func/calculateTime";
import { getBestIds, getItem } from "../config/func/getStory";
import { Link } from "react-router-dom";

export default function BestStories() {
  const Best = ({ bestId, no }) => {
    const [bestStories, setBestStories] = useState({});

    useEffect(() => {
      getItem(bestId).then((data) => data && data.url && setBestStories(data));
    }, []);

    return bestStories && bestStories.url ? (
      <div className=" px-4 py-2 border border-b-1 border-black flex gap-3" style={{padding:"10px"}}>
        <p>{no + 1}.</p>
        <div className="w-full">
          <div className="flex gap-3">
            <a
              href={bestStories.url}
              target="_blank"
              className="hover:underline"
              rel="noreferrer"
            >
              {bestStories.title}
            </a>
          </div>
          <div className="flex gap-3">
            <p> {bestStories.score} point </p>
            <p>
              by :
              <span className="hover:underline cursor-pointer">{bestStories.by}</span>
            </p>
            <p>{calculateTime(bestStories.time)} ago </p>
            <Link to={`/comments/${bestStories.id}`}>
            <p> comments : {bestStories.descendants}</p>
            </Link>
          </div>
        </div>
      </div>
    ) : null;
  };

  const BestList = () => {
    const [bestsIds, setBestsIds] = useState([]);

    useEffect(() => {
      console.log("count", count);
      getBestIds().then((data) => setBestsIds(data));
    }, [count]);

    return bestsIds
      .slice(0, count)
      .map((bestId, idx) => (
        <Best key={bestId} bestId={bestId} no={idx} />
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
      <BestList />
      <div className=" border border-b-1 border-black" style={{padding:"10px"}}>
        <button onClick={handleMore}>more ....</button>
      </div>
    </>
  );
}
