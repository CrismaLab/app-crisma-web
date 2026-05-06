import { ClassDto, SelectedClass } from '@/types/registration';
import { apiClient } from './client';
import { normalizeDrfList } from './drf';

export async function getClasses(): Promise<SelectedClass[]> {
  const response = await apiClient.get<ClassDto[] | { results: ClassDto[] }>('/classes/');
  const classes = normalizeDrfList(response.data);

  return classes.map((classItem) => ({
    id: String(classItem.id),
    name: classItem.name,
    color: classItem.color,
  }));
}
