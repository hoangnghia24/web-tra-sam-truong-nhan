'use client';

import Link from 'next/link';
import type { EventInput } from '@/lib/schemas';

export function eventPayload(type: EventInput['type']): EventInput {
  const query = new URLSearchParams(window.location.search);
  const optional = (key: string) => query.get(key)?.slice(0, 80) || undefined;
  return { type, utmSource: optional('utm_source'), utmMedium: optional('utm_medium'), utmCampaign: optional('utm_campaign') };
}

export function recordClick(type: EventInput['type']) {
  const body = JSON.stringify(eventPayload(type));
  const payload = new Blob([body], { type: 'application/json' });
  if (navigator.sendBeacon?.('/api/events', payload)) return;
  void fetch('/api/events', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true });
}

export function TrackedLink({ href, type, className, children, external = false }: { href: string; type: EventInput['type']; className?: string; children: React.ReactNode; external?: boolean }) {
  return external ? <a href={href} className={className} target="_blank" rel="noopener noreferrer" onClick={() => recordClick(type)}>{children}</a> : <Link href={href} className={className} onClick={() => recordClick(type)}>{children}</Link>;
}
