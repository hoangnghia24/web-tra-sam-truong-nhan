# Tư liệu video và poster cho ba giai đoạn

Kế hoạch W1–W12 nằm trong `data/content/campaign.json`, trường `phases[].weeklyPlan`. Mỗi tuần giữ nguyên `activities` và `goal`; `media` chứa **tư liệu đã được cung cấp** cho đúng mã W trên tên tệp. Tuần chưa có tệp dùng `"media": []` và vẫn hiển thị kế hoạch bằng chữ.

## Chuẩn bị tệp

- Chép MP4 vào `public/videos/phases/` và poster vào `public/images/phases/`.
- Dùng tên tệp chữ thường, không dấu, ngăn từ bằng dấu gạch ngang. `src` trong JSON bắt đầu bằng `/videos/phases/` hoặc `/images/phases/`.
- Video dùng khung dọc 9:16 trên trang. Poster giữ nguyên tỷ lệ ảnh; người xem có thể mở ảnh gốc từ thẻ poster.
- Xuất video MP4 với hình H.264/AVC (`avc1`, 8-bit `yuv420p`, tối đa Level 4.0) và tiếng AAC-LC. Bật `faststart` để trình duyệt có thể đọc thông tin phát sớm. MP4 chứa HEVC/H.265 (`hvc1`) có thể phát tiếng nhưng không hiện hình trên một số thiết bị; kiểm tra codec của từng tệp trước khi đưa lên production.
- MP4 trong `public/videos/phases/` được theo dõi bằng Git LFS qua `.gitattributes`. Sau khi clone, chạy `git lfs pull` nếu tệp video chưa được tải về. Vercel có thể lấy tệp thật khi bật Git LFS trong **Project Settings → Git**; [Vercel hướng dẫn thiết lập](https://vercel.com/docs/project-configuration/git-settings#git-large-file-storage-lfs). Nếu bản build chỉ nhận tệp con trỏ, `npm run build` sẽ tải tệp thật từ kho GitHub công khai và kiểm tra kích thước cùng SHA-256 trước khi build.

## Quy tắc theo tuần

- Một MP4 có cùng mã W: một đối tượng `kind: "video"` với `title` và `src`.
- Từ hai MP4 cùng mã W: một đối tượng `kind: "series"`, gồm `title` và mảng `videos` có ít nhất hai phần tử. W5 hiện có hai video trong một chuỗi.
- Poster là đối tượng `kind: "poster"` riêng, có `title`, `src`, `width` và `height` theo ảnh gốc. Video đơn và poster có thể thêm `note` khi chứa nội dung mô phỏng hoặc cần xác minh.
- Mỗi tuần có tối đa một video đơn **hoặc** một chuỗi; có thể có thêm poster. Khi hiển thị, poster được đặt trước video; tư liệu đơn bắt đầu ở cột trái.

Ví dụ video đơn và poster W1:

```json
"media": [
  { "kind": "poster", "title": "Poster chính thức chiến dịch", "src": "/images/phases/w1-poster-chien-dich.png", "width": 940, "height": 788 },
  { "kind": "video", "title": "Video Teaser Coming Soon", "src": "/videos/phases/w1-coming-soon.mp4" }
]
```

Ví dụ chuỗi W5:

```json
"media": [{
  "kind": "series",
  "title": "Chuỗi video tuần 5",
  "videos": [
    { "title": "Hướng dẫn 4 bước tham gia", "src": "/videos/phases/w5-huong-dan-bon-buoc.mp4" },
    { "title": "Video mẫu Câu Chuyện Dành Cho Bản Thân", "src": "/videos/phases/w5-video-mau-cau-chuyen.mp4" }
  ]
}]
```

Tệp “Lần này mình nhắc bạn” ban đầu mang mã W11 do đặt tên nhầm. Theo xác nhận của người cung cấp, video này thuộc W10; đường dẫn công khai và mục media của W10 đã được sửa cho khớp với kế hoạch. Nội dung hoạt động các tuần không thay đổi.

Sau khi cập nhật, chạy `npm run validate:json`, `npm run build`, rồi mở ba route `/giai-doan/bam-hoan`, `/giai-doan/lam-ngay` và `/giai-doan/gui-loi-nhac` để kiểm tra ảnh và phát video.
