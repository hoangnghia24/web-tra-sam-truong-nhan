import { describe, expect, it } from 'vitest';
import { formatRemaining, remainingAt, TIMER_SECONDS } from './timer';

describe('seven-minute timer', () => {
  it('formats the start and finish without negative values', () => {
    expect(formatRemaining(TIMER_SECONDS)).toBe('07:00');
    expect(formatRemaining(0)).toBe('00:00');
    expect(formatRemaining(-12)).toBe('00:00');
  });

  it('uses wall-clock time when browser intervals are delayed', () => {
    expect(remainingAt(420_000, 0)).toBe(420);
    expect(remainingAt(420_000, 420_000)).toBe(0);
    expect(remainingAt(420_000, 480_000)).toBe(0);
  });
});
