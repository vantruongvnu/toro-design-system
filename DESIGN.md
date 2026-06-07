# TOROqc Design System
**Version:** 1.0 | **Brand:** TORO — Quick Commerce Enabler

---

## Brand Philosophy
**Warm Minimalism** — ấm áp nhưng không rườm rà. Thiết kế phục vụ nội dung, không cạnh tranh với nội dung.
TORO là thương hiệu Quick Commerce — mọi UI cần truyền tải cảm giác **nhanh, tin cậy, thân thiện**.
Mascot: **British Shorthair** (Người Gác Điểm Tĩnh) — nghiêm túc, tự tin, mắt vàng cảnh giác.

---

## Color Tokens

```yaml
colors:
  brand:    "#CC785C"   # Cam đất — Primary CTA, active state, highlight
  dark:     "#141413"   # Gần đen — Body text, heading, icon
  cream:    "#F7F5F2"   # Kem ấm — Page background (KHÔNG dùng #ffffff)
  muted:    "#E4E4E7"   # Xám nhạt — Border, divider, input border
  accent:   "#5E6AD2"   # Tím nhạt — Badge info, link, secondary highlight
  success:  "#3DAB6B"   # Xanh lá — Trạng thái thành công, confirmed
  warning:  "#F5A623"   # Vàng cam — Cảnh báo, pending
  danger:   "#E5484D"   # Đỏ — Lỗi, destructive action
  white:    "#FFFFFF"   # Chỉ dùng cho text trên nền tối
```

---

## Typography

| Role        | Font        | Weight      | Size        |
|-------------|-------------|-------------|-------------|
| Heading H1  | Inter       | 700 (Bold)  | 32px / 2rem |
| Heading H2  | Inter       | 600 (SemiBold) | 24px    |
| Heading H3  | Inter       | 600         | 18px        |
| Body        | Inter       | 400 (Regular) | 15px      |
| Caption     | Inter       | 400         | 13px        |
| Label/Button| Inter       | 500 (Medium)| 14px        |

- Line height body: **1.6**
- Letter spacing heading: **-0.02em**
- KHÔNG dùng font-bold cho body text

---

## Spacing Scale

| Token | Value | Dùng khi             |
|-------|-------|----------------------|
| xs    | 4px   | Gap icon–text nhỏ    |
| sm    | 8px   | Padding nội bộ nhỏ   |
| md    | 16px  | Padding card, section|
| lg    | 24px  | Margin giữa sections |
| xl    | 32px  | Padding page         |
| 2xl   | 48px  | Section spacing lớn  |

---

## Border & Shadow Rules

- **Bo góc (border-radius):** `8px` cho tất cả Card, Button, Input, Modal
- **Border Card:** `1px solid #E4E4E7` — KHÔNG dùng shadow trên Card
- **Shadow:** Chỉ dùng `shadow-sm` cho Dropdown, Tooltip, Menu nổi
- **KHÔNG** dùng `shadow-lg`, `shadow-xl` cho bất kỳ Card hay Panel nào

---

## Component Rules

### Button
- **Primary:** `bg-toro-brand text-white` — hover `opacity-90`
- **Secondary:** `border border-toro-brand/30 text-toro-dark bg-transparent`
- **Ghost:** `text-toro-dark hover:bg-toro-cream`
- **Destructive:** `bg-danger text-white`
- Bo góc: `rounded-lg` (8px) — KHÔNG dùng `rounded-full` cho button hành động
- Min height: 40px cho md, 32px cho sm, 48px cho lg

### Card
- Nền: `bg-white` hoặc `bg-toro-cream`
- Border: `border border-toro-muted`
- Bo góc: `rounded-lg`
- Padding: `p-4` (16px) hoặc `p-6` (24px)
- KHÔNG dùng shadow

### Input / Form
- Border: `1px solid toro-muted`
- Focus ring: `ring-2 ring-toro-brand/40`
- Bo góc: `rounded-lg`
- Height: 40px (md), 36px (sm)
- Placeholder: `text-toro-dark/40`

### Badge
- Dùng màu nền nhạt (`/15` opacity) + chữ màu tương ứng
- Bo góc: `rounded-md` (6px)
- Không bao giờ dùng `rounded-full` cho badge trạng thái nghiệp vụ

### Table
- Header: `bg-toro-cream text-toro-dark font-medium text-sm`
- Row hover: `hover:bg-toro-cream/60`
- Border: `divide-y divide-toro-muted`
- Không dùng border ngoài bao quanh table

---

## Layout Principles

- **Page background:** `bg-toro-cream` — TUYỆT ĐỐI không dùng `bg-white` cho toàn trang
- **Content max-width:** `max-w-7xl mx-auto`
- **Section padding:** `px-6 py-8` mobile | `px-12 py-12` desktop
- **Sidebar width:** 240px (fixed)
- **Header height:** 56px

---

## Do's & Don'ts

### NÊN làm
- Dùng `toro-brand` (#CC785C) cho mọi CTA chính
- Dùng `toro-cream` (#F7F5F2) làm nền trang — không bao giờ dùng trắng tinh
- Bo góc nhẹ 8px cho tất cả các khối
- Khoảng trắng rộng rãi — đừng nhồi nhét element

### KHÔNG nên làm
- Không dùng gradient
- Không dùng `shadow-lg` hay `shadow-xl` trên Card
- Không dùng màu ngoài bảng token đã định nghĩa
- Không dùng animation quá 200ms
- Không dùng font-bold cho body text
- Không dùng `#ffffff` làm page background
- Không dùng `rounded-full` cho button hành động hoặc badge nghiệp vụ

---

## Icon Library
Sử dụng **Lucide Icons** — stroke style, 20px default, stroke-width 1.5.
Màu icon: kế thừa từ text color của container (currentColor).
