# MASTER PROMPT – XÂY DỰNG WEBSITE TRÀ SÂM TRƯỜNG NHÂN

## PHẦN 0. CHỈ THỊ QUAN TRỌNG NHẤT

Bạn là Codex, đóng vai đồng thời:

- Senior Full-stack Engineer.
- Senior UI/UX Designer.
- Creative Web Developer.
- Digital Marketing Strategist.
- Software Architect.
- QA Engineer.

Nhiệm vụ là trực tiếp xây dựng một website hoàn chỉnh, đẹp, chuyên nghiệp, có tương tác thực tế, dựa trên chiến lược Digital Marketing cho sản phẩm **Trà Sâm Trường Nhân**.

Website phải có khả năng chạy ngay trên máy Windows bằng Next.js, không phụ thuộc vào cơ sở dữ liệu bên ngoài.

**ĐẶC BIỆT: DỰ ÁN PHẢI CÓ HỆ THỐNG CHECKPOINT BẮT BUỘC ĐỂ CÓ THỂ TIẾP TỤC TRIỂN KHAI KHI HẾT TOKEN HOẶC BẮT ĐẦU PHIÊN CODEX MỚI.**

Không chỉ đưa ra giải pháp lý thuyết. Phải trực tiếp tạo file, lập trình, chạy kiểm thử và hoàn thiện sản phẩm.

---

# PHẦN 1. THÔNG TIN DỰ ÁN

## 1.1. Tên website

**TRÀ SÂM TRƯỜNG NHÂN**

Tên chiến dịch:

**SÂM KHÔNG ĐỢI DỊP. BẠN ĐỢI GÌ?**

Thông điệp phụ:

"Tinh hoa từ núi Ngọc Linh"

Thông điệp cảm xúc:

"Chăm sóc bản thân không cần chờ dịp đặc biệt."

Trải nghiệm tương tác nổi bật:

**HÓA ĐƠN CHỜ ĐỢI – 7 PHÚT CHO MÌNH**

## 1.2. Mục tiêu website

Website phải thực hiện được năm mục tiêu:

1. Giới thiệu thương hiệu Trà Sâm Trường Nhân bằng trải nghiệm trực quan.
2. Truyền tải câu chuyện người hiện đại thường trì hoãn việc chăm sóc bản thân.
3. Khuyến khích người dùng tham gia trải nghiệm "Hóa đơn chờ đợi".
4. Giới thiệu minh bạch sản phẩm, thành phần, cách pha và dẫn đến kênh mua hàng chính thức.
5. Thể hiện toàn bộ chiến lược Digital Marketing và kết quả hoạt động cho mục đích thuyết trình, đánh giá.

Website phải hướng đến một sản phẩm có thể vận hành thực tế, không phải chỉ là một bộ slide đặt lên trình duyệt.

---

# PHẦN 2. ẢNH THAM CHIẾU – DESIGN SYSTEM BẮT BUỘC

## 2.1. Ảnh nền chính thức

Tôi đã cung cấp một ảnh tham chiếu sản phẩm Trà Sâm Trường Nhân có kích thước 1920 × 1080 pixel.

Trong workspace, tôi sẽ đặt ảnh tại:

`public/images/truong-nhan-cover.png`

**Bạn PHẢI mở và phân tích ảnh này trước khi thiết kế.**

Đây là ảnh tham chiếu thiết kế số một, có mức ưu tiên cao nhất.

Ảnh gồm:

- Nền vàng kem pha xanh lá pastel.
- Nhánh cây sâm Ngọc Linh với hoa, lá xanh và rễ.
- Phong cảnh núi Ngọc Linh và sương mờ.
- Họa tiết bản làng miền núi.
- Hộp sản phẩm Trà Sâm Trường Nhân.
- Gói trà túi lọc.
- Tách trà thủy tinh với nước trà vàng hổ phách.
- Đường nét trang trí màu vàng đồng.
- Kiểu chữ sang trọng, đậm tính thương hiệu.

Không thiết kế một giao diện công nghệ tối màu, neon, tím xanh hoặc dashboard SaaS không phù hợp với hình ảnh này.

## 2.2. Bảng màu

Thiết lập CSS Design Tokens:

```css
:root {
  --brand-forest: #173E29;
  --brand-dark: #102B1E;
  --brand-leaf: #557A42;
  --brand-sage: #A9C58E;
  --brand-cream: #FFF5DC;
  --brand-ivory: #FAF7EE;
  --brand-gold: #B98532;
  --brand-gold-light: #E2C77C;
  --brand-tea: #AF6B22;
  --text-primary: #233A29;
  --text-secondary: #65735D;
}
```

Đây là bảng màu khởi tạo. Hãy lấy mẫu thêm từ ảnh thực tế nếu cần để điều chỉnh màu cho hài hòa.

## 2.3. Quy tắc thiết kế

Yêu cầu giao diện mang phong cách:

**Premium Botanical – Natural Luxury – Vietnamese Heritage.**

Áp dụng:

- Nền kem vàng mềm mại.
- Các lớp gradient xanh nhạt và vàng ấm.
- Hình ảnh núi rừng mờ phía sau các section.
- Viền và họa tiết vàng đồng tinh tế.
- Card nền trắng kem, bo góc vừa phải.
- Hiệu ứng ánh sáng mềm.
- Tiêu đề serif cao cấp, nội dung sans-serif dễ đọc.
- Animation xuất hiện nhẹ nhàng khi cuộn.
- Chuyển động hơi trà, lá và ánh sáng ở mức vừa phải.
- Nút hành động có màu xanh rừng và hover vàng đồng.
- Không dùng hiệu ứng quá nhiều gây mất tập trung.

Ưu tiên các font hỗ trợ tiếng Việt đầy đủ, chẳng hạn Be Vietnam Pro kết hợp một serif phù hợp.

## 2.4. Thiết kế Hero Section

Dùng chính file `truong-nhan-cover.png`.

Vì ảnh đã chứa tiêu đề, bao bì và chữ thương hiệu, **không được đặt thêm một lớp tiêu đề trùng nội dung đè lên ảnh**.

Desktop:

- Ảnh 16:9 hiển thị toàn khung.
- Không kéo giãn, làm méo, crop mất bao bì hoặc tên thương hiệu.
- Có chuyển tiếp mềm mại xuống phần nội dung tiếp theo.

Mobile:

- Giữ nguyên tỷ lệ của ảnh, ưu tiên hiển thị đủ nội dung.
- Không ép `background-size: cover` khiến tên hoặc sản phẩm bị cắt.
- Đặt lời dẫn và CTA trong một khối nội dung riêng bên dưới nếu không đủ không gian.
- Có thể dùng khung ảnh riêng cho mobile nhưng vẫn phải lấy ảnh gốc làm nguồn.

CTA sau ảnh:

**"BẠN ĐÃ DÀNH BAO LÂU CHO CHÍNH MÌNH HÔM NAY?"**

Nút chính:

**"KHÁM PHÁ HÓA ĐƠN CỦA TÔI"**

Nút phụ:

**"TÌM HIỂU TRÀ SÂM"**

Tất cả các trang khác phải kế thừa màu sắc, họa tiết và nhận diện từ Hero.

Không dùng ảnh sản phẩm của một thương hiệu khác. Khi thiếu ảnh, dùng placeholder hoặc họa tiết CSS/SVG và đánh dấu chờ bổ sung.

---

# PHẦN 3. THÔNG TIN NHÓM THỰC HIỆN VÀ LIÊN HỆ

Phải có một trang `/lien-he` chuyên nghiệp, đồng thời có phần liên hệ ở footer.

Thông tin chính xác:

### Thành viên 1

Họ và tên: **Phạm Thị Hoàng Mai**

Email: `Phamhoangmai084@gmail.com`

Số điện thoại: `0826134510`

### Thành viên 2

Họ và tên: **Nguyễn Lê Đông Xuân**

Email: `24126283@student.hcmute.edu.vn`

Số điện thoại: `0772199336`

### Thành viên 3

Họ và tên: **Lê Nguyễn Xuân Nhi**

Email: `24126163@student.hcmute.edu.vn`

Số điện thoại: `0938742571`

### Thành viên 4

Họ và tên: **Trần Thị Tường Vy**

Email: `24126280@student.hcmute.edu.vn`

Số điện thoại: `0867080518`

### Email liên hệ chung

`digichamps2006@gmail.com`

## 3.1. Thiết kế trang liên hệ

Thiết kế một section với tiêu đề:

**"KẾT NỐI CÙNG CHÚNG TÔI"**

Phụ đề:

"Mọi ý tưởng đều bắt đầu từ một cuộc trò chuyện."

Hiển thị bốn thành viên theo dạng card sang trọng.

Mỗi card gồm:

- Họ tên.
- Email.
- Số điện thoại.
- Icon email.
- Icon gọi điện.
- Nút sao chép email.

Email phải sử dụng `mailto:`.

Số điện thoại phải sử dụng `tel:`.

Không tự gán chức danh cho thành viên khi chưa có dữ liệu chính thức.

Không tự tạo ảnh chân dung người thật.

Nếu chưa có ảnh, dùng avatar chữ cái hoặc biểu tượng lá cây.

## 3.2. Biểu mẫu liên hệ

Có form gửi liên hệ với:

- Họ tên.
- Email.
- Chủ đề.
- Nội dung.
- Checkbox đồng ý xử lý thông tin.

Lưu liên hệ vào:

`data/runtime/contact-submissions.json`

Không gửi email tự động khi chưa cấu hình dịch vụ gửi thư.

Khi gửi thành công:

"Cảm ơn bạn đã liên hệ! Chúng tôi đã ghi nhận thông tin của bạn."

Có kiểm tra dữ liệu đầu vào, chống spam cơ bản, giới hạn kích thước nội dung và thông báo lỗi.

Bảo vệ thông tin liên hệ do người dùng gửi, chỉ quản trị viên được xem.

## 3.3. Footer

Footer phải có:

- Trà Sâm Trường Nhân.
- Thông điệp chiến dịch.
- Menu liên kết nhanh.
- Email chung `digichamps2006@gmail.com`.
- Liên kết tới trang nhóm thực hiện.
- Chính sách dữ liệu.
- Bản quyền giao diện.
- Thông báo đây là website mô phỏng chiến dịch nếu chưa được chủ thương hiệu xác nhận là trang chính thức.

Toàn bộ thông tin thành viên được lưu tập trung tại:

`data/content/team.json`

Không hardcode lặp lại dữ liệu trên nhiều component.

---

# PHẦN 4. TECH STACK

Sử dụng:

| Thành phần | Công nghệ |
|---|---|
| Frontend | Next.js App Router |
| Language | TypeScript strict |
| Styling | Tailwind CSS |
| Animation | Motion / Framer Motion |
| Icon | Lucide React |
| Charts | Recharts |
| Validation | Zod |
| Form | React Hook Form |
| API | Next.js Route Handlers |
| Data Storage | JSON File Storage |
| Image | Next Image |
| Tests | Vitest, Playwright khi khả dụng |

Sử dụng các phiên bản ổn định, tương thích với nhau.

Không dùng:

- PostgreSQL.
- MySQL.
- MongoDB.
- Firebase.
- Supabase.
- Prisma.
- Dịch vụ AI trả phí.

Dự án phải chạy trên Windows với Node.js LTS.

Các lệnh:

```bash
npm install
npm run dev
npm run build
npm run lint
npm run test
```

Website phải chạy tại:

`http://localhost:3000`

---

# PHẦN 5. HỆ THỐNG TRANG

Tạo các route sau:

```text
/
├── hoa-don-cho-doi
├── 7-phut-cho-minh
├── san-pham
├── thu-thach
├── gui-loi-nhac
├── chien-luoc
├── ve-du-an
├── lien-he
├── chinh-sach
└── admin
    ├── login
    ├── dashboard
    ├── submissions
    ├── contacts
    ├── content
    └── settings
```

Tất cả route phải có giao diện thực tế, không để trang trắng hoặc placeholder "Coming Soon" cho chức năng cốt lõi.

## 5.1. Trang chủ

Trang chủ là một hành trình kể chuyện tương tác.

Bố cục:

**Section 1 – Hero**

Sử dụng ảnh chính thức.

**Section 2 – Câu chuyện trì hoãn**

Dẫn dắt người xem suy nghĩ:

"Bạn có thể dành thời gian cho rất nhiều điều. Nhưng bao nhiêu phút trong số đó thực sự dành cho bạn?"

**Section 3 – Hóa đơn chờ đợi**

Giới thiệu tính năng chính và cho phép bắt đầu ngay.

**Section 4 – 7 phút cho mình**

Giới thiệu khoảng dừng nhỏ trong ngày.

**Section 5 – Khám phá sản phẩm**

Giới thiệu Trà Sâm Trường Nhân, thành phần và trải nghiệm pha trà.

**Section 6 – Thử thách cộng đồng**

Câu chuyện người tham gia, thể lệ và liên kết gửi bài.

**Section 7 – Gửi lời nhắc**

Khuyến khích chia sẻ lời quan tâm đến người thân.

**Section 8 – Nhóm thực hiện**

Card giới thiệu bốn thành viên và liên kết trang liên hệ.

Mỗi section cần có thiết kế riêng nhưng giữ nhất quán nhận diện.

## 5.2. Hóa đơn chờ đợi

Đây là tính năng được ưu tiên cao nhất.

Người dùng nhập thời gian cho các hoạt động:

- Công việc.
- Gia đình.
- Học tập.
- Việc nhà.
- Mạng xã hội.
- Giải trí.
- Chăm sóc bản thân.
- Hoạt động khác.

Cho phép chọn số giờ/phút và chỉnh sửa thuận tiện.

Sau khi nhấn **"TẠO HÓA ĐƠN"**, hệ thống tính dữ liệu thật và tạo một hóa đơn cá nhân.

Thiết kế hóa đơn giống giấy biên lai nghệ thuật, nền kem, chữ xanh rừng, viền vàng nhẹ.

Hiển thị:

- Mã hóa đơn ngẫu nhiên.
- Ngày tạo.
- Danh sách hoạt động.
- Tổng thời gian đã khai báo.
- Thời gian dành cho bản thân.
- Một thông điệp phù hợp với kết quả.

Không mặc định mọi khách hàng đều không dành thời gian cho bản thân.

Có các chức năng:

- Xuất ảnh PNG.
- In hóa đơn.
- Sao chép nội dung.
- Chia sẻ qua Web Share API nếu được hỗ trợ.
- Liên kết sang trải nghiệm 7 phút.
- Lưu dữ liệu qua API vào JSON.

Hóa đơn phải hoạt động tốt trên điện thoại.

## 5.3. 7 phút cho mình

Tạo giao diện đồng hồ đếm ngược 7 phút.

Có:

- Start.
- Pause.
- Resume.
- Reset.
- Thanh tiến trình.
- Hình vòng tròn tiến độ.
- Hình tách trà.
- Animation nhẹ.
- Lời nhắn tích cực.

Cho phép người dùng hoàn thành trải nghiệm mà không bắt buộc mua sản phẩm.

Khi kết thúc:

"Bạn đã dành 7 phút cho chính mình. Đó là một khởi đầu đáng trân trọng."

Gợi ý khám phá Trà Sâm Trường Nhân và chia sẻ lời nhắc.

Lưu sự kiện hoàn thành trong JSON.

## 5.4. Giới thiệu sản phẩm

Trang `/san-pham` cần có:

- Product Hero.
- Gallery ảnh sản phẩm.
- Thông tin sản phẩm.
- Thành phần tương tác.
- Hướng dẫn pha trà.
- Nguồn gốc và thông tin minh bạch.
- FAQ.
- CTA mua hàng.

Dữ liệu tham khảo:

Tên: Trà Sâm Trường Nhân.

Quy cách: 15 túi lọc × 2g.

Khối lượng: 30g.

Giá tham khảo trong kế hoạch: khoảng 380.000–390.000 VNĐ/hộp.

Thành phần điểm nhấn: 3% lá Sâm Ngọc Linh.

Các tỷ lệ còn lại cần đối chiếu từ nhãn và hồ sơ chính thức.

Không tự tạo công dụng y khoa.

Thiết kế phần "Khám phá thành phần" với hiệu ứng người dùng chọn từng loại thảo dược để xem thông tin.

Dùng hình ảnh thật khi có, nếu không sử dụng placeholder phù hợp.

Nút mua hàng phải lấy URL từ cấu hình JSON.

Nếu chưa có URL được xác minh thì không hiển thị liên kết giả.

## 5.5. Thử thách cộng đồng

Tên:

**"HÓA ĐƠN CỦA BẠN"**

Người tham gia có thể:

1. Tạo hóa đơn.
2. Thực hiện một việc nhỏ cho bản thân.
3. Đăng video kể câu chuyện.
4. Gửi liên kết bài dự thi.

Có form gửi bài và trang hiển thị bài được duyệt.

Lưu dưới dạng JSON.

Trạng thái:

- pending.
- approved.
- rejected.

Chỉ nội dung được duyệt mới được hiển thị.

Không tự tạo người dùng, phản hồi hay lượt tham gia giả rồi công bố như số liệu thật.

## 5.6. Gửi lời nhắc

Người dùng tạo thiệp cá nhân hóa.

Tùy chọn:

- Gửi cho bản thân.
- Gửi cho cha mẹ.
- Gửi cho bạn bè.
- Gửi cho đồng nghiệp.
- Gửi cho người thân.

Có nhiều mẫu thiệp xanh – kem – vàng đồng.

Các thao tác:

- Nhập nội dung.
- Chọn mẫu.
- Xem trước.
- Tải PNG.
- Copy nội dung.
- Chia sẻ.

Không tự động gửi tin nhắn đến người khác.

Không lưu nội dung cá nhân trừ khi người dùng đồng ý rõ ràng.

## 5.7. Trang chiến lược Digital Marketing

Thiết kế như một digital marketing report tương tác.

Nội dung dựa trên PDF:

- Tổng quan dự án.
- Thông tin thương hiệu.
- Phân tích thị trường.
- SWOT.
- TOWS.
- 7Ps.
- Đối thủ cạnh tranh.
- STP.
- Customer Persona.
- Customer Insight.
- Big Idea.
- Customer Journey.
- Content Pillars.
- Timeline 12 tuần.
- Ngân sách.
- KPI.
- Rủi ro.
- Kết luận.

Không trình bày dưới dạng văn bản dài đơn điệu.

Sử dụng:

- SWOT Matrix tương tác.
- TOWS cards.
- 7Ps interactive tabs.
- Timeline ba giai đoạn.
- Customer Journey infographic.
- Biểu đồ ngân sách.
- KPI cards.
- Accordion cho nội dung chi tiết.

Phân biệt số liệu kế hoạch và số liệu thực tế.

## 5.8. Trang quản trị

Có đăng nhập quản trị.

Quản trị viên có thể:

- Xem thống kê.
- Duyệt bài cộng đồng.
- Xem các liên hệ.
- Quản lý nội dung sản phẩm.
- Cập nhật thông tin nhóm.
- Cập nhật liên kết mạng xã hội.
- Cập nhật phase chiến dịch.
- Xem và xuất dữ liệu JSON phù hợp.
- Xem biểu đồ lượt tương tác.

Bảo vệ API quản trị ở phía server.

Sử dụng thông tin đăng nhập được cấu hình an toàn qua biến môi trường, không hardcode mật khẩu.

---

# PHẦN 6. LƯU DỮ LIỆU DƯỚI DẠNG JSON

Đây là yêu cầu bắt buộc.

Không sử dụng database bên ngoài.

## 6.1. Cấu trúc JSON

Tạo:

```text
data/
├── content/
│   ├── brand.json
│   ├── team.json
│   ├── product.json
│   ├── ingredients.json
│   ├── campaign.json
│   ├── strategy.json
│   ├── faqs.json
│   └── site-settings.json
│
├── seed/
│   ├── receipts.json
│   ├── analytics-events.json
│   ├── ugc-submissions.json
│   ├── contact-submissions.json
│   └── reminders.json
│
└── runtime/
    ├── receipts.json
    ├── analytics-events.json
    ├── ugc-submissions.json
    ├── contact-submissions.json
    └── reminders.json
```

`data/content` chứa dữ liệu mẫu, có thể version control.

`data/seed` chứa dữ liệu khởi tạo.

`data/runtime` chứa dữ liệu phát sinh, không đưa lên Git.

Không lưu dữ liệu nhạy cảm trong thư mục `public`.

## 6.2. JSON cho nhóm thực hiện

Khởi tạo `team.json`:

```json
{
  "teamEmail": "digichamps2006@gmail.com",
  "members": [
    {
      "id": "member-01",
      "name": "Phạm Thị Hoàng Mai",
      "email": "Phamhoangmai084@gmail.com",
      "phone": "0826134510"
    },
    {
      "id": "member-02",
      "name": "Nguyễn Lê Đông Xuân",
      "email": "24126283@student.hcmute.edu.vn",
      "phone": "0772199336"
    },
    {
      "id": "member-03",
      "name": "Lê Nguyễn Xuân Nhi",
      "email": "24126163@student.hcmute.edu.vn",
      "phone": "0938742571"
    },
    {
      "id": "member-04",
      "name": "Trần Thị Tường Vy",
      "email": "24126280@student.hcmute.edu.vn",
      "phone": "0867080518"
    }
  ]
}
```

Không tự ý sửa họ tên, email, số điện thoại.

## 6.3. JSON Storage Layer

Tạo service:

`src/lib/json-store.ts`

Chức năng:

- `readJson<T>()`
- `writeJsonAtomic<T>()`
- `appendRecord<T>()`
- `updateRecord<T>()`
- `deleteRecord<T>()`
- `ensureJsonFile()`

Yêu cầu:

- Sử dụng `fs/promises`.
- Bảo đảm encoding UTF-8.
- Validation dữ liệu bằng Zod.
- ID duy nhất.
- Tự tạo file runtime khi chưa tồn tại.
- Ghi ra file tạm rồi rename để tránh ghi dở.
- Có hàng đợi ghi theo file nhằm tránh xung đột trong cùng tiến trình.
- Không ghi đè khi phát hiện JSON lỗi định dạng.
- Có xử lý lỗi rõ ràng.
- Có backup JSON.
- Có script validate JSON.

Không sử dụng serverless filesystem để lưu dữ liệu lâu dài.

README phải giải thích rằng JSON file storage phù hợp cho demo hoặc một Node server có ổ đĩa ghi được, không phù hợp với triển khai đa phiên bản/đa tiến trình.

## 6.4. API

Tạo các API cần thiết:

```text
GET    /api/product
GET    /api/campaign
GET    /api/team
GET    /api/strategy

POST   /api/receipts
POST   /api/events
GET    /api/ugc
POST   /api/ugc
POST   /api/contact

POST   /api/admin/login
POST   /api/admin/logout
GET    /api/admin/stats
GET    /api/admin/submissions
PATCH  /api/admin/submissions/:id
GET    /api/admin/contacts
PATCH  /api/admin/product
PATCH  /api/admin/team
PATCH  /api/admin/campaign
```

Sử dụng Zod validation, kiểm tra quyền truy cập và rate limiting cơ bản.

Các API ghi file chạy trên Node.js runtime.

Không cho client truy cập đường dẫn JSON runtime trực tiếp.

---

# PHẦN 7. CHIẾN LƯỢC DIGITAL MARKETING

Triển khai theo ba giai đoạn được xác định trong PDF.

## Phase 1 – BẤM HOÃN

Tuần 1–4.

Thông điệp:

"Bạn đã hoãn điều gì cho bản thân?"

Website ưu tiên:

- Hóa đơn chờ đợi.
- Storytelling.
- Nội dung tạo nhận thức.
- Chia sẻ hình ảnh.

## Phase 2 – LÀM NGAY

Tuần 5–8.

Thông điệp:

"Một việc duy nhất đáng đợi 7 phút này."

Website ưu tiên:

- Bộ đếm 7 phút.
- Khám phá sản phẩm.
- Câu chuyện cộng đồng.
- Liên kết kênh mua hàng.

## Phase 3 – GỬI LỜI NHẮC

Tuần 9–12.

Thông điệp:

"Yêu thương cũng không nên đợi dịp."

Website ưu tiên:

- Thiệp lời nhắc.
- Chia sẻ câu chuyện.
- Hoạt động cộng đồng.
- Duy trì kết nối.

Cho phép chọn phase hiện tại trong quản trị.

Không tự kết luận chiến dịch đã triển khai thực tế.

---

# PHẦN 8. PHÂN TÍCH, ĐO LƯỜNG VÀ DASHBOARD

Dashboard cần theo dõi:

- Lượt tạo hóa đơn thành công.
- Lượt hoàn thành 7 phút.
- Lượt nhấp chia sẻ.
- Lượt nhấp liên kết sản phẩm.
- Lượt nhấp gian hàng.
- Số bài dự thi.
- Số bài đã duyệt.
- Số liên hệ.
- Số lượt tương tác theo ngày.
- Nguồn truy cập UTM khi có.

Không coi lượt nhấn chia sẻ là một lần chia sẻ chắc chắn thành công.

Không coi lượt nhấp gian hàng là đơn hàng.

Không hiển thị doanh số giả.

Những KPI mục tiêu từ kế hoạch phải được gắn nhãn "Mục tiêu".

Những kết quả đo được phải được gắn nhãn "Thực tế".

Không trộn hai loại số liệu.

---

# PHẦN 9. BẢO MẬT VÀ CHẤT LƯỢNG

Yêu cầu:

- TypeScript strict.
- Validation đầu vào.
- Bảo vệ API quản trị.
- Session qua cookie HttpOnly.
- Hash mật khẩu quản trị.
- Không đưa secret lên Git.
- Rate limit API nhận dữ liệu.
- Không lưu thông tin người dùng không cần thiết.
- Không tự tạo nhận xét khách hàng giả.
- Không sử dụng nội dung chưa xác minh như thông tin chính thức.
- Không đưa ra công dụng chữa bệnh.
- Có chính sách dữ liệu.
- Có xử lý lỗi JSON.
- Có giao diện lỗi và loading.
- Có empty state.
- Responsive.
- Accessible.
- SEO.
- Hiệu năng tốt.
- Tối ưu ảnh.
- Giảm animation khi thiết bị yêu cầu.

---

# PHẦN 10. HỆ THỐNG CHECKPOINT VÀ TIẾP TỤC CÔNG VIỆC

**ĐÂY LÀ YÊU CẦU CÓ MỨC ƯU TIÊN TƯƠNG ĐƯƠNG VỚI CHỨC NĂNG WEBSITE.**

Vì thời lượng phiên làm việc và context window của Codex có giới hạn, bạn phải xây dựng cơ chế ghi nhận tiến độ bền vững trên ổ đĩa.

Không chỉ tóm tắt trạng thái trong cuộc trò chuyện.

Phải tạo file checkpoint thực tế.

## 10.1. Tạo các file quản lý

```text
AGENTS.md

docs/
├── IMPLEMENTATION_PLAN.md
├── CHECKPOINT.md
├── TASKS.md
├── DECISIONS.md
└── TEST_RESULTS.md
```

Vai trò:

**AGENTS.md**

Quy định rằng ở bất kỳ phiên làm việc nào, Codex phải đọc các tài liệu checkpoint trước khi chỉnh sửa code.

**IMPLEMENTATION_PLAN.md**

Kế hoạch tổng thể và thứ tự triển khai.

**CHECKPOINT.md**

Trạng thái hiện tại, chặng cuối đã hoàn thành, công việc đang thực hiện và bước tiếp theo.

**TASKS.md**

Danh sách nhiệm vụ theo trạng thái:

- TODO.
- IN_PROGRESS.
- DONE.
- BLOCKED.

**DECISIONS.md**

Ghi lại quyết định thiết kế, kiến trúc và các thay đổi kỹ thuật quan trọng.

**TEST_RESULTS.md**

Ghi các lệnh kiểm thử, kết quả, lỗi chưa xử lý và thời điểm kiểm tra.

## 10.2. Chia dự án thành các checkpoint

Thực hiện theo thứ tự:

**CP-00 – Project Initialization**

- Kiểm tra workspace.
- Khởi tạo Next.js.
- Thiết lập TypeScript, Tailwind, dependencies.
- Tạo hệ thống checkpoint.
- Tạo cấu trúc thư mục.

**CP-01 – Branding & Design System**

- Đọc ảnh tham chiếu.
- Thiết lập màu sắc.
- Thiết lập typography.
- Tạo reusable components.
- Header, footer, navigation.
- Responsive layout cơ bản.

**CP-02 – JSON Storage & API Foundation**

- Tạo dữ liệu JSON.
- Tạo JSON storage service.
- Tạo Zod schemas.
- Tạo các API nền tảng.
- Kiểm thử đọc/ghi file.

**CP-03 – Landing Page**

- Hero.
- Storytelling.
- Các section chính.
- CTA.
- Footer và liên hệ.

**CP-04 – Hóa đơn chờ đợi**

- Form nhập thời gian.
- Xử lý logic.
- Tạo hóa đơn.
- Xuất PNG.
- Lưu JSON.
- Kiểm thử.

**CP-05 – 7 Phút Cho Mình**

- Timer.
- Pause, Resume, Reset.
- Animation.
- Event tracking.

**CP-06 – Product Experience**

- Trang sản phẩm.
- Thành phần tương tác.
- FAQ.
- Liên kết gian hàng.

**CP-07 – Community & Reminders**

- Thử thách.
- Gửi bài.
- Duyệt bài.
- Tạo thiệp.
- Chia sẻ.

**CP-08 – Strategy Dashboard**

- SWOT.
- TOWS.
- 7Ps.
- Timeline.
- KPI.
- Charts.

**CP-09 – Contact & Admin**

- Trang nhóm.
- Contact form.
- Admin authentication.
- Dashboard.
- Quản lý JSON.

**CP-10 – QA & Production Readiness**

- Responsive.
- SEO.
- Accessibility.
- Security review.
- Tests.
- Build.
- README.
- Kiểm tra hoàn chỉnh.

## 10.3. Quy tắc cập nhật checkpoint

BẮT BUỘC tuân thủ:

1. Trước khi bắt đầu một phase mới, cập nhật `CHECKPOINT.md` với trạng thái `IN_PROGRESS`.
2. Sau khi hoàn thành một phase, đánh dấu `DONE`.
3. Sau mỗi thay đổi quan trọng hoặc nhóm tác vụ nhỏ đã kiểm chứng, lưu trạng thái ngay.
4. Không chờ đến khi gần hết token mới ghi checkpoint.
5. Trước khi phiên kết thúc hoặc cần rút gọn ngữ cảnh, cập nhật checkpoint lần cuối.
6. Nếu công việc thất bại, ghi rõ lỗi và trạng thái `BLOCKED`.
7. Không đánh dấu DONE khi chưa thực sự hoàn thành hoặc kiểm thử.
8. Không xóa checkpoint cũ khi công việc chưa hoàn thành.
9. Không tự ghi "Đã hoàn thành" chỉ vì đã tạo file nhưng chưa kiểm tra chức năng.
10. Giữ file checkpoint ngắn gọn, chính xác, đủ để một phiên Codex mới tiếp tục mà không cần đọc toàn bộ lịch sử chat.

Không có cách nào bảo đảm luôn phát hiện chính xác token sắp hết. Vì vậy hãy ghi checkpoint thường xuyên sau từng nhóm công việc, thay vì phụ thuộc vào một tín hiệu token cuối cùng.

## 10.4. Định dạng CHECKPOINT.md

Bắt buộc sử dụng cấu trúc:

```markdown
# PROJECT CHECKPOINT

Project: Truong Nhan Digital Campaign

## Current Status

Current checkpoint: CP-04
Status: IN_PROGRESS
Last completed checkpoint: CP-03

## Completed Work

- Initialized Next.js project.
- Configured Tailwind CSS.
- Created JSON storage.
- Created API foundation.
- Completed landing page.

## Current Task

Implementing Receipt Generator.

## Completed Files

- src/app/page.tsx
- src/lib/json-store.ts
- src/components/home/Hero.tsx

## Files Being Modified

- src/app/hoa-don-cho-doi/page.tsx
- src/components/receipt/ReceiptForm.tsx

## Tests Passed

- TypeScript check passed.
- JSON read/write passed.

## Known Issues

- PNG export not finished.

## Next Actions

1. Finish PNG export.
2. Test receipt saving.
3. Complete CP-04.
4. Continue CP-05.

## Resume Command

Read AGENTS.md, docs/CHECKPOINT.md,
docs/TASKS.md, docs/DECISIONS.md,
and docs/TEST_RESULTS.md.

Inspect the source files and continue
from the latest unfinished task.
Do not repeat completed work.
```

Đây chỉ là mẫu cấu trúc. Nội dung thật phải phản ánh trạng thái thực tế.

## 10.5. Quy tắc khi hết token hoặc sang phiên Codex mới

Khi phải ngừng vì giới hạn phiên hoặc ngữ cảnh:

- Lưu tất cả thay đổi đã thực hiện.
- Cập nhật checkpoint.
- Ghi tên file đang sửa.
- Ghi vấn đề còn tồn tại.
- Ghi lệnh kiểm thử cuối cùng.
- Ghi bước tiếp theo có thể thực hiện ngay.
- Không khẳng định những việc chưa hoàn thành đã hoàn thành.

Khi tiếp tục, phải:

1. Đọc `AGENTS.md`.
2. Đọc `docs/CHECKPOINT.md`.
3. Đọc `docs/TASKS.md`.
4. Kiểm tra các tệp thực tế.
5. Đối chiếu tiến độ với mã nguồn.
6. Tiếp tục từ công việc dang dở.
7. Không tự khởi tạo lại dự án.
8. Không ghi đè các chức năng đã hoàn thành nếu không cần sửa lỗi.

## 10.6. Định dạng báo cáo cuối mỗi lượt làm việc

Cuối mỗi lượt, hiển thị:

```text
PROJECT: TRUONG NHAN CAMPAIGN

CHECKPOINT: CP-XX
STATUS: DONE / IN_PROGRESS / BLOCKED

COMPLETED:
- ...

FILES CREATED:
- ...

FILES MODIFIED:
- ...

TEST RESULTS:
- ...

KNOWN ISSUES:
- ...

NEXT TASK:
- ...

RESUME:
"Tiếp tục dự án theo AGENTS.md
và docs/CHECKPOINT.md"
```

Không cần chờ người dùng xác nhận từng checkpoint. Hãy tự tiếp tục thực hiện các phase trong phạm vi phiên hiện tại.

Chỉ dừng để hỏi khi có vấn đề thực sự không thể giải quyết bằng các giả định kỹ thuật an toàn.

---

# PHẦN 11. YÊU CẦU KIỂM THỬ

Ít nhất phải kiểm tra:

1. Website khởi động được.
2. Ảnh tham chiếu hiển thị đúng.
3. Responsive desktop/mobile.
4. Toàn bộ menu hoạt động.
5. Hóa đơn tính đúng.
6. Hóa đơn xuất PNG.
7. Hóa đơn ghi vào JSON.
8. Dữ liệu vẫn còn sau khi khởi động lại.
9. Đồng hồ 7 phút hoạt động.
10. Form liên hệ lưu JSON.
11. Gửi bài dự thi.
12. Duyệt bài.
13. API quản trị được bảo vệ.
14. Trang sản phẩm lấy dữ liệu từ JSON.
15. Trang liên hệ hiển thị đúng bốn thành viên.
16. Email `mailto:` đúng.
17. Điện thoại `tel:` đúng.
18. Dashboard không sử dụng số liệu giả.
19. TypeScript kiểm tra thành công.
20. Production build thành công.

Nếu chức năng chưa kiểm thử được, ghi rõ trong `TEST_RESULTS.md`.

---

# PHẦN 12. README VÀ HƯỚNG DẪN CHẠY

README phải giải thích:

- Cách cài đặt Node.js.
- Cách cài dependencies.
- Cách khởi chạy.
- Cách đặt ảnh bìa vào thư mục public.
- Cách chỉnh thông tin nhóm.
- Cách chỉnh nội dung sản phẩm.
- Cách cấu hình mật khẩu quản trị.
- Cách sử dụng JSON storage.
- Cách sao lưu JSON.
- Cách reset dữ liệu demo.
- Cách chạy test.
- Cách build production.
- Giới hạn khi triển khai JSON trên serverless.
- Cách tiếp tục công việc bằng checkpoint.

Tạo `.env.example`, không đưa thông tin bí mật thật vào repository.

---

# PHẦN 13. QUY ĐỊNH THỰC THI CUỐI CÙNG

Bắt đầu thực hiện dự án ngay.

Thứ tự ưu tiên:

1. Khởi tạo dự án.
2. Tạo checkpoint system.
3. Đọc ảnh tham chiếu.
4. Xây dựng Design System.
5. Tạo giao diện trang chủ.
6. Tạo JSON storage.
7. Xây dựng các tính năng chính.
8. Hoàn thành trang quản trị.
9. Kiểm thử.
10. Hoàn thiện.

Không tạo một website chung chung có thể thay tên thương hiệu là dùng cho bất kỳ sản phẩm nào.

Toàn bộ giao diện phải thể hiện rõ bản sắc Trà Sâm Trường Nhân: thiên nhiên, thảo dược, núi Ngọc Linh, sự chăm sóc, thời gian và cảm xúc.

Không chỉ xây dựng mockup.

Không chỉ viết pseudocode.

Không chỉ mô tả cấu trúc file.

**PHẢI TẠO CODE THỰC TẾ VÀ CHẠY ĐƯỢC.**

Luôn cập nhật checkpoint ngay khi có phần việc hoàn thành.

Nếu phiên làm việc bị giới hạn, ưu tiên bảo toàn mã nguồn, tiến độ và hướng dẫn tiếp tục thay vì bỏ dở mà không có thông tin.

Mục tiêu cuối cùng là có một website Digital Marketing tương tác, có thể trình diễn trước giảng viên hoặc ban giám khảo, đồng thời có cấu trúc đủ tốt để tiếp tục phát triển thành một chiến dịch thực tế.

**BÂY GIỜ HÃY BẮT ĐẦU CODE, KHÔNG DỪNG LẠI Ở BƯỚC LẬP KẾ HOẠCH.**