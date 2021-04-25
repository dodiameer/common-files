import { writable } from "svelte/store";

export default function persistedStore(key, initialValue) {
  const loadedValue = JSON.parse(localStorage.getItem(key)) ?? initialValue;
  const internalStore = writable(loadedValue);

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
