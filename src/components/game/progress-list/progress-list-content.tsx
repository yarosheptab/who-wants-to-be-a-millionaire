'use client';

import gameConfig from '@/config/game-config.json';
import styles from './progress-list.module.css';
import ProgressPill from './progress-pill';

interface ProgressListContentProps {
  currentQuestionId: number;
}

function ProgressListContent({ currentQuestionId }: ProgressListContentProps) {
  const { questions } = gameConfig;

  return (
    <div className={styles.progressList}>
      {questions.toReversed().map((question) => (
        <ProgressPill
          answerAmount={question.amount}
          key={question.id}
          isCurrent={question.id === currentQuestionId}
          isAnswered={question.id < currentQuestionId}
        />
      ))}
    </div>
  );
}

export default ProgressListContent;
