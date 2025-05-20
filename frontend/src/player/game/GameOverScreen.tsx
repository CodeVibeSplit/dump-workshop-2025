type Props = {
  totalQuestions: number;
};

function GameOverScreen({ correctAnswers }: Props) {
  return (
    <div>
      <h2>Game Over</h2>
      <p>You answered correctly {correctAnswers} questions!</p>
    </div>
  );
}

export default GameOverScreen;
