export type Answer = {
	id: number;
	questionId: number;
	text: string;
	isCorrect: boolean;
};

export type Question = {
	id: number;
	text: string;
	difficultyLevel: string;
	category: string;
	createdAt: string;
	answers: Answer[];
};

