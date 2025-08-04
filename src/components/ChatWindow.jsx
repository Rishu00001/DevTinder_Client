import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiRss, FiSend } from "react-icons/fi";
import dp from "../assets/dp.webp";
import SenderMessage from "./SenderMessage";
import ReceiverMessage from "./ReceiverMessage";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { server_url } from "../utils/constants";

function ChatWindow() {
  const userData = useSelector((store) => store.user.userData);
  const { receiverId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedUser, setSelecteduser] = useState({});
  const senderId = userData?._id;
  const fetchChat = async () => {
    try {
      const res = await axios.get(`${server_url}/api/chat/${receiverId}`, {
        withCredentials: true,
      });
      console.log(res?.data);
      setSelecteduser(
        res?.data?.participants.filter(
          (participant) => participant._id === receiverId
        )[0]
      );
      setMessages(res?.data?.messages);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const socket = createSocketConnection();
    if (!senderId || !receiverId) return;
    //As soon as the page loads , make a socket connection
    socket.emit("joinChat", { senderId, receiverId });
    socket.on("messageReceived", ({ firstName, text, senderId }) => {
      console.log(firstName + " : " + text);
      setMessages((prevMessages) => [
        ...prevMessages,
        { firstName, text, senderId },
      ]);
    });
    //cleanup -> whenever the component unloads
    return () => socket.disconnect();
  }, [userData, receiverId]);
  useEffect(() => {
    fetchChat();
  }, []);
  const sendMessage = () => {
    if (newMessage?.length <= 0) return;
    const socket = createSocketConnection();
    try {
      socket.emit("sendMessage", {
        firstName: userData.firstName,
        senderId,
        receiverId,
        text: newMessage,
      });
      setNewMessage("");
    } catch (error) {
      console.log(error);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-[90dvh] bg-gray-900 text-white w-[100dvw] lg:w-[80dvw]">
      {/* Header */}
      <div className="flex items-center px-4 py-3 bg-gray-800 shadow-md">
        <img
          src={selectedUser?.photo || dp}
          alt="Receiver"
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h2 className="text-lg font-semibold">{`${
            selectedUser.firstName || ""
          } ${selectedUser.lastName || ""}`}</h2>
          <p className="text-xs text-green-400">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scroll-hide h-[80dvh]">
        {messages &&
          messages.map((msg, index) => {
            return msg.sender == userData._id ||
              msg.senderId === userData._id ? (
              <SenderMessage key={index} msg={msg} />
            ) : (
              <ReceiverMessage key={index} msg={msg} />
            );
          })}
      </div>

      {/* Input Box */}
      <div className="bg-gray-800 p-3 flex items-center gap-2 shadow-inner">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border border-gray-700 rounded-full bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
          onClick={sendMessage}
        >
          <FiSend size={20} />
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;
