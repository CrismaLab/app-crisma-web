'use client';

import React from 'react';
import styles from './AppOutlinedButton.module.css';

interface AppOutlinedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function AppOutlinedButton({ children, onClick, className, ...rest }: AppOutlinedButtonProps) {
  return (
    <button
      className={`${styles.buttonVazado} ${className || ''}`}
      onClick={onClick}
      {...rest}
    >
      <span className={styles.buttonVazadoText}>{children}</span>
    </button>
  );
}

