'use client';

import React from 'react';
import styles from './AppButton.module.css';

interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function AppButton({
  children,
  onClick,
  disabled = false,
  className,
  ...rest
}: AppButtonProps) {
  return (
    <button
      className={`${styles.button} ${disabled ? styles.buttonDisabled : ''} ${className || ''}`}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      <span className={disabled ? styles.buttonTextDisabled : styles.buttonText}>
        {children}
      </span>
    </button>
  );
}