import { useState } from 'react';

interface UseMutationState<T> {
  loading: boolean;
  data?: T;
  error?: object;
}

type useMutationResult<T> = [(data: any) => void, UseMutationState<T>];
type mutationMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export default function useMutation<T = any>(
  url: string,
  method: mutationMethod
): useMutationResult<T> {
  const [state, setState] = useState<UseMutationState<T>>({
    data: undefined,
    error: undefined,
    loading: false,
  });

  const func = (data: any | null) => {
    setState((prev) => ({ ...prev, loading: true }));
    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => setState((prev) => ({ ...prev, data, loading: false })))
      .catch((error) =>
        setState((prev) => ({ ...prev, loading: false, error }))
      );
  };

  return [func, { ...state }];
}
