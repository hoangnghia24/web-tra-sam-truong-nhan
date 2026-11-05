# Thêm video cho ba trang giai đoạn

Các trang `/giai-doan/bam-hoan`, `/giai-doan/lam-ngay` và `/giai-doan/gui-loi-nhac` đang hiển thị vị trí chờ video. Mỗi vị trí được khai báo trong `data/content/campaign.json`, trường `videos` của giai đoạn tương ứng.

1. Tạo thư mục `public/videos/phases/` nếu chưa có. Chép video MP4 vào đó. Đặt tên chữ thường, không dấu, ngăn cách bằng dấu gạch ngang; ví dụ `nhac-toi-sau.mp4`.
2. Mở `data/content/campaign.json`, tìm video theo `title`, rồi đổi `src` từ `null` thành `"/videos/phases/nhac-toi-sau.mp4"`. Giữ lại `title` và `description` hoặc chỉnh theo nội dung video thực tế.
3. Chạy `npm run validate:json` và `npm run dev`. Mở trang giai đoạn tại `http://localhost:3000` để xem và thử phát video. Khi `src` là `null`, trang tự hiển thị vị trí chờ; khi có đường dẫn, trang hiển thị trình phát có nút điều khiển.

Ví dụ:

```json
{
  "title": "Nhắc tôi sau",
  "description": "Video về những lần ta trì hoãn một khoảng nghỉ.",
  "src": "/videos/phases/nhac-toi-sau.mp4"
}
```

Chỉ đưa lên các video đã có quyền sử dụng và kiểm tra nội dung trước khi công khai. Kế hoạch theo tuần hiện không được trình bày như hoạt động đã hoàn thành.
