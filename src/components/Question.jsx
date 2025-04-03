import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";

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
  } = useSocket();
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    getLatestQuestion();
  }, []);

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
            <h1 className="text-lg font-semibold text-gray-900 mt-2 bg-yellow-200 p-2 px-4 rounded-md shadow-sm inline-block">
              {message}
            </h1>
          )}
        </div>
        {quizEnded ? (
          <h2 className="text-center text-4xl font-bold text-white">
            Your score: {score}
          </h2>
        ) : (
          <h2 className="text-center text-gray-500 text-xl">
            ⌛ Waiting for the next question...
          </h2>
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
              let buttonColor = "bg-gray-700 hover:bg-green-600";
              if (selectedOption === optionLetter) {
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
