import { useState, useEffect } from "react";

type SetValue<T> = (value: T | ((val: T) => T)) => void;

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, SetValue<T>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.log(error);
    }
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
