import { useEffect } from "react";
import Question from "../components/Question";
import Timer from "../components/Timer";
import UserInfo from "../components/UserInfo";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const QuizPage = () => {
  const { authToken } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!authToken) {
      navigate("/login");
    }
  }, [authToken]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-2 sm:px-4">
      <div className="w-full max-w-lg text-center mb-2 sm:mb-4">
        <Timer />
      </div>
      <div className="w-full max-w-lg mb-2 sm:mb-4">
        <UserInfo />
      </div>
      <div className="w-full max-w-lg">
        <Question />
      </div>
    </div>
  );
};

export default QuizPage;
