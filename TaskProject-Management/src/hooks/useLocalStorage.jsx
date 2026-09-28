import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  // Başlangıç değerini okuma (Sadece bileşen ilk yüklendiğinde çalışır)
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("LocalStorage okuma hatası:", error);
      return initialValue;
    }
  });

  // storedValue her değiştiğinde LocalStorage'ı güncelleme
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("LocalStorage yazma hatası:", error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}