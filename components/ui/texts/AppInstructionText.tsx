import React from 'react';
import styles from './AppInstructionText.module.css';

interface AppInstructionTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function AppInstructionText({ children, className }: AppInstructionTextProps) {
  return (
    <p className={`${styles.instruction} ${className || ''}`}>
      {children}
    </p>
  );
}