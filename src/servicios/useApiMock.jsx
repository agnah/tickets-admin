import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import fetchGeneral from './FetchGeneral'

function getStatus ({ data, error }) {
  if (error && !data) return 'error'
  if (!data) return 'loading'
  return 'success'
}

function useApiMock (path) {
  const { data, error, isValidating, mutate } = useSWR(path, fetchGeneral, { refreshInterval: 300000 })
  const { trigger } = useSWRMutation(path, fetchGeneral)
  const status = getStatus({ data, error })
  const isLoading = status === 'loading'
  const isError = status === 'error'
  const isSuccess = status === 'success'
  return { isLoading, isValidating, isError, isSuccess, data, error, mutate, trigger }
}

export default useApiMock
