import { AnswerId, GameState, Question } from '@/interfaces/game';
import { safeGetAnswer, safeGetQuestion } from '@/lib/validation';
import { useCallback, useState } from 'react';

const INITIAL_GAME_STATE: GameState = {
  currentQuestionIndex: 0,
  score: 0,
  isGameOver: false,
  isGameWon: false,
  isGameStarted: false,
  selectedAnswer: null,
  isAnswerSubmitted: false,
  correctAnswerId: null,
  isShowingResult: false,
};

const RESULT_DISPLAY_DURATION = 3000;

export default function useGameLogic() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);

  const resetGame = useCallback(() => {
    setGameState(INITIAL_GAME_STATE);
  }, []);

  const startGame = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      isGameStarted: true,
    }));
  }, []);

  const getCurrentQuestion = useCallback(
    (questions: readonly Question[]): Question | null => {
      if (!Array.isArray(questions) || questions.length === 0) {
        // eslint-disable-next-line no-console
        console.warn('getCurrentQuestion: Invalid questions array');
        return null;
      }

      const question = safeGetQuestion(questions, gameState.currentQuestionIndex);
      if (!question) {
        // eslint-disable-next-line no-console
        console.warn(`getCurrentQuestion: Question at index ${gameState.currentQuestionIndex} not found`);
        return null;
      }

      return question;
    },
    [gameState.currentQuestionIndex],
  );

  const findCorrectAnswer = useCallback(
    (question: Question): AnswerId | null => {
      if (!question || !Array.isArray(question.answers)) {
      // eslint-disable-next-line no-console
        console.warn('findCorrectAnswer: Invalid question or answers');
        return null;
      }

      const correctAnswer = question.answers.find((answer) => answer.isCorrect);
      return correctAnswer?.id || null;
    },
    [],
  );

  const handleCorrectAnswer = useCallback(
    (currentAmount: number, isLastQuestion: boolean) => {
      if (isLastQuestion) {
        // Game won
        setGameState((prev) => ({
          ...prev,
          score: currentAmount,
          isGameWon: true,
          isShowingResult: false,
          correctAnswerId: null,
        }));
        return;
      }

      // Move to next question
      setGameState((prev) => ({
        ...prev,
        score: currentAmount,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        selectedAnswer: null,
        isAnswerSubmitted: false,
        isShowingResult: false,
        correctAnswerId: null,
      }));
    },
    [],
  );

  const handleIncorrectAnswer = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      isGameOver: true,
      isShowingResult: false,
      correctAnswerId: null,
    }));
  }, []);

  const submitAnswerResult = useCallback(
    (isCorrect: boolean, currentAmount: number, isLastQuestion: boolean) => {
      setTimeout(() => {
        if (isCorrect) {
          handleCorrectAnswer(currentAmount, isLastQuestion);
        } else {
          handleIncorrectAnswer();
        }
      }, RESULT_DISPLAY_DURATION);
    },
    [handleCorrectAnswer, handleIncorrectAnswer],
  );

  const selectAnswer = useCallback((answerId: AnswerId, questions: readonly Question[]) => {
    // Validate input parameters
    if (!answerId || typeof answerId !== 'string') {
      // eslint-disable-next-line no-console
      console.error('selectAnswer: Invalid answerId provided');
      return;
    }

    if (!Array.isArray(questions) || questions.length === 0) {
      // eslint-disable-next-line no-console
      console.error('selectAnswer: Invalid questions array');
      return;
    }

    // Check if answer is already submitted
    if (gameState.isAnswerSubmitted) {
      // eslint-disable-next-line no-console
      console.warn('selectAnswer: Answer already submitted');
      return;
    }

    // Get current question with bounds checking
    const currentQuestion = getCurrentQuestion(questions);
    if (!currentQuestion) {
      // eslint-disable-next-line no-console
      console.error('selectAnswer: Current question not found');
      return;
    }

    // Validate answer exists
    const selectedAnswer = safeGetAnswer(currentQuestion.answers, answerId);
    if (!selectedAnswer) {
      // eslint-disable-next-line no-console
      console.error(`selectAnswer: Answer with ID ${answerId} not found`);
      return;
    }

    const { isCorrect } = selectedAnswer;
    const currentAmount = currentQuestion.amount;
    const isLastQuestion = gameState.currentQuestionIndex === questions.length - 1;
    const correctAnswerId = findCorrectAnswer(currentQuestion);

    setGameState((prev) => ({
      ...prev,
      selectedAnswer: answerId,
      isAnswerSubmitted: true,
      correctAnswerId,
      isShowingResult: true,
    }));

    submitAnswerResult(isCorrect, currentAmount, isLastQuestion);
  }, [
    gameState.isAnswerSubmitted,
    gameState.currentQuestionIndex,
    getCurrentQuestion,
    findCorrectAnswer,
    submitAnswerResult,
  ]);

  return {
    gameState,
    resetGame,
    selectAnswer,
    getCurrentQuestion,
    startGame,
  };
}
