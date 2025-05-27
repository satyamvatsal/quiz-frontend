import { useEffect } from "react";
import Question from "../components/Question";
import Timer from "../components/Timer";
import UserInfo from "../components/UserInfo";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const QuizPage = () => {
  const { authToken, username } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!authToken) {
      navigate("/login");
    }
  }, [authToken]);
  const handleStart = async () => {
    try {
      const BACKEND_URL = quizws.satyamvatsal.me;
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        console.error("No auth token found");
        return;
      }
      const response = await fetch(`${BACKEND_URL}/admin/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(
          "Server Error:",
          errorData.message || response.statusText,
        );
        return;
      }
      const data = await response.json();
      console.log("Message from server:", data.message);
      alert(data.message); // or show it in UI
    } catch (error) {
      console.error("Network or parsing error:", error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-2 sm:px-4">
      <div className="w-full max-w-lg text-center mb-2 sm:mb-4">
        <Timer />
      </div>
      <div className="w-full max-w-lg mb-2 sm:mb-4">
        <UserInfo />
      </div>
      {username === "admin" && (
        <button
          onClick={handleStart}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition duration-300 ease-in-out"
        >
          Start
        </button>
      )}
      <div className="w-full max-w-lg">
        <Question />
      </div>
    </div>
  );
};

export default QuizPage;
