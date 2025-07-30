import { useMemo } from 'react';
import styles from './answer-button.module.css';
import { AnswerButtonState, AnswerButtonStateParams } from './types';

const useAnswerButtonState = ({
  isSelected,
  isCorrect,
  isShowingResult,
}: AnswerButtonStateParams): AnswerButtonState => useMemo(() => {
  const isIncorrectSelection = isSelected && !isCorrect;

  let stateClass = '';

  if (isShowingResult) {
    if (isCorrect) {
      stateClass = styles.correct;
    } else if (isIncorrectSelection) {
      stateClass = styles.incorrect;
    }
  } else if (isSelected) {
    stateClass = styles.selected;
  }

  return {
    stateClass,
    isCorrectAnswer: isCorrect,
    isIncorrectSelection,
  };
}, [isSelected, isCorrect, isShowingResult]);

export default useAnswerButtonState;
