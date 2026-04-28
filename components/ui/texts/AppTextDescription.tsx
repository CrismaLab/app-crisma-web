import React from 'react';
import styles from './AppTextDescription.module.css';

interface AppTextDescriptionProps {
  children: React.ReactNode;
}

export default function AppTextDescription({ children }: AppTextDescriptionProps) {
  return (
    <p className={styles.description}>
      {children}
    </p>
  );
}
