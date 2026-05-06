'use client';

import { useEffect, useState } from 'react';
import AppButton from '@/components/ui/buttons/AppButton';
import AppOutlinedButton from '@/components/ui/buttons/AppOutlinedButton';
import { getApiErrorMessage } from '@/lib/api/client';
import { getRoles } from '@/lib/api/roles';
import { SelectedRole } from '@/types/registration';
import styles from './page.module.css';

interface RegistrationTypePageProps {
  selectedType?: string;
  selectedRoleId?: string;
  onSelect: (type: string, roleId: string) => void;
  onBack: () => void;
}

export default function RegistrationTypePage({
  selectedType,
  selectedRoleId,
  onSelect,
  onBack,
}: RegistrationTypePageProps) {
  const [roles, setRoles] = useState<SelectedRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadRoles() {
      try {
        setIsLoading(true);
        setErrorMessage('');

        const apiRoles = await getRoles();

        if (isMounted) {
          setRoles(apiRoles);
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(getApiErrorMessage(error));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadRoles();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className={styles.pageContainer}>
      <section className={styles.content} aria-labelledby="registration-type-title">
        <header className={styles.header}>
          <img src="/images/logo_crisma.png" alt="" className={styles.logo} />
          <h1 id="registration-type-title" className={styles.brand}>crisma.app</h1>
          <p className={styles.title}>Primeiro acesso</p>
          <p className={styles.subtitle}>Selecione seu tipo de cadastro</p>
        </header>

        {isLoading && <p className={styles.feedback}>Carregando tipos de cadastro...</p>}
        {!isLoading && errorMessage && <p className={styles.feedbackError}>{errorMessage}</p>}
        {!isLoading && !errorMessage && roles.length === 0 && (
          <p className={styles.feedback}>Nenhum tipo de cadastro disponível no momento.</p>
        )}
        {!isLoading && !errorMessage && roles.length > 0 && (
          <div className={styles.options} role="list" aria-label="Tipos de cadastro">
            {roles.map((role) => (
              <AppButton
                key={role.id}
                type="button"
                className={selectedRoleId === role.id || selectedType === role.name ? styles.selectedOption : ''}
                onClick={() => onSelect(role.name, role.id)}
              >
                {role.name}
              </AppButton>
            ))}
          </div>
        )}

        <footer className={styles.footer}>
          <AppOutlinedButton type="button" onClick={onBack}>Voltar</AppOutlinedButton>
        </footer>
      </section>
    </main>
  );
}
