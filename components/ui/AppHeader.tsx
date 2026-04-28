import React from 'react';
import styles from './AppHeader.module.css';

export default function AppHeader() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>crisma.app</h1>
    </header>
  );
}
