import { randomUUID } from 'node:crypto';
import { errorResponse, enforceRateLimit, validatedBody } from '@/lib/api';
import { appendRecord } from '@/lib/json-store';
import { eventInputSchema, eventRecordSchema } from '@/lib/schemas';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    enforceRateLimit(request, 'events', 50);
    const input = await validatedBody(request, eventInputSchema);
    const event = { ...input, id: randomUUID(), createdAt: new Date().toISOString() };
    await appendRecord('runtime/analytics-events.json', event, eventRecordSchema);
    return Response.json({ recorded: true }, { status: 201 });
  } catch (error) { return errorResponse(error); }
}
