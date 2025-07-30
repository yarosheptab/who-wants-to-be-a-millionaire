import Image from 'next/image';
import styles from './finish-section.module.css';

interface HeroImageProps {
  width: number;
  height: number;
}

export default function HeroImage({ width, height }: HeroImageProps) {
  return (
    <Image
      className={styles.heroImage}
      src="/hero-image.png"
      alt="Millionaire"
      width={width}
      height={height}
    />
  );
}
