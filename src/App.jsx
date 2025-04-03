import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SocketProvider } from "./context/SocketContext";
import QuizPage from "./pages/QuizPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LeaderBoard from "./pages/Leaderboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <SocketProvider>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route path="/leaderboard" element={<LeaderBoard />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/quiz"
              element={
                <ProtectedRoute>
                  <QuizPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <QuizPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </SocketProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
