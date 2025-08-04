import React from "react";

function SenderMessage({ msg }) {
  return (
    <div className="chat chat-end">
      <div className="chat-bubble text-white bg-primary">
        {msg.text}
      </div>
    </div>
  );
}

export default SenderMessage;

