'use client';

import { useEffect } from 'react';

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error('Page render failed:', error); }, [error]);
  return <main id="main" className="state-page"><div><p className="eyebrow">Một khoảng dừng ngoài dự kiến</p><h1>Trang chưa thể hiển thị lúc này.</h1><p>Vui lòng thử tải lại. Nếu sự cố tiếp diễn, nhóm thực hiện có thể kiểm tra dữ liệu JSON và nhật ký máy chủ.</p><button type="button" className="button-primary" onClick={reset}>Thử lại</button></div></main>;
}
