'use client';

import cn from '@/lib/cn';
import styles from './progress-pill.module.css';

interface ProgressPillProps {
  answerAmount: number
  isCurrent: boolean
  isAnswered: boolean
}

function ProgressPill({
  answerAmount, isCurrent, isAnswered,
}: ProgressPillProps) {
  const getProgressPillClass = () => {
    if (isCurrent) {
      return styles.current;
    }
    if (isAnswered) {
      return styles.answered;
    }

    return styles.notAnswered;
  };

  return (
    <div className={cn(styles.progressPillWrapper, getProgressPillClass())}>
      <div className={cn(styles.progressPillContainer)}>
        <button type="button" className={styles.progressPillButton}>
          <span className={styles.progressPillText}>
            $
            {answerAmount.toLocaleString()}
          </span>
        </button>
      </div>
      <div className={styles.progressPillLine} />
    </div>
  );
}

export default ProgressPill;
