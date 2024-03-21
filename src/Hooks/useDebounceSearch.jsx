import { useEffect, useState } from 'react';

function useDebounceSearch(query) {
  const [debouncedValue, setDebouncedValue] = useState(query);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(query);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [query]);

  return debouncedValue;
}

export default useDebounceSearch;