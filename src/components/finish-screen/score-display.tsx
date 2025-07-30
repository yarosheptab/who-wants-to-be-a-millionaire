import styles from './finish-section.module.css';

interface ScoreDisplayProps {
  earnedMoney: number;
}

export default function ScoreDisplay({ earnedMoney }: ScoreDisplayProps) {
  return (
    <div className={styles.heroText}>
      <span className={styles.heroDescription}>Total score:</span>
      <h1 className={styles.heroTitle}>
        $
        {earnedMoney.toLocaleString()}
        {' '}
        earned
      </h1>
    </div>
  );
}
