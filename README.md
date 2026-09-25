# Marketing Agent — Prototype MVP (HTML tĩnh)

Prototype bấm được cho **Phase 1 (MVP)** của nền tảng Marketing Agent cho SME, bám theo bộ tài liệu `00-ROADMAP.md` → `20-RUI-RO-VA-QUYET-DINH-MO.md`.

- Thuần HTML/CSS/JS, **không có bước build**, không framework.
- Dữ liệu mẫu: thương hiệu giả lập **Mộc Lan Cosmetics** (ngành Thời trang & Mỹ phẩm).
- **Không gọi AI thật** — nội dung "AI sinh" được ghép từ mẫu viết sẵn trong `assets/data.js`.
- Thay đổi của người xem được lưu trong trình duyệt (localStorage). Nút **Bản đồ prototype → Đặt lại dữ liệu demo** để về trạng thái ban đầu.

## Phạm vi Phase 1

**Onboarding → Brand Brain → Chiến lược → Lịch đăng → Bài viết → Tự động đăng (workflow ERP)**

Không làm video / kịch bản / audio ở phase này. Kênh đăng: **Facebook Page, Instagram Business, Zalo OA** (TikTok cần video nên để sau). Đo hiệu quả bài đăng làm sau Phase 1.

## Các màn hình

| # | File | Màn | User story |
| --- | --- | --- | --- |
| — | `index.html` | Tổng quan: "hôm nay / ngày mai đăng gì" kèm việc workflow sẽ làm, tiến độ 6 bước, hạn mức | US-504 |
| 1 | `onboarding.html` | Wizard 12 câu, chọn ngành, dán link tự điền, tự lưu nháp, đồng hồ TTFV | US-101 → 104 |
| 2 | `brand.html` | Brand Brain: 12 trường sửa tại chỗ, nguồn dữ liệu, giọng, từ cấm, học giọng từ bài cũ | US-105, 501 → 503 |
| 3 | `strategy.html` | USP · Angle · Persona · Pillar/kênh/tần suất, sửa tại chỗ, tạo lại từng khối, phiên bản | US-201 → 206 |
| 4 | `plan.html` | Lịch đăng 30 ngày: bảng + lịch, giờ đăng, kéo-thả, kiểm tỷ lệ pillar, cảnh báo trùng ý, sinh hàng loạt, xuất Excel/CSV | US-301 → 307, 403 |
| 5 | `post.html` | Bài viết: caption, hashtag, gợi ý hình, kiểm tự động, tạo lại + so sánh, **giờ đăng/kênh, duyệt để tự đăng** | US-401, 404 → 406, 601 |
| 6 | `automation.html` | **Tự động đăng**: sơ đồ workflow (bấm từng bước để cấu hình), hàng đợi đăng, kết nối kênh, lịch sử chạy từng bước | US-602 → 606 (mới) |

`script.html` chỉ còn là trang chuyển hướng sang `automation.html` — có thể xoá.

### Workflow WF-AUTO-POST (chạy trên engine của HarnexAI)

1. **Kích hoạt** — quét lịch mỗi 5 phút, lấy bài đến giờ đăng.
2. **Điều kiện: bài đã duyệt?** — chưa: nhắc duyệt qua Zalo trước N tiếng, quá giờ thì dời sang hôm sau. (Có chế độ tự đăng mọi bài đạt kiểm.)
3. **Kiểm tra trước khi đăng** — từ cấm, thông tin thương hiệu, có ảnh, độ dài theo kênh. Không đạt: tạm dừng + báo.
4. **Điều kiện: kênh đã kết nối?** — chưa: gửi nội dung qua Zalo để đăng tay, chủ shop bấm "Tôi đã đăng".
5. **Đăng lên kênh** — thử lại 3 lần (30 giây → 2 phút → 10 phút); vẫn lỗi thì đánh dấu "Đăng lỗi" và báo ngay.
6. **Cập nhật lịch đăng** — "Đã đăng", lưu link bài.
7. **Báo lại** — Zalo + email.

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
git commit -m "Prototype MVP Marketing Agent"
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
├─ 404.html · netlify.toml · .nojekyll · README.md
└─ assets/
   ├─ styles.css   token 3 tầng (primitive → semantic → component) + component
   ├─ theme.js     đặt sáng/tối trước khi vẽ trang
   ├─ app.js       shell (sidebar, topbar), icon, toast, modal, tạo lại, diff, state
   ├─ data.js      12 câu hỏi, preset ngành, chiến lược mẫu, 30 mục lịch, bộ ghép nội dung
   └─ favicon.svg
```

## Ghi chú về design system

- Token trong `styles.css` đặt theo 3 tầng giống `@xbuild/ui` (HarnexAI). Khi package thật sẵn sàng, **thay khối `:root` bằng `tokens.css` của `@xbuild/ui`** — tên biến semantic (`--surface`, `--text-2`, `--primary`…) là chỗ cần map.
- Đã theo các quy tắc của `12-DESIGN-SYSTEM-REUSE.md`: tiếng Việt sentence case, dark mode hạng nhất, pillar/trạng thái luôn có **icon + chữ** (không chỉ màu), `EmptyState` ở mọi màn trống.
- Component mới xuất hiện trong prototype (cần đưa vào `DESIGN-SYSTEM.md` §8 trước khi code thật): `Wizard/StepIndicator`, `ContentCalendar`, `ContentItemCard`, `PillarChip` (variant của `Badge`), `GenerationProgress`, `ToneSelector` (variant của `Picker`), `DiffViewer`, `WorkflowCanvas` / `WorkflowNode` (nên lấy từ trình dựng workflow của HarnexAI), `Switch`, `RunLog`.

## Phụ thuộc bên ngoài

- Font **Be Vietnam Pro** (Google Fonts) — mất mạng vẫn chạy bằng font hệ thống.
- **SheetJS** (cdnjs) chỉ tải khi bấm *Xuất Excel*; lỗi tải thì tự chuyển sang CSV.
