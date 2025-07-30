import cn from '@/lib/cn';
import Image from 'next/image';
import styles from './start-section.module.css';

interface HeroImageProps {
  className?: string;
  width: number;
  height: number;
}

export default function HeroImage({ className, width, height }: HeroImageProps) {
  return (
    <Image
      className={cn(styles.heroImage, className)}
      src="/hero-image.png"
      alt="Hero Image"
      width={width}
      height={height}
    />
  );
}
