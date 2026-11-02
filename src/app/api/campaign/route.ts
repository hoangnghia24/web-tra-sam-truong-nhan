import { errorResponse } from '@/lib/api';
import { readJson } from '@/lib/json-store';
import { campaignSchema } from '@/lib/schemas';

export const runtime = 'nodejs';
export async function GET() {
  try { return Response.json(await readJson('content/campaign.json', campaignSchema)); }
  catch (error) { return errorResponse(error); }
}
