# Trà Sâm Trường Nhân — Hóa đơn chờ đợi

Website mô phỏng chiến dịch **“Sâm không đợi dịp. Bạn đợi gì?”** theo tài liệu chiến lược do nhóm cung cấp. Nội dung dành cho khách truy cập bằng tiếng Việt. Website chưa được xác nhận là kênh chính thức của thương hiệu; không tự tạo đường mua hàng, phản hồi khách hàng hoặc công dụng y khoa.

## Yêu cầu và chạy trên Windows

1. Cài Node.js **20.9 trở lên** từ [nodejs.org](https://nodejs.org/) và Git nếu cần quản lý checkpoint. Mở PowerShell tại thư mục dự án.
2. Cài gói: `npm ci`.
3. Chạy phát triển: `npm run dev`, sau đó mở `http://localhost:3000`.
4. Kiểm tra bản production: `npm run build`, rồi `npm run start`.

Các lệnh kiểm tra: `npm run validate:json`, `npm run test`, `npm run lint`, `npm run typecheck`. `npm run build` cũng kiểm tra TypeScript.

## Ảnh và nguồn nội dung

- Ảnh bìa được lưu tại `public/images/truong-nhan-cover.png` (1920 × 1080). Nếu tạo bản sao workspace, đặt đúng file này vào đường dẫn trên. Ảnh được hiển thị nguyên tỷ lệ, không phủ chữ lên logo/chữ sẵn có.
- PDF chiến lược đọc tại `public/references/Tra_Sam_Truong_Nhan_SWOT_TOWS_7Ps.pptx.pdf`. Đường dẫn `references/...` ban đầu không tồn tại. PDF 198 MB chỉ dùng làm nguồn tham khảo cục bộ, bị Git bỏ qua và đường dẫn HTTP `/references/` trả 404 qua Next.js Proxy. Khi đóng gói ngoài Next.js, không đưa PDF này vào thư mục public của máy chủ tĩnh.
- Dữ liệu nội dung có thể chỉnh tại `data/content/*.json`, đặc biệt `team.json`, `product.json`, `ingredients.json`, `campaign.json`, `strategy.json`, `strategy-report.json` và `site-settings.json`. Chạy `npm run validate:json` sau khi chỉnh. Tỷ lệ thành phần ngoài 3% lá Sâm Ngọc Linh cần đối chiếu bao bì và hồ sơ chính thức.
- Quản trị viên đã đăng nhập có thể chỉnh toàn bộ JSON cho sản phẩm, nhóm và phase tại `/admin/content`; liên kết xã hội và gian hàng tại `/admin/settings`. Chỉ nhập URL HTTPS đã xác minh. Nếu chưa có URL gian hàng chính thức, nút mua hàng sẽ không hiện.

## Thiết lập quản trị

Quản trị **mặc định bị khóa**. Tạo `.env.local` từ `.env.example` và điền:

```env
ADMIN_PASSWORD_HASH=<bcrypt hash>
SESSION_SECRET=<ít nhất 32 ký tự ngẫu nhiên>
NEXT_PUBLIC_SITE_URL=<HTTPS origin thật sau khi triển khai>
```

Tạo bcrypt hash với `bcryptjs` (đã là dependency) bằng PowerShell 7:

```powershell
$env:ADMIN_SETUP_PASSWORD = (Read-Host "Mật khẩu quản trị" -AsSecureString | ConvertFrom-SecureString -AsPlainText)
node -e 'const bcrypt=require("bcryptjs"); console.log(bcrypt.hashSync(process.env.ADMIN_SETUP_PASSWORD,12).replaceAll("$","\\$"))'
Remove-Item Env:ADMIN_SETUP_PASSWORD
node -e 'console.log(require("crypto").randomBytes(32).toString("hex"))'
```

Chép dòng hash đầu vào `ADMIN_PASSWORD_HASH`, dòng ngẫu nhiên cuối vào `SESSION_SECRET`. Lệnh hash đã thêm dấu `\` trước mỗi `$` để dotenv không nội suy và làm hỏng bcrypt hash. Không đưa `.env.local`, hash thật hoặc secret vào Git. Khởi động lại server sau khi thay đổi môi trường.

Phiên quản trị dùng cookie HTTP-only, SameSite Strict, hết hạn sau tám giờ. Các trang và API quản trị đều kiểm tra phiên phía máy chủ. Vào `/admin/login` để đăng nhập; `/admin/dashboard` chỉ tính lượt phát sinh từ JSON của website, không dùng KPI kế hoạch làm kết quả thật.

## JSON storage, backup và reset

- `data/content` là nội dung có thể version control. `data/seed` chứa mảng trống khởi tạo. `data/runtime` được tạo khi cần, chứa hóa đơn, sự kiện, bài dự thi, liên hệ và không bao giờ được commit.
- Storage kiểm tra Zod, xếp hàng ghi theo file trong **một tiến trình**, ghi file tạm rồi đổi tên và lưu bản sao `.bak`. Nếu JSON hiện có bị lỗi, hệ thống giữ nguyên file lỗi thay vì ghi đè.
- Sao lưu: dừng server rồi sao chép `data/runtime/` và các file `data/content/*.json` cần giữ sang nơi riêng có quyền truy cập phù hợp. Với bản backup `.bak`, kiểm tra nội dung trước khi khôi phục.
- Reset dữ liệu demo: dừng server, sao lưu nếu cần, rồi xóa **chỉ các file trong `data/runtime/`**. Lần truy cập kế tiếp sẽ khởi tạo lại từ các mảng trống ở `data/seed/`. Không xóa `data/content` hoặc nguồn ảnh.
- JSON storage phù hợp cho demo hoặc một Node server có ổ đĩa ghi được. Nó không bảo đảm lưu trữ bền vững trên serverless, nhiều tiến trình hoặc nhiều bản triển khai; khi vận hành thật cần thay bằng backend lưu trữ phù hợp.

## Kiểm tra và giới hạn

Website có hóa đơn thời gian, đồng hồ bảy phút, trang sản phẩm, thử thách được duyệt, thiệp lời nhắc, báo cáo chiến lược và khu quản trị. Form liên hệ và bài dự thi cần đồng ý trước khi gửi. Thiệp không lưu lời nhắn lên máy chủ. Xem bằng chứng kiểm tra tại `docs/TEST_RESULTS.md`.

Đặt `NEXT_PUBLIC_SITE_URL` trước khi build production để tạo Open Graph và sitemap theo domain đã triển khai; để trống khi chưa có domain thật. Dữ liệu ngân sách/KPI trên trang chiến lược là **kế hoạch**, không phải kết quả thực tế. URL mua hàng và bộ ảnh sản phẩm cận cảnh cần được xác minh/bổ sung từ nguồn chính thức.

## Tiếp tục phát triển

Đọc `AGENTS.md` và `docs/MASTER_PROMPT.md`, sau đó `docs/CHECKPOINT.md`, `docs/TASKS.md`, `docs/DECISIONS.md`, `docs/TEST_RESULTS.md`. `docs/IMPLEMENTATION_PLAN.md` ghi thứ tự checkpoint. Sau mỗi phần việc, kiểm tra kết quả thật, cập nhật checkpoint và commit source cùng tài liệu; không commit `.env*`, `data/runtime`, `.next`, `node_modules`, backup hay PDF lớn.
