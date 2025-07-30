'use client';

import cn from '@/lib/cn';
import { ReactNode } from 'react';
import styles from './progress-list.module.css';

interface ProgressListOverlayProps {
  children: ReactNode;
  isVisible: boolean;
}

function ProgressListOverlay({ children, isVisible }: ProgressListOverlayProps) {
  return (
    <div className={cn(styles.progressListContainer, isVisible && styles.listVisible)}>
      {children}
    </div>
  );
}

export default ProgressListOverlay;
