// DEPENDENCY
import { AxiosRequestConfig } from 'axios'
import { useState, useEffect } from 'react'

// LIB
import { api } from '../lib/axios'

export function useFetch<T = unknown>(
  url: string,
  extraOptions?: AxiosRequestConfig
) {
  const [response, setResponse] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [shouldRefetch, refetch] = useState({})

  useEffect(() => {
    api
      .get(url, extraOptions)
      .then((res) => setResponse(res.data))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false))
  }, [shouldRefetch])

  return { response, error, isLoading, refetch: () => refetch({}) }
}
