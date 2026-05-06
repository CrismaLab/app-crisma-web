import { RegistrationFormData, SelectedClass, SignupPayload, SignupResponse } from '@/types/registration';
import { apiClient } from './client';

export async function signup(registrationData: RegistrationFormData, selectedClass: SelectedClass): Promise<SignupResponse> {
  const response = await apiClient.post<SignupResponse>(
    '/accounts/auth/signup/',
    buildSignupPayload(registrationData, selectedClass),
  );

  return response.data;
}

function buildSignupPayload(registrationData: RegistrationFormData, selectedClass: SelectedClass): SignupPayload {
  const { firstName, lastName } = splitFullName(registrationData.fullName);

  return {
    username: buildUsername(registrationData.email),
    email: registrationData.email.trim().toLowerCase(),
    password: registrationData.password,
    registration_code: buildRegistrationCode(registrationData.email),
    first_name: firstName,
    last_name: lastName,
    birth_date: toIsoDate(registrationData.birthDate),
    phone_number: registrationData.phone,
    class_id: Number(selectedClass.id),
    role_id: Number(registrationData.roleId),
    registration_type: registrationData.registrationType,
  };
}

function splitFullName(fullName: string): { firstName: string; lastName: string } {
  const nameParts = fullName.trim().split(/\s+/);
  const [firstName = '', ...lastNameParts] = nameParts;

  return {
    firstName,
    lastName: lastNameParts.join(' '),
  };
}

function toIsoDate(maskedDate: string): string {
  const [day, month, year] = maskedDate.split('/');

  if (!day || !month || !year) {
    return maskedDate;
  }

  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

function buildUsername(email: string): string {
  const [emailName] = email.trim().toLowerCase().split('@');
  const normalizedName = emailName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9._-]/g, '.')
    .replace(/\.+/g, '.')
    .replace(/^\.+|\.+$/g, '');

  return normalizedName || `usuario.${Date.now()}`;
}

function buildRegistrationCode(email: string): string {
  const compactEmail = email.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
  return `${compactEmail.slice(0, 8)}${Date.now().toString().slice(-6)}`;
}
