import React, { useEffect } from "react";
import axios from "axios";
import { server_url } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../redux/ConnectionSlice";
import dp from "../assets/dp.webp";
import { Link } from "react-router-dom";

function Connections() {
  const connectionList = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${server_url}/api/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnection(res?.data?.data));
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connectionList) {
    return <div className="text-center my-10 text-gray-500">Loading...</div>;
  }

  if (connectionList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center text-gray-600 animate__animated animate__fadeIn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-gray-400 mb-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 16l4-4m0 0l-4-4m4 4H7" />
          <path d="M3 12a9 9 0 0118 0" />
        </svg>
        <h2 className="text-2xl font-semibold">No Connections Yet</h2>
        <p className="text-sm mt-2 max-w-xs">
          You haven’t connected with any developers yet. Start exploring and
          find some amazing devs to collaborate with!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center my-10 px-4 bg-red w-[100vw]">
      <h1 className="font-bold text-2xl mb-6 text-gray-400">CONNECTIONS</h1>

      <div className="w-full max-w-sm space-y-3">
        {connectionList.map((con, index) => (
          <div
            key={index}
            className="flex items-center gap-4 px-5 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
          >
            <img
              src={con.photo || dp}
              alt={`${con.firstName} ${con.lastName}`}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-col">
                <span className="text-base font-semibold">
                  {con.firstName} {con.lastName}
                </span>
                <span className="text-sm text-gray-400">{con.bio}</span>
              </div>
              <Link to={"/chat/"+con._id}>
                {" "}
                <button className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-500 rounded-md transition">
                  Chat
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Connections;
