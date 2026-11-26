import Image from 'next/image';

const documents = [
  { title: 'Bản tự công bố sản phẩm', src: '/images/certifications/ban-tu-cong-bo-san-pham.png', width: 1221, height: 685 },
  { title: 'Hồ sơ cơ sở sản xuất', src: '/images/certifications/ho-so-co-so-san-xuat.png', width: 368, height: 552 },
  { title: 'Phiếu kết quả thử nghiệm', src: '/images/certifications/phieu-ket-qua-thu-nghiem.png', width: 1217, height: 687 },
  { title: 'Thông tin dinh dưỡng và hồ sơ liên quan', src: '/images/certifications/thong-tin-dinh-duong.png', width: 1223, height: 692 },
] as const;

export function CertificationGallery({ compact = false }: { compact?: boolean }) {
  return <div className={`certification-gallery${compact ? ' certification-gallery-compact' : ''}`}>
    {documents.map((document) => <figure key={document.src}>
      <a href={document.src} target="_blank" rel="noopener noreferrer" aria-label={`Mở ${document.title} ở kích thước đầy đủ`}>
        <Image src={document.src} alt={document.title} width={document.width} height={document.height} sizes={compact ? '(max-width: 700px) 90vw, 260px' : '(max-width: 700px) 90vw, 520px'} />
      </a>
      <figcaption><strong>{document.title}</strong><span>Nhấn để xem bản đầy đủ</span></figcaption>
    </figure>)}
  </div>;
}
