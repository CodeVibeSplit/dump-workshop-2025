import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { AdminHomePage } from './admin/homepage/AdminHomePage';
import QuestionsList from './admin/questions/QuestionsList';
import AddQuestion from './admin/questions/AddQuestions';
import { PlayerHomePage } from './player/homepage/PlayerHomePage';
import Game from './player/game/Game';
import { Navigation } from './shared/Navigation';

function AppContent() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/admin" element={<AdminHomePage />} />
        <Route path="/player" element={<PlayerHomePage />} />
        <Route path="/game" element={<Game />} />
        <Route path="/questions/updateDelete" element={<QuestionsList />} />
        <Route path="/questions/add" element={<AddQuestion />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
