import { AnswerButton } from '@/components/ui/answer-button';
import { Answer, AnswerId } from '@/interfaces/game';
import styles from './game-screen.module.css';

interface AnswerGridProps {
  answers: readonly Answer[];
  selectedAnswer: AnswerId | null;
  isAnswerSubmitted: boolean;
  isShowingResult: boolean;
  correctAnswerId: AnswerId | null;
  onAnswerSelect: (answerId: AnswerId) => void;
  questionId: number;
}

export default function AnswerGrid({
  answers,
  selectedAnswer,
  isAnswerSubmitted,
  isShowingResult,
  correctAnswerId,
  onAnswerSelect,
  questionId,
}: AnswerGridProps) {
  return (
    <div className={styles.answers}>
      {answers.map((answer) => (
        <AnswerButton
          key={questionId + answer.id}
          answerId={answer.id}
          answerText={answer.text}
          isSelected={selectedAnswer === answer.id}
          isCorrect={answer.isCorrect}
          isDisabled={isAnswerSubmitted}
          isShowingResult={isShowingResult}
          correctAnswerId={correctAnswerId}
          onClick={() => onAnswerSelect(answer.id)}
        />
      ))}
    </div>
  );
}
