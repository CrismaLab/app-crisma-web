export type RegisterMode = 'create' | 'view';

export type RegisterFormValues = {
  fullName: string;
  birthDate: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
};
