export interface DebouncedFunction<TArgs extends unknown[]> {
  (...args: TArgs): void;
  cancel: () => void;
}

export function debounce<TArgs extends unknown[]>(
  callback: (...args: TArgs) => void,
  delayMs: number,
): DebouncedFunction<TArgs> {
  let timeoutId: ReturnType<typeof globalThis.setTimeout> | undefined;

  const debouncedFunction = (...args: TArgs) => {
    if (timeoutId !== undefined) {
      globalThis.clearTimeout(timeoutId);
    }

    timeoutId = globalThis.setTimeout(() => {
      timeoutId = undefined;
      callback(...args);
    }, delayMs);
  };

  debouncedFunction.cancel = () => {
    if (timeoutId !== undefined) {
      globalThis.clearTimeout(timeoutId);
      timeoutId = undefined;
    }
  };

  return debouncedFunction;
}
