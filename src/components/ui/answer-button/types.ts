import { AnswerId } from '@/interfaces/game';

export interface AnswerButtonProps {
  answerId: AnswerId;
  answerText: string;
  isSelected: boolean;
  isCorrect: boolean;
  isDisabled: boolean;
  isShowingResult: boolean;
  correctAnswerId: AnswerId | null;
  onClick: () => void;
}

export interface AnswerButtonStateParams {
  answerId: AnswerId;
  isSelected: boolean;
  isCorrect: boolean;
  isShowingResult: boolean;
  correctAnswerId: AnswerId | null;
}

export interface AnswerButtonState {
  stateClass: string;
  isCorrectAnswer: boolean;
  isIncorrectSelection: boolean;
}
