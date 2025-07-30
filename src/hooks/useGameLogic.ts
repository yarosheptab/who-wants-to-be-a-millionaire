import { GameState, Question } from '@/interfaces/game';
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
    (questions: Question[]) => questions[gameState.currentQuestionIndex],
    [gameState.currentQuestionIndex],
  );

  const findCorrectAnswer = useCallback(
    (question: Question) => question.answers.find((answer) => answer.isCorrect)?.id || null,
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

  const selectAnswer = useCallback((answerId: string, questions: Question[]) => {
    if (gameState.isAnswerSubmitted) return;

    const currentQuestion = questions[gameState.currentQuestionIndex];
    const selectedAnswer = currentQuestion.answers.find(
      (answer) => answer.id === answerId,
    );

    if (!selectedAnswer) return;

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
