'use client';

import { FormProvider, useForm } from 'react-hook-form';
import HookFormInput from '@/components/form/HookFormInput/HookFormInput';
import AppButton from '@/components/ui/buttons/AppButton';
import AppTerms from '@/components/ui/AppTerms';
import { RegistrationFormData } from '@/types/registration';
import styles from './page.module.css';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_PATTERN = /^(?=.*[^A-Za-z0-9]).{8,}$/;

interface RegisterPageProps {
  defaultValues: RegistrationFormData;
  onSubmit: (data: RegistrationFormData) => void;
}

export default function RegisterPage({ defaultValues, onSubmit }: RegisterPageProps) {
  const methods = useForm<RegistrationFormData>({
    defaultValues,
    mode: 'onSubmit',
  });

  const password = methods.watch('password');

  return (
    <main className={styles.pageContainer}>
      <section className={styles.content} aria-labelledby="register-title">
        <header className={styles.header}>
          <img src="/images/logo_crisma.png" alt="" className={styles.logo} />
          <h1 id="register-title" className={styles.brand}>crisma.app</h1>
          <p className={styles.title}>Primeiro acesso</p>
          <p className={styles.subtitle}>Faça o seu cadastro</p>
        </header>

        <FormProvider {...methods}>
          <form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)} noValidate>
            <div className={styles.fields}>
              <HookFormInput<RegistrationFormData> name="fullName" placeholder="Nome completo" required />
              <HookFormInput<RegistrationFormData> name="birthDate" placeholder="Data de nascimento" maskType="date" inputMode="numeric" required />
              <HookFormInput<RegistrationFormData> name="phone" placeholder="Celular" maskType="phone" inputMode="tel" required />
              <HookFormInput<RegistrationFormData>
                name="email"
                placeholder="E-mail"
                type="email"
                required
                validation={{
                  pattern: {
                    value: EMAIL_PATTERN,
                    message: 'Informe um e-mail válido',
                  },
                }}
              />
              <HookFormInput<RegistrationFormData>
                name="password"
                placeholder="Senha"
                type="password"
                required
                validation={{
                  pattern: {
                    value: PASSWORD_PATTERN,
                    message: 'A senha deve ter 8 caracteres e 1 especial',
                  },
                }}
              />
              <HookFormInput<RegistrationFormData>
                name="confirmPassword"
                placeholder="Repita sua senha"
                type="password"
                required
                validation={{
                  validate: (value) => value === password || 'As senhas precisam ser iguais',
                }}
              />
              <input type="hidden" {...methods.register('registrationType')} />
              <input type="hidden" {...methods.register('roleId')} />
            </div>

            <AppButton type="submit">Continuar</AppButton>
          </form>
        </FormProvider>

        <footer className={styles.termsWrapper}>
          <AppTerms />
        </footer>
      </section>
    </main>
  );
}
