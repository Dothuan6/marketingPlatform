# Digital Marketing — Prototype MVP (HTML tĩnh)

Prototype bấm được cho **Phase 1 (MVP)** của nền tảng Digital Marketing cho SME, bám theo bộ tài liệu `00-ROADMAP.md` → `20-RUI-RO-VA-QUYET-DINH-MO.md`.

- Thuần HTML/CSS/JS, **không có bước build**, không framework.
- Dữ liệu mẫu: thương hiệu **Phát Đạt Jewelry** (ngành Trang sức & Phụ kiện — trang sức bạc nữ S925 đính đá CZ lấp lánh, giá mềm: nhẫn, lắc tay, bông tai, dây chuyền). Đổi từ Mộc Lan Cosmetics ngày 30/09/2026.
- **Không gọi AI thật** — nội dung "AI sinh" được ghép từ mẫu viết sẵn trong `assets/data.js`.
- Thay đổi của người xem được lưu trong trình duyệt (localStorage). Nút **Bản đồ prototype → Đặt lại dữ liệu demo** để về trạng thái ban đầu.

## Cập nhật 01/10/2026 — tên hệ thống, khung giờ, chiến dịch, lịch 3 kiểu xem

- **Tên hệ thống:** Digital Marketing (by TuoiTreSoft).
- **Quy tắc khung giờ:** trên **một kênh**, mỗi khung giờ **1 tiếng** (vd 19:00–19:59) chỉ có **1 bài**. Một ngày được nhiều bài (khác khung giờ hoặc khác kênh). Được chặn/kiểm ở mọi chỗ đổi giờ:
  - Bài viết → khối Lịch đăng: đổi giờ trùng thì chặn và gợi ý khung trống gần nhất; đổi kênh thì tự chọn giờ trống; thêm dòng kiểm “Không trùng khung giờ”.
  - Lịch: kéo-thả trên **Tuần/Ngày** vào khung đã có bài thì chặn; kéo trên **Tháng** giữ giờ, trùng thì tự dời sang khung trống gần nhất; kéo đổi ngày trong Bảng cũng tự dời.
  - Dữ liệu cũ có trùng → cảnh báo đỏ ở Lịch 30 ngày + nút “Tự dời sang khung trống gần nhất”; hàng đợi Tự động đăng hiện trạng thái “Trùng khung giờ” (bài sau không tự đăng); workflow WF-05 bước “Kiểm tra trước khi đăng” có kiểm khung giờ.
  - Bản thật: ràng buộc UNIQUE (kênh, ngày, khung giờ) trên Collection Bài viết.
- **Chiến dịch** (nút “Tạo chiến dịch” ở Lịch 30 ngày hoặc menu “+ Tạo”): chọn khoảng ngày, kênh, các khung giờ mỗi ngày → sinh nhiều bài/ngày (Mở màn → Chứng thực/Sản phẩm/Tương tác/Đếm ngược → Chốt đơn), xem trước trước khi tạo; khung đã có bài thường thì **dời** hoặc **bỏ**. Có thẻ quản lý (xem lịch, xoá chiến dịch — bài đã đăng được giữ). Dữ liệu demo có sẵn chiến dịch “Flash sale cuối tuần”. Bài chiến dịch không tính vào tỷ lệ nhóm nội dung.
- **Thêm bài vào một ngày** (nút + ở ô ngày/ô giờ): gợi ý nhóm nội dung đang thiếu, kiểm khung giờ trực tiếp.
- **Lịch 3 kiểu xem:** Tháng (lịch tháng thật, tối đa 3 bài/ô + “+N”) → Tuần (lưới giờ 06:00–23:00 × 7 ngày) → Ngày (lưới giờ × kênh: mỗi ô = 1 khung giờ của 1 kênh). Có Hôm nay, ‹ ›, bấm ngày để mở kiểu Ngày. Link trực tiếp: `plan.html?cal=day&ngay=2026-10-10`.

## Cập nhật 29/09/2026 — theo kết quả brainstorm đa AI

Prototype đã được cập nhật theo **21 ý Phase 1** trong `outputs/30-BRAINSTORM-DA-AI.md` §9. Chi tiết từng màn: `outputs/31-YEU-CAU-CAP-NHAT-PROTOTYPE.md`.

- **Người mới:** chỉ 5 câu (≈ 90 giây) → thấy ngay **Lịch 30 ngày** + bài đầu tiên đã viết (TTFV < 3 phút). Các câu còn lại hỏi đúng lúc cần, mỗi lần 1 câu.
- **Tên tiếng Việt thống nhất:** Hồ sơ thương hiệu · Lý do khách chọn bạn · Góc kể chuyện · Khách hàng điển hình · Nhóm nội dung · Câu mở đầu · Lời kêu gọi (nút ⓘ giải thích 1 dòng).
- **Kênh đăng:** Facebook/Instagram tự đăng (Mức 1, app Meta của công ty TTS); Zalo OA đăng tay (Mức 0) qua màn **Đăng bài này**. Nhắc bằng **thông báo đẩy + email** (không cần Zalo OA).
- **Dùng thử 7 ngày / hạn mức:** Bản đồ prototype → *Xem như: Dùng thử / Đã trả phí*.
- **Bổ sung 30/09:** câu chọn nào cũng có "Khác…" + lựa chọn theo ngành; sau 5 câu có nút "Trả lời thêm" (không bắt buộc); nút "Tôi đã tự đăng" chống đăng trùng.

## Phạm vi Phase 1

**Bắt đầu (5 câu) → Lịch 30 ngày → Bài viết → Duyệt tuần → Tự động đăng / Đăng bài này → Báo cáo tháng**

Không làm video / kịch bản / audio ở phase này. Đo hiệu quả bằng số liệu Meta để sau; Phase 1 dùng phản hồi 1 chạm của chủ shop.

## Các màn hình

| # | File | Màn | Ý đã duyệt |
| --- | --- | --- | --- |
| — | `index.html` | Tổng quan: hôm nay/ngày mai đăng gì, phản hồi 1 chạm, nhắc duyệt tuần, câu hồ sơ còn thiếu | CL-05, 13, 16 |
| 1 | `onboarding.html` | Bắt đầu: 5 câu, điền nhanh từ link **hoặc ảnh chụp màn hình**, máy dò câu trả lời mơ hồ | CL-01, 02, 04, 22 |
| 2 | `brand.html` | Hồ sơ thương hiệu: độ đầy theo nhóm + Điền ngay, từ **Cấm/Cảnh báo** theo ngành, **Kho ảnh** | CL-05, 06, 15 |
| 3 | `strategy.html` | Chiến lược: tóm tắt 3 dòng, tên tiếng Việt, câu tầng 2 đúng chỗ | CL-21, 22, 01 |
| 4 | `plan.html` | Lịch 30 ngày: lần đầu (TTFV, Tuần đầu tiên, hỏi bật thông báo), sự kiện & mùa vụ, tạo theo lô, khoá dùng thử | CL-12, 17, 19, 20, 22, 25 |
| 5 | `post.html` | Bài viết: Vì sao bài này, đổi câu mở đầu, kiểm 2 mức, ảnh, hẹn giờ/Huỷ hẹn, phản hồi 24h | CL-06, 07, 09, 11, 15, 16 |
| 6 | `automation.html` | Tự động đăng: sơ đồ hẹn giờ có mã hẹn, kênh Mức 0/1, kênh nhắc, mô phỏng “Cần kiểm tra” | CL-10, 11, 25 |
| — | `review.html` | **Duyệt tuần** trong 5 phút (thẻ, Sửa nhanh 3 trường, Duyệt tất cả khi xem ≥ 50%) | CL-13 |
| — | `publish.html` | **Đăng bài này** (điện thoại, Mức 0): 2 nút, Đã nhận → Đã đăng | CL-10 v2 |
| — | `report.html` | **Báo cáo tháng**: tách số ghi nhận / ước tính, lập kế hoạch tháng sau | CL-18 |

`script.html` chỉ còn là trang chuyển hướng sang `automation.html` — có thể xoá.

### Workflow WF-05 (hẹn giờ từng bài có mã hẹn — engine ERP chưa lặp được qua nhiều bản ghi, H2)

1. **Bài được duyệt hoặc đổi giờ** → ghi mã hẹn mới (lưu ngầm) → một lượt chạy riêng cho bài.
2. **Chờ đến giờ đăng.**
3. **Bài vẫn đúng lịch hẹn?** — đọc lại chính bài: còn “Đã duyệt” và mã hẹn không đổi. Không → thoát lặng lẽ.
4. **Kiểm tra** — từ Cấm, cảnh báo đã xác nhận, ảnh (Instagram bắt buộc), độ dài.
5. **Kênh Mức 1?** — Mức 0 (Zalo OA / chưa cấp quyền): gửi gói nhận bài qua thông báo đẩy + email; quá giờ 30 phút nhắc 1 lần.
6. **Khoá bài & đăng** — lỗi chắc chắn chưa gửi: thử lại 30 giây / 2 phút / 10 phút; không rõ kết quả: “Cần kiểm tra” + 2 nút.
7. **Cập nhật lịch** → **Báo lại**. 24 giờ sau hỏi phản hồi 😐 🙂 🔥.

## Luồng thử nhanh

1. Bản đồ prototype → **Đặt lại dữ liệu demo**.
2. `onboarding.html?fresh=1` → dán link Facebook (bị từ chối) → Ảnh chụp màn hình → Dùng ảnh mẫu → trả lời 5 câu.
3. Lịch 30 ngày: hộp hỏi thông báo, Tuần đầu tiên, thẻ 20/10 → mở bài đầu → Đổi câu mở đầu → Duyệt & hẹn giờ.
4. `review.html`, `publish.html`, `report.html?demo=1`, `automation.html`.

## Chạy thử trên máy

```bash
# trong thư mục Prototytpe
python -m http.server 8080
# mở http://localhost:8080
```

Mở thẳng file `index.html` bằng trình duyệt cũng chạy được.

## Đẩy lên GitHub

```bash
cd Prototytpe
git init
git add .
git commit -m "Prototype MVP Digital Marketing"
git branch -M main
git remote add origin https://github.com/tts-org/marketing-platform-prototype.git
git push -u origin main
```

## Deploy Netlify

**Cách 1 — nối với GitHub (tự deploy mỗi lần push):**
Netlify → *Add new site* → *Import an existing project* → chọn repo → để trống *Build command*, *Publish directory* = `.` → *Deploy*.
File `netlify.toml` đã cấu hình sẵn nên Netlify tự nhận.

**Cách 2 — kéo thả:** vào https://app.netlify.com/drop và kéo cả thư mục `Prototytpe` vào.

GitHub Pages cũng chạy được (đã có `.nojekyll`): *Settings → Pages → Deploy from branch → main / root*.

## Cấu trúc

```
Prototytpe/
├─ index.html · onboarding.html · brand.html · strategy.html · plan.html · post.html · automation.html
├─ review.html · publish.html · report.html   (mới 29/09)
├─ 404.html · netlify.toml · .nojekyll · README.md
└─ assets/
   ├─ styles.css   theme HubSpot (`data-brand="crm"`): token sáng/tối + shell + component
   ├─ theme.js     đặt sáng/tối trước khi vẽ trang
   ├─ app.js       shell (sidebar, topbar), icon, toast, modal, tạo lại, diff, state
   ├─ data.js      12 câu hỏi (5 câu tầng 1), preset ngành (mặc định Trang sức & Phụ kiện), từ Cấm/Cảnh báo ngành trang sức, kho ảnh, sự kiện mùa vụ, 30 mục lịch, bộ ghép nội dung
   ├─ favicon.ico · favicon-32.png · apple-touch-icon.png · icon-512.png   (favicon từ logo TuoiTreSoft)
   ├─ favicon.svg  (giữ tương thích, nhúng PNG)
   ├─ fonts/material-symbols-subset.woff2   bộ icon Material Symbols Outlined rút gọn (~7 KB, 106 icon, tự host)
   └─ brand/
      ├─ tuoitresoft-logo.png   logo đầy đủ (kèm chữ TUOITRESOFT.COM, nền trong suốt)
      └─ tuoitresoft-mark.png   biểu tượng kim cương — dùng ở sidebar và đầu trang onboarding
```

## Ghi chú về design system

**Theme: HubSpot layer của XBuild ERP** (`DESIGN-SYSTEM-HUBSPOT.md`, cập nhật 30/09). Chức năng giữ nguyên 100%, chỉ đổi giao diện.

- **Shell**: topbar tối `#333` 56px (tìm kiếm + `Ctrl K`, “+ Tạo”, chuông duyệt, sáng/tối, avatar) · sidebar tối 236px · nội dung trong khung trắng bo 16px, cách 8px trên nền tối.
- **Màu**: 1 màu nhấn duy nhất teal `#00494B` (link `#006162`, nền nhạt `#E0F0EF`); chữ `#333/#666`; viền `#CCC/#E3E3E3`; nền trang `#F0F0F0`. Chữ trạng thái đã chỉnh tương phản (xanh `#137333`, cam `#8A4B00`, đỏ `#B3261E`). Dark mode theo §10.
- **Nút** dạng viên thuốc 32/28px chữ 13/600 · **Badge** trạng thái có chấm 6px · **Tag** cho kênh/định dạng · **OptionPill** nền đặc màu `cat-1…4` cho nhóm nội dung (Giáo dục, Sản phẩm, Chứng thực, Giải trí).
- **Template**: T1 danh sách (`plan.html` — ObjectHeader, lối tắt đã lưu, QuickFilterBar, bảng cột tên dính + “Xem trước” mở drawer, dạng bảng/board/lịch) · T2 bản ghi 3 cột (`post.html`) · T3 dashboard (`index.html`, `report.html`) · T4 cấu hình (brand, chiến lược, tự động đăng).
- **Icon**: Material Symbols Outlined, gọi qua `MP.icon('tên')` (map tên → codepoint trong `app.js`). Thêm icon mới = thêm glyph vào file font subset.
- **Component mới so với design system** (cần bổ sung vào DS trước khi code thật): `ObjectHeader` (tiêu đề + menu góc nhìn), `QuickFilterBar`, `SavedViewTabs`, `OptionPill` cho SELECT, `PropertyList` (“Về bài này”), `Drawer` dạng dock ≥1240px, `CommandPalette` (Ctrl K), `Board` (kanban theo giai đoạn); cùng các component từ các vòng trước: `Wizard/StepIndicator`, `ContentCalendar`, `GenerationProgress`, `DiffViewer`, `WorkflowCanvas/Node`, `RunLog`, `TermInfo`, `ImagePicker`, `FeedbackButtons`, `ReviewCard`, `BigActionButton`, `QuotaCard`.
- Tiếng Việt sentence case; nhóm nội dung/trạng thái luôn có **chữ** (không chỉ màu); `EmptyState` ở mọi màn trống.

## Phụ thuộc bên ngoài

- Font **Inter + Be Vietnam Pro** (Google Fonts) — mất mạng vẫn chạy bằng font hệ thống. Icon tự host, không phụ thuộc mạng.
- **SheetJS** (cdnjs) chỉ tải khi bấm *Xuất Excel*; lỗi tải thì tự chuyển sang CSV.
