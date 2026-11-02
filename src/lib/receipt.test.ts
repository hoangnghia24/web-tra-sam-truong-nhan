import { describe, expect, it } from 'vitest';
import { createReceipt } from './receipt';
import { receiptInputSchema } from './schemas';

const keys = ['work', 'family', 'study', 'chores', 'social', 'leisure', 'self', 'other'] as const;

function sample(selfMinutes: number) {
  return { activities: keys.map((key) => ({ key, minutes: key === 'work' ? 480 : key === 'self' ? selfMinutes : 0 })) };
}

describe('receipt calculation', () => {
  it('uses actual time, including zero minutes of self care', () => {
    const input = receiptInputSchema.parse(sample(0));
    const receipt = createReceipt(input, new Date('2026-11-03T10:00:00.000Z'));
    expect(receipt.totalMinutes).toBe(480);
    expect(receipt.selfMinutes).toBe(0);
    expect(receipt.message).toContain('Hôm nay vẫn còn thời gian');
    expect(receipt.code).toMatch(/^TN-20261103-[A-F0-9]{6}$/);
  });

  it('recognizes time already spent on oneself and rejects more than 24 hours', () => {
    const receipt = createReceipt(receiptInputSchema.parse(sample(15)));
    expect(receipt.totalMinutes).toBe(495);
    expect(receipt.selfMinutes).toBe(15);
    expect(receipt.message).toContain('Bạn đã dành thời gian');
    expect(receiptInputSchema.safeParse(sample(1000)).success).toBe(false);
  });

  it('uses the Vietnam calendar date in the receipt code across a UTC date boundary', () => {
    const receipt = createReceipt(receiptInputSchema.parse(sample(15)), new Date('2026-11-02T18:00:00.000Z'));
    expect(receipt.code).toMatch(/^TN-20261103-/);
  });
});
