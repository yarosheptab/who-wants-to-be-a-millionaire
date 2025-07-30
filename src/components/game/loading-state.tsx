import styles from './game-screen.module.css';

export default function LoadingState() {
  return (
    <div className={styles.gameContainer}>
      <div className={styles.loading}>Loading...</div>
    </div>
  );
}
