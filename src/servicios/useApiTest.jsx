import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

// function fetcher(path) {
//   const url = `https://dummyjson.com/${path}?limit=100`
//   return fetch(url).then((res) => res.json())
// }

function fetcher(path) {
  const url = `https://dummyjson.com/${path}?limit=100`;
  return fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error de red: ${res.status} ${res.statusText}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error('Error al obtener los datos:', error);
      return { error: 'No se pudo obtener la información' };
    });
}

// const fetcher = (path, param = "") => {
//   const url = `https://dummyjson.com/${path}/${param1};
//   console.log(url)
//   return fetch(url).then((res) => res.json());
// }

function getStatus({ data, error }) {
  if (error && !data) return 'error'
  if (!data) return 'loading'
  return 'success'
}

function useApiTest(path) {
  const { data, error, isValidating, mutate } = useSWR(path, fetcher, { refreshInterval: 300000 })
  // useSWR([path, qParam], ([url, param]) => fetch(url, param))
  const { trigger } = useSWRMutation(path, fetcher)
  const status = getStatus({ data, error })
  const isLoading = status === 'loading'
  const isError = status === 'error'
  const isSuccess = status === 'success'
  return { isLoading, isValidating, isError, isSuccess, data, error, mutate, trigger }
}

export default useApiTest
