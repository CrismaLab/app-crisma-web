'use client';

import React from 'react';
import AppLogo from '@/components/ui/AppLogo';
import AppTextTitle from '@/components/ui/texts/AppTextTitle';
import MemojiIllustration from '@/components/MemojiIllustration/MemojiIllustration';
import AppButton from '@/components/ui/buttons/AppButton';
import styles from './page.module.css';

interface FinalizationPageProps {
  onComplete?: () => void;
}

export default function FinalizationPage({ onComplete }: FinalizationPageProps) {
  const handleComplete = () => {
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <div className={styles.pageContainer}>
      <main className={styles.mainContent}>
        <div className={styles.logoWrapper}>
          <AppLogo width={140} height={56} />
        </div>
        
        <div className={styles.titleWrapper}>
          <AppTextTitle>Cadastro finalizado!</AppTextTitle>
        </div>
        
        <div className={styles.illustrationWrapper}>
          <MemojiIllustration />
        </div>

        <footer className={styles.footerSection}>
          <AppButton onClick={handleComplete}>
            Concluir
          </AppButton>
        </footer>
      </main>
    </div>
  );
}