import Button from '@/components/ui/button';
import HeroImage from './hero-image';
import HeroTitle from './hero-title';
import styles from './start-section.module.css';

interface DesktopHeroProps {
  onStartGame: () => void;
}

export default function DesktopHero({ onStartGame }: DesktopHeroProps) {
  return (
    <div className={styles.desktopHero}>
      <HeroImage width={624} height={367} />
      <div className={styles.heroContent}>
        <HeroTitle />
        <Button
          className={styles.desktopHeroButton}
          onClick={onStartGame}
          type="button"
        >
          Start
        </Button>
      </div>
    </div>
  );
}
