import React, { useState, useEffect } from "react";
import { useSocket } from "./socket";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import Chat from "./Chat";
import Polling from "./Polling";
import Navbar from "./nav";
import { useNavigate } from "react-router-dom";

function Home() {
  const socket = useSocket();
  const [component, setComponent] = useState("poll");
  const [user, SetUser] = useState(null);
  const [polls, setPolls] = useState(null);
  const [socketid, setSocketId] = useState("");
  const [chatmessage, setChatMessages] = useState([]);
  const [clicked, setClicked] = useState(1);
  const navigate = useNavigate();

  const handlePoll = () => {
    setComponent("poll");
    setClicked(1);
  };

  const handleChat = () => {
    setComponent("chat");
    setClicked(2);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        SetUser(user);
      } else {
        navigate("/login");
      }
    });
    if (!socket) return;

    socket.connect();
    socket.on("connect", () => {
      setSocketId(socket.id);
    });

    socket.on("initialData", ({ pollOptions, chatMessages }) => {
      setPolls(pollOptions);
      setChatMessages(chatMessages);
    });
    socket.on("Polling", (data) => {
      setPolls(data);
    });

    // Update poll options when new vote is received
    socket.on("updatePoll", (updatedPollOptions) => {
      setPolls(updatedPollOptions);
    });
    socket.on("newChatMessage", (message) => {
      
      setChatMessages([...chatmessage, message]);
      
    });
    
    return () => {
      socket.off("connect");
      socket.off("initialData");
      socket.off("updatePoll");
      socket.off("newChatMessage");
    };
  }, [chatmessage, socket]);

  const handleLogout = () => {
    signOut(auth);
    navigate("/login");
  };

  return (
    <>
      <Navbar onLogout={handleLogout} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <div
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            style={{
              paddingLeft: "40px",
              paddingRight: "40px",
              backgroundColor: clicked === 1 ? "blue" : "grey",
            }}
            onClick={handlePoll}
          >
            Polling
          </button>
          <button
            style={{
              paddingLeft: "40px",
              paddingRight: "40px",
              backgroundColor: clicked === 2 ? "blue" : "grey",
            }}
            onClick={handleChat}
          >
            Chat
          </button>
        </div>
        <div>
          {component === "poll" && (
            <Polling polls={polls} socketid={socketid} />
          )}
        </div>
        <div>
          {component === "chat" && (
            <Chat
              chatmessage={chatmessage}
              setChatMessages={setChatMessages}
              socketid={socketid}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
