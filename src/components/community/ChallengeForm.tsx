'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowUpRight } from 'lucide-react';
import { ugcInputSchema } from '@/lib/schemas';
import type { z } from 'zod';

type Values = z.infer<typeof ugcInputSchema>;

export function ChallengeForm() {
  const [notice, setNotice] = useState('');
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Values>({ resolver: zodResolver(ugcInputSchema), defaultValues: { displayName: '', videoUrl: '', story: '', website: '' } });
  async function submit(values: Values) {
    setNotice('Đang gửi bài của bạn…');
    try {
      const response = await fetch('/api/ugc', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Không thể gửi bài lúc này.');
      reset();
      setNotice('Đã nhận bài. Nhóm sẽ xem xét trước khi đăng công khai.');
    } catch (error) { setNotice(error instanceof Error ? error.message : 'Không thể gửi bài lúc này.'); }
  }
  return <form className="challenge-form" onSubmit={handleSubmit(submit)} noValidate>
    <label>Tên hiển thị<input type="text" maxLength={80} placeholder="Tên bạn muốn hiển thị" {...register('displayName')} /></label>{errors.displayName && <p className="form-error">Vui lòng nhập tên hiển thị.</p>}
    <label>Liên kết video<input type="url" placeholder="https://..." {...register('videoUrl')} /></label>{errors.videoUrl && <p className="form-error">Hãy nhập liên kết HTTPS hợp lệ.</p>}
    <label>Câu chuyện của bạn<textarea rows={5} maxLength={1000} placeholder="Khoảnh khắc nhỏ bạn đã dành cho mình…" {...register('story')} /></label>{errors.story && <p className="form-error">Vui lòng kể ngắn gọn câu chuyện của bạn.</p>}
    <input className="visually-hidden-honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" {...register('website')} />
    <label className="challenge-consent"><input type="checkbox" {...register('consent')} /><span>Tôi đồng ý để nhóm lưu bài gửi và công khai tên hiển thị, câu chuyện cùng liên kết video sau khi duyệt.</span></label>{errors.consent && <p className="form-error">Cần đồng ý trước khi gửi bài.</p>}
    <button type="submit" className="button-primary" disabled={isSubmitting}>Gửi bài dự thi <ArrowUpRight size={17} /></button><p className="challenge-form-status" role="status" aria-live="polite">{notice}</p>
  </form>;
}
