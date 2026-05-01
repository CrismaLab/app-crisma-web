'use client'; // Mark as client component

import { useState } from 'react';
import ClassSelectionPage from './class-selection/page';
import FinalizationPage from './finalization/page';

export default function Home() {
  const [showFinalization, setShowFinalization] = useState(false);

  const handleClassSelectionConfirm = () => {
    setShowFinalization(true);
  };

  const handleFinalizationComplete = () => {
    setShowFinalization(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'var(--cr-color-white)' }}>
      {showFinalization ? (
        <FinalizationPage onComplete={handleFinalizationComplete} />
      ) : (
        <ClassSelectionPage onConfirm={handleClassSelectionConfirm} />
      )}
    </div>
  );
}
