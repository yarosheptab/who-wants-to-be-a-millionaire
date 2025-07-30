export interface AnswerButtonProps {
  answerId: string;
  answerText: string;
  isSelected: boolean;
  isCorrect: boolean;
  isDisabled: boolean;
  isShowingResult: boolean;
  correctAnswerId: string | null;
  onClick: () => void;
}

export interface AnswerButtonState {
  stateClass: string;
  isCorrectAnswer: boolean;
  isIncorrectSelection: boolean;
}

export type AnswerButtonStateParams = Pick<
AnswerButtonProps,
'answerId' | 'isSelected' | 'isCorrect' | 'isShowingResult' | 'correctAnswerId'
>;
