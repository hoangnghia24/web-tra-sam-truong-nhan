'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowUpRight } from 'lucide-react';
import type { z } from 'zod';
import { contactInputSchema } from '@/lib/schemas';

type Values = z.infer<typeof contactInputSchema>;

export function ContactForm() {
  const [notice, setNotice] = useState('');
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Values>({ resolver: zodResolver(contactInputSchema), defaultValues: { name: '', email: '', subject: '', message: '', website: '' } });
  async function submit(values: Values) {
    setNotice('Đang gửi lời nhắn…');
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || 'Không gửi được lời nhắn.');
      reset(); setNotice('Nhóm đã nhận lời nhắn của bạn. Cảm ơn bạn đã liên hệ.');
    } catch (error) { setNotice(error instanceof Error ? error.message : 'Không gửi được lời nhắn.'); }
  }
  return <form className="contact-form" onSubmit={handleSubmit(submit)} noValidate><div className="contact-form-row"><label>Họ và tên<input {...register('name')} maxLength={100} autoComplete="name" /></label><label>Email<input {...register('email')} type="email" autoComplete="email" /></label></div>{(errors.name || errors.email) && <p className="form-error">Vui lòng nhập họ tên và email hợp lệ.</p>}<label>Chủ đề<input {...register('subject')} maxLength={140} /></label>{errors.subject && <p className="form-error">Vui lòng nhập chủ đề.</p>}<label>Lời nhắn<textarea {...register('message')} rows={6} maxLength={2000} /></label>{errors.message && <p className="form-error">Vui lòng nhập lời nhắn.</p>}<input className="visually-hidden-honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" {...register('website')} /><label className="contact-consent"><input type="checkbox" {...register('consent')} /> <span>Tôi đồng ý để nhóm lưu thông tin này nhằm phản hồi liên hệ.</span></label>{errors.consent && <p className="form-error">Cần đồng ý trước khi gửi.</p>}<button className="button-primary" type="submit" disabled={isSubmitting}>Gửi lời nhắn <ArrowUpRight size={17} /></button><p role="status" aria-live="polite">{notice}</p></form>;
}
