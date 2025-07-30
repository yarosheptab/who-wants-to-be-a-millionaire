import Button from '@/components/ui/button';
import Image from 'next/image';
import millionaireImage from './assets/hero-image.png';
import styles from './start-section.module.css';

export default function StartSection() {
  return (
    <div className={styles.hero}>
      <div className={styles.heroContent}>
        <Image className={styles.heroImage} src={millionaireImage} alt="Millionaire" width={300} height={200} />
        <h1 className={styles.heroTitle}>Who wants to be a millionaire?</h1>
      </div>
      <Button className={styles.heroButton}>Start</Button>
    </div>
  );
}
