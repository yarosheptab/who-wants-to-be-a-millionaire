'use client';

import gameConfig from '@/config/game-config.json';
import { AnswerId, GameState, Question } from '@/interfaces/game';
import { validateGameConfig } from '@/lib/validation';
import { useMemo } from 'react';
import AnswerGrid from './answer-grid';
import styles from './game-screen.module.css';
import LoadingState from './loading-state';
import ProgressList from './progress-list';
import QuestionDisplay from './question-display';

export default function GameScreen({
  gameState,
  selectAnswer,
  getCurrentQuestion,
}: {
  gameState: GameState,
  selectAnswer: (answerId: AnswerId, questions: readonly Question[]) => void,
  getCurrentQuestion: (questions: readonly Question[]) => Question | null,
}) {
  // Validate game configuration
  const validatedConfig = useMemo(() => {
    try {
      return validateGameConfig(gameConfig);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Game configuration validation failed:', error);
      return null;
    }
  }, []);

  // Get questions safely
  const questions = validatedConfig?.questions || [];

  // Get current question with bounds checking
  const currentQuestion = getCurrentQuestion(questions);

  const handleAnswerSelect = (answerId: AnswerId) => {
    if (!validatedConfig) {
      // eslint-disable-next-line no-console
      console.error('Cannot select answer: Game configuration is invalid');
      return;
    }

    if (!currentQuestion) {
      // eslint-disable-next-line no-console
      console.error('Cannot select answer: Current question not found');
      return;
    }

    selectAnswer(answerId, questions);
  };

  // Show loading state if configuration is invalid or question not found
  if (!validatedConfig || !currentQuestion) {
    return <LoadingState />;
  }

  return (
    <div className={styles.gameContainer}>
      <ProgressList currentQuestionId={currentQuestion.id} />
      <div className={styles.gameContent}>
        <QuestionDisplay question={currentQuestion.question} />
        <AnswerGrid
          answers={currentQuestion.answers}
          selectedAnswer={gameState.selectedAnswer}
          isAnswerSubmitted={gameState.isAnswerSubmitted}
          isShowingResult={gameState.isShowingResult}
          correctAnswerId={gameState.correctAnswerId}
          onAnswerSelect={handleAnswerSelect}
          questionId={currentQuestion.id}
        />
      </div>
    </div>
  );
}
