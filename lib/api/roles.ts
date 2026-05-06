import { RoleDto, SelectedRole } from '@/types/registration';
import { apiClient } from './client';
import { normalizeDrfList } from './drf';

export async function getRoles(): Promise<SelectedRole[]> {
  const response = await apiClient.get<RoleDto[] | { results: RoleDto[] }>('/roles/');
  const roles = normalizeDrfList(response.data);

  return roles.map((role) => ({
    id: String(role.id),
    name: role.name,
    description: role.description,
  }));
}
