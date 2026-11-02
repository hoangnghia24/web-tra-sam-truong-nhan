import { requireAdmin } from './admin-auth';
import { errorResponse, validatedBody } from './api';
import { writeJsonAtomic } from './json-store';
import { campaignSchema, productSchema, siteSettingsSchema, teamSchema } from './schemas';
import type { z } from 'zod';

async function save<T>(request: Request, resource: string, path: string, schema: z.ZodType<T>) {
  try {
    requireAdmin(request);
    const body = await validatedBody(request, schema);
    await writeJsonAtomic(path, body, schema);
    return Response.json({ saved: true, resource });
  } catch (error) { return errorResponse(error); }
}

export function updateAdminContent(request: Request, resource: 'product' | 'team' | 'campaign' | 'settings') {
  switch (resource) {
    case 'product': return save(request, resource, 'content/product.json', productSchema);
    case 'team': return save(request, resource, 'content/team.json', teamSchema);
    case 'campaign': return save(request, resource, 'content/campaign.json', campaignSchema);
    case 'settings': return save(request, resource, 'content/site-settings.json', siteSettingsSchema);
  }
}
