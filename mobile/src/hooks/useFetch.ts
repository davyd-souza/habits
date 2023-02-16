// DEPENDENCY
import { AxiosRequestConfig } from 'axios'
import { useState, useEffect } from 'react'
import { Alert } from 'react-native'

// LIB
import { api } from '../lib/axios'

export function useFetch<T = unknown>(
  url: string,
  extraOptions?: AxiosRequestConfig
) {
  const [response, setResponse] = useState<T | null>()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    api
      .get(url, extraOptions)
      .then((res) => setResponse(res.data))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false))
  }, [])

  return { response, error, isLoading }
}
