'use client';

import { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { Copy, Download, Share2 } from 'lucide-react';

const audiences = ['Bản thân', 'Cha mẹ', 'Bạn bè', 'Đồng nghiệp', 'Người thân'];
const themes = [{ id: 'forest', label: 'Xanh rừng' }, { id: 'cream', label: 'Kem ấm' }, { id: 'gold', label: 'Vàng đồng' }];
const startingMessage = 'Hôm nay, hãy dành một khoảng dừng nhỏ cho chính mình.';

export function ReminderCreator() {
  const [audience, setAudience] = useState(audiences[0]);
  const [theme, setTheme] = useState(themes[0].id);
  const [message, setMessage] = useState(startingMessage);
  const [status, setStatus] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);
  const cardText = `Gửi ${audience.toLowerCase()},\n\n${message}\n\nSâm không đợi dịp. Bạn đợi gì?`;

  async function download() {
    if (!cardRef.current) return;
    try {
      setStatus('Đang tạo ảnh…');
      await document.fonts.ready;
      const url = await toPng(cardRef.current, { pixelRatio: 2, cacheBust: true });
      const link = document.createElement('a'); link.href = url; link.download = 'loi-nhac-truong-nhan.png'; link.click();
      void fetch('/api/events', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'reminder_downloaded' }) });
      setStatus('Ảnh thiệp đã sẵn sàng để tải.');
    } catch { setStatus('Không thể tạo PNG trên trình duyệt này. Hãy thử sao chép nội dung.'); }
  }
  async function copy() {
    try { await navigator.clipboard.writeText(cardText); setStatus('Đã sao chép lời nhắc.'); }
    catch { setStatus('Trình duyệt không cho phép sao chép tự động.'); }
  }
  async function share() {
    if (!navigator.share) { setStatus('Thiết bị chưa hỗ trợ chia sẻ trực tiếp. Hãy dùng nút Sao chép.'); return; }
    try { await navigator.share({ title: 'Một lời nhắc dịu dàng', text: cardText }); setStatus('Đã mở bảng chia sẻ.'); }
    catch (error) { if (error instanceof Error && error.name !== 'AbortError') setStatus('Không thể chia sẻ lúc này.'); }
  }

  return <section className="reminder-creator" aria-label="Tạo thiệp lời nhắc"><div className="product-container reminder-layout"><div className="reminder-editor"><p className="section-index"><span /> 01 · Viết lời nhắc</p><h2>Để một lời quan tâm <em>thành hình.</em></h2><p>Chọn người nhận và viết lời nhắn theo cách của bạn. Nội dung thiệp chỉ nằm trên thiết bị này; website không tự gửi tin nhắn.</p><fieldset><legend>Gửi cho ai?</legend><div className="reminder-options">{audiences.map((item) => <button key={item} type="button" className={audience === item ? 'is-active' : ''} aria-pressed={audience === item} onClick={() => setAudience(item)}>{item}</button>)}</div></fieldset><label className="reminder-message-label">Lời nhắn của bạn<textarea value={message} onChange={(event) => setMessage(event.target.value.slice(0, 280))} rows={5} maxLength={280} /></label><span className="reminder-character-count">{message.length} / 280 ký tự</span><fieldset><legend>Mẫu thiệp</legend><div className="reminder-themes">{themes.map((item) => <button key={item.id} type="button" className={`theme-${item.id} ${theme === item.id ? 'is-active' : ''}`} aria-pressed={theme === item.id} onClick={() => setTheme(item.id)}><span aria-hidden="true" />{item.label}</button>)}</div></fieldset></div><div className="reminder-preview"><p className="section-index"><span /> 02 · Xem trước</p><div ref={cardRef} className={`reminder-card theme-${theme}`}><p className="reminder-card-brand">TRÀ SÂM TRƯỜNG NHÂN</p><span className="reminder-card-mark" aria-hidden="true">✳</span><p className="reminder-card-to">Gửi {audience.toLowerCase()},</p><h3>{message.trim() || 'Lời nhắn của bạn sẽ hiện ở đây.'}</h3><p className="reminder-card-sign">Sâm không đợi dịp. Bạn đợi gì?</p></div><div className="reminder-tools"><button type="button" onClick={download}><Download size={17} /> Tải PNG</button><button type="button" onClick={copy}><Copy size={17} /> Sao chép</button><button type="button" onClick={share}><Share2 size={17} /> Chia sẻ</button></div><p role="status" aria-live="polite" className="reminder-status">{status}</p><p className="reminder-local-note">Không lưu nội dung lời nhắn lên máy chủ.</p></div></div></section>;
}
