import { Question } from "./types";

export const deleteQuestion = async (
  id: number,
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  const username = 'user';
  const password = 'password';
  const encodedCredentials = btoa(`${username}:${password}`);

  try {
    const response = await fetch(`http://localhost:8080/api/questions/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Basic ${encodedCredentials}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete question');
    }

    setQuestions((prevQuestions) => prevQuestions.filter((question) => question.id !== id));
  } catch (error) {
    setError(error instanceof Error ? error.message : 'An unknown error occurred');
  }
};
