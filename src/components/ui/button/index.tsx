import cn from '@/lib/cn';
import { ComponentProps } from 'react';
import styles from './button.module.css';

export default function Button({ children, className, ...props }: ComponentProps<'button'>) {
  return (
    <button className={cn(styles.primaryButton, className)} type="button" {...props}>
      {children}
    </button>
  );
}
