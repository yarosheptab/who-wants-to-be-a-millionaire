import DesktopHero from './desktop-hero';
import styles from './finish-screen.module.css';
import MobileHero from './mobile-hero';

interface FinishScreenProps {
  earnedMoney: number;
  handleStartGame: () => void;
}

export default function FinishScreen({ earnedMoney, handleStartGame }: FinishScreenProps) {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <MobileHero earnedMoney={earnedMoney} handleStartGame={handleStartGame} />
        <DesktopHero earnedMoney={earnedMoney} handleStartGame={handleStartGame} />
      </main>
    </div>
  );
}
