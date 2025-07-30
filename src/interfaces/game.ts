export interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: number;
  amount: number;
  question: string;
  answers: Answer[];
}

export interface GameConfig {
  questions: Question[];
}

export interface GameState {
  currentQuestionIndex: number;
  score: number;
  isGameOver: boolean;
  isGameWon: boolean;
  isGameStarted: boolean;
  selectedAnswer: string | null;
  isAnswerSubmitted: boolean;
  correctAnswerId: string | null;
  isShowingResult: boolean;
}

export interface GameStats {
  highestScore: number;
  gamesPlayed: number;
  totalWinnings: number;
}
