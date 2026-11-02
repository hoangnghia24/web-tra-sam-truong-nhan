'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { ContactRecord, UgcRecord } from '@/lib/schemas';

export function AdminLogoutButton() {
  const router = useRouter();
  return <button type="button" className="admin-logout" onClick={async () => { await fetch('/api/admin/logout', { method: 'POST' }); router.push('/admin/login'); router.refresh(); }}>Đăng xuất</button>;
}

export function AdminLoginForm({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(event: React.FormEvent) {
    event.preventDefault(); setBusy(true); setNotice('Đang kiểm tra…');
    try {
      const response = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || 'Không đăng nhập được.');
      router.push('/admin/dashboard'); router.refresh();
    } catch (error) { setNotice(error instanceof Error ? error.message : 'Không đăng nhập được.'); }
    finally { setBusy(false); }
  }
  return <form className="admin-login-form" onSubmit={submit}><label>Mật khẩu quản trị<input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required disabled={!configured} /></label><button type="submit" disabled={!configured || busy}>Đăng nhập</button><p role="status">{configured ? notice : 'Quản trị chưa được cấu hình. Xem README để đặt ADMIN_PASSWORD_HASH và SESSION_SECRET.'}</p></form>;
}

export function AdminTrendChart({ data }: { data: { date: string; count: number }[] }) {
  if (data.length === 0) return <p className="admin-empty">Chưa có lượt tương tác nào được ghi nhận từ website.</p>;
  return <div className="admin-trend" role="img" aria-label="Biểu đồ số lượt tương tác thực tế theo ngày"><ResponsiveContainer width="100%" height={280}><BarChart data={data}><CartesianGrid stroke="#d5dfd0" vertical={false} /><XAxis dataKey="date" tick={{ fill: '#557a42', fontSize: 11 }} /><YAxis allowDecimals={false} tick={{ fill: '#557a42', fontSize: 11 }} /><Tooltip /><Bar dataKey="count" name="Tương tác" fill="#b98532" /></BarChart></ResponsiveContainer></div>;
}

export function AdminSubmissionList({ initial }: { initial: UgcRecord[] }) {
  const [items, setItems] = useState(initial);
  const [notice, setNotice] = useState('');
  async function update(id: string, status: UgcRecord['status']) {
    try {
      const response = await fetch(`/api/admin/submissions/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || 'Không cập nhật được.');
      setItems((current) => current.map((item) => item.id === id ? body.item : item));
      setNotice('Đã cập nhật trạng thái bài dự thi.');
    } catch (error) { setNotice(error instanceof Error ? error.message : 'Không cập nhật được.'); }
  }
  if (items.length === 0) return <p className="admin-empty">Chưa có bài dự thi nào được gửi.</p>;
  return <><p role="status" className="admin-notice">{notice}</p><div className="admin-record-list">{items.map((item) => <article key={item.id}><div className="admin-record-head"><h2>{item.displayName}</h2><span className={`admin-status-${item.status}`}>{item.status}</span></div><p>{item.story}</p><a href={item.videoUrl} target="_blank" rel="noopener noreferrer">Xem video đã gửi</a><small>{new Date(item.createdAt).toLocaleString('vi-VN')}</small><div className="admin-record-actions"><button type="button" onClick={() => update(item.id, 'approved')}>Duyệt</button><button type="button" onClick={() => update(item.id, 'rejected')}>Từ chối</button><button type="button" onClick={() => update(item.id, 'pending')}>Chờ duyệt</button></div></article>)}</div></>;
}

export function DownloadJsonButton({ data, name }: { data: ContactRecord[] | UgcRecord[]; name: string }) {
  return <button type="button" className="admin-export" onClick={() => { const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = name; link.click(); URL.revokeObjectURL(url); }}>Xuất JSON</button>;
}

export function AdminJsonEditor({ title, endpoint, data }: { title: string; endpoint: string; data: unknown }) {
  const [value, setValue] = useState(JSON.stringify(data, null, 2));
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);
  async function save() {
    let parsed: unknown;
    try { parsed = JSON.parse(value); }
    catch { setNotice('JSON chưa hợp lệ. Vui lòng kiểm tra dấu ngoặc và dấu phẩy.'); return; }
    setBusy(true); setNotice('Đang lưu…');
    try {
      const response = await fetch(endpoint, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(parsed) });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || 'Không lưu được.');
      setNotice('Đã lưu. Nội dung công khai sẽ dùng dữ liệu mới ở lần tải trang tiếp theo.');
    } catch (error) { setNotice(error instanceof Error ? error.message : 'Không lưu được.'); }
    finally { setBusy(false); }
  }
  return <section className="admin-json-editor"><h2>{title}</h2><p>Chỉnh JSON theo cấu trúc hiện tại. Dữ liệu được kiểm tra trước khi ghi và có bản sao lưu `.bak`.</p><textarea value={value} onChange={(event) => setValue(event.target.value)} spellCheck={false} rows={17} aria-label={`Nội dung JSON ${title}`} /><div><button type="button" onClick={save} disabled={busy}>Lưu {title.toLowerCase()}</button><p role="status">{notice}</p></div></section>;
}
