type PageBannerProps = {
  eyebrow: string;
  title: string;
  description: string;
  tone?: 'light' | 'forest';
};

export function PageBanner({ eyebrow, title, description, tone = 'light' }: PageBannerProps) {
  return (
    <section className={`page-banner page-banner-${tone}`}>
      <div className="page-banner-inner">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-banner-description">{description}</p>
      </div>
    </section>
  );
}
