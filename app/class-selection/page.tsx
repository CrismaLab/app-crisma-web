'use client';

import React, { useState } from 'react';
import AppLogo from '@/components/ui/AppLogo';
import AppTextTitle from '@/components/ui/texts/AppTextTitle';
import AppTextSubtitle from '@/components/ui/texts/AppTextSubtitle';
import AppInstructionText from '@/components/ui/texts/AppInstructionText';
import ClassGrid from '@/components/ClassGrid/ClassGrid';
import AppButton from '@/components/ui/buttons/AppButton';
import AppOutlinedButton from '@/components/ui/buttons/AppOutlinedButton';
import { SelectedClass } from '@/types/registration';
import styles from './page.module.css';

interface ClassSelectionPageProps {
  onConfirm: (selectedClass: SelectedClass) => void;
  onBack?: () => void;
}

export default function ClassSelectionPage({ onConfirm, onBack }: ClassSelectionPageProps) {
  const [selectedClassId, setSelectedClassId] = useState<string | undefined>(undefined);

  const classes = [
    { id: 'A', name: 'Turma A', color: '#82AF7F' }, // Verde oliva
    { id: 'B', name: 'Turma B', color: '#F9B67C' }, // Laranja pêssego
    { id: 'C', name: 'Turma C', color: '#A8A8A8' }, // Cinza neutro
    { id: 'D', name: 'Turma D', color: '#C29C8D' }, // Marrom terracota
    { id: 'E', name: 'Turma E', color: '#86ACFD' }, // Azul céu
    { id: 'F', name: 'Turma F', color: '#FCB3C6' }, // Rosa pastel
    { id: 'G', name: 'Turma G', color: '#BDD4FD' }, // Azul bebê
    { id: 'H', name: 'Turma H', color: '#FDE082' }, // Amarelo mel
    { id: 'I', name: 'Turma I', color: '#E4A9F5' }, // Lilás suave
    { id: 'J', name: 'Turma J', color: '#CD6A6B' }, // Vermelho argila
    { id: 'K', name: 'Turma K', color: '#AC75C2' }, // Roxo ametista
    { id: 'L', name: 'Turma L', color: '#7EDEA0' }, // Verde menta
    
  ];

  const handleSelectClass = (id: string) => {
    setSelectedClassId(id === selectedClassId ? undefined : id); // Toggle selection
  };

  const handleConfirmSelection = () => {
    const selectedClass = classes.find((classItem) => classItem.id === selectedClassId);

    if (selectedClass) {
      onConfirm(selectedClass);
    } else {
      alert('Por favor, selecione uma turma.');
    }
  };

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
        
        <ClassGrid classes={classes} onSelectClass={handleSelectClass} selectedClassId={selectedClassId} />
        
        <footer className={styles.footerSection}>
          <AppButton onClick={handleConfirmSelection} disabled={!selectedClassId}>
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
