import { z } from 'zod';

const email = z.email().max(254);
const safeText = (max: number) => z.string().trim().min(1).max(max);
const publicUrl = z.url({ protocol: /^https$/ });

export const brandSchema = z.object({
  name: safeText(100), campaignTitle: safeText(140), tagline: safeText(140),
  emotionalMessage: safeText(180), simulationNotice: safeText(250),
});

export const companySchema = z.object({
  name: safeText(100), overview: safeText(900), connection: safeText(700), verificationNote: safeText(350),
  facts: z.array(z.object({ label: safeText(100), detail: safeText(350) })).length(3),
});

export const teamMemberSchema = z.object({
  id: safeText(40), name: safeText(100), email,
  phone: z.string().regex(/^0\d{9}$/, 'Số điện thoại phải có 10 chữ số'),
});
export const teamSchema = z.object({ teamEmail: email, members: z.array(teamMemberSchema).length(4) });

export const productSchema = z.object({
  name: safeText(100), tagline: safeText(140), packCount: z.number().int().positive(),
  gramsPerBag: z.number().positive(), netWeightGrams: z.number().positive(),
  ngocLinhLeafPercent: z.number().min(0).max(100), ingredientCount: z.number().int().positive(),
  brewWaterMl: z.number().positive(), brewMinutesMin: z.number().positive(),
  brewMinutesMax: z.number().positive(), referencePriceVndMin: z.number().int().nonnegative(),
  referencePriceVndMax: z.number().int().nonnegative(), referencePriceLabel: safeText(160),
  officialShopUrl: publicUrl.nullable(), note: safeText(500),
});

export const ingredientsSchema = z.object({
  ingredients: z.array(z.object({
    id: safeText(60), name: safeText(100), description: safeText(350),
    percent: z.number().min(0).max(100).nullable(),
  })).length(7),
  verificationNote: safeText(250),
});

export const campaignSchema = z.object({
  title: safeText(140), currentPhase: z.number().int().min(1).max(3),
  phases: z.array(z.object({
    number: z.number().int().min(1).max(3), name: safeText(50),
    weeks: safeText(30), message: safeText(180), focus: z.array(safeText(100)).min(1),
    weeklyPlan: z.array(z.object({ week: z.number().int().min(1).max(12), activities: z.array(safeText(200)).min(1), goal: safeText(300) })).length(4),
  })).length(3),
  statusNote: safeText(250),
});

export const strategySchema = z.object({
  reportTitle: safeText(180), source: safeText(180), bigIdea: safeText(180),
  customerInsight: safeText(400), primaryAudience: safeText(400),
  secondaryAudience: safeText(400), persona: z.object({ belief: safeText(400), pain: safeText(900), motivation: safeText(700) }), plannedBudgetVnd: z.number().nonnegative(),
  plannedExecutionBudgetVnd: z.number().nonnegative(), plannedReserveVnd: z.number().nonnegative(),
  plannedWeeks: z.number().int().positive(),
  plannedKpis: z.array(z.object({ label: safeText(100), target: z.number().nonnegative(), displayTarget: safeText(30).optional(), unit: safeText(100), sourcePage: z.number().int().positive().optional() })),
  actualResultsAvailable: z.boolean(),
});

const strategyEntry = z.object({ title: safeText(120), body: safeText(500), page: z.number().int().positive().optional() });
export const strategyReportSchema = z.object({
  sourceNote: safeText(350),
  market: z.array(strategyEntry),
  swot: z.array(z.object({ key: z.enum(['S', 'W', 'O', 'T']), title: safeText(100), items: z.array(safeText(250)) })).length(4),
  tows: z.array(z.object({ key: z.enum(['SO', 'WO', 'ST', 'WT']), title: safeText(100), body: safeText(500) })).length(4),
  sevenPs: z.array(z.object({ key: safeText(50), title: safeText(100), body: safeText(1200) })).length(7),
  journey: z.array(z.object({ step: safeText(100), touchpoint: safeText(200) })).length(5),
  channelRoles: z.array(z.object({ channel: safeText(100), role: safeText(240) })).length(6),
  pillars: z.array(strategyEntry).length(4),
  budget: z.array(z.object({ name: safeText(100), millionVnd: z.number().nonnegative() })).length(10),
  risks: z.array(z.object({ title: safeText(100), response: safeText(500), page: z.number().int().positive().optional() })),
});

export const faqsSchema = z.object({ items: z.array(z.object({ question: safeText(200), answer: safeText(900) })) });
export const siteSettingsSchema = z.object({
  officialShopUrl: publicUrl.nullable(),
  socialLinks: z.object({ tiktok: publicUrl.nullable(), facebook: publicUrl.nullable(), shopee: publicUrl.nullable(), zalo: publicUrl.nullable() }),
  analyticsEnabled: z.boolean(), contactFormEnabled: z.boolean(),
});

export const activityKeySchema = z.enum(['work', 'family', 'study', 'chores', 'social', 'leisure', 'self', 'other']);
export const activitySchema = z.object({ key: activityKeySchema, minutes: z.number().int().min(0).max(1440) });
export const receiptInputSchema = z.object({
  activities: z.array(activitySchema).length(8),
}).refine(({ activities }) => new Set(activities.map((item) => item.key)).size === 8, 'Mỗi hoạt động chỉ được nhập một lần')
  .refine(({ activities }) => activities.reduce((sum, item) => sum + item.minutes, 0) > 0, 'Hãy nhập ít nhất một khoảng thời gian')
  .refine(({ activities }) => activities.reduce((sum, item) => sum + item.minutes, 0) <= 1440, 'Tổng thời gian không được vượt quá 24 giờ');
export const receiptRecordSchema = z.object({
  id: z.uuid(), code: safeText(30), createdAt: z.iso.datetime(),
  activities: z.array(activitySchema).length(8), totalMinutes: z.number().int().min(1).max(1440),
  selfMinutes: z.number().int().min(0).max(1440), message: safeText(300),
});

export const eventTypeSchema = z.enum(['receipt_created', 'timer_completed', 'share_clicked', 'product_clicked', 'shop_clicked', 'ugc_submitted', 'contact_submitted', 'reminder_downloaded']);
export const eventInputSchema = z.object({
  type: eventTypeSchema,
  utmSource: z.string().trim().max(80).optional(),
  utmMedium: z.string().trim().max(80).optional(),
  utmCampaign: z.string().trim().max(80).optional(),
});
export const eventRecordSchema = eventInputSchema.extend({ id: z.uuid(), createdAt: z.iso.datetime() });

export const ugcInputSchema = z.object({
  displayName: safeText(80), videoUrl: publicUrl.max(500),
  story: safeText(1000), consent: z.literal(true), website: z.string().max(0).optional(),
});
export const ugcRecordSchema = ugcInputSchema.omit({ website: true }).extend({
  id: z.uuid(), createdAt: z.iso.datetime(), status: z.enum(['pending', 'approved', 'rejected']),
});

export const contactInputSchema = z.object({
  name: safeText(100), email, subject: safeText(140), message: safeText(2000),
  consent: z.literal(true), website: z.string().max(0).optional(),
});
export const contactRecordSchema = contactInputSchema.omit({ website: true }).extend({ id: z.uuid(), createdAt: z.iso.datetime() });

export const reminderRecordSchema = z.object({
  id: z.uuid(), createdAt: z.iso.datetime(), audience: safeText(50), template: safeText(50),
});

export type ReceiptInput = z.infer<typeof receiptInputSchema>;
export type ReceiptRecord = z.infer<typeof receiptRecordSchema>;
export type EventInput = z.infer<typeof eventInputSchema>;
export type UgcRecord = z.infer<typeof ugcRecordSchema>;
export type ContactRecord = z.infer<typeof contactRecordSchema>;
