import DesktopHero from './desktop-hero';
import MobileHero from './mobile-hero';
import styles from './start-screen.module.css';

export default function StartScreen({ handleStartGame }: { handleStartGame: () => void }) {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <MobileHero onStartGame={handleStartGame} />
        <DesktopHero onStartGame={handleStartGame} />
      </main>
    </div>
  );
}
