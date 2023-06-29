/* eslint-disable react-hooks/exhaustive-deps */
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { calculateTime } from "../config/func/calculateTime";
import { getItem } from "../config/func/getStory";

export default function Comments() {
  const { id } = useParams();
  const Comment = ({ cmtId }) => {
    const [commentStories, setCommentStories] = useState({});
    useEffect(() => {
      getItem(cmtId).then((data) => data && setCommentStories(data));
    }, []);
    return commentStories ? (
      <div className=" border border-b-1 border-black flex gap-3" style={{padding:"10px"}}>
        <div className="w-full">
          <div className="flex gap-3">
            <a
              href={commentStories.url}
              target="_blank"
              className="hover:underline"
              rel="noreferrer"
            >
              {commentStories.title}
            </a>
          </div>
          <div className="flex gap-3 mb-4">
            <p className="text-gray-300">
              by : <span className="hover:underline cursor-pointer">{commentStories.by}</span>
            </p>
            <p>{calculateTime(commentStories.time)} ago </p>
           
          </div>
          <div style={{padding:"10px"}}>
            {parse(`${commentStories.text}`)}
            </div>
        </div>
      </div>
    ) : null;
  };

  const CommentList = () => {
    const [commentId, setCommentId] = useState([]);

    useEffect(() => {
      getItem(id).then((data) => setCommentId(data.kids));
    }, []);
    console.log(commentId, "ini commentsd");
    return commentId.map((cmtId, idx) => (
      <Comment key={cmtId} cmtId={cmtId} no={idx} />
    ));
  };
  return (
    <>
      <h1>Comments</h1>
      <CommentList />
    </>
  );
}
