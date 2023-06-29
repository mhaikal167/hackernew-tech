/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line
import { useEffect, useState } from "react";
import { MAX_STORIES, STORY_LIMIT } from "../config/constants";
import { calculateTime } from "../config/func/calculateTime";
import { getItem, getJobsIds } from "../config/func/getStory";

export default function JobStories() {
  const Jobs = ({ jobId, no }) => {
    const [jobs, setJobs] = useState({});

    useEffect(() => {
      getItem(jobId).then((data) => data && data.url && setJobs(data));
    }, []);

    return jobs && jobs.url ? (
      <div className=" px-4 py-2 border border-b-1 border-black flex gap-3" style={{padding:"10px"}}>
        <p>{no + 1}.</p>
        <div className="w-full">
          <div className="flex gap-3">
            <a
              href={jobs.url}
              target="_blank"
              className="hover:underline"
              rel="noreferrer"
            >
              {jobs.title}
            </a>
          </div>
          <div className="flex gap-3">
            <p> {jobs.score} point </p>
            <p>
              by :
              <span className="hover:underline cursor-pointer"> {jobs.by}</span>
            </p>
            <p>{calculateTime(jobs.time)} ago </p>
          
          </div>
        </div>
      </div>
    ) : null;
  };

  const JobsList = () => {
    const [jobsIds, setJobsIds] = useState([]);

    useEffect(() => {
      console.log("count", count);
      getJobsIds().then((data) => setJobsIds(data));
    }, [count]);

    return jobsIds
      .slice(0, count)
      .map((jobId, idx) => (
        <Jobs key={jobId} jobId={jobId} no={idx} />
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
      <JobsList />
      <div className=" border border-b-1 border-black" style={{padding:"10px"}}>
        <button onClick={handleMore}>more ....</button>
      </div>
    </>
  );
}
