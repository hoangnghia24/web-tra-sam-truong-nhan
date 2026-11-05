import type { MetadataRoute } from 'next';

const publicPaths = ['/', '/hoa-don-cho-doi', '/7-phut-cho-minh', '/san-pham', '/thu-thach', '/gui-loi-nhac', '/giai-doan/bam-hoan', '/giai-doan/lam-ngay', '/giai-doan/gui-loi-nhac', '/chien-luoc', '/ve-du-an', '/lien-he', '/chinh-sach'];

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = process.env.NEXT_PUBLIC_SITE_URL;
  if (!origin) return [];
  return publicPaths.map((path) => ({ url: new URL(path, origin).toString(), changeFrequency: 'monthly', priority: path === '/' ? 1 : .7 }));
}
