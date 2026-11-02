import { errorResponse, enforceRateLimit, validatedBody } from '@/lib/api';
import { appendRecord } from '@/lib/json-store';
import { createReceipt } from '@/lib/receipt';
import { receiptInputSchema, receiptRecordSchema } from '@/lib/schemas';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    enforceRateLimit(request, 'receipts', 10);
    const input = await validatedBody(request, receiptInputSchema);
    const receipt = createReceipt(input);
    await appendRecord('runtime/receipts.json', receipt, receiptRecordSchema);
    return Response.json(receipt, { status: 201 });
  } catch (error) { return errorResponse(error); }
}
