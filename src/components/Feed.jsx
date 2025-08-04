import React, { useEffect } from "react";
import axios from "axios"; // You forgot to import axios
import { server_url } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../redux/feedSlice";
import UserCard from "./UserCard";

function Feed() {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(`${server_url}/api/user/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data));
    } catch (error) {
      if (error.status === "401") console.log(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
  if (!feed) return <div>loading</div>;
  if (feed.length === 0)
    return (
      <div className="text-center text-gray-400 italic py-8">
        No users available at the moment.
      </div>
    );
  return (
    <div className="flex justify-center items-center h-[90dvh]  w-[95vw]">
      <UserCard user={feed[0]} />
    </div>
  );
}

export default Feed;
