'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Pause, Play, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { formatRemaining, remainingAt, TIMER_SECONDS } from '@/lib/timer';

type TimerState = 'idle' | 'running' | 'paused' | 'complete';
const messages = [
  'Hít vào thật chậm. Để vai được thả lỏng.',
  'Nếu có một tách trà bên cạnh, hãy cảm nhận hơi ấm trong tay.',
  'Bảy phút này không cần một danh sách việc phải làm.',
  'Bạn đang có mặt cho chính mình. Như thế đã đủ.',
];

export function SevenMinuteTimer() {
  const [state, setState] = useState<TimerState>('idle');
  const [remaining, setRemaining] = useState(TIMER_SECONDS);
  const [eventStatus, setEventStatus] = useState('');
  const deadlineRef = useRef<number | null>(null);
  const recordedRef = useRef(false);

  const complete = useCallback(async () => {
    if (recordedRef.current) return;
    recordedRef.current = true;
    deadlineRef.current = null;
    setRemaining(0);
    setState('complete');
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'timer_completed' }),
      });
      if (!response.ok) throw new Error('Không lưu được lượt hoàn thành.');
      setEventStatus('Khoảnh khắc này đã được ghi nhận.');
    } catch {
      setEventStatus('Khoảnh khắc đã hoàn thành trên thiết bị này; lượt hoàn thành chưa được lưu.');
    }
  }, []);

  useEffect(() => {
    if (state !== 'running') return;
    const tick = () => {
      if (deadlineRef.current === null) return;
      const next = remainingAt(deadlineRef.current, Date.now());
      setRemaining(next);
      if (next === 0) void complete();
    };
    const interval = window.setInterval(tick, 250);
    return () => window.clearInterval(interval);
  }, [state, complete]);

  function start() {
    recordedRef.current = false;
    setEventStatus('');
    deadlineRef.current = Date.now() + TIMER_SECONDS * 1000;
    setRemaining(TIMER_SECONDS);
    setState('running');
  }

  function pause() {
    if (deadlineRef.current === null) return;
    setRemaining(remainingAt(deadlineRef.current, Date.now()));
    deadlineRef.current = null;
    setState('paused');
  }

  function resume() {
    deadlineRef.current = Date.now() + remaining * 1000;
    setState('running');
  }

  function reset() {
    deadlineRef.current = null;
    recordedRef.current = false;
    setRemaining(TIMER_SECONDS);
    setEventStatus('');
    setState('idle');
  }

  const progress = 1 - remaining / TIMER_SECONDS;
  const ringCircumference = 2 * Math.PI * 116;
  const messageIndex = Math.min(messages.length - 1, Math.floor(progress * messages.length));

  return (
    <section className="timer-experience" aria-labelledby="timer-title">
      <div className="timer-layout">
        <div className="timer-intro">
          <p className="section-index"><span /> 01 · Lắng lại</p>
          <h2 id="timer-title">Để thời gian <em>chậm đi một chút.</em></h2>
          <p>Đặt điện thoại xuống, uống một ngụm trà hoặc chỉ đơn giản là thở. Đồng hồ này là một lời mời, không phải một bài kiểm tra.</p>
          <div className="timer-ritual" aria-label="Gợi ý cho khoảng dừng">
            <span>01</span><p>Chọn một chỗ ngồi dễ chịu.</p>
            <span>02</span><p>Thả lỏng vai và hít thở tự nhiên.</p>
            <span>03</span><p>Ở lại với khoảnh khắc này.</p>
          </div>
        </div>

        <div className="timer-card">
          <p className="timer-card-label">MỘT KHOẢNG DỪNG DÀNH CHO BẠN</p>
          <div className="timer-dial" role="timer" aria-label={`Thời gian còn lại ${formatRemaining(remaining)}`}>
            <svg className="timer-ring" viewBox="0 0 260 260" aria-hidden="true">
              <circle className="timer-track" cx="130" cy="130" r="116" />
              <circle className="timer-progress-ring" cx="130" cy="130" r="116" strokeDasharray={ringCircumference} strokeDashoffset={ringCircumference * (1 - progress)} />
            </svg>
            <div className="timer-dial-center"><span className="timer-flower" aria-hidden="true">✳</span><strong>{formatRemaining(remaining)}</strong><small>{state === 'complete' ? 'Bạn đã làm được' : 'phút dành cho mình'}</small></div>
          </div>
          <div className="timer-linear-track" role="progressbar" aria-valuemin={0} aria-valuemax={420} aria-valuenow={420 - remaining} aria-label="Tiến độ 7 phút"><span style={{ width: `${progress * 100}%` }} /></div>
          <p className="timer-guidance" aria-live="polite">{state === 'complete' ? 'Bạn đã dành 7 phút cho chính mình. Đó là một khởi đầu đáng trân trọng.' : messages[messageIndex]}</p>
          <div className="timer-controls">
            {state === 'idle' && <button type="button" className="timer-main-button" onClick={start}><Play size={18} fill="currentColor" /> Bắt đầu 7 phút</button>}
            {state === 'running' && <button type="button" className="timer-main-button" onClick={pause}><Pause size={18} fill="currentColor" /> Tạm dừng</button>}
            {state === 'paused' && <button type="button" className="timer-main-button" onClick={resume}><Play size={18} fill="currentColor" /> Tiếp tục</button>}
            {state !== 'idle' && <button type="button" className="timer-reset-button" onClick={reset}><RotateCcw size={16} /> Đặt lại</button>}
          </div>
          {state === 'complete' && <motion.div className="timer-finish" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <p>{eventStatus}</p>
            <div><Link href="/san-pham">Khám phá trà sâm <ArrowUpRight size={15} /></Link><Link href="/gui-loi-nhac">Gửi lời nhắc <ArrowUpRight size={15} /></Link></div>
          </motion.div>}
          <p className="timer-privacy">Bạn có thể tham gia mà không cần mua sản phẩm hay cung cấp thông tin cá nhân.</p>
        </div>
      </div>
    </section>
  );
}
