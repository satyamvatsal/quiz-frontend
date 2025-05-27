import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";
import { useLocation } from "react-router-dom";

const SocketContext = createContext();
const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_SERVER_URL;

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [latestQuestion, setLatestQuestion] = useState(null);
  const [startTime, setStartTime] = useState(0);
  const [message, setMessage] = useState("");
  const [responseTime, setResponseTime] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [scores, setScores] = useState(null);
  const [quizEnded, setQuizEnded] = useState(false);
  const [quizStartTime, setQuizStartTime] = useState(null);
  const [activeUsers, setActiveUsers] = useState(0);
  const [userRank, setUserRank] = useState(null);
  const [score, setScore] = useState(localStorage.getItem("score") || 0);
  const { logout } = useAuth();
  const location = useLocation();
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
    newSocket.on("connect", () => {
      console.log("✅ Connected to WebSocket Server:", newSocket.id);
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
      setResponseTime(response_time);
    });

    newSocket.on("correct_answer", (correctAnswer) => {
      setMessage("Time up !!");
      setCorrectAnswer(correctAnswer);
    });
    newSocket.on("update_score", ({ score }) => {
      setScore(score);
      localStorage.setItem("score", score);
    });
    newSocket.on("quiz_info", ({ message, quizStartTime, quizEnded }) => {
      if (quizEnded) {
        setQuizEnded(true);
        setLatestQuestion(null);
      }
      setMessage(message);
      setQuizStartTime(quizStartTime);
    });
    newSocket.on("update_leaderboard", (data) => {
      console.log(data.scores);
      setScores(data.scores);
    });
    newSocket.on("active_users", (active_users) => {
      console.log(active_users);
      setActiveUsers(active_users);
    });
    newSocket.on("user_rank", (rank) => {
      console.log("rank: ", rank);
      setUserRank(rank);
    });
    newSocket.on("error", ({ message }) => {
      console.log("error : ", message);
      setMessage(message);
    });

    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    if (!socket) return;

    if (location.pathname === "/leaderboard") {
      socket.emit("getLeaderboard");
    }
  }, [location.pathname, socket]);

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
        quizStartTime,
        quizEnded,
        setResponseTime,
        scores,
        activeUsers,
        setScores,
        userRank,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
export { SocketContext, SocketProvider };
