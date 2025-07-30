import Button from '@/components/ui/button';
import styles from './finish-section.module.css';
import HeroImage from './hero-image';
import ScoreDisplay from './score-display';

interface MobileHeroProps {
  earnedMoney: number;
  handleStartGame: () => void;
}

export default function MobileHero({ earnedMoney, handleStartGame }: MobileHeroProps) {
  return (
    <div className={styles.hero}>
      <div className={styles.heroContent}>
        <HeroImage width={300} height={200} />
        <ScoreDisplay earnedMoney={earnedMoney} />
      </div>
      <Button
        className={styles.heroButton}
        onClick={handleStartGame}
        type="button"
      >
        Try again
      </Button>
    </div>
  );
}
