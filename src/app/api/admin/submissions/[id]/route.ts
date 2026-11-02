import { z } from 'zod';
import { requireAdmin } from '@/lib/admin-auth';
import { errorResponse, validatedBody } from '@/lib/api';
import { updateRecord } from '@/lib/json-store';
import { ugcRecordSchema } from '@/lib/schemas';
import type { UgcRecord } from '@/lib/schemas';

export const runtime = 'nodejs';

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    requireAdmin(request);
    const { id } = await context.params;
    if (!z.uuid().safeParse(id).success) return Response.json({ error: 'ID không hợp lệ' }, { status: 400 });
    const { status } = await validatedBody(request, z.object({ status: z.enum(['pending', 'approved', 'rejected']) }));
    const item = await updateRecord<UgcRecord>('runtime/ugc-submissions.json', id, (record) => ({ ...record, status }), ugcRecordSchema);
    return Response.json({ item });
  } catch (error) { return errorResponse(error); }
}
