'use client';

import Link from 'next/link';
import type { EventInput } from '@/lib/schemas';

export function recordClick(type: EventInput['type']) {
  const payload = new Blob([JSON.stringify({ type })], { type: 'application/json' });
  if (navigator.sendBeacon?.('/api/events', payload)) return;
  void fetch('/api/events', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type }), keepalive: true });
}

export function TrackedLink({ href, type, className, children, external = false }: { href: string; type: EventInput['type']; className?: string; children: React.ReactNode; external?: boolean }) {
  return external ? <a href={href} className={className} target="_blank" rel="noopener noreferrer" onClick={() => recordClick(type)}>{children}</a> : <Link href={href} className={className} onClick={() => recordClick(type)}>{children}</Link>;
}
