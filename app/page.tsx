'use client';

import { useState } from 'react';
import WelcomePage from './welcome/page';
import RegisterPage from './register/page';
import RegistrationTypePage from './registration-type/page';
import ClassSelectionPage from './class-selection/page';
import RegisterReviewPage from './register-review/page';
import FinalizationPage from './finalization/page';
import ComingSoonPage from './coming-soon/page';
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
};

export default function Home() {
  const [currentStep, setCurrentStep] = useState<HomeStep>('welcome');
  const [registrationData, setRegistrationData] = useState<RegistrationFormData>(INITIAL_REGISTRATION_DATA);
  const [selectedClass, setSelectedClass] = useState<SelectedClass | null>(null);

  const handleWelcomeStart = () => {
    setCurrentStep('register');
  };

  const handleRegisterSubmit = (data: RegistrationFormData) => {
    setRegistrationData(data);
    setCurrentStep('registration-type');
  };

  const handleRegistrationTypeSelect = (registrationType: string) => {
    setRegistrationData((currentData) => ({
      ...currentData,
      registrationType,
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
    setSelectedClass(classItem);
    setCurrentStep('register-review');
  };

  const handleBackToClassSelection = () => {
    setCurrentStep('class-selection');
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
          onConfirm={() => setCurrentStep('finalization')}
          onBack={handleBackToClassSelection}
        />
      ) : currentStep === 'class-selection' ? (
        <ClassSelectionPage onConfirm={handleClassSelectionConfirm} onBack={handleBackToRegistrationType} />
      ) : currentStep === 'registration-type' ? (
        <RegistrationTypePage
          selectedType={registrationData.registrationType}
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
