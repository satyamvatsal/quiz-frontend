import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";

const SocketContext = createContext();
const SOCKET_SERVER_URL = "wss://ws.visioncse.tech";

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [latestQuestion, setLatestQuestion] = useState(null);
  const [startTime, setStartTime] = useState(0);
  const [message, setMessage] = useState("");
  const [responseTime, setResponseTime] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [score, setScore] = useState(localStorage.getItem("score") || 0);
  const { logout } = useAuth();

  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL, {
      transports: ["websocket"],
      withCredentials: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      auth: {
        token: localStorage.getItem("authToken"),
      },
    });
    setSocket(newSocket);
    const fetchLatestQuestion = () => {
      console.log("🔄 Requesting latest question...");
      newSocket.emit("get_latest_question");
    };
    newSocket.on("connect", () => {
      console.log("✅ Connected to WebSocket Server:", newSocket.id);
      fetchLatestQuestion();
    });

    newSocket.on("disconnect", (reason) => {
      console.log("❌ Disconnected from WebSocket Server", reason);
      if (reason === "io server disconnect") {
        console.warn("🚫 Unauthorized: Logging out user...");
        logout();
      }
    });

    newSocket.on("new_question", (question) => {
      setLatestQuestion(question);
      setStartTime(question.start_time);
      setMessage("");
      setCorrectAnswer(null);
    });

    newSocket.on("answer_received", ({ response_time }) => {
      setMessage("Time up !!");
      setResponseTime(response_time);
    });

    newSocket.on("correct_answer", (correctAnswer) => {
      setCorrectAnswer(correctAnswer);
    });
    newSocket.on("update_score", ({ score }) => {
      setScore(score);
      localStorage.setItem("score", score);
    });
    newSocket.on("quiz_info", ({ msg, timeLeft }) => {
      setMessage(msg);
      setTimeLeft(timeLeft);
    });

    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    if (latestQuestion && responseTime)
      localStorage.setItem(`response_time_${latestQuestion.id}`, responseTime);
  }, [responseTime, latestQuestion]);

  const submitAnswer = (questionId, answer) => {
    if (socket) {
      socket.emit("submit_answer", { questionId, answer });
    }
  };

  const getLatestQuestion = () => {
    if (socket) {
      socket.emit("get_latest_question");
    }
  };
  return (
    <SocketContext.Provider
      value={{
        socket,
        latestQuestion,
        startTime,
        correctAnswer,
        getLatestQuestion,
        submitAnswer,
        responseTime,
        message,
        score,
        timeLeft,
        setResponseTime,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
export { SocketContext, SocketProvider };
