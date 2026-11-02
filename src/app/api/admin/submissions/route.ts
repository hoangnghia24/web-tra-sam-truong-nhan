import { requireAdmin } from '@/lib/admin-auth';
import { errorResponse } from '@/lib/api';
import { readJson } from '@/lib/json-store';
import { ugcRecordSchema } from '@/lib/schemas';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    requireAdmin(request);
    const items = await readJson('runtime/ugc-submissions.json', ugcRecordSchema.array());
    return Response.json({ items });
  } catch (error) { return errorResponse(error); }
}
