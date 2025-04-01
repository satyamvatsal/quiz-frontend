import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";

const Timer = () => {
  const { startTime } = useContext(SocketContext);
  const [time, setTime] = useState(40);

  useEffect(() => {
    if (!startTime) return;

    const updateTime = () => {
      const remainingTime = Math.max(
        0,
        Math.floor((40 * 1000 - (Date.now() - startTime)) / 1000),
      );
      setTime(remainingTime);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  return (
    <h3 className="text-2xl font-bold text-center text-white bg-red-600 px-4 py-2 rounded-lg shadow-md">
      ⏳ Time Left: {time}s
    </h3>
  );
};

export default Timer;
