import React from 'react';
import styles from './AppFooterText.module.css';

interface AppFooterTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function AppFooterText({ children, className }: AppFooterTextProps) {
  return (
    <p className={`${styles.footerText} ${className || ''}`}>
      {children}
    </p>
  );
}