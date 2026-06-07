/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        toro: {
          // Core brand palette — TOROqc Design System v1.0
          brand:   "#CC785C",  // Cam đất — Primary CTA, active state
          dark:    "#141413",  // Gần đen — Body text, heading
          cream:   "#F7F5F2",  // Kem ấm — Page background (không dùng #fff)
          muted:   "#E4E4E7",  // Xám nhạt — Border, divider
          accent:  "#5E6AD2",  // Tím — Badge info, link
          success: "#3DAB6B",  // Xanh lá — Trạng thái thành công
          warning: "#F5A623",  // Vàng — Cảnh báo, pending
          danger:  "#E5484D",  // Đỏ — Lỗi, destructive
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      fontSize: {
        "2xs": ["11px", { lineHeight: "16px" }],
        xs:   ["13px", { lineHeight: "18px" }],
        sm:   ["14px", { lineHeight: "20px" }],
        base: ["15px", { lineHeight: "24px" }],
        lg:   ["18px", { lineHeight: "28px" }],
        xl:   ["20px", { lineHeight: "28px" }],
        "2xl":["24px", { lineHeight: "32px" }],
        "3xl":["32px", { lineHeight: "40px" }],
      },
      borderRadius: {
        sm:   "4px",
        DEFAULT: "8px",   // Chuẩn TORO cho Card, Button, Input
        md:   "6px",      // Badge
        lg:   "8px",
        xl:   "12px",
        "2xl":"16px",
      },
      spacing: {
        xs:  "4px",
        sm:  "8px",
        md:  "16px",
        lg:  "24px",
        xl:  "32px",
        "2xl":"48px",
      },
      boxShadow: {
        // TORO chỉ dùng shadow nhẹ cho floating elements
        sm:  "0 1px 2px 0 rgba(20,20,19,0.05)",
        DEFAULT: "0 1px 3px 0 rgba(20,20,19,0.08), 0 1px 2px -1px rgba(20,20,19,0.06)",
        // Không bao giờ dùng shadow-lg/xl cho Card
      },
      maxWidth: {
        content: "1280px",
      },
      animation: {
        "fade-in": "fadeIn 150ms ease-out",
        "slide-down": "slideDown 150ms ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-4px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
}
