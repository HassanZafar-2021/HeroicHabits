import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Quests from "./components/Quest";
import QuickActions from "./components/QuickAction";
import Footer from "./components/Footer";
import "./App.css"; // Import global styles

const App: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-yellow-50 to-blue-50 min-h-screen text-base-content">
      <Header />
      <main>
        <Hero />
        <Quests />
        <QuickActions />
      </main>
      <Footer />
    </div>
  );
};

export default App;
