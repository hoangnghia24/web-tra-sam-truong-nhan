import type { KeyboardEvent } from 'react';

export function handleTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number, count: number, select: (index: number) => void) {
  let next: number;
  switch (event.key) {
    case 'ArrowRight':
    case 'ArrowDown': next = (index + 1) % count; break;
    case 'ArrowLeft':
    case 'ArrowUp': next = (index - 1 + count) % count; break;
    case 'Home': next = 0; break;
    case 'End': next = count - 1; break;
    default: return;
  }
  event.preventDefault();
  select(next);
  event.currentTarget.closest('[role="tablist"]')?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
}
