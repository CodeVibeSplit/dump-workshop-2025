import { useEffect, useState } from 'react';
import GameOverScreen from './GameOverScreen';
import { Question } from '../../admin/questions/types';
import { fetchQuestions } from '../../admin/questions/fetchQuestions';

function Game() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchQuestions(setQuestions, setError, setLoading);
  }, []);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setGameOver(true);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (questions.length === 0) return <div>No questions available</div>;

  if (gameOver) return <GameOverScreen  correctAnswers={score} />;

  const currentQuestion = questions[currentIndex];

  return (
    <div>
      <h2>Question {currentIndex + 1}</h2>
      <p>{currentQuestion.text}</p>
      <div>
        {currentQuestion.answers.map((ans) => (
          <button
            key={ans.id}
            onClick={() => handleAnswer(ans.isCorrect)}
            style={{ display: 'block', margin: '10px 0' }}
          >
            {ans.text}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Game;
