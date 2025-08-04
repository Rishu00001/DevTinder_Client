import React, { useEffect } from "react";
import { server_url } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../redux/RequestSlice";
import dp from "../assets/dp.webp";

function Requests() {
  const receivedRequests = useSelector((store) => store.request);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${server_url}/api/user/requests/received`, {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addRequest(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!receivedRequests)
    return <div className="mt-10 font-bold text-2xl">Loading...</div>;

  const handleAccept = async (requestId) => {
    try {
      const res = await axios.post(
        `${server_url}/api/request/review/accepted/${requestId}`,
        {},
        { withCredentials: true } // ✅ Correct placement
      );
      console.log(res.data);
      fetchRequests(); // 🔄 Refresh after action
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (requestId) => {
    try {
      const res = await axios.post(
        `${server_url}/api/request/review/rejected/${requestId}`,
        {},
        { withCredentials: true } // ✅ Correct placement
      );
      console.log(res.data);
      fetchRequests(); // 🔄 Refresh after action
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center my-10 w-[100vw]">
      <h1 className="font-bold text-2xl mb-6 text-gray-400">Requests</h1>

      <div className="w-full max-w-sm space-y-3">
        {receivedRequests.map((con, index) => (
          <div
            key={index}
            className="flex justify-between gap-3 px-5 py-4 bg-gray-800 text-white shadow-md rounded-lg hover:bg-gray-700 transition"
          >
            <div className="flex items-center gap-4">
              <img
                src={con.senderId.photo || dp}
                alt={`${con.senderId.firstName} ${con.senderId.lastName}`}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className="text-base font-semibold">
                  {con.senderId.firstName} {con.senderId.lastName}
                </span>
                <span className="text-sm text-gray-400">
                  {con.senderId.bio}
                </span>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
<button
  onClick={() => handleAccept(con._id)}
  className="px-3 py-0 text-xs bg-green-600 hover:bg-green-700 rounded"
>
  Accept
</button>
<button
  onClick={() => handleReject(con._id)}
  className="px-3 py-0 text-xs bg-red-600 hover:bg-red-700 rounded"
>
  Reject
</button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Requests;
