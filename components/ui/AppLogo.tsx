import React from 'react';
import Image from 'next/image';
import styles from './AppLogo.module.css';

interface AppLogoProps {
  title?: string;
}

export default function AppLogo({ title = "crisma.app" }: AppLogoProps) {
  return (
    <div className={styles.logoContainer}>
      <Image
        src="/assets/images/icon.png"
        alt="App Logo"
        width={150}
        height={120}
        className={styles.reactLogo}
      />
      <h2 className={styles.appName}>{title}</h2>
    </div>
  );
}
