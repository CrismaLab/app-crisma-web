import React from 'react';
import Image from 'next/image';
import styles from './MemojiIllustration.module.css';

export default function MemojiIllustration() {
  return (
    <div className={styles.container}>
      <Image src="/images/avatares.png" alt="Grouped Avatars" width={340} height={120} className={styles.groupedAvatars} priority />
    </div>
  );
}