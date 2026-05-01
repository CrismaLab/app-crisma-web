import React from 'react';
import Image from 'next/image';
import styles from './AppHeader.module.css';

interface AppHeaderProps {
  onClose?: () => void;
  onMenuClick?: () => void;
}

export default function AppHeader({ onClose, onMenuClick }: AppHeaderProps) {
  return (
    <header className={styles.header}>
      <button onClick={onClose} className={styles.iconButton} aria-label="Fechar">
        <Image src="/close-icon.svg" alt="Close Icon" width={24} height={24} />
      </button>
      <h1 className={styles.title}>crisma.app</h1>
      <button onClick={onMenuClick} className={styles.iconButton} aria-label="Menu">
        <Image src="/menu-dots-icon.svg" alt="Menu Dots Icon" width={24} height={24} />
      </button>
    </header>
  );
}
