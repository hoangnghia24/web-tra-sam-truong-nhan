import { readJson } from './json-store';
import { contactRecordSchema, eventRecordSchema, receiptRecordSchema, ugcRecordSchema } from './schemas';

export async function getAdminStats() {
  const [receipts, events, submissions, contacts] = await Promise.all([
    readJson('runtime/receipts.json', receiptRecordSchema.array()),
    readJson('runtime/analytics-events.json', eventRecordSchema.array()),
    readJson('runtime/ugc-submissions.json', ugcRecordSchema.array()),
    readJson('runtime/contact-submissions.json', contactRecordSchema.array()),
  ]);
  const daily = new Map<string, number>();
  for (const item of [...receipts, ...events, ...submissions, ...contacts]) {
    const day = item.createdAt.slice(0, 10);
    daily.set(day, (daily.get(day) || 0) + 1);
  }
  return {
    receiptsCreated: receipts.length,
    timerCompleted: events.filter((event) => event.type === 'timer_completed').length,
    shareClicks: events.filter((event) => event.type === 'share_clicked').length,
    productClicks: events.filter((event) => event.type === 'product_clicked').length,
    shopClicks: events.filter((event) => event.type === 'shop_clicked').length,
    submissions: submissions.length,
    submissionsApproved: submissions.filter((item) => item.status === 'approved').length,
    submissionsPending: submissions.filter((item) => item.status === 'pending').length,
    contacts: contacts.length,
    dailyInteractions: [...daily].sort(([a], [b]) => a.localeCompare(b)).map(([date, count]) => ({ date, count })),
  };
}
