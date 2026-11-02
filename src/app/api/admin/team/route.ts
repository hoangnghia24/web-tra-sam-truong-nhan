import { updateAdminContent } from '@/lib/admin-content';
export const runtime = 'nodejs';
export async function PATCH(request: Request) { return updateAdminContent(request, 'team'); }
