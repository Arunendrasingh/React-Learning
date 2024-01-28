import { useEffect, useState } from "react";
export function useLocalStorage(initialValue, key = "watched_movie_list") {
  const [value, setValue] = useState(() => {
    const storage = localStorage.getItem(key);
    const storageData = JSON.parse(storage);
    return storageData ? storageData : initialValue;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
