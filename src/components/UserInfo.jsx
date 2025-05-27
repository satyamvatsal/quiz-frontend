import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { SocketContext } from "../context/SocketContext";

const UserInfo = () => {
  const { username, handleLogout } = useContext(AuthContext);
  const { score, userRank } = useContext(SocketContext);

  const clearCache = () => {
    const authToken = localStorage.getItem("authToken");
    const username = localStorage.getItem("username");
    localStorage.clear();
    if (authToken) localStorage.setItem("authToken", authToken);
    if (username) localStorage.setItem("username", username);
    window.location.reload();
  };
  return (
    <div className="flex items-center justify-between text-md text-white px-6 py-4 rounded-lg shadow-md bg-gray-800 w-full">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-user-icon"
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        <button className="truncate" onClick={handleLogout}>
          {username}
        </button>
      </div>

      <div className="flex flex-col items-center flex-1 font-bold space-y-1.5">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-circle-gauge-icon"
          >
            <path d="M15.6 2.7a10 10 0 1 0 5.7 5.7" />
            <circle cx="12" cy="12" r="2" />
            <path d="M13.4 10.6 19 5" />
          </svg>
          <span>{score}</span>
        </div>

        {/* <span className="text-sm text-gray-300">Rank: {userRank}</span> */}
      </div>
      {/* Active Users (Right) */}
      <div className="flex items-center gap-2 flex-1 justify-end font-bold">
        {/* <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" /> */}
        {/* {activeUsers} online */}
        <span className="text-sm text-gray-300" onClick={() => clearCache()}>
          Rank: {userRank}
        </span>
      </div>
    </div>
  );
};

export default UserInfo;
