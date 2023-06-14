import useSWR from "swr";

function fetcher(path) {
  const url = `https://dummyjson.com/${path}`;
  return fetch(url).then((res) => res.json());
}

// const fetcher = (path, param = "") => {
//   const url = `https://dummyjson.com/${path}/${param1};
//   console.log(url)
//   return fetch(url).then((res) => res.json());
// }


function getStatus({ data, error }) {
  if (error && !data) return "error";
  if (!data) return "loading";
  return "success";
}

function useApiTest(path) {
  const { data, error, isValidating } = useSWR(path, fetcher, { refreshInterval: 300000 });
  // useSWR([path, qParam], ([url, param]) => fetch(url, param))
  const status = getStatus({ data, error });
  const isLoading = status === "loading";
  const isError = status === "error";
  const isSuccess = status === "success";
  return { isLoading, isValidating, isError, isSuccess, data, error };
}

export default useApiTest;