import Button from '@/components/ui/button';
import HeroImage from './hero-image';
import HeroTitle from './hero-title';
import styles from './start-screen.module.css';

interface MobileHeroProps {
  onStartGame: () => void;
}

export default function MobileHero({ onStartGame }: MobileHeroProps) {
  return (
    <div className={styles.hero}>
      <div className={styles.heroContent}>
        <HeroImage width={300} height={200} />
        <HeroTitle />
      </div>
      <Button
        className={styles.heroButton}
        onClick={onStartGame}
        type="button"
      >
        Start
      </Button>
    </div>
  );
}
