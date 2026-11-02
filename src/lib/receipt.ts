import { randomUUID } from 'node:crypto';
import type { ReceiptInput, ReceiptRecord } from './schemas';

export function createReceipt(input: ReceiptInput, now = new Date()): ReceiptRecord {
  const totalMinutes = input.activities.reduce((sum, activity) => sum + activity.minutes, 0);
  const selfMinutes = input.activities.find((activity) => activity.key === 'self')?.minutes ?? 0;
  const message = selfMinutes === 0
    ? 'Hôm nay vẫn còn thời gian để dành cho mình một khoảng dừng nhỏ.'
    : selfMinutes < 7
      ? 'Bạn đã bắt đầu dành thời gian cho mình. Thử thêm 7 phút nữa nhé.'
      : 'Bạn đã dành thời gian cho chính mình hôm nay. Hãy giữ lời hẹn ấy.';
  return {
    id: randomUUID(),
    code: `TN-${now.toISOString().slice(0, 10).replaceAll('-', '')}-${randomUUID().slice(0, 6).toUpperCase()}`,
    createdAt: now.toISOString(),
    activities: input.activities,
    totalMinutes,
    selfMinutes,
    message,
  };
}
