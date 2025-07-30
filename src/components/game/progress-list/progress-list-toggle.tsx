'use client';

import Image from 'next/image';
import menuIcon from './assets/menu.svg';
import styles from './progress-list.module.css';

interface ProgressListToggleProps {
  onToggle: () => void;
}

function ProgressListToggle({ onToggle }: ProgressListToggleProps) {
  return (
    <div className={styles.progressListHeader}>
      <button
        type="button"
        className={styles.progressListToggleButton}
        onClick={onToggle}
      >
        <Image src={menuIcon} alt="menu" width={24} height={24} />
      </button>
    </div>
  );
}

export default ProgressListToggle;
