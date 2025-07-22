import React from "react";
import dp from "../assets/dp.webp";
import { server_url } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../redux/feedSlice";
import axios from "axios";
function UserCard({ user }) {
  const dispatch = useDispatch();
  const sendRequest = async ({ userId, status }) => {
    try {
      const res = await axios.post(
        `${server_url}/api/request/send/${status}/${userId}`,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeFeed(userId));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="card bg-base-100 w-96  justify-center">
      <figure>
        <img src={user?.photo || dp} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{user.firstName + " " + user.lastName}</h2>
        <p>{user.bio}</p>
        <div className="card-actions justify-end py-10">
          <button
            className="btn btn-outline btn-warning"
            onClick={() => sendRequest({status : "ignored", userId :user?._id})}
          >
            Ignore
          </button>
          <button
            className="btn btn-outline btn-success"
            onClick={() => sendRequest({status : "interested", userId : user?._id})}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
