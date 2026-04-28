import React from 'react';
import styles from './AppTextTitle.module.css';

interface AppTextTitleProps {
  children: React.ReactNode;
}

export default function AppTextTitle({ children }: AppTextTitleProps) {
  return (
    <h1 className={styles.title}>
      {children}
    </h1>
  );
}