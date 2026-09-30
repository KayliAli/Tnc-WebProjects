import { useState } from 'react';

// --- ŞİFRELEME FONKSİYONU ---
const encryptData = (data) => {
  try {
    const jsonStr = JSON.stringify(data);
    const encoded = encodeURIComponent(jsonStr);
    const base64 = btoa(encoded);
    return base64.split('').reverse().join('');
  } catch (err) {
    console.error("Şifreleme hatası:", err);
    return null;
  }
};

// --- ŞİFRE ÇÖZME FONKSİYONU ---
const decryptData = (encryptedText) => {
  try {
    const base64 = encryptedText.split('').reverse().join('');
    const decoded = atob(base64);
    const jsonStr = decodeURIComponent(decoded);
    return JSON.parse(jsonStr);
  } catch {
    return null; 
  }
};

export const useLocalStorage = (key, initialValue) => {
  // 1. State'i Başlatma ve Okuma İşlemi
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const decryptedItem = decryptData(item);
        if (decryptedItem) return decryptedItem;
        
        try {
          return JSON.parse(item);
        } catch {
          return initialValue;
        }
      }
      
      // Eğer localStorage'da ilk defa oluşuyorsa, varsayılan değeri anında şifreleyerek yaz
      const encryptedInitial = encryptData(initialValue);
      if (encryptedInitial) {
        window.localStorage.setItem(key, encryptedInitial);
      }
      return initialValue;
    } catch {
      return initialValue;
    }
  });

  // useEffect kullanmak yerine, state'i güncellediğimiz anda anında LocalStorage'a da yazıyoruz.
  // Böylece sayfa hemen kapansa bile (navigate) veri çoktan kaydedilmiş oluyor.
  const setValue = (value) => {
    try {
      // React'in state mantığını bozmamak için gelen değeri analiz ediyoruz
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // State'i güncelle
      setStoredValue(valueToStore);
      
      // BEKLEMEDEN ANINDA LOCALSTORAGE'A YAZ!
      const encryptedValue = encryptData(valueToStore);
      if (encryptedValue) {
        window.localStorage.setItem(key, encryptedValue);
      }
    } catch (error) {
      console.error("LocalStorage kayıt hatası:", error);
    }
  };

  return [storedValue, setValue];
};