// Custom Hook
// react hooklarına benzer şekilde görev yapan
// projeyi ihityacına göre kendimiz oluşturdupumuz
// görevini bizim belirlediğimiz hooklardır
// genelde veriyi ve veriyi güncelleiyecek fonksiyonu dizi içinde dönerler

import { useEffect, useState } from "react";

export function useLocaleStorage<T>(key: string, initialValue: T) {
  //1) state'i tanımlama
  const [value, setValue] = useState<T>(() => {
    // local den değerleir al
    const jsonValue = localStorage.getItem(key);
    // local de eleman yoksa initial value ile tanımala
    if (jsonValue === null) {
      return initialValue;
    } else {
      // locale de eleman varsa local deki veriyi state e aktar
      return JSON.parse(jsonValue);
    }
  });

  //2) state her değiştiğinde local'i güncelle
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  // 3) hook u kullanılması için state i ve değiştirme methodunu return et
  return [value, setValue] as [T, typeof setValue];
}
