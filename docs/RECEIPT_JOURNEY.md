# Hóa đơn chờ đợi: bốn bước

Trang `/hoa-don-cho-doi` có luồng nhập tên, quiz ba câu, hóa đơn cá nhân và điểm chạm sản phẩm. Tên và câu trả lời của quiz chỉ tồn tại trong trình duyệt cho lượt chơi hiện tại. Biểu mẫu hóa đơn chi tiết từ tám nhóm hoạt động vẫn ở phần mở rộng bên dưới.

Ảnh Story xuất ở kích thước 1080 × 1920 px. Nút chia sẻ mở bảng chia sẻ của thiết bị nếu trình duyệt hỗ trợ ảnh; nếu không, ảnh được tải xuống để người dùng tự đăng lên TikTok.

“Tổng nợ” trong quiz được quy đổi bằng **7 phút × số lần người dùng tự khai đã nói “để mai tính”**. Đây là hình ảnh gợi nhắc, không phải số phút thực tế đã mất. Thời gian dành cho bản thân hôm nay lấy từ số phút người dùng nhập ở câu thứ ba, nên chỉ hiện 0 khi họ nhập 0.

## Bật điểm mua và voucher

Trong `data/content/site-settings.json`:

- Điền liên kết gian hàng chính thức vào `purchaseLinks.tiktokShop` và `purchaseLinks.shopee` sau khi xác nhận. Nút của từng kênh chỉ hoạt động khi trường tương ứng có URL.
- Chỉ đặt `voucher15.active` thành `true` và điền `voucher15.code` khi chương trình ưu đãi 15% đã được phê duyệt và có mã dùng được. Khi chưa có, giao diện ghi rõ đây là ý tưởng trong kế hoạch.
- Chạy `npm run validate:json` sau khi thay đổi dữ liệu.

Không nhập URL trang cá nhân vào các trường liên kết mua hàng. Việc thêm URL hoặc mã vào JSON không tự xác minh gian hàng hay hiệu lực ưu đãi.
