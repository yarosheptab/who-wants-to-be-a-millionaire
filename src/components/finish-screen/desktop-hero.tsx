import Button from '@/components/ui/button';
import styles from './finish-screen.module.css';
import HeroImage from './hero-image';
import ScoreDisplay from './score-display';

interface DesktopHeroProps {
  earnedMoney: number;
  handleStartGame: () => void;
}

export default function DesktopHero({ earnedMoney, handleStartGame }: DesktopHeroProps) {
  return (
    <div className={styles.desktopHero}>
      <HeroImage width={624} height={367} />
      <div className={styles.heroContent}>
        <ScoreDisplay earnedMoney={earnedMoney} />
        <Button
          className={styles.heroButton}
          onClick={handleStartGame}
          type="button"
        >
          Try again
        </Button>
      </div>
    </div>
  );
}
