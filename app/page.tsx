'use client';

import { useState } from 'react';
import WelcomePage from './welcome/page';
import ClassSelectionPage from './class-selection/page';
import FinalizationPage from './finalization/page';
import ComingSoonPage from './coming-soon/page';
import styles from './page.module.css';

type HomeStep = 'welcome' | 'class-selection' | 'finalization' | 'coming-soon';

export default function Home() {
  const [currentStep, setCurrentStep] = useState<HomeStep>('welcome');

  const handleWelcomeStart = () => {
    setCurrentStep('class-selection');
  };

  const handleBackToWelcome = () => {
    setCurrentStep('welcome');
  };

  const handleClassSelectionConfirm = () => {
    setCurrentStep('finalization');
  };

  const handleFinalizationComplete = () => {
    setCurrentStep('coming-soon');
  };

  return (
    <div className={styles.pageShell}>
      {currentStep === 'finalization' ? (
        <FinalizationPage onComplete={handleFinalizationComplete} />
      ) : currentStep === 'coming-soon' ? (
        <ComingSoonPage />
      ) : currentStep === 'class-selection' ? (
        <ClassSelectionPage onConfirm={handleClassSelectionConfirm} onBack={handleBackToWelcome} />
      ) : (
        <WelcomePage onStart={handleWelcomeStart} />
      )}
    </div>
  );
}
