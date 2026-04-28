import React from 'react';
import styles from './AppTextSubtitle.module.css';

interface AppTextSubtitleProps {
  children: React.ReactNode;
  className?: string;
}

export default function AppTextSubtitle({ children, className }: AppTextSubtitleProps) {
  return (
    <p className={`${styles.subtitle} ${className || ''}`}>
      {children}
    </p>
  );
}