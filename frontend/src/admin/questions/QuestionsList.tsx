import React, { useState, useEffect } from "react";
import { fetchQuestions } from "./fetchQuestions";
import { deleteQuestion } from "./deleteQuestion";
import { updateQuestion } from "./updateQuestion";
import { Question, Answer } from "./types";
import "./QuestionsList.scss";

const QuestionsList: React.FC = () => {
	const [questions, setQuestions] = useState<Question[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [showAnswersId, setShowAnswersId] = useState<number | null>(null);
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

		handleShowAnswers(question.id);
	};

	const handleShowAnswers = (questionId: number) => {
		if (showAnswersId === questionId) {
			setShowAnswersId(null);
		} else {
			setShowAnswersId(questionId);
		}
	};

	const handleQuestionTextChange = (newText: String) => {
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
		<div>
			<h2>Questions</h2>
			<ul>
				{questions.map((question) => (
					<li key={question.id} className="question-container">
						{questionToUpdate?.id === question.id ? (
							<input
								value={questionToUpdate?.text}
								onChange={(e) => handleQuestionTextChange(e.target.value)}
							/>
						) : (
							<strong>{question.text}</strong>
						)}
						{showAnswersId === question.id && (
							<div>
								{questionToUpdate?.id === question.id ? (
									questionToUpdate.answers.map((answer, index) => (
										<div key={answer.id}>
											<input
												type="radio"
												key={index}
												id={answer.id.toString()}
												name="correctAnswer"
												onChange={() => {
													const updatedAnswers = questionToUpdate!.answers.map((a) => ({
														...a,
														isCorrect: a.id === answer.id,
													}));
													setQuestionForUpdate({
														...questionToUpdate!,
														answers: updatedAnswers,
													});
												}}
												checked={answer.isCorrect}
											/>
											<input
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
									<ul>
										{question.answers.map((answer, index) => (
											<li key={index}>{answer.text}</li>
										))}
									</ul>
								)}
							</div>
						)}
						<button
							className="delete-button"
							onClick={() => handleDelete(question.id)}
						>
							Delete
						</button>
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
						{questionToUpdate == null && (
							<button onClick={() => handleShowAnswers(question.id)}>
								{showAnswersId === question.id
									? "Hide answers"
									: "Show answers"}
							</button>
						)}
					</li>
				))}
			</ul>
		</div>
	);
};

export default QuestionsList;

