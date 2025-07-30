'use client';

import Image from 'next/image';
import closeIcon from './assets/close.svg';
import styles from './progress-list.module.css';

interface ProgressListHeaderProps {
  onClose: () => void;
}

function ProgressListHeader({ onClose }: ProgressListHeaderProps) {
  return (
    <div className={styles.progressListHeader}>
      <button
        type="button"
        className={styles.progressListToggleButton}
        onClick={onClose}
      >
        <Image src={closeIcon} alt="close" width={24} height={24} />
      </button>
    </div>
  );
}

export default ProgressListHeader;
