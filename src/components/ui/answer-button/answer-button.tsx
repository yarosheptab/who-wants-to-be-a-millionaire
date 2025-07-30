'use client';

import cn from '@/lib/cn';
import styles from './answer-button.module.css';
import { AnswerButtonProps } from './types';
import useAnswerButtonState from './useAnswerButtonState';

function AnswerButton({
  answerId,
  answerText,
  isSelected,
  isCorrect,
  isDisabled,
  isShowingResult,
  correctAnswerId,
  onClick,
}: AnswerButtonProps) {
  const { stateClass } = useAnswerButtonState({
    answerId,
    isSelected,
    isCorrect,
    isShowingResult,
    correctAnswerId,
  });

  const handleClick = () => {
    if (!isDisabled) {
      onClick();
    }
  };

  return (
    <div className={cn(styles.answerButtonWrapper, stateClass)}>
      <div
        className={cn(styles.answerButtonContainer, {
          [styles.disabled]: isDisabled,
        })}
      >
        <button
          type="button"
          className={styles.answer}
          onClick={handleClick}
          disabled={isDisabled}
          aria-label={`Answer ${answerId}: ${answerText}`}
          aria-pressed={isSelected}
        >
          <span className={styles.key} aria-hidden="true">
            {answerId}
          </span>
          <span className={styles.answerText}>
            {answerText}
          </span>
        </button>
      </div>
      <div className={styles.answerButtonLine} />
    </div>
  );
}

export default AnswerButton;
