interface PaginatedResponse<T> {
  results: T[];
}

export function normalizeDrfList<T>(data: T[] | PaginatedResponse<T>): T[] {
  if (Array.isArray(data)) {
    return data;
  }

  return data.results;
}
