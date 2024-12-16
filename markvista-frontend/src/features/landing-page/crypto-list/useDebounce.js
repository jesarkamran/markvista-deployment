export default function useDebounce(get, delay) {
  function handler(value) {
    const handler = setTimeout(() => {
      get(value);
    }, delay);

    return () => clearTimeout(handler);
  }

  return handler;
}
