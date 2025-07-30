'use client';

import { useState } from 'react';
import ProgressListContent from './progress-list-content';
import ProgressListHeader from './progress-list-header';
import ProgressListOverlay from './progress-list-overlay';
import ProgressListToggle from './progress-list-toggle';

interface ProgressListProps {
  currentQuestionId: number;
}

function ProgressList({ currentQuestionId }: ProgressListProps) {
  const [isListHidden, setIsListHidden] = useState(true);

  const handleOpen = () => setIsListHidden(false);
  const handleClose = () => setIsListHidden(true);

  return (
    <>
      <ProgressListToggle onToggle={handleOpen} />
      <ProgressListOverlay isVisible={!isListHidden}>
        <ProgressListHeader onClose={handleClose} />
        <ProgressListContent currentQuestionId={currentQuestionId} />
      </ProgressListOverlay>
    </>
  );
}

export default ProgressList;
