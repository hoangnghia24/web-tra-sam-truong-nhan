import { readJson } from '../src/lib/json-store';
import { z } from 'zod';
import {
  brandSchema, campaignSchema, faqsSchema, ingredientsSchema,
  productSchema, siteSettingsSchema, strategySchema, strategyReportSchema, teamSchema,
} from '../src/lib/schemas';

const checks = [
  () => readJson('content/brand.json', brandSchema),
  () => readJson('content/team.json', teamSchema),
  () => readJson('content/product.json', productSchema),
  () => readJson('content/ingredients.json', ingredientsSchema),
  () => readJson('content/campaign.json', campaignSchema),
  () => readJson('content/strategy.json', strategySchema),
  () => readJson('content/strategy-report.json', strategyReportSchema),
  () => readJson('content/faqs.json', faqsSchema),
  () => readJson('content/site-settings.json', siteSettingsSchema),
];

for (const [index, check] of checks.entries()) {
  await check();
  console.log(`PASS content file ${index + 1}/${checks.length}`);
}

for (const file of ['receipts', 'analytics-events', 'ugc-submissions', 'contact-submissions', 'reminders']) {
  const path = `seed/${file}.json`;
  const value = await readJson(path, z.array(z.unknown()));
  if (value.length !== 0) throw new Error(`${path} phải là danh sách rỗng`);
  console.log(`PASS ${path}`);
}
