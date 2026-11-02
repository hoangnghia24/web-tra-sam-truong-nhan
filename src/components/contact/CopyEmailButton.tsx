'use client';

import { useState } from 'react';
import { Copy } from 'lucide-react';

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  return <button type="button" className="copy-email" onClick={async () => { try { await navigator.clipboard.writeText(email); setCopied(true); } catch { setCopied(false); } }} aria-label={`Sao chép email ${email}`}><Copy size={15} /> {copied ? 'Đã sao chép' : 'Sao chép email'}</button>;
}
