import { useEffect } from "react";
import { useSocket } from "../context/SocketContext";

const LeaderBoard = () => {
  const { scores, setScores } = useSocket();
  useEffect(() => {
    if (scores) {
      localStorage.setItem("scores", JSON.stringify(scores));
    } else setScores(JSON.parse(localStorage.getItem("scores")));
  }, [scores]);
  if (!scores || scores.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center w-96">
          <h1 className="text-2xl font-bold text-gray-800">
            No Scores Available
          </h1>
          <p className="text-gray-600 mt-2">Waiting for players to score...</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-circle-off-icon mt-4 text-gray-400"
          >
            <path d="m2 2 20 20" />
            <path d="M8.35 2.69A10 10 0 0 1 21.3 15.65" />
            <path d="M19.08 19.08A10 10 0 1 1 4.92 4.92" />
          </svg>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 to-purple-800 p-6">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg shadow-lg rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-white text-center mb-4">
          🏆 Live Leaderboard
        </h1>
        <ul className="divide-y divide-gray-300">
          {scores.map((user, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-4 text-white bg-white/20 rounded-lg mb-2 hover:bg-white/30 transition"
            >
              <span className="font-semibold">#{index + 1}</span>
              <span className="text-lg">{user.username}</span>
              <span className="font-bold text-yellow-300">
                {user.score} pts
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LeaderBoard;
