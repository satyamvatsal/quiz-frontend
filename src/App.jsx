import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SocketProvider } from "./context/SocketContext";
import QuizPage from "./pages/QuizPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LeaderBoard from "./pages/Leaderboard";
import TechStacks from "./pages/TechStack";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/know-more" element={<TechStacks />} />
          <Route
            path="/leaderboard"
            element={
              <SocketProvider>
                <LeaderBoard />
              </SocketProvider>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/quiz"
            element={
              <SocketProvider>
                <ProtectedRoute>
                  <QuizPage />
                </ProtectedRoute>
              </SocketProvider>
            }
          />
          <Route
            path="/"
            element={
              <SocketProvider>
                <ProtectedRoute>
                  <QuizPage />
                </ProtectedRoute>
              </SocketProvider>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
