import { debounce } from './debounce';

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('delays callback execution until delay elapses', () => {
    const callback = vi.fn();
    const debounced = debounce(callback, 300);

    debounced('value');

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(299);
    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('value');
  });

  it('resets timer when called multiple times and uses latest args', () => {
    const callback = vi.fn();
    const debounced = debounce(callback, 200);

    debounced('first');
    vi.advanceTimersByTime(100);
    debounced('second');

    vi.advanceTimersByTime(199);
    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('second');
  });

  it('cancels pending callback and handles cancel with no active timer', () => {
    const callback = vi.fn();
    const debounced = debounce(callback, 100);

    debounced();
    debounced.cancel();
    vi.advanceTimersByTime(100);

    expect(callback).not.toHaveBeenCalled();

    expect(() => {
      debounced.cancel();
    }).not.toThrow();
  });
});
