import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";

const Timer = () => {
  const { startTime, quizStartTime, quizEnded } = useContext(SocketContext);
  const [quizTimeLeft, setQuizTimeLeft] = useState("waiting...");
  const [questionTime, setQuestionTime] = useState(10);
  const [hours, setHours] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [seconds, setSeconds] = useState(null);

  useEffect(() => {
    setHours(Math.floor(quizTimeLeft / 3600));
    setMinutes(Math.floor((quizTimeLeft % 3600) / 60));
    setSeconds(quizTimeLeft % 60);
  }, [quizTimeLeft]);

  useEffect(() => {
    const currentTime = Date.now();
    const timeLeft = Math.floor((quizStartTime - currentTime) / 1000);
    setQuizTimeLeft(timeLeft);
  }, [quizStartTime]);
  useEffect(() => {
    if (!startTime) return;

    const updateTime = () => {
      const remainingTime = Math.max(
        0,
        Math.floor((10 * 1000 - (Date.now() - startTime)) / 1000),
      );
      setQuestionTime(remainingTime);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [startTime]);
  useEffect(() => {
    if (!quizStartTime || quizStartTime <= 0) return;

    const interval = setInterval(() => {
      setQuizTimeLeft((prevTime) => Math.max(0, prevTime - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [quizStartTime]);

  return (
    <h3 className="text-lg sm:text-2xl font-bold text-center text-white bg-red-600 px-2 sm:px-4 py-2 rounded-lg shadow-md">
      {!quizEnded
        ? quizTimeLeft > 0
          ? `Quiz will start in ${hours}h ${minutes}m ${seconds}s`
          : `⏳ Time Left: ${questionTime}s`
        : "Quiz has ended."}
    </h3>
  );
};

export default Timer;
