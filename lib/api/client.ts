import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export function getApiErrorMessage(error: unknown): string {
  if (!axios.isAxiosError(error)) {
    return 'Não foi possível concluir a operação. Tente novamente.';
  }

  const responseData = error.response?.data;

  if (typeof responseData === 'string') {
    return responseData;
  }

  if (responseData && typeof responseData === 'object') {
    const data = responseData as Record<string, unknown>;
    const knownMessage = data.error ?? data.detail ?? data.message;

    if (typeof knownMessage === 'string') {
      return knownMessage;
    }

    const firstFieldError = Object.values(data).find((value) => {
      if (Array.isArray(value)) {
        return typeof value[0] === 'string';
      }

      return typeof value === 'string';
    });

    if (Array.isArray(firstFieldError) && typeof firstFieldError[0] === 'string') {
      return firstFieldError[0];
    }

    if (typeof firstFieldError === 'string') {
      return firstFieldError;
    }
  }

  return 'Não foi possível concluir a operação. Verifique os dados e tente novamente.';
}
