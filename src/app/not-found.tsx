import Link from 'next/link';

export default function NotFound() {
  return <main id="main" className="state-page"><div><p className="eyebrow">404 · Lạc một nhịp</p><h1>Trang bạn tìm không có ở đây.</h1><p>Hãy trở lại điểm bắt đầu của hành trình.</p><Link className="button-primary" href="/">Về trang chủ</Link></div></main>;
}
