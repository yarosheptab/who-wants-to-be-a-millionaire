// Strict answer ID type - only allow A, B, C, D
export type AnswerId = 'A' | 'B' | 'C' | 'D';

// Strict question ID type - positive integers only
export type QuestionId = number;

// Money amount type - positive numbers only
export type MoneyAmount = number;

export interface Answer {
  id: AnswerId;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: QuestionId;
  amount: MoneyAmount;
  question: string;
  answers: readonly Answer[];
}

export interface GameConfig {
  readonly questions: readonly Question[];
}

export interface GameState {
  currentQuestionIndex: number;
  score: MoneyAmount;
  isGameOver: boolean;
  isGameWon: boolean;
  isGameStarted: boolean;
  selectedAnswer: AnswerId | null;
  isAnswerSubmitted: boolean;
  correctAnswerId: AnswerId | null;
  isShowingResult: boolean;
}

export interface GameStats {
  highestScore: MoneyAmount;
  gamesPlayed: number;
  totalWinnings: MoneyAmount;
}

// Additional utility types for better type safety
export interface GameStateUpdate {
  currentQuestionIndex?: number;
  score?: MoneyAmount;
  isGameOver?: boolean;
  isGameWon?: boolean;
  isGameStarted?: boolean;
  selectedAnswer?: AnswerId | null;
  isAnswerSubmitted?: boolean;
  correctAnswerId?: AnswerId | null;
  isShowingResult?: boolean;
}

export interface GameAction {
  type: 'START_GAME' | 'SELECT_ANSWER' | 'SUBMIT_ANSWER' | 'RESET_GAME' | 'NEXT_QUESTION';
  payload?: {
    answerId?: AnswerId;
    questionIndex?: number;
    isCorrect?: boolean;
  };
}

// Validation result types
export interface ValidationResult<T> {
  isValid: boolean;
  data?: T;
  errors: string[];
}

// Error types
export interface GameError {
  type: 'VALIDATION_ERROR' | 'RUNTIME_ERROR' | 'STATE_ERROR';
  message: string;
  field?: string;
  code?: string;
}
