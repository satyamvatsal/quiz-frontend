import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";

const Timer = () => {
  const { startTime, timeLeft } = useContext(SocketContext);
  const [quizTimeLeft, setQuizTimeLeft] = useState(timeLeft);
  const [questionTime, setQuestionTime] = useState(40);

  useEffect(() => {
    setQuizTimeLeft(timeLeft);
  }, [timeLeft]);
  useEffect(() => {
    if (!startTime) return;

    const updateTime = () => {
      const remainingTime = Math.max(
        0,
        Math.floor((40 * 1000 - (Date.now() - startTime)) / 1000),
      );
      setQuestionTime(remainingTime);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [startTime]);
  useEffect(() => {
    if (!timeLeft || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setQuizTimeLeft((prevTime) => Math.max(0, prevTime - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  return (
    <h3 className="text-lg sm:text-2xl font-bold text-center text-white bg-red-600 px-2 sm:px-4 py-2 rounded-lg shadow-md">
      {quizTimeLeft > 0
        ? `Quiz will start in ${Math.floor(quizTimeLeft / 60)} m ${quizTimeLeft % 60}s`
        : `⏳ Time Left: ${questionTime}s`}
    </h3>
  );
};

export default Timer;
