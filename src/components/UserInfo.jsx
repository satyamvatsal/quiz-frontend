import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { SocketContext } from "../context/SocketContext";

const UserInfo = () => {
  const { username } = useContext(AuthContext);
  const { score } = useContext(SocketContext);
  return (
    <div className="flex items-center justify-between text-sm font-bold text-center text-white px-4 py-2 rounded-lg shadow-md bg-gray-800 w-full max-w-sm">
      <div className="mx-10 my-4">{username}</div>
      <div className="mx-10 my-4">Score: {score}</div>
    </div>
  );
};
export default UserInfo;
