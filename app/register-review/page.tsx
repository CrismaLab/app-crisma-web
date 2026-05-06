'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FormProvider, useForm } from 'react-hook-form';
import HookFormInput from '@/components/form/HookFormInput/HookFormInput';
import AppButton from '@/components/ui/buttons/AppButton';
import AppOutlinedButton from '@/components/ui/buttons/AppOutlinedButton';
import { RegistrationFormData, SelectedClass } from '@/types/registration';
import styles from './page.module.css';

interface RegisterReviewPageProps {
  data?: RegistrationFormData;
  selectedClass?: SelectedClass;
  onConfirm?: () => void;
  onBack?: () => void;
  errorMessage?: string;
  isSubmitting?: boolean;
}

const EMPTY_REGISTRATION_DATA: RegistrationFormData = {
  fullName: '',
  birthDate: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
  registrationType: '',
  roleId: '',
};

const EMPTY_SELECTED_CLASS: SelectedClass = {
  id: '',
  name: 'Turma',
  color: '#82AF7F',
};

export default function RegisterReviewPage({
  data,
  selectedClass,
  onConfirm,
  onBack,
  errorMessage,
  isSubmitting = false,
}: RegisterReviewPageProps) {
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const methods = useForm<RegistrationFormData>({
    defaultValues: data ?? EMPTY_REGISTRATION_DATA,
  });
  const classToReview = selectedClass ?? EMPTY_SELECTED_CLASS;

  return (
    <main className={styles.pageContainer}>
      <section className={styles.content} aria-labelledby="review-title">
        <header className={styles.header}>
          <img src="/images/logo_crisma.png" alt="" className={styles.logo} />
          <h1 id="review-title" className={styles.brand}>crisma.app</h1>
          <p className={styles.title}>Primeiro acesso</p>
          <p className={styles.subtitle}>Confirme seus dados</p>
          <span className={styles.classBadge} style={{ backgroundColor: classToReview.color }}>
            {classToReview.name}
          </span>
        </header>

        <FormProvider {...methods}>
          <form className={styles.form}>
            <div className={styles.fields}>
              <HookFormInput<RegistrationFormData> name="fullName" label="Nome Completo" required viewOnly />
              <HookFormInput<RegistrationFormData> name="birthDate" label="Data de Nascimento" required viewOnly />
              <HookFormInput<RegistrationFormData> name="phone" label="Celular" required viewOnly />
              <HookFormInput<RegistrationFormData> name="email" label="E-mail" required viewOnly />
              <div className={styles.selectPreview}>
                <HookFormInput<RegistrationFormData> name="registrationType" label="Tipo de cadastro" required viewOnly />
                <span className={styles.chevron} aria-hidden="true">›</span>
              </div>
            </div>

            <footer className={styles.actions}>
              <label className={styles.termsAgreement}>
                <input
                  type="checkbox"
                  className={styles.termsCheckbox}
                  checked={hasAcceptedTerms}
                  onChange={(event) => setHasAcceptedTerms(event.target.checked)}
                />
                <span>
                  Li e aceito os{' '}
                  <Link className={styles.termsLink} href="/terms-of-use" target="_blank">
                    Termos de Uso
                  </Link>{' '}
                  e a{' '}
                  <Link className={styles.termsLink} href="/privacy-policy" target="_blank">
                    Política de Privacidade
                  </Link>
                  .
                </span>
              </label>

              {errorMessage && <p className={styles.submitError}>{errorMessage}</p>}

              <AppButton type="button" onClick={onConfirm} disabled={!hasAcceptedTerms || isSubmitting}>
                {isSubmitting ? 'Enviando...' : 'Confirmar'}
              </AppButton>
              <AppOutlinedButton type="button" onClick={onBack} disabled={isSubmitting}>Voltar</AppOutlinedButton>
            </footer>
          </form>
        </FormProvider>
      </section>
    </main>
  );
}
