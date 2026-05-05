'use client';

import AppButton from '@/components/ui/buttons/AppButton';
import AppOutlinedButton from '@/components/ui/buttons/AppOutlinedButton';
import styles from './page.module.css';

const CATECHIST_TYPES = ['Coordenador', 'Líder', 'Vice-Líder', 'Comunicação', 'Financeiro'];

interface RegistrationTypePageProps {
  selectedType?: string;
  onSelect: (type: string) => void;
  onBack: () => void;
}

export default function RegistrationTypePage({
  selectedType,
  onSelect,
  onBack,
}: RegistrationTypePageProps) {
  return (
    <main className={styles.pageContainer}>
      <section className={styles.content} aria-labelledby="registration-type-title">
        <header className={styles.header}>
          <img src="/images/logo_crisma.png" alt="" className={styles.logo} />
          <h1 id="registration-type-title" className={styles.brand}>crisma.app</h1>
          <p className={styles.title}>Primeiro acesso</p>
          <p className={styles.subtitle}>Selecione seu tipo de cadastro</p>
        </header>

        <div className={styles.options} role="list" aria-label="Tipos de cadastro">
          {CATECHIST_TYPES.map((type) => (
            <AppButton
              key={type}
              type="button"
              className={selectedType === type ? styles.selectedOption : ''}
              onClick={() => onSelect(type)}
            >
              {type}
            </AppButton>
          ))}
        </div>

        <footer className={styles.footer}>
          <AppOutlinedButton type="button" onClick={onBack}>Voltar</AppOutlinedButton>
        </footer>
      </section>
    </main>
  );
}
