import React, { useState, useEffect } from "react";
import { fetchQuestions } from "./fetchQuestions";
import { deleteQuestion } from "./deleteQuestion";
import { updateQuestion } from "./updateQuestion";
import { Question, Answer } from "./types";
import "./QuestionsList.scss";

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

const QuestionsList: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [questionToUpdate, setQuestionForUpdate] = useState<Question | null>(
    null
  );

  useEffect(() => {
    fetchQuestions(setQuestions, setError, setLoading);
  }, []);

  const handleDelete = async (id: number) => {
    await deleteQuestion(id, setQuestions, setError);
  };

  const toggleUpdate = (question: Question) => {
    if (questionToUpdate?.id === question.id) {
      setQuestionForUpdate(null);
    } else {
      setQuestionForUpdate(question);
    }
  };

  const handleQuestionTextChange = (newText: string) => {
    const updatedQuestion = {
      ...questionToUpdate,
      text: newText,
    };

    setQuestionForUpdate(updatedQuestion as Question);
  };

  const handleAnswerUpdated = (answer: Answer) => {
    const answers = questionToUpdate?.answers ?? [];
    const updatedAnswers: Answer[] = [];

    for (let index = 0; index < answers.length; index++) {
      const ans = answers[index];

      if (ans.id === answer.id) {
        updatedAnswers.push(answer);
      } else {
        updatedAnswers.push(ans);
      }
    }

    const updatedQuestion = {
      ...questionToUpdate!,
      answers: updatedAnswers,
    } as Question;

    setQuestionForUpdate(updatedQuestion);
  };

  const handleUpdateQuestion = async () => {
    await updateQuestion(questionToUpdate!, setError, setLoading);
    if (error == null) {
      const updatedQuestions: Question[] = [];

      for (let index = 0; index < questions.length; index++) {
        if (questionToUpdate!.id === questions[index].id) {
          updatedQuestions.push(questionToUpdate!);
        } else {
          updatedQuestions.push(questions[index]);
        }
      }

      setQuestions(updatedQuestions);

      toggleUpdate(questionToUpdate!);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={containerStyle}>
      <h2>Questions</h2>
      <div>
        {questions.map((question) => (
          <div key={question.id} className="question-container">
            {questionToUpdate?.id === question.id ? (
              <input
                value={questionToUpdate?.text}
                onChange={(e) => handleQuestionTextChange(e.target.value)}
              />
            ) : (
              <strong className="question-text">{question.text}</strong>
            )}
            <div className="answers">
              {questionToUpdate?.id === question.id ? (
                questionToUpdate.answers.map((answer, index) => (
                  <div key={answer.id} className="answer">
                    <input
                      type="radio"
                      key={index}
                      id={answer.id.toString()}
                      name="correctAnswer"
                      onChange={() => {
                        const updatedAnswers = questionToUpdate!.answers.map(
                          (a) => ({
                            ...a,
                            isCorrect: a.id === answer.id,
                          })
                        );
                        setQuestionForUpdate({
                          ...questionToUpdate!,
                          answers: updatedAnswers,
                        });
                      }}
                      checked={answer.isCorrect}
                    />
                    <input
                      className="answer-text"
                      value={answer.text}
                      onChange={(e) =>
                        handleAnswerUpdated({
                          ...answer,
                          text: e.target.value,
                        })
                      }
                    />
                    <br />
                  </div>
                ))
              ) : (
                <div>
                  {question.answers.map((answer, index) => (
                    <div
                      className={answer.isCorrect ? "correct" : ""}
                      key={index}
                    >
                      {index + 1}) {answer.text}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div>
              {questionToUpdate == null && (
                <button
                  className="delete-button"
                  onClick={() => handleDelete(question.id)}
                >
                  Delete
                </button>
              )}
              {questionToUpdate == null ? (
                <button
                  className="update-button"
                  onClick={() => toggleUpdate(question)}
                >
                  Update
                </button>
              ) : (
                <div>
                  <button
                    className="save-button"
                    onClick={() => handleUpdateQuestion()}
                  >
                    Save
                  </button>
                  <button
                    className="cancel-button"
                    onClick={() => toggleUpdate(question)}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionsList;
