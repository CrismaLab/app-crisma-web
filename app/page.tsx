'use client';

import { useState } from 'react';
import WelcomePage from './welcome/page';
import RegisterPage from './register/page';
import RegistrationTypePage from './registration-type/page';
import ClassSelectionPage from './class-selection/page';
import RegisterReviewPage from './register-review/page';
import FinalizationPage from './finalization/page';
import ComingSoonPage from './coming-soon/page';
import { signup } from '@/lib/api/auth';
import { getApiErrorMessage } from '@/lib/api/client';
import { RegistrationFormData, SelectedClass } from '@/types/registration';
import styles from './page.module.css';

type HomeStep = 'welcome' | 'register' | 'registration-type' | 'class-selection' | 'register-review' | 'finalization' | 'coming-soon';

const INITIAL_REGISTRATION_DATA: RegistrationFormData = {
  fullName: '',
  birthDate: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
  registrationType: '',
  roleId: '',
};

export default function Home() {
  const [currentStep, setCurrentStep] = useState<HomeStep>('welcome');
  const [registrationData, setRegistrationData] = useState<RegistrationFormData>(INITIAL_REGISTRATION_DATA);
  const [selectedClass, setSelectedClass] = useState<SelectedClass | null>(null);
  const [registrationError, setRegistrationError] = useState('');
  const [isSubmittingRegistration, setIsSubmittingRegistration] = useState(false);

  const handleWelcomeStart = () => {
    setCurrentStep('register');
  };

  const handleRegisterSubmit = (data: RegistrationFormData) => {
    setRegistrationError('');
    setRegistrationData(data);
    setCurrentStep('registration-type');
  };

  const handleRegistrationTypeSelect = (registrationType: string, roleId: string) => {
    setRegistrationError('');
    setRegistrationData((currentData) => ({
      ...currentData,
      registrationType,
      roleId,
    }));
    setCurrentStep('class-selection');
  };

  const handleBackToRegister = () => {
    setCurrentStep('register');
  };

  const handleBackToRegistrationType = () => {
    setCurrentStep('registration-type');
  };

  const handleClassSelectionConfirm = (classItem: SelectedClass) => {
    setRegistrationError('');
    setSelectedClass(classItem);
    setCurrentStep('register-review');
  };

  const handleBackToClassSelection = () => {
    setRegistrationError('');
    setCurrentStep('class-selection');
  };

  const handleRegistrationConfirm = async () => {
    if (!selectedClass || isSubmittingRegistration) {
      return;
    }

    try {
      setIsSubmittingRegistration(true);
      setRegistrationError('');
      await signup(registrationData, selectedClass);
      setCurrentStep('finalization');
    } catch (error) {
      setRegistrationError(getApiErrorMessage(error));
    } finally {
      setIsSubmittingRegistration(false);
    }
  };

  const handleFinalizationComplete = () => {
    setCurrentStep('coming-soon');
  };

  return (
    <div className={styles.pageShell}>
      {currentStep === 'finalization' ? (
        <FinalizationPage onComplete={handleFinalizationComplete} />
      ) : currentStep === 'coming-soon' ? (
        <ComingSoonPage />
      ) : currentStep === 'register-review' && selectedClass ? (
        <RegisterReviewPage
          data={registrationData}
          selectedClass={selectedClass}
          onConfirm={handleRegistrationConfirm}
          onBack={handleBackToClassSelection}
          errorMessage={registrationError}
          isSubmitting={isSubmittingRegistration}
        />
      ) : currentStep === 'class-selection' ? (
        <ClassSelectionPage onConfirm={handleClassSelectionConfirm} onBack={handleBackToRegistrationType} />
      ) : currentStep === 'registration-type' ? (
        <RegistrationTypePage
          selectedType={registrationData.registrationType}
          selectedRoleId={registrationData.roleId}
          onSelect={handleRegistrationTypeSelect}
          onBack={handleBackToRegister}
        />
      ) : currentStep === 'register' ? (
        <RegisterPage defaultValues={registrationData} onSubmit={handleRegisterSubmit} />
      ) : (
        <WelcomePage onStart={handleWelcomeStart} />
      )}
    </div>
  );
}
