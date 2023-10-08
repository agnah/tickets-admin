import useSWR from 'swr'
// import useSWRMutation from 'swr/mutation'
// import fetchGeneral from './FetchGeneral'
import { fetcher } from './useApiTest'

function getStatus ({ data, error }) {
  if (error && !data) return 'error'
  if (!data) return 'loading'
  return 'success'
}

function useApiMock (path) {
  const headers = {
    'X-Token': 'abc-123'
  }
  // const { data, error, isValidating, mutate } = useSWR(path, fetchGeneral, { refreshInterval: 300000, headers })
  const { data, error, isValidating, mutate } = useSWR(path, fetcher, { refreshInterval: 300000, headers })

  // const { trigger } = useSWRMutation(path, fetchGeneral)
  const status = getStatus({ data, error })
  const isLoading = status === 'loading'
  const isError = status === 'error'
  const isSuccess = status === 'success'
  return { isLoading, isValidating, isError, isSuccess, data, error, mutate }
}

export default useApiMock
