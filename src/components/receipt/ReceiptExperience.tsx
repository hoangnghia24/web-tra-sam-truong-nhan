'use client';

import Link from 'next/link';
import { ArrowUpRight, BriefcaseBusiness, BookOpen, Check, Clapperboard, Copy, Download, Ellipsis, Heart, House, Printer, Share2, Smartphone, UserRound } from 'lucide-react';
import { toPng } from 'html-to-image';
import { recordClick } from '@/components/site/TrackedLink';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { z } from 'zod';
import type { ReceiptInput, ReceiptRecord } from '@/lib/schemas';

const activities = [
  { key: 'work', label: 'Công việc', icon: BriefcaseBusiness },
  { key: 'family', label: 'Gia đình', icon: Heart },
  { key: 'study', label: 'Học tập', icon: BookOpen },
  { key: 'chores', label: 'Việc nhà', icon: House },
  { key: 'social', label: 'Mạng xã hội', icon: Smartphone },
  { key: 'leisure', label: 'Giải trí', icon: Clapperboard },
  { key: 'self', label: 'Chăm sóc bản thân', icon: UserRound },
  { key: 'other', label: 'Hoạt động khác', icon: Ellipsis },
] as const;

const entrySchema = z.object({ hours: z.number().int().min(0).max(24), minutes: z.number().int().min(0).max(59) });
const formSchema = z.object({ entries: z.array(entrySchema).length(8) })
  .refine(({ entries }) => entries.reduce((sum, entry) => sum + entry.hours * 60 + entry.minutes, 0) > 0, 'Hãy nhập ít nhất một khoảng thời gian.')
  .refine(({ entries }) => entries.reduce((sum, entry) => sum + entry.hours * 60 + entry.minutes, 0) <= 1440, 'Tổng thời gian không được vượt quá 24 giờ.');
type FormValues = z.infer<typeof formSchema>;

function formatMinutes(total: number) {
  const hours = Math.floor(total / 60);
  const minutes = total % 60;
  if (hours && minutes) return `${hours} giờ ${minutes} phút`;
  if (hours) return `${hours} giờ`;
  return `${minutes} phút`;
}

function receiptText(receipt: ReceiptRecord) {
  return [
    `HÓA ĐƠN CHỜ ĐỢI · ${receipt.code}`,
    `Ngày: ${new Date(receipt.createdAt).toLocaleDateString('vi-VN')}`,
    ...receipt.activities.filter((item) => item.minutes > 0).map((item) => `${activities.find((activity) => activity.key === item.key)?.label}: ${formatMinutes(item.minutes)}`),
    `Tổng thời gian: ${formatMinutes(receipt.totalMinutes)}`,
    `Dành cho bản thân: ${formatMinutes(receipt.selfMinutes)}`,
    receipt.message,
    'Sâm không đợi dịp. Bạn đợi gì?',
  ].join('\n');
}

export function ReceiptExperience() {
  const [receipt, setReceipt] = useState<ReceiptRecord | null>(null);
  const [status, setStatus] = useState('');
  const paperRef = useRef<HTMLDivElement>(null);
  const resultHeadingRef = useRef<HTMLHeadingElement>(null);
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { entries: activities.map(() => ({ hours: 0, minutes: 0 })) },
  });
  const entries = useWatch({ control, name: 'entries' });
  const totalMinutes = entries?.reduce((sum, entry) => sum + (Number(entry?.hours) || 0) * 60 + (Number(entry?.minutes) || 0), 0) ?? 0;

  useEffect(() => { if (receipt) resultHeadingRef.current?.focus(); }, [receipt]);

  function clearPrevious() { setReceipt(null); setStatus(''); }

  async function submit(values: FormValues) {
    setStatus('Đang tạo hóa đơn của bạn…');
    const input: ReceiptInput = { activities: activities.map((activity, index) => ({ key: activity.key, minutes: values.entries[index].hours * 60 + values.entries[index].minutes })) };
    try {
      const response = await fetch('/api/receipts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(input) });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || 'Không thể tạo hóa đơn.');
      setReceipt(body as ReceiptRecord);
      setStatus('Hóa đơn đã được tạo và lưu trên máy chủ demo.');
    } catch (error) { setStatus(error instanceof Error ? error.message : 'Không thể tạo hóa đơn lúc này.'); }
  }

  async function copyReceipt() {
    if (!receipt) return;
    try { await navigator.clipboard.writeText(receiptText(receipt)); setStatus('Đã sao chép nội dung hóa đơn.'); }
    catch { setStatus('Trình duyệt không cho phép sao chép tự động.'); }
  }

  async function downloadPng() {
    if (!receipt || !paperRef.current) return;
    setStatus('Đang chuẩn bị ảnh PNG…');
    try {
      await document.fonts.ready;
      const dataUrl = await toPng(paperRef.current, { pixelRatio: 2, backgroundColor: '#faf7ee', cacheBust: true });
      const link = document.createElement('a');
      link.download = `hoa-don-cho-doi-${receipt.code}.png`;
      link.href = dataUrl;
      link.click();
      setStatus('Ảnh PNG đã sẵn sàng để tải.');
    } catch { setStatus('Không thể xuất PNG trên trình duyệt này. Bạn có thể dùng nút In hóa đơn.'); }
  }

  async function shareReceipt() {
    if (!receipt) return;
    if (!navigator.share) { setStatus('Thiết bị chưa hỗ trợ chia sẻ trực tiếp. Hãy dùng nút Sao chép.'); return; }
    recordClick('share_clicked');
    try { await navigator.share({ title: 'Hóa đơn chờ đợi', text: receiptText(receipt) }); setStatus('Đã mở bảng chia sẻ.'); }
    catch (error) { if (error instanceof Error && error.name !== 'AbortError') setStatus('Không thể chia sẻ lúc này.'); }
  }

  return (
    <section className="receipt-experience" aria-label="Tạo hóa đơn thời gian">
      <div className="receipt-experience-inner">
        <div className="receipt-form-panel">
          <div className="receipt-lead"><p className="section-index">01 <span></span> Nhìn lại một ngày</p><h2 className="section-title">Mỗi giờ đều có một câu chuyện.</h2><p>Nhập thời gian đã dùng cho từng hoạt động. Có thể để 0 cho mục không phù hợp. Tổng thời gian trong ngày tối đa 24 giờ.</p></div>
          <form onSubmit={handleSubmit(submit)} noValidate>
            <div className="activity-grid">
              {activities.map((activity, index) => {
                const Icon = activity.icon;
                return <div className="activity-row" key={activity.key}>
                  <div className="activity-name"><Icon size={19} strokeWidth={1.6} aria-hidden="true" /><strong>{activity.label}</strong></div>
                  <div className="time-fields"><label><span className="sr-only">Giờ cho {activity.label}</span><input type="number" min="0" max="24" inputMode="numeric" aria-label={`Giờ cho ${activity.label}`} {...register(`entries.${index}.hours`, { valueAsNumber: true, onChange: clearPrevious })} /><span>giờ</span></label><label><span className="sr-only">Phút cho {activity.label}</span><input type="number" min="0" max="59" inputMode="numeric" aria-label={`Phút cho ${activity.label}`} {...register(`entries.${index}.minutes`, { valueAsNumber: true, onChange: clearPrevious })} /><span>phút</span></label></div>
                </div>;
              })}
            </div>
            <div className="receipt-form-bottom"><p>Đã khai báo <strong>{formatMinutes(totalMinutes)}</strong> / 24 giờ</p><div className="form-progress"><span style={{ width: `${Math.min((totalMinutes / 1440) * 100, 100)}%` }} /></div></div>
            {Object.keys(errors).length > 0 && <p className="form-error" role="alert">{errors.root?.message || 'Vui lòng nhập giờ từ 0–24 và phút từ 0–59; tổng tối đa 24 giờ.'}</p>}
            <button className="button-primary receipt-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Đang tạo hóa đơn…' : 'Tạo hóa đơn'} <ArrowUpRight size={17} aria-hidden="true" /></button>
            <p className="receipt-privacy">Không cần nhập tên hay email. Hóa đơn chỉ lưu thời gian và mã ngẫu nhiên.</p>
          </form>
        </div>

        <div className="receipt-output-panel">
          {receipt ? <>
            <div className="receipt-paper-real" ref={paperRef} role="region" aria-label="Hóa đơn của bạn">
              <div className="paper-top"><span>TRÀ SÂM TRƯỜNG NHÂN</span><span>✳</span></div>
              <p className="paper-overline">HÓA ĐƠN CHỜ ĐỢI</p>
              <h2 tabIndex={-1} ref={resultHeadingRef}>Thời gian của bạn,<br /><em>lời nhắc của bạn.</em></h2>
              <div className="paper-meta"><span>Mã {receipt.code}</span><span>{new Date(receipt.createdAt).toLocaleDateString('vi-VN')}</span></div>
              <ul className="paper-items">{receipt.activities.filter((item) => item.minutes > 0).map((item) => <li key={item.key}><span>{activities.find((activity) => activity.key === item.key)?.label}</span><strong>{formatMinutes(item.minutes)}</strong></li>)}</ul>
              <div className="paper-total"><span>Tổng thời gian khai báo</span><strong>{formatMinutes(receipt.totalMinutes)}</strong></div>
              <div className="paper-self"><span>Dành cho chính mình</span><strong>{formatMinutes(receipt.selfMinutes)}</strong></div>
              <p className="paper-message">{receipt.message}</p>
              <p className="paper-footer">Sâm không đợi dịp. Bạn đợi gì?</p>
            </div>
            <div className="receipt-tools"><button type="button" onClick={downloadPng}><Download size={17} /> Tải PNG</button><button type="button" onClick={() => window.print()}><Printer size={17} /> In hóa đơn</button><button type="button" onClick={copyReceipt}><Copy size={17} /> Sao chép</button><button type="button" onClick={shareReceipt}><Share2 size={17} /> Chia sẻ</button></div>
            <Link className="editorial-link receipt-next" href="/7-phut-cho-minh">Dành 7 phút cho mình <ArrowUpRight size={16} aria-hidden="true" /></Link>
          </> : <div className="receipt-empty"><div className="empty-mark"><Check size={30} strokeWidth={1.3} /></div><p className="section-index">02 <span></span> Hóa đơn của bạn</p><h2 className="section-title">Kết quả sẽ hiện ở đây, <em>chỉ sau khi bạn nhập thời gian.</em></h2><p>Không có phán xét hay kết quả mặc định. Mỗi ngày và mỗi người đều khác nhau.</p></div>}
          <p className="receipt-status" role="status" aria-live="polite">{status}</p>
        </div>
      </div>
    </section>
  );
}
