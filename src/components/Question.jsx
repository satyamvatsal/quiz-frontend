import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";

const Question = () => {
  const {
    latestQuestion,
    submitAnswer,
    getLatestQuestion,
    message,
    responseTime,
    setResponseTime,
    correctAnswer,
    quizEnded,
    score,
    userRank,
  } = useSocket();
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getLatestQuestion();
  }, []);
  const handleNewGame = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      const username = localStorage.getItem("username");
      localStorage.clear();
      if (authToken !== null) {
        localStorage.setItem("authToken", authToken);
      }
      if (username) localStorage.setItem("username", username);
      const BACKEND_URL = quizws.satyamvatsal.me;
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
      setTimeout(() => {
        window.location.reload();
      }, 5000);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setIsCorrect(null);
    if (latestQuestion) {
      const response_time = localStorage.getItem(
        `response_time_${latestQuestion.id}`,
      );
      if (response_time) {
        setResponseTime(response_time);
      }
      const storedAnswer = localStorage.getItem(
        `selected_answer_${latestQuestion.id}`,
      );
      if (storedAnswer) {
        setSelectedOption(storedAnswer);
      } else {
        setSelectedOption(null);
      }
    } else {
      setSelectedOption(null);
    }
  }, [latestQuestion]);
  const handleAnswerClick = async (index) => {
    const choosenLetter = String.fromCharCode(65 + index);
    setSelectedOption(choosenLetter);
    await submitAnswer(latestQuestion.id, choosenLetter);
    localStorage.setItem(`selected_answer_${latestQuestion.id}`, choosenLetter);
  };
  useEffect(() => {
    if (selectedOption && correctAnswer) {
      setIsCorrect(selectedOption === correctAnswer);
    }
  }, [correctAnswer, selectedOption]);

  if (!latestQuestion)
    return (
      <div className="flex flex-col items-center justify-start pt-20 min-h-screen bg-gray-900 px-4">
        <div className="w-full max-w-lg text-center mb-4">
          {message && (
            <h1 className="text-lg fontCPXplore-semibold text-gray-900 mt-2 bg-yellow-200 p-2 px-4 rounded-md shadow-sm inline-block">
              {message}
            </h1>
          )}
        </div>
        {quizEnded ? (
          <div className="space-y-4 text-white text-center bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md mx-auto">
            <h2 className="text-4xl font-bold">Your score: {score}</h2>
            <h2 className="text-4xl font-bold text-green-400">
              {userRank == "1" ? "🎉 You Won" : "😭 You lose"}
            </h2>

            <button
              onClick={() => navigate("/leaderboard")}
              className="mt-4 mx-10 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition duration-200"
            >
              View Leaderboard
            </button>
            <button
              onClick={() => handleNewGame()}
              className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition duration-200"
            >
              New game
            </button>
            <p className="mt-6 text-base text-white font-medium">
              Made by{" "}
              <span className="text-blue-300 font-semibold">
                team Vision CSE
              </span>{" "}
              using <span className="text-yellow-300">Socket.io</span>
            </p>

            {/* Smaller stack detail */}
            <a href="/know-more">
              <p className="text-xs text-gray-400 mt-4">
                Server: Express • Real-time: Socket.io
              </p>
              <span className="text-xs text-gray-400 mt-4">
                • Caching: Redis
              </span>
            </a>
          </div>
        ) : (
          <div className="">
            <h2 className="text-center text-gray-500 text-xl">
              ⌛ Waiting for the question...
            </h2>
            <div className="mt-4 px-4 text-gray-100 text-md space-y-2">
              <p>
                📌 <strong>Scoring Rules:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  You can earn up to <strong>100 points</strong> for each
                  correct answer. The score decreases linearly with your
                  response time.
                </li>
                <li>
                  Each incorrect answer results in a{" "}
                  <strong>20-point deduction</strong>.
                </li>
                <li>
                  You can view your <strong>live score</strong> and{" "}
                  <strong>rank</strong> in the user section.
                </li>
                <li>
                  You can click on your <strong>username</strong> to logout
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-start pt-20 min-h-screen bg-gray-900 px-4">
      <div className="w-full max-w-lg text-center mb-4">
        {message && (
          <h1 className="text-lg font-semibold text-gray-900 mt-2 bg-yellow-200 p-2 px-4 rounded-md shadow-sm inline-block">
            {message}
          </h1>
        )}
      </div>

      <div className="bg-gray-800 text-white p-6 rounded-2xl shadow-xl max-w-lg w-full">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-center">
            {latestQuestion.question_text}
          </h2>
          <ul className="space-y-3">
            {latestQuestion.options.map((option, index) => {
              const optionLetter = String.fromCharCode(65 + index);
              let buttonColor = "bg-gray-700 hover:bg-gray-900";
              if (correctAnswer !== null && correctAnswer === optionLetter) {
                buttonColor = "bg-green-500";
              } else if (selectedOption === optionLetter) {
                // If the user selected this option, handle the selected option logic.
                if (correctAnswer === null) {
                  buttonColor = "bg-orange-500";
                } else {
                  buttonColor = isCorrect ? "bg-green-500" : "bg-red-500";
                }
              }
              return (
                <li key={index} className="w-full">
                  <button
                    onClick={() => handleAnswerClick(index)}
                    disabled={selectedOption !== null}
                    className={`w-full px-4 py-3 rounded-lg transition duration-300 text-lg ${buttonColor} ${
                      selectedOption ? "cursor-not-allowed" : ""
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span>
                        {optionLetter + ". "}
                        {option}
                      </span>
                      {selectedOption === optionLetter && responseTime && (
                        <span className="text-sm text-gray-300">
                          {responseTime}s
                        </span>
                      )}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Question;
