import { errorResponse } from '@/lib/api';
import { readJson } from '@/lib/json-store';
import { strategySchema } from '@/lib/schemas';

export const runtime = 'nodejs';
export async function GET() {
  try { return Response.json(await readJson('content/strategy.json', strategySchema)); }
  catch (error) { return errorResponse(error); }
}
