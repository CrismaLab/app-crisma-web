export interface RegistrationFormData {
  fullName: string;
  birthDate: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  registrationType: string;
  roleId: string;
}

export interface SelectedClass {
  id: string;
  name: string;
  color: string;
}

export interface SelectedRole {
  id: string;
  name: string;
  description: string;
}

export interface ClassDto {
  id: number;
  name: string;
  color: string;
  year: string;
  occupacion: string;
  users_year_limit: string;
  created_at?: string;
  updated_at?: string;
}

export interface SignupPayload {
  username: string;
  email: string;
  password: string;
  registration_code: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  phone_number: string;
  class_id: number;
  role_id: number;
  registration_type: string;
}

export interface RoleDto {
  id: number;
  name: string;
  description: string;
  created_at?: string;
  updated_at?: string;
}

export interface SignupResponse {
  message: string;
  user: unknown;
  access: string;
  refresh: string;
}
