import { useState } from "react";
import { addQuestion } from "./addQuestion";

const AddQuestion = () => {
  const [text, setText] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [category, setCategory] = useState("");
  const [answers, setAnswers] = useState<
    { text: string; isCorrect: boolean; placeholder: string }[]
  >([
    { text: "", isCorrect: false, placeholder: "Excelent!" },
    { text: "", isCorrect: false, placeholder: "Interesting!" },
    { text: "", isCorrect: false, placeholder: "The best!" },
    { text: "", isCorrect: true, placeholder: "All of the above" },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const containerStyle = {
    maxWidth: "600px",
    width: "600px",
    margin: "40px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "rgb(71 75 102)",
  };

  const formGroupStyle = {
    marginBottom: "30px",
    display: "flex",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontWeight: "bold",
    marginBottom: "6px",
    width: "30%",
    textAlign: "left" as const,
  };

  const inputStyle = {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    flexGrow: 1,
  };

  const buttonStyle = {
    padding: "10px 16px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const removeButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#dc3545",
    marginLeft: "20px",
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#6c757d",
  };

  const messageStyle = (color: string) => ({
    color,
    fontWeight: "bold",
    marginTop: "10px",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setter(e.target.value);
  };

  const handleAnswerTextChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newAnswers = [...answers];
    newAnswers[index].text = e.target.value;
    setAnswers(newAnswers);
  };

  const handleAnswerCorrectnessChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newAnswers = [...answers];
    newAnswers[index].isCorrect = e.target.checked;
    setAnswers(newAnswers);
  };

  const handleAddAnswer = () => {
    setAnswers([
      ...answers,
      { text: "", isCorrect: false, placeholder: "Answer" },
    ]);
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
      answers: answers
        .filter((answer) => answer.text.trim() !== "")
        .map((answer) => ({
          text: answer.text,
          isCorrect: answer.isCorrect,
        })),
    };

    addQuestion(newQuestion, setError, setLoading, setSuccess);
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: "center" }}>Add New Question</h2>
      <form onSubmit={handleSubmit}>
        <div style={formGroupStyle}>
          <label htmlFor="text" style={labelStyle}>
            Question Text:
          </label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => handleChange(e, setText)}
            required
            rows={3}
            style={{ ...inputStyle }}
            placeholder="Describe this workshop"
          />
        </div>

        <div style={formGroupStyle}>
          <label htmlFor="difficultyLevel" style={labelStyle}>
            Difficulty Level:
          </label>
          <input
            id="difficultyLevel"
            type="text"
            value={difficultyLevel}
            onChange={(e) => handleChange(e, setDifficultyLevel)}
            required
            style={inputStyle}
            placeholder="1"
          />
        </div>

        <div style={formGroupStyle}>
          <label htmlFor="category" style={labelStyle}>
            Category:
          </label>
          <input
            id="category"
            type="text"
            value={category}
            onChange={(e) => handleChange(e, setCategory)}
            required
            style={inputStyle}
            placeholder="Trivia"
          />
        </div>

        <div>
          <label style={labelStyle}>Answers:</label>
          {answers.map((answer, index) => (
            <div
              key={index}
              style={{
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <input
                type="text"
                value={answer.text}
                onChange={(e) => handleAnswerTextChange(e, index)}
                placeholder={answer.placeholder}
                required
                style={{
                  ...inputStyle,
                  width: "undefined",
                  marginRight: "10px",
                }}
              />
              <label>
                <input
                  type="checkbox"
                  checked={answer.isCorrect}
                  onChange={(e) => handleAnswerCorrectnessChange(e, index)}
                  style={{ marginRight: "5px" }}
                />
                Correct
              </label>
              <button
                type="button"
                onClick={() => handleRemoveAnswer(index)}
                style={removeButtonStyle}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddAnswer}
            style={secondaryButtonStyle}
          >
            Add Another Answer
          </button>
        </div>

        <div style={{ marginTop: "50px" }}>
          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? "Adding..." : "Submit Question"}
          </button>
        </div>
      </form>

      {error && <p style={messageStyle("red")}>{error}</p>}
      {success && (
        <p style={messageStyle("green")}>Question added successfully!</p>
      )}
    </div>
  );
};

export default AddQuestion;
