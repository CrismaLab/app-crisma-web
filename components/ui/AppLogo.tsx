import React from 'react';
import Image from 'next/image';
import styles from './AppLogo.module.css';

interface AppLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function AppLogo({ width = 160, height = 60, className }: AppLogoProps) {
  return (
    <div className={`${styles.logoContainer} ${className || ''}`}>
      <Image
        src="/images/logo_crisma.png"
        alt="Crisma App Logo"
        width={width}
        height={height}
        className={styles.brandLogo}
        priority
      />
    </div>
  );
}
