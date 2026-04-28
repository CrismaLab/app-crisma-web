import React from 'react';
import styles from './AppTerms.module.css';

export default function AppTerms() {
  return (
    <p className={styles.terms}>
      Ao clicar em continuar, você concorda com os{' '}
      <span className={styles.link}>Termos de Uso</span> e nossa{' '}
      <span className={styles.link}>Política de Privacidade</span>
    </p>
  );
}

