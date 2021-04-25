import { writable, Writable } from "svelte/store";

export default function persistedStore<T>(
  key: string,
  initialValue: T
): Writable<T> {
  const loadedValue: T = JSON.parse(localStorage.getItem(key)) ?? initialValue;
  const internalStore = writable<T>(loadedValue);

  // Set localstorage to persist value without needing to update it
  localStorage.setItem(key, JSON.stringify(loadedValue));

  return {
    set(value) {
      localStorage.setItem(key, JSON.stringify(value));
      internalStore.set(value);
    },
    subscribe(run, invalidate) {
      return internalStore.subscribe(run, invalidate);
    },
    update(updater) {
      return internalStore.update(updater);
    },
  };
}
