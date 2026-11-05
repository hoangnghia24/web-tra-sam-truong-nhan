'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, RotateCcw } from 'lucide-react';

type JourneyIngredient = {
  id: string;
  name: string;
  image?: string;
  percent: number | null;
};

type Stage = 'package' | 'ingredients' | 'brew' | 'cup';

const stages: { id: Stage; label: string; title: string }[] = [
  { id: 'package', label: 'Khởi đầu', title: 'Hộp trà và những túi trà' },
  { id: 'ingredients', label: 'Công thức', title: 'Bảy thành phần hội tụ' },
  { id: 'brew', label: 'Pha trà', title: 'Một túi trà, một khoảng dừng' },
  { id: 'cup', label: 'Thành phẩm', title: 'Một tách trà ấm' },
];

export function ProductJourney({ ingredients, packCount, waterMl, brewMinutesMin, brewMinutesMax }: {
  ingredients: JourneyIngredient[];
  packCount: number;
  waterMl: number;
  brewMinutesMin: number;
  brewMinutesMax: number;
}) {
  const [stage, setStage] = useState<Stage>('package');
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (stage !== 'ingredients' && stage !== 'brew') return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reducedMotion ? 900 : stage === 'ingredients' ? 3900 : 4200;
    const timeout = window.setTimeout(() => setStage(stage === 'ingredients' ? 'brew' : 'cup'), duration);
    return () => window.clearTimeout(timeout);
  }, [stage, run]);

  const currentIndex = stages.findIndex((item) => item.id === stage);
  const current = stages[currentIndex];

  function play() {
    setRun((value) => value + 1);
    setStage('ingredients');
  }

  return (
    <div className="product-journey">
      <div className="journey-stage-head" aria-live="polite" aria-atomic="true">
        <span>{String(currentIndex + 1).padStart(2, '0')} / 04 · {current.label}</span>
        <h3>{current.title}</h3>
        <p>{stage === 'package'
          ? `Mở đầu với hộp trà ${packCount} túi lọc. Chạm để khám phá hành trình từ nguyên liệu đến tách trà.`
          : stage === 'ingredients'
            ? 'Bảy nguyên liệu trong công thức cùng hội tụ vào túi trà.'
            : stage === 'brew'
              ? `Đặt túi trà vào tách, rót khoảng ${waterMl} ml nước nóng và chờ ${brewMinutesMin}–${brewMinutesMax} phút.`
              : 'Tách trà màu hổ phách là điểm kết của hành trình.'}</p>
      </div>

      <div className="journey-scene" data-stage={stage} key={run}>
        <div className="journey-scene-package" aria-hidden={stage !== 'package'}>
          <Image src="/images/product-journey/hop-tra-va-tui-tra.jpg" alt="" fill sizes="(max-width: 800px) 100vw, 1100px" priority className="journey-photo" />
          <div className="journey-photo-caption"><span>01 · Khởi đầu</span><strong>Hộp trà và các túi trà</strong></div>
        </div>

        <div className="journey-scene-ingredients" aria-hidden={stage !== 'ingredients'}>
          <div className="journey-ingredient-glow" />
          {ingredients.map((item, index) => (
            <div className={`journey-orb journey-orb-${index + 1}`} key={item.id}>
              <div className="journey-orb-image">
                {item.image && <Image src={item.image} alt="" fill sizes="110px" />}
              </div>
              <span>{item.name}</span>
            </div>
          ))}
          <div className="journey-bag">
            <span className="journey-bag-string" />
            <span className="journey-bag-tag">TRƯỜNG NHÂN</span>
            <div className="journey-bag-paper"><span className="journey-bag-fill" /></div>
          </div>
          <p className="journey-scene-label">7 thành phần · 1 túi trà</p>
        </div>

        <div className="journey-scene-brew" aria-hidden={stage !== 'brew'}>
          <div className="journey-steam journey-steam-one" />
          <div className="journey-steam journey-steam-two" />
          <div className="journey-steam journey-steam-three" />
          <div className="journey-pour" />
          <div className="journey-cup">
            <div className="journey-tea" />
            <div className="journey-dipped-bag" />
            <div className="journey-cup-rim" />
          </div>
          <div className="journey-brew-steps"><span>Đặt túi trà</span><span>Rót nước nóng</span><span>Chờ trà ngấm</span></div>
        </div>

        <div className="journey-scene-cup" aria-hidden={stage !== 'cup'}>
          <Image src="/images/product-journey/tach-tra-hoan-thanh.jpg" alt="" fill sizes="(max-width: 800px) 100vw, 1100px" className="journey-photo" />
          <div className="journey-photo-caption"><span>04 · Thành phẩm</span><strong>Một tách trà ấm cho mình</strong></div>
        </div>
      </div>

      <div className="journey-controls">
        <ol className="journey-progress" aria-label="Các chặng của hành trình">
          {stages.map((item, index) => <li key={item.id} className={index <= currentIndex ? 'is-active' : ''} aria-current={index === currentIndex ? 'step' : undefined}><span>{String(index + 1).padStart(2, '0')}</span>{item.label}</li>)}
        </ol>
        {(stage === 'package' || stage === 'cup') && <button className="journey-action" type="button" onClick={play}>{stage === 'package' ? <>Bắt đầu khám phá <ArrowRight size={18} /></> : <>Xem lại hành trình <RotateCcw size={17} /></>}</button>}
        {(stage === 'ingredients' || stage === 'brew') && <button className="journey-skip" type="button" onClick={() => setStage('cup')}>Xem tách trà <ArrowRight size={16} /></button>}
      </div>
    </div>
  );
}
