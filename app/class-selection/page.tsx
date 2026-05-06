'use client';

import React, { useEffect, useState } from 'react';
import AppLogo from '@/components/ui/AppLogo';
import AppTextTitle from '@/components/ui/texts/AppTextTitle';
import AppTextSubtitle from '@/components/ui/texts/AppTextSubtitle';
import AppInstructionText from '@/components/ui/texts/AppInstructionText';
import ClassGrid from '@/components/ClassGrid/ClassGrid';
import AppButton from '@/components/ui/buttons/AppButton';
import AppOutlinedButton from '@/components/ui/buttons/AppOutlinedButton';
import { getClasses } from '@/lib/api/classes';
import { getApiErrorMessage } from '@/lib/api/client';
import { SelectedClass } from '@/types/registration';
import styles from './page.module.css';

interface ClassSelectionPageProps {
  onConfirm: (selectedClass: SelectedClass) => void;
  onBack?: () => void;
}

export default function ClassSelectionPage({ onConfirm, onBack }: ClassSelectionPageProps) {
  const [selectedClassId, setSelectedClassId] = useState<string | undefined>(undefined);
  const [classes, setClasses] = useState<SelectedClass[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadClasses() {
      try {
        setIsLoading(true);
        setErrorMessage('');

        const apiClasses = await getClasses();

        if (isMounted) {
          setClasses(apiClasses);
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(getApiErrorMessage(error));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadClasses();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSelectClass = (id: string) => {
    setSelectedClassId(id === selectedClassId ? undefined : id);
  };

  const handleConfirmSelection = () => {
    const selectedClass = classes.find((classItem) => classItem.id === selectedClassId);

    if (selectedClass) {
      onConfirm(selectedClass);
    } else {
      setErrorMessage('Por favor, selecione uma turma.');
    }
  };

  const shouldShowClasses = !isLoading && !errorMessage && classes.length > 0;

  return (
    <div className={styles.pageContainer}>
      <main className={styles.mainContent}>
        <div className={styles.headerSection}>
          <div className={styles.logoWrapper}>
            <AppLogo width={220} height={88} />
          </div>
          <AppTextTitle>crisma.app</AppTextTitle>
          <AppTextSubtitle>Primeiro acesso</AppTextSubtitle>
          <AppInstructionText>Selecione sua turma</AppInstructionText>
        </div>
        {isLoading && <p className={styles.feedback}>Carregando turmas...</p>}
        {!isLoading && errorMessage && <p className={styles.feedbackError}>{errorMessage}</p>}
        {!isLoading && !errorMessage && classes.length === 0 && (
          <p className={styles.feedback}>Nenhuma turma disponível no momento.</p>
        )}
        {shouldShowClasses && (
          <ClassGrid classes={classes} onSelectClass={handleSelectClass} selectedClassId={selectedClassId} />
        )}
        
        <footer className={styles.footerSection}>
          <AppButton onClick={handleConfirmSelection} disabled={!selectedClassId || isLoading || Boolean(errorMessage)}>
            Confirmar
          </AppButton>
          <AppOutlinedButton onClick={onBack || (() => {})}>
            Voltar
          </AppOutlinedButton>
        </footer>
      </main>
    </div>
  );
}
