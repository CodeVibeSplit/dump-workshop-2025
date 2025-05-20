import { Question } from "./types";

export const updateQuestion = async (
  question: Question,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const username = 'user';
  const password = 'password';
  const encodedCredentials = btoa(`${username}:${password}`);

  try {
    const response = await fetch(`http://localhost:8080/api/questions/${question.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Basic ${encodedCredentials}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(question),
    });

    if (!response.ok) {
      throw new Error('Failed to update question');
    }
  } catch (error) {
    setError(error instanceof Error ? error.message : 'An unknown error occurred');
  } finally {
    setLoading(false);
  }
};

