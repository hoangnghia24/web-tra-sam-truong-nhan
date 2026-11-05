'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock3, Download, Leaf, Share2 } from 'lucide-react';
import { toPng } from 'html-to-image';
import { useEffect, useRef, useState } from 'react';
import { recordClick } from '@/components/site/TrackedLink';

type Stage = 'entry' | 'quiz' | 'receipt' | 'offer';
type LastBreak = 'today' | 'yesterday' | 'earlier' | 'unsure';
type Answers = { workHours: number | null; delays: number | null; lastBreak: LastBreak | null; selfMinutes: number | null };
type Props = {
  purchaseLinks: { tiktokShop: string | null; shopee: string | null };
  voucher15: { active: boolean; code: string | null };
};

const initialAnswers: Answers = { workHours: null, delays: null, lastBreak: null, selfMinutes: null };
const stages: { key: Stage; label: string }[] = [
  { key: 'entry', label: 'Trang chủ' },
  { key: 'quiz', label: 'Quiz 30s' },
  { key: 'receipt', label: 'Trả hóa đơn' },
  { key: 'offer', label: 'Chốt đơn' },
];
const lastBreakLabels: Record<LastBreak, string> = {
  today: 'Hôm nay', yesterday: 'Hôm qua', earlier: 'Lâu hơn', unsure: 'Không nhớ',
};

function Story({ name, answers, debt, exportRef }: { name: string; answers: Answers; debt: number; exportRef?: React.Ref<HTMLDivElement> }) {
  return <div className="quiz-story" ref={exportRef}>
    <div className="quiz-story-top"><span>TRÀ SÂM TRƯỜNG NHÂN</span><Leaf size={26} aria-hidden="true" /></div>
    <div className="quiz-story-paper">
      <p className="quiz-story-kicker">HÓA ĐƠN CHỜ ĐỢI</p>
      <h3>Hôm nay, bạn đã dành bao nhiêu thời gian cho mình?</h3>
      <p className="quiz-story-name">Người nhận: <strong>{name}</strong></p>
      <div className="quiz-story-row"><span>Họp / chạy deadline</span><strong>{answers.workHours} giờ</strong></div>
      <div className="quiz-story-row"><span>“Để mai tính”</span><strong>{answers.delays} lần</strong></div>
      <div className="quiz-story-row"><span>Lần nghỉ 7 phút gần nhất</span><strong>{answers.lastBreak ? lastBreakLabels[answers.lastBreak] : ''}</strong></div>
      <div className="quiz-story-total"><span>Thời gian dành cho bản thân hôm nay</span><strong>{answers.selfMinutes} PHÚT</strong></div>
      <div className="quiz-story-debt"><span>“Nợ” hẹn lại, quy đổi theo 7 phút/lần</span><strong>{debt} PHÚT</strong></div>
      <p className="quiz-story-message">Đừng nợ bản thân nữa. Trả lại 7 phút cùng Trà Sâm Trường Nhân.</p>
      <p className="quiz-story-note">Phút “nợ” là cách gợi nhắc: 7 phút × số lần hẹn lại, không phải thời gian thực đã đo.</p>
      <div className="quiz-story-rest"><span>07:00</span><small>MỘT KHOẢNG DỪNG CHO MÌNH</small></div>
    </div>
    <p className="quiz-story-footer">SÂM KHÔNG ĐỢI DỊP. BẠN ĐỢI GÌ?</p>
  </div>;
}

export function ReceiptJourney({ purchaseLinks, voucher15 }: Props) {
  const [stage, setStage] = useState<Stage>('entry');
  const [name, setName] = useState('');
  const [question, setQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [remaining, setRemaining] = useState(420);
  const storyRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const debt = (answers.delays ?? 0) * 7;

  useEffect(() => {
    if (startedAt === null) return;
    const update = () => setRemaining(Math.max(0, 420 - Math.floor((Date.now() - startedAt) / 1000)));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [startedAt]);
  useEffect(() => { if (stage !== 'entry') headingRef.current?.focus(); }, [stage, question]);

  function begin() {
    if (!name.trim()) { setError('Hãy nhập tên bạn muốn hiển thị trên hóa đơn.'); return; }
    setError('');
    setStartedAt(Date.now());
    setRemaining(420);
    setStage('quiz');
  }

  function validQuestion() {
    if (question === 0) return answers.workHours !== null && Number.isInteger(answers.workHours) && answers.workHours >= 0 && answers.workHours <= 24;
    if (question === 1) return answers.delays !== null && Number.isInteger(answers.delays) && answers.delays >= 0 && answers.delays <= 50;
    return answers.lastBreak !== null && answers.selfMinutes !== null && Number.isInteger(answers.selfMinutes) && answers.selfMinutes >= 0 && answers.selfMinutes <= 1440;
  }

  function nextQuestion() {
    if (!validQuestion()) { setError('Hãy hoàn thành câu trả lời trước khi tiếp tục.'); return; }
    setError('');
    if (question < 2) setQuestion(question + 1);
    else setStage('receipt');
  }

  function previousQuestion() {
    setError('');
    if (question > 0) setQuestion(question - 1);
    else setStage('entry');
  }

  function onTouchEnd(event: React.TouchEvent<HTMLElement>) {
    if (!touchStart.current) return;
    const dx = event.changedTouches[0].clientX - touchStart.current.x;
    const dy = event.changedTouches[0].clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) < 70 || Math.abs(dy) > 45) return;
    if (dx < 0) nextQuestion(); else previousQuestion();
  }

  async function storyPng() {
    if (!storyRef.current) throw new Error('Ảnh Story chưa sẵn sàng.');
    await document.fonts.ready;
    return toPng(storyRef.current, { pixelRatio: 2, backgroundColor: '#173e29', cacheBust: true });
  }

  function savePng(dataUrl: string) {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'hoa-don-cho-doi-story-1080x1920.png';
    link.click();
  }

  async function downloadStory() {
    setStatus('Đang tạo ảnh Story…');
    try { savePng(await storyPng()); setStatus('Đã tạo ảnh Story 1080 × 1920 để tải xuống.'); }
    catch { setStatus('Không thể tạo ảnh trên trình duyệt này. Bạn có thể chụp màn hình hóa đơn.'); }
  }

  async function shareStory() {
    setStatus('Đang chuẩn bị ảnh để chia sẻ…');
    try {
      const dataUrl = await storyPng();
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], 'hoa-don-cho-doi-story.png', { type: 'image/png' });
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: 'Hóa đơn chờ đợi' });
        recordClick('share_clicked');
        setStatus('Đã mở bảng chia sẻ. Bạn có thể chọn TikTok nếu thiết bị hỗ trợ.');
      } else {
        savePng(dataUrl);
        setStatus('Đã tải ảnh Story. Hãy mở TikTok và đăng ảnh từ thư viện của bạn.');
      }
    } catch (cause) {
      if (cause instanceof Error && cause.name === 'AbortError') { setStatus('Đã đóng bảng chia sẻ.'); return; }
      setStatus('Không thể chia sẻ ảnh trên trình duyệt này. Hãy thử nút Tải ảnh Story.');
    }
  }

  return <section className="receipt-journey" aria-label="Hóa đơn chờ đợi qua bốn bước">
    <div className="receipt-journey-inner">
      <div className="receipt-journey-head">
        <p className="section-index"><span /> TRẢI NGHIỆM TƯƠNG TÁC</p>
        <h2>Hôm nay bạn đã khất nợ bản thân bao nhiêu lần?</h2>
        <p>Ba câu hỏi ngắn để nhìn lại thói quen hẹn bản thân vào ngày mai. Câu trả lời chỉ dùng trên thiết bị của bạn trong lượt chơi này.</p>
      </div>
      <ol className="receipt-journey-steps">{stages.map((item, index) => <li key={item.key} className={stage === item.key ? 'is-current' : ''} aria-current={stage === item.key ? 'step' : undefined}><span>0{index + 1}</span>{item.label}</li>)}</ol>
      <div className="receipt-journey-clock" aria-label={`Đồng hồ gợi nhắc: ${Math.floor(remaining / 60)} phút ${String(remaining % 60).padStart(2, '0')} giây`}><Clock3 size={19} aria-hidden="true" /><span>{Math.floor(remaining / 60)}:{String(remaining % 60).padStart(2, '0')}</span><small>Khoảng dừng 7 phút, không giới hạn thời gian làm quiz</small></div>

      {stage === 'entry' && <div className="receipt-journey-entry">
        <div className="receipt-journey-entry-copy">
          <p>01 / TRANG CHỦ</p>
          <h3 ref={headingRef}>Một khoảng dừng bắt đầu từ câu hỏi nhỏ.</h3>
          <label htmlFor="quiz-name">Tên hiển thị trên hóa đơn</label>
          <input id="quiz-name" value={name} onChange={(event) => { setName(event.target.value); setError(''); }} maxLength={40} autoComplete="given-name" placeholder="Tên của bạn" />
          <button type="button" className="button-primary" onClick={begin}>BẤM VÀO ĐỂ TÍNH TIỀN THỜI GIAN <ArrowRight size={18} aria-hidden="true" /></button>
          {error && <p className="form-error" role="alert">{error}</p>}
        </div>
      </div>}

      {stage === 'quiz' && <div className="receipt-quiz" onTouchStart={(event) => { touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }} onTouchEnd={onTouchEnd}>
        <div className="receipt-quiz-card" key={question}>
          <span className="receipt-quiz-count">02 / TRẮC NGHIỆM 30S · CÂU {question + 1}/3</span>
          {question === 0 && <><h3 ref={headingRef} tabIndex={-1}>Hôm nay bạn họp/chạy deadline mấy tiếng?</h3><label htmlFor="quiz-work">Số giờ bạn tự ước lượng</label><input id="quiz-work" type="number" min="0" max="24" step="1" inputMode="numeric" value={answers.workHours ?? ''} onChange={(event) => { setAnswers({ ...answers, workHours: event.target.value === '' ? null : Number(event.target.value) }); setError(''); }} placeholder="0–24 giờ" /></>}
          {question === 1 && <><h3 ref={headingRef} tabIndex={-1}>Tuần này bạn hứa “để mai tính” mấy lần?</h3><label htmlFor="quiz-delays">Số lần bạn nhớ được</label><input id="quiz-delays" type="number" min="0" max="50" step="1" inputMode="numeric" value={answers.delays ?? ''} onChange={(event) => { setAnswers({ ...answers, delays: event.target.value === '' ? null : Number(event.target.value) }); setError(''); }} placeholder="0–50 lần" /></>}
          {question === 2 && <><h3 ref={headingRef} tabIndex={-1}>Lần cuối bạn nghỉ 7 phút không nhìn màn hình là khi nào?</h3><div className="receipt-quiz-options">{(Object.keys(lastBreakLabels) as LastBreak[]).map((value) => <button type="button" key={value} className={answers.lastBreak === value ? 'is-selected' : ''} aria-pressed={answers.lastBreak === value} onClick={() => { setAnswers({ ...answers, lastBreak: value }); setError(''); }}>{lastBreakLabels[value]}</button>)}</div><label htmlFor="quiz-self">Hôm nay bạn thực sự đã dành bao nhiêu phút cho bản thân?</label><input id="quiz-self" type="number" min="0" max="1440" step="1" inputMode="numeric" value={answers.selfMinutes ?? ''} onChange={(event) => { setAnswers({ ...answers, selfMinutes: event.target.value === '' ? null : Number(event.target.value) }); setError(''); }} placeholder="Số phút thực tế" /></>}
          {error && <p className="form-error" role="alert">{error}</p>}
          <div className="receipt-quiz-actions"><button type="button" onClick={previousQuestion}><ArrowLeft size={18} aria-hidden="true" /> Quay lại</button><button type="button" className="button-primary" onClick={nextQuestion}>{question === 2 ? 'XEM HÓA ĐƠN' : 'TIẾP TỤC'} <ArrowRight size={18} aria-hidden="true" /></button></div>
          <p className="receipt-quiz-swipe">Có thể vuốt trái hoặc phải để chuyển câu hỏi.</p>
        </div>
      </div>}

      {stage === 'receipt' && <div className="receipt-quiz-result">
        <div className="receipt-quiz-result-copy">
          <span className="receipt-quiz-count">03 / TRẢ HÓA ĐƠN CÁ NHÂN</span>
          <h3 ref={headingRef} tabIndex={-1}>Hóa đơn của {name.trim()}</h3>
          <p>Thời gian dành cho bản thân hôm nay: <strong>{answers.selfMinutes} PHÚT.</strong></p>
          <p>“Tổng nợ” gợi nhắc: <strong>{debt} phút</strong> = {answers.delays} lần “để mai tính” × 7 phút.</p>
          <p className="receipt-quiz-caveat">Con số “nợ” là hình ảnh của chiến dịch, không phải số phút chăm sóc đã mất được đo thực tế.</p>
          <div className="receipt-quiz-actions"><button type="button" onClick={downloadStory}><Download size={18} aria-hidden="true" /> TẢI ẢNH STORY</button><button type="button" onClick={shareStory}><Share2 size={18} aria-hidden="true" /> CHIA SẺ TIKTOK</button></div>
          <button type="button" className="button-primary receipt-quiz-continue" onClick={() => setStage('offer')}>XEM THÀNH PHẦN & ĐIỂM MUA <ArrowRight size={18} aria-hidden="true" /></button>
          <button type="button" className="receipt-quiz-restart" onClick={() => { setQuestion(0); setAnswers(initialAnswers); setStage('quiz'); }}>Làm lại quiz</button>
          <p role="status" aria-live="polite">{status}</p>
        </div>
        <div className="receipt-story-preview"><Story name={name.trim()} answers={answers} debt={debt} /></div>
        <div className="receipt-story-export" aria-hidden="true"><Story name={name.trim()} answers={answers} debt={debt} exportRef={storyRef} /></div>
      </div>}

      {stage === 'offer' && <div className="receipt-quiz-offer">
        <span className="receipt-quiz-count">04 / ĐIỂM CHẠM SẢN PHẨM</span>
        <h3 ref={headingRef} tabIndex={-1}>Đừng nợ bản thân nữa. Trả lại 7 phút cùng Trà Sâm Trường Nhân.</h3>
        <div className="receipt-quiz-ingredient"><span>HÓA ĐƠN THÀNH PHẦN</span><strong>3% Lá Sâm Ngọc Linh</strong><p>Trong công thức gồm 7 thành phần thảo mộc. Tỷ lệ thành phần không tự chứng minh hiệu quả sức khỏe.</p><Link href="/san-pham" onClick={() => recordClick('product_clicked')}>Xem đầy đủ thành phần <ArrowRight size={16} aria-hidden="true" /></Link></div>
        <div className="receipt-quiz-voucher"><strong>Voucher 15%</strong><p>{voucher15.active && voucher15.code ? `Mã ưu đãi: ${voucher15.code}` : 'Ý tưởng ưu đãi 15% trong kế hoạch, hiện chưa phát hành mã.'}</p></div>
        <div className="receipt-quiz-shops">
          {purchaseLinks.tiktokShop ? <a href={purchaseLinks.tiktokShop} target="_blank" rel="noopener noreferrer" onClick={() => recordClick('shop_clicked')}>MUA DÙNG THỬ TRÊN TIKTOK SHOP <ArrowRight size={17} aria-hidden="true" /></a> : <button type="button" disabled>MUA DÙNG THỬ TRÊN TIKTOK SHOP</button>}
          {purchaseLinks.shopee ? <a href={purchaseLinks.shopee} target="_blank" rel="noopener noreferrer" onClick={() => recordClick('shop_clicked')}>MUA TRÊN SHOPEE <ArrowRight size={17} aria-hidden="true" /></a> : <button type="button" disabled>SHOPEE</button>}
        </div>
        {(!purchaseLinks.tiktokShop || !purchaseLinks.shopee) && <p className="receipt-quiz-shop-note">Liên kết mua chỉ mở khi gian hàng chính thức được xác nhận và bổ sung vào website.</p>}
        <button type="button" className="receipt-quiz-restart" onClick={() => setStage('receipt')}><ArrowLeft size={16} aria-hidden="true" /> Quay lại hóa đơn</button>
      </div>}
    </div>
  </section>;
}
