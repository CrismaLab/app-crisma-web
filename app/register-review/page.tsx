'use client';

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
}

const EMPTY_REGISTRATION_DATA: RegistrationFormData = {
  fullName: '',
  birthDate: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
  registrationType: '',
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
}: RegisterReviewPageProps) {
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
              <AppButton type="button" onClick={onConfirm}>Confirmar</AppButton>
              <AppOutlinedButton type="button" onClick={onBack}>Voltar</AppOutlinedButton>
            </footer>
          </form>
        </FormProvider>
      </section>
    </main>
  );
}
