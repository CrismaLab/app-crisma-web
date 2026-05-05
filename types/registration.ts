export interface RegistrationFormData {
  fullName: string;
  birthDate: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  registrationType: string;
}

export interface SelectedClass {
  id: string;
  name: string;
  color: string;
}
