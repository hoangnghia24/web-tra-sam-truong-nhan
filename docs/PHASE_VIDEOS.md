# Tư liệu video và poster cho ba giai đoạn

Kế hoạch hiện dùng 8 tuần trong `data/content/campaign.json`: giai đoạn 1 là W1–W2, giai đoạn 2 là W3–W5, giai đoạn 3 là W6–W8. Thư mục nguồn được nhóm chia sẵn tại `DBC_ND2_BỘ ẤN PHẨM TRUYỀN THÔNG`; mã W và giai đoạn trong đường dẫn nguồn quyết định vị trí của tư liệu trên website.

## Ánh xạ hiện tại

| Tuần | Tư liệu theo thứ tự hiển thị |
| --- | --- |
| W1 | Poster chính thức chiến dịch → Video teaser Coming Soon |
| W2 | Video Hóa Đơn Thời Gian → Slideshow Để Dành Đến Bao Giờ? → Video giới thiệu Trà Sâm |
| W3 | Video hướng dẫn 4 bước → Video mẫu Câu Chuyện Dành Cho Bản Thân |
| W4 | Poster chuỗi video trả lời câu hỏi thường gặp |
| W5 | Poster TikTok LIVE → Video Checklist |
| W6 | Poster Mỗi Người Một Câu Chuyện |
| W7 | Video Lần Này Mình Nhắc Bạn → Video KOL/KOC Lo Cho Nhau, Đừng Quên Lo Cho Mình |
| W8 | Video Bạn Đã Thôi Chờ Chưa? |

Thứ tự mảng `media` phải bám theo thứ tự hoạt động trong tuần. Giao diện hiển thị đúng thứ tự JSON trên cả desktop và mobile; không tự động đẩy poster lên trước video.

## Chuẩn bị tệp

- Chép MP4 vào `public/videos/phases/` và poster vào `public/images/phases/`.
- Dùng tên tệp chữ thường, không dấu, ngăn từ bằng dấu gạch ngang. `src` trong JSON bắt đầu bằng `/videos/phases/` hoặc `/images/phases/`.
- Poster giữ nguyên tỷ lệ ảnh gốc, khai báo đúng `width` và `height`, và có liên kết mở ảnh đầy đủ.
- Mỗi video là một đối tượng `kind: "video"`. Một tuần có thể có nhiều video và poster; thứ tự các đối tượng chính là thứ tự hiển thị.
- Kiểu `series` vẫn được hỗ trợ cho một nhóm video cần trình bày như một bộ riêng, nhưng không dùng chỉ để gom các video độc lập trong cùng tuần.
- Xuất MP4 với hình H.264/AVC (`avc1`, 8-bit `yuv420p`, tối đa Level 4.0), tiếng AAC-LC và `faststart`. HEVC/H.265 (`hvc1`) có thể phát tiếng nhưng không hiện hình trên một số thiết bị.
- Bản W2 “Giới thiệu Trà Sâm” trong nguồn là HEVC; website giữ bản H.264 đã chuyển mã với cùng thời lượng 29,8 giây để bảo đảm tương thích trình duyệt.
- MP4 trong `public/videos/phases/` được theo dõi bằng Git LFS. Sau khi clone, chạy `git lfs pull` nếu tệp thật chưa có. Build Vercel có thể dùng Git LFS gốc hoặc trình phân giải trong `scripts/resolve-phase-videos.mjs`.

Ví dụ một tuần có video, poster rồi video:

```json
"media": [
  { "kind": "video", "title": "Hóa Đơn Thời Gian Dành Cho Bản Thân", "src": "/videos/phases/w2-hoa-don-thoi-gian.mp4" },
  { "kind": "poster", "title": "Để Dành Đến Bao Giờ?", "src": "/images/phases/w2-de-danh-den-bao-gio.jpg", "width": 2000, "height": 2000 },
  { "kind": "video", "title": "Giới thiệu Trà Sâm", "src": "/videos/phases/w2-gioi-thieu-tra-sam.mp4" }
]
```

Sau khi cập nhật, chạy `npm run validate:json`, `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`, rồi mở ba route `/giai-doan/bam-hoan`, `/giai-doan/lam-ngay` và `/giai-doan/gui-loi-nhac` ở desktop và mobile để kiểm tra ảnh, thứ tự và khả năng phát video.
