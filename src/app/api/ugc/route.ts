import { randomUUID } from 'node:crypto';
import { errorResponse, enforceRateLimit, validatedBody } from '@/lib/api';
import { appendRecord, readJson } from '@/lib/json-store';
import { ugcInputSchema, ugcRecordSchema } from '@/lib/schemas';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const records = await readJson('runtime/ugc-submissions.json', ugcRecordSchema.array());
    const approved = records.filter((record) => record.status === 'approved').map(({ id, displayName, videoUrl, story, createdAt }) => ({ id, displayName, videoUrl, story, createdAt }));
    return Response.json({ items: approved });
  } catch (error) { return errorResponse(error); }
}

export async function POST(request: Request) {
  try {
    enforceRateLimit(request, 'ugc', 5);
    const { website: _website, ...input } = await validatedBody(request, ugcInputSchema);
    void _website;
    const record = { ...input, id: randomUUID(), createdAt: new Date().toISOString(), status: 'pending' as const };
    await appendRecord('runtime/ugc-submissions.json', record, ugcRecordSchema);
    return Response.json({ id: record.id, status: record.status }, { status: 201 });
  } catch (error) { return errorResponse(error); }
}
