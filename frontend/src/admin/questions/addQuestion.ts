export const addQuestion = async (
  newQuestion: {
    text: string;
    difficultyLevel: string;
    category: string;
    answers: { text: string; isCorrect: boolean }[];
  },
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const username = 'user';
  const password = 'password';
  const encodedCredentials = btoa(`${username}:${password}`);

  setLoading(true);
  setError(null);

  try {
    const response = await fetch('http://localhost:8080/api/questions', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${encodedCredentials}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newQuestion),
    });

    if (!response.ok) {
      throw new Error('Failed to add question');
    }
    setSuccess(true);
  } catch (error) {
    setError(error instanceof Error ? error.message : 'An unknown error occurred');
  } finally {
    setLoading(false);
  }
};
