import { readJson } from '@/lib/json-store';
import { errorResponse } from '@/lib/api';
import { faqsSchema, ingredientsSchema, productSchema } from '@/lib/schemas';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const [product, ingredients, faqs] = await Promise.all([
      readJson('content/product.json', productSchema),
      readJson('content/ingredients.json', ingredientsSchema),
      readJson('content/faqs.json', faqsSchema),
    ]);
    return Response.json({ product, ingredients, faqs });
  } catch (error) { return errorResponse(error); }
}
