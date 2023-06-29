/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line
import { useEffect, useState } from "react";
import { MAX_STORIES, STORY_LIMIT } from "../config/constants";
import { calculateTime } from "../config/func/calculateTime";
import { getItem, getNewIds } from "../config/func/getStory";
import { Link } from "react-router-dom";

export default function NewStories() {
  const News = ({ newId, no }) => {
    const [news, setNews] = useState({});

    useEffect(() => {
      getItem(newId).then((data) => data && data.url && setNews(data));
    }, []);

    return news && news.url ? (
      <div className=" px-4 py-2 border border-b-1 border-gray-400flex gap-3" style={{padding:"10px"}}>
        <p>{no + 1}.</p>
        <div className="w-full text-gray-500">
          <div className="flex gap-3">
            <a
              href={news.url}
              target="_blank"
              className="hover:underline text-black"
              rel="noreferrer"
            >
              {news.title}
            </a>
          </div>
          <div className="flex gap-3">
            <p> {news.score} point </p>
            <p >
              by :
              <span className="text-gray-500 font-normal"> {news.by}</span>
            </p>
            <p className="text-gray-500 ">{calculateTime(news.time)} ago </p>
            <Link to={`/comments/${news.id}`}>
            <p className="hover:underline"> comments : {news.descendants}</p>
            </Link>
          </div>
        </div>
      </div>
    ) : null;
  };

  const NewsList = () => {
    const [newsIds, setNewsIds] = useState([]);

    useEffect(() => {
      console.log("count", count);
      getNewIds().then((data) => setNewsIds(data));
    }, [count]);

    return newsIds
      .slice(0, count)
      .map((newId, idx) => (
        <News key={newId} newId={newId} no={idx} />
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
      <NewsList />
      <div className=" border border-b-1 border-gray-400" style={{padding:"10px"}}>
        <button onClick={handleMore}>more ....</button>
      </div>
    </>
  );
}
