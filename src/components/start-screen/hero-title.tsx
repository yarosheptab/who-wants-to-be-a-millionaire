import cn from '@/lib/cn';
import styles from './start-screen.module.css';

interface HeroTitleProps {
  className?: string;
}

export default function HeroTitle({ className }: HeroTitleProps) {
  return (
    <h1 className={cn(styles.heroTitle, className)}>
      Who wants to be a millionaire?
    </h1>
  );
}
