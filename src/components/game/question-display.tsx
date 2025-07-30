import styles from './game-screen.module.css';

interface QuestionDisplayProps {
  question: string;
}

export default function QuestionDisplay({ question }: QuestionDisplayProps) {
  return (
    <div className={styles.questionContainer}>
      <h2 className={styles.question}>{question}</h2>
    </div>
  );
}
