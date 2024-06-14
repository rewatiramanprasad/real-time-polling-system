import React, { useEffect, useState } from "react";
import { useSocket } from "./socket";
import "./App.css";
const Polling = ({ polls, socketid }) => {
  const socket = useSocket();
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");

  const handleSubmit = () => {
    let temp = {};
    temp.id = socketid;
    temp.question = question;
    temp.option1 = option1;
    temp.option2 = option2;
    temp.option3 = option3;
    temp.option4 = option4;
    socket.emit("GeneratedPoll", temp);
  };
  const handleVote = (optionIndex) => {
    socket.emit("vote", optionIndex);
  };
  return (
    <div style={styles.most}>
      <div style={styles.mostOuter}>
        {polls && (
          <div className="pollVoting">
            <label>{polls.question}</label>
            {polls.options.map((item, index) => (
              <button
                className="options"
                style={{ backgroundColor: `${item.color}` }}
                onClick={() => {
                  handleVote(index);
                }}
              >
                {item.option}:votes={item.votes}
              </button>
            ))}
          </div>
        )}
      </div>
      <div style={styles.mostOuter}>
        {polls && (
          <div style={styles.outer}>
            <input
              onChange={(e) => {
                setQuestion(e.target.value);
              }}
              placeholder="please enter your question"
            />
            <input
              placeholder="Option1"
              onChange={(e) => {
                setOption1(e.target.value);
              }}
            />
            <input
              placeholder="Option2"
              onChange={(e) => {
                setOption2(e.target.value);
              }}
            />
            <input
              placeholder="Option3"
              onChange={(e) => {
                setOption3(e.target.value);
              }}
            />
            <input
              placeholder="Option4"
              onChange={(e) => {
                setOption4(e.target.value);
              }}
            />
            <button className="submitbutton" onClick={handleSubmit}>
              Generate
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
const styles = {
  outer: {
    margin: "20px",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "whiteSmoke",
  },
  mostOuter: {
    display: "flex",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "whiteSmoke",
    flexDirection: "column",
    width: "450px",
  },
  most: {
    marginTop: "20px",
    // border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "whiteSmoke",
    display: "flex",
    flexDirection: "row",
  },
};

export default Polling;
