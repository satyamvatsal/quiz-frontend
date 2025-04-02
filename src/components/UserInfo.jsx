import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { SocketContext } from "../context/SocketContext";

const UserInfo = () => {
  const { username } = useContext(AuthContext);
  const { score } = useContext(SocketContext);

  return (
    <div className="flex items-center justify-between text-md text-white px-6 py-4 rounded-lg shadow-md bg-gray-800 w-full">
      {/* User Icon and Username */}
      <div className="flex items-center gap-2 flex-1">
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
        <span className="truncate">{username}</span>
      </div>

      {/* Score Icon and Score Value */}
      <div className="flex items-center gap-2 flex-1 justify-end font-bold">
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
        {score}
      </div>
    </div>
  );
};

export default UserInfo;
