import { errorResponse } from '@/lib/api';
import { readJson } from '@/lib/json-store';
import { teamSchema } from '@/lib/schemas';

export const runtime = 'nodejs';
export async function GET() {
  try { return Response.json(await readJson('content/team.json', teamSchema)); }
  catch (error) { return errorResponse(error); }
}
