'use client';

import Image from 'next/image';
import AppOutlinedButton from '@/components/ui/buttons/AppOutlinedButton';
import styles from './page.module.css';

interface WelcomePageProps {
  onStart: () => void;
}

export default function WelcomePage({ onStart }: WelcomePageProps) {
  return (
    <main className={styles.pageContainer}>
      <section className={styles.content} aria-labelledby="welcome-title">
        <div className={styles.brandMark}>
          <Image
            src="/images/logo_crisma.png"
            alt=""
            width={142}
            height={142}
            priority
            className={styles.doveLogo}
          />
        </div>

        <div className={styles.copy}>
          <h1 id="welcome-title" className={styles.title}>
            Seja bem vindo ao CrismaApp!
          </h1>
          <p className={styles.subtitle}>
            O novo app de gestao da crisma!
          </p>
        </div>

        <footer className={styles.footer}>
          <AppOutlinedButton className={styles.startButton} onClick={onStart}>
            Vamos Começar!
          </AppOutlinedButton>
        </footer>
      </section>
    </main>
  );
}
