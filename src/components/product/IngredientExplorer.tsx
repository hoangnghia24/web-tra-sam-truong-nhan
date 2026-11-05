'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { z } from 'zod';
import type { ingredientsSchema } from '@/lib/schemas';
import { handleTabKey } from '@/lib/tab-keyboard';

type IngredientData = z.infer<typeof ingredientsSchema>;

export function IngredientExplorer({ data }: { data: IngredientData }) {
  const [selected, setSelected] = useState(0);
  const ingredient = data.ingredients[selected];

  return (
    <div className="ingredient-explorer">
      <div className="ingredient-list" role="tablist" aria-label="Khám phá bảy thành phần">
        {data.ingredients.map((item, index) => <button key={item.id} type="button" role="tab" id={`ingredient-tab-${item.id}`} aria-selected={selected === index} aria-controls="ingredient-panel" tabIndex={selected === index ? 0 : -1} onKeyDown={(event) => handleTabKey(event, index, data.ingredients.length, setSelected)} onClick={() => setSelected(index)}><span>{String(index + 1).padStart(2, '0')}</span>{item.name}</button>)}
      </div>
      <div className="ingredient-detail" role="tabpanel" id="ingredient-panel" aria-labelledby={`ingredient-tab-${ingredient.id}`}>
        <div className="ingredient-visual">
          {ingredient.image ? <Image src={ingredient.image} alt={`${ingredient.name} — hình minh họa do nhóm cung cấp`} fill sizes="(max-width: 800px) 100vw, 30vw" className="ingredient-photo" /> : <div className="ingredient-orbit" aria-hidden="true"><span>✳</span></div>}
          <span className="ingredient-image-note">{ingredient.image ? 'Hình minh họa do nhóm cung cấp' : 'Chưa có ảnh nguyên liệu'}</span>
        </div>
        <div className="ingredient-copy">
          <p className="eyebrow">Thành phần {String(selected + 1).padStart(2, '0')} / 07</p>
          <h3>{ingredient.name}</h3>
          <p>{ingredient.description}</p>
          <p className="ingredient-measure">{ingredient.percent === null ? 'Tỷ lệ: chờ xác minh' : `Tỷ lệ ghi trong tài liệu: ${ingredient.percent}%`}</p>
        </div>
      </div>
      <p className="ingredient-verification">{data.verificationNote}</p>
    </div>
  );
}
