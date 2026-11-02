import { requireAdmin } from '@/lib/admin-auth';
import { errorResponse } from '@/lib/api';
import { readJson } from '@/lib/json-store';
import { contactRecordSchema } from '@/lib/schemas';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  try { requireAdmin(request); return Response.json({ items: await readJson('runtime/contact-submissions.json', contactRecordSchema.array()) }); }
  catch (error) { return errorResponse(error); }
}
