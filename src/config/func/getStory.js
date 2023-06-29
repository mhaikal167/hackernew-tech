import { API } from "../apis/apis";

export const getStoryIds = async () => {
  const result = await API.get("/topstories.json").then(({ data }) => data);
  return result;
};

export const getItem = async (id) => {
  const result = await API.get(`/item/${id}.json`).then(({ data }) => data);
  return result;
};

export const getNewIds = async () => {
  const result = await API.get("/newstories.json").then(({ data }) => data);
  return result;
};

export const getBestIds = async () => {
  const result = await API.get("/beststories.json").then(({ data }) => data);
  return result;
};

export const getAskIds = async () => {
    const result = await API.get("/askstories.json").then(({data}) => data);
    return result;
}

export const getShowIds = async () => {
    const result = await API.get("/showstories.json").then(({data}) => data);
    return result;
}

export const getJobsIds = async () => {
    const result = await API.get("/jobstories.json").then(({data}) => data);
    return result;
}
