import React, { useState, useRef, useEffect } from "react";
import { useSocket } from "./socket";

const Chat = ({ chatmessage, setChatMessages, socketid }) => {
  const socket = useSocket();
  const [message, setMessage] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatmessage]);

  const handleSubmit = async () => {
    let temp = {};
    temp.message = message;
    temp.isUser = socketid;
    socket.emit("chatMessage", temp);
    setMessage("");
  };

  return (
    <div className="chatOutline">
      <div className="chatArea">
        {chatmessage.length > 0 &&
          chatmessage.map((item, index) => (
            <p
              key={index}
              style={{
                alignSelf: item.isUser === socketid ? "flex-end" : "flex-start",
                padding: "7px",
                margin: "7px",
                backgroundColor: item.isUser ? "#d1e7dd" : "#f8d7da",
              }}
            >
              {item.message}
              <span ref={ref}></span>
            </p>
          ))}
      </div>
      <div className="action">
        <input
          placeholder="Message ..."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button onClick={handleSubmit}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
