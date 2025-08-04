import React from "react";

function ReceiverMessage({ msg }) {
  return (
    <div className="chat chat-start">
      <div className="chat-bubble">{msg.text}</div>
    </div>
  );
}

export default ReceiverMessage;
