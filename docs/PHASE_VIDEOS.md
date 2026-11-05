# Thêm video cho ba trang giai đoạn

Nội dung W1–W12 nằm trong `data/content/campaign.json`, trường `phases[].weeklyPlan`. Mỗi tuần có `activities` (giữ nguyên câu chữ trong bảng) và `media`. `media[].activityIndex` là vị trí hoạt động trong mảng `activities`, **bắt đầu từ 0**. Chỉ các hoạt động ghi “Video” hoặc “Chuỗi video” có vị trí chờ. Poster, TikTok Photo Mode, TikTok LIVE và hoạt động Website vẫn được trình bày bằng chữ theo đúng kế hoạch.

## Chuẩn bị file

1. Tạo thư mục `public/videos/phases/` nếu chưa có.
2. Chép MP4 vào thư mục này. Tên file viết chữ thường, không dấu, dùng dấu gạch ngang, ví dụ `w1-video-nhac-toi-sau.mp4`.
3. Dùng đường dẫn web bắt đầu bằng `/videos/phases/`, ví dụ `/videos/phases/w1-video-nhac-toi-sau.mp4`.

## Một video

Tìm đúng `week`, rồi tìm mục trong `media` có `kind: "video"` và `activityIndex` trỏ đến hoạt động cần chèn. Đổi `src` từ `null` thành đường dẫn MP4. Giữ nguyên `activities` và `goal`.

Ví dụ với hoạt động thứ ba của W1 (chỉ số 2):

```json
{ "activityIndex": 2, "kind": "video", "src": "/videos/phases/w1-video-nhac-toi-sau.mp4" }
```

## Chuỗi video

W6 có hai hoạt động `kind: "series"`. Mỗi hoạt động bắt đầu với `"videos": []`. Để thêm danh sách, chèn từng đối tượng `{ "title", "src" }` vào mảng `videos` tương ứng. Có thể thêm nhiều video; thứ tự trong mảng là thứ tự hiển thị.

Ví dụ cho “Chuỗi video KOL/KOC tham gia thử thách.” (hoạt động thứ hai W6, chỉ số 1):

```json
{
  "activityIndex": 1,
  "kind": "series",
  "videos": [
    { "title": "Tập 1", "src": "/videos/phases/w6-koc-tap-1.mp4" },
    { "title": "Tập 2", "src": "/videos/phases/w6-koc-tap-2.mp4" }
  ]
}
```

Hai tên “Tập 1”, “Tập 2” trong ví dụ chỉ minh họa cấu trúc; khi thêm video thật, đặt `title` theo tên bạn chọn. Để trống mảng thì trang hiển thị thông báo chờ danh sách.

Sau khi chỉnh, chạy `npm run validate:json`, `npm run dev`, rồi mở một trong ba trang `/giai-doan/bam-hoan`, `/giai-doan/lam-ngay`, `/giai-doan/gui-loi-nhac` để thử phát video. Chỉ bổ sung video khi bạn có file và quyền sử dụng; nội dung theo tuần vẫn được ghi là kế hoạch.
