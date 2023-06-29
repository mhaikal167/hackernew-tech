/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line
import { useEffect, useState } from "react";
import { calculateTime } from "../config/func/calculateTime";
import { getItem, getStoryIds } from "../config/func/getStory";
import { MAX_STORIES, STORY_LIMIT } from "../config/constants";
import { Link } from "react-router-dom";

export default function Home() {
  const Story = ({ storyId, no }) => {
    const [story, setStory] = useState({});

    useEffect(() => {
      getItem(storyId).then((data) => data && data.url && setStory(data));
    }, []);

    return story && story.url ? (
      <div className=" border border-b-1 border-gray-400 flex gap-3" style={{padding:"10px"}}>
        <p>{no + 1}.</p>
        <div className="w-full text-gray-500">
          <div className="flex gap-3">
            <a
              href={story.url}
              target="_blank"
              className="hover:underline text-black"
              rel="noreferrer"
            >
              {story.title}
            </a>
          </div>
          <div className="flex gap-3">
            <p> {story.score} point </p>
            <p>
              by :
              <span > {story.by}</span>
            </p>
            <p>{calculateTime(story.time)} ago </p>
            <Link to={`/comments/${story.id}`}>
            <p className="hover:underline cursor-pointer"> comments : {story.descendants}</p>
            </Link>
          </div>
        </div>
      </div>
    ) : null;
  };

  const StoryList = () => {
    const [storyIds, setStoryIds] = useState([]);

    useEffect(() => {
      console.log("count", count);
      getStoryIds().then((data) => setStoryIds(data));
    }, [count]);

    return storyIds
      .slice(0, count)
      .map((storyId, idx) => (
        <Story key={storyId} storyId={storyId} no={idx} />
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
      <StoryList />
      <div className=" border border-b-1 border-gray-400" style={{padding:"10px"}}>
        <button onClick={handleMore}>more ....</button>
      </div>
    </>
  );
}
