'use client';

import gameConfig from '@/config/game-config.json';
import { validateGameConfig } from '@/lib/validation';
import { useMemo } from 'react';
import styles from './progress-list.module.css';
import ProgressPill from './progress-pill';

interface ProgressListContentProps {
  currentQuestionId: number;
}

function ProgressListContent({ currentQuestionId }: ProgressListContentProps) {
  // Validate game configuration
  const validatedConfig = useMemo(() => {
    try {
      return validateGameConfig(gameConfig);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Progress list: Game configuration validation failed:', error);
      return null;
    }
  }, []);

  const questions = validatedConfig?.questions || [];

  // Validate current question ID
  const validQuestionIds = questions.map((q) => q.id);
  const isValidCurrentQuestion = validQuestionIds.includes(currentQuestionId);

  if (!validatedConfig) {
    return (
      <div className={styles.progressList}>
        <div className={styles.errorMessage}>Failed to load progress</div>
      </div>
    );
  }

  return (
    <div className={styles.progressList}>
      {questions.toReversed().map((question) => (
        <ProgressPill
          answerAmount={question.amount}
          key={question.id}
          isCurrent={question.id === currentQuestionId && isValidCurrentQuestion}
          isAnswered={question.id < currentQuestionId && isValidCurrentQuestion}
        />
      ))}
    </div>
  );
}

export default ProgressListContent;
