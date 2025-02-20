import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import ForestFocus from "./pages/ForestFocus";
import ProgressPage from "./pages/ProgressPage";
import PeakPerformance from "./pages/PeakPerformance";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider } from "./components/Token";
import Profile from "./pages/Profile";
import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Signup />} />

          {/* Main App Routes */}
          <Route path="/forestfocus" element={<ForestFocus />} />
          <Route path="/crystalclarity" element={<ProgressPage />} />
          <Route path="/peakperformance" element={<PeakPerformance />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
