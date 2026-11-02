import { randomUUID } from 'node:crypto';
import { errorResponse, enforceRateLimit, validatedBody } from '@/lib/api';
import { appendRecord } from '@/lib/json-store';
import { contactInputSchema, contactRecordSchema } from '@/lib/schemas';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    enforceRateLimit(request, 'contact', 5);
    const { website: _website, ...input } = await validatedBody(request, contactInputSchema);
    void _website;
    const record = { ...input, id: randomUUID(), createdAt: new Date().toISOString() };
    await appendRecord('runtime/contact-submissions.json', record, contactRecordSchema);
    return Response.json({ message: 'Cảm ơn bạn đã liên hệ! Chúng tôi đã ghi nhận thông tin của bạn.' }, { status: 201 });
  } catch (error) { return errorResponse(error); }
}
