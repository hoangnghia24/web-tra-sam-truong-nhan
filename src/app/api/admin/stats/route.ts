import { requireAdmin } from '@/lib/admin-auth';
import { errorResponse } from '@/lib/api';
import { getAdminStats } from '@/lib/admin-data';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  try { requireAdmin(request); return Response.json(await getAdminStats()); }
  catch (error) { return errorResponse(error); }
}
