'use client';

import gameConfig from '@/config/game-config.json';
import { GameState, Question } from '@/interfaces/game';
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
  selectAnswer: (answerId: string, questions: Question[]) => void,
  getCurrentQuestion: (questions: Question[]) => Question,
}) {
  const { questions } = gameConfig;
  const currentQuestion = getCurrentQuestion(questions);

  const handleAnswerSelect = (answerId: string) => {
    selectAnswer(answerId, questions);
  };

  if (!currentQuestion) {
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
