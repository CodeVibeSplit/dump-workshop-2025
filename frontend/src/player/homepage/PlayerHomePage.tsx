import { useNavigate } from 'react-router-dom';

export function PlayerHomePage() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/game');
  };
  return (
    <div>
      <div>
        <h2>Welcome, Player</h2>
        <div>
          Bla bla game rules
          <button onClick={handleStart}>Start game</button>
        </div>
      </div>
    </div>
  );
}
