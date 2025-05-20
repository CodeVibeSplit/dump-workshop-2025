import { Question } from "./types";

export const fetchQuestions = async (
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const username = 'user';
  const password = 'password';
  const encodedCredentials = btoa(`${username}:${password}`);

  try {
    const response = await fetch('http://localhost:8080/api/questions', {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${encodedCredentials}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch questions');
    }

    const data: Question[] = await response.json();
    setQuestions(data);
  } catch (error) {
    setError(error instanceof Error ? error.message : 'An unknown error occurred');
  } finally {
    setLoading(false);
  }
};

