"use client";

import { useEffect, useState } from "react";

function readStorage<T>(key: string, initialValue: T): T {
  if (typeof window === "undefined") return initialValue;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : initialValue;
  } catch {
    return initialValue;
  }
}

/**
 * このフックを使うコンポーネントは、SSR時と初回クライアント描画時で
 * localStorageの値を反映できないため、必ず ssr: false の動的インポートで読み込むこと。
 */
export function useLocalStorageState<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(() => readStorage(key, initialValue));

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // プライベートモード等でストレージ書き込みできない場合は無視
    }
  }, [key, state]);

  return [state, setState] as const;
}

export function clearLocalStorageKeys(keys: string[]) {
  for (const key of keys) {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // ignore
    }
  }
}
