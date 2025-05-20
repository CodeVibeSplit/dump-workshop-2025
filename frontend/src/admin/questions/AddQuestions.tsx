import { useState } from 'react';
import { addQuestion } from './addQuestion';

const AddQuestion = () => {
  const [text, setText] = useState('');
  const [difficultyLevel, setDifficultyLevel] = useState('');
  const [category, setCategory] = useState('');
  const [answers, setAnswers] = useState<{ text: string; isCorrect: boolean }[]>([{ text: '', isCorrect: false }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const containerStyle = {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: 'rgb(71 75 102)',
  };

  const formGroupStyle = {
    marginBottom: '16px',
  };

  const labelStyle = {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '6px',
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    padding: '10px 16px',
    marginTop: '10px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const removeButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#dc3545',
    marginLeft: '10px',
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#6c757d',
  };

  const messageStyle = (color: string) => ({
    color,
    fontWeight: 'bold',
    marginTop: '10px',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
    setter(e.target.value);
  };

  const handleAnswerTextChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newAnswers = [...answers];
    newAnswers[index].text = e.target.value;
    setAnswers(newAnswers);
  };

  const handleAnswerCorrectnessChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newAnswers = [...answers];
    newAnswers[index].isCorrect = e.target.checked;
    setAnswers(newAnswers);
  };

  const handleAddAnswer = () => {
    setAnswers([...answers, { text: '', isCorrect: false }]);
  };

  const handleRemoveAnswer = (index: number) => {
    const newAnswers = answers.filter((_, i) => i !== index);
    setAnswers(newAnswers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newQuestion = {
      text,
      difficultyLevel,
      category,
      answers: answers.filter(answer => answer.text.trim() !== '').map(answer => ({
        text: answer.text,
        isCorrect: answer.isCorrect,
      })),
    };

    addQuestion(newQuestion, setError, setLoading, setSuccess);
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center' }}>Add New Question</h2>
      <form onSubmit={handleSubmit}>
        <div style={formGroupStyle}>
          <label htmlFor="text" style={labelStyle}>Question Text:</label>
          <input
            id="text"
            type="text"
            value={text}
            onChange={(e) => handleChange(e, setText)}
            required
            style={inputStyle}
          />
        </div>

        <div style={formGroupStyle}>
          <label htmlFor="difficultyLevel" style={labelStyle}>Difficulty Level:</label>
          <input
            id="difficultyLevel"
            type="text"
            value={difficultyLevel}
            onChange={(e) => handleChange(e, setDifficultyLevel)}
            required
            style={inputStyle}
          />
        </div>

        <div style={formGroupStyle}>
          <label htmlFor="category" style={labelStyle}>Category:</label>
          <input
            id="category"
            type="text"
            value={category}
            onChange={(e) => handleChange(e, setCategory)}
            required
            style={inputStyle}
          />
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>Answers:</label>
          {answers.map((answer, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <input
                type="text"
                value={answer.text}
                onChange={(e) => handleAnswerTextChange(e, index)}
                placeholder="Answer text"
                required
                style={{ ...inputStyle, width: '70%', marginRight: '10px' }}
              />
              <label>
                <input
                  type="checkbox"
                  checked={answer.isCorrect}
                  onChange={(e) => handleAnswerCorrectnessChange(e, index)}
                  style={{ marginRight: '5px' }}
                />
                Correct
              </label>
              <button type="button" onClick={() => handleRemoveAnswer(index)} style={removeButtonStyle}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={handleAddAnswer} style={secondaryButtonStyle}>Add Answer</button>
        </div>

        <div>
          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? 'Adding...' : 'Add Question'}
          </button>
        </div>
      </form>

      {error && <p style={messageStyle('red')}>{error}</p>}
      {success && <p style={messageStyle('green')}>Question added successfully!</p>}
    </div>
  );
};

export default AddQuestion;
