import React from 'react';
import Image from 'next/image';
import styles from './CrismaBrandLogo.module.css';

interface CrismaBrandLogoProps {
  width?: number;
  height?: number;
}

export default function CrismaBrandLogo({ width = 150, height = 120 }: CrismaBrandLogoProps) {
  return (
    <div className={styles.logoContainer}>
      <Image
        src="/images/logo_crisma.png"
        alt="Crisma App Brand Logo"
        width={width}
        height={height}
        className={styles.crismaLogo}
      />
    </div>
  );
}