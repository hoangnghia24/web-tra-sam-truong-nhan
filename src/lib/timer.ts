export const TIMER_SECONDS = 7 * 60;

export function formatRemaining(seconds: number) {
  const safe = Math.max(0, Math.ceil(seconds));
  return `${String(Math.floor(safe / 60)).padStart(2, '0')}:${String(safe % 60).padStart(2, '0')}`;
}

export function remainingAt(deadline: number, now: number) {
  return Math.max(0, Math.ceil((deadline - now) / 1000));
}
