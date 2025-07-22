import React, { useEffect } from "react";
import axios from "axios";
import { server_url } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../redux/ConnectionSlice";
import dp from "../assets/dp.webp"
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

  if (!connectionList)
    return <div className="text-center my-10">Loading...</div>;
  if (connectionList?.length === 0) {
    <div className="text-center my-10">No Connections</div>;
  }
return (
  <div className="flex flex-col items-center my-10">
    <h1 className="font-bold text-2xl mb-6 text-gray-400">CONNECTIONS</h1>

    <div className="w-full max-w-sm space-y-3">
      {connectionList.map((con, index) => (
        <div
          key={index}
          className="flex items-center gap-4 px-5 py-2 bg-gray-800 text-white shadow-md rounded-lg hover:bg-gray-700 transition"
        >
          <img
            src={con.photo || dp}
            alt={`${con.firstName} ${con.lastName}`}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <span className="text-base font-semibold">
              {con.firstName} {con.lastName}
            </span>
            <span className="text-sm text-gray-500">{con.bio}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);


}

export default Connections;
