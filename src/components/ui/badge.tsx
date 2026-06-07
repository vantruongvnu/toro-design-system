import * as React from "react"

// ─────────────────────────────────────────────────────────────
// TOROqc Badge Component
//
// Brand rules:
// - Dùng màu nền nhạt (/15 opacity) + chữ màu tương ứng
// - Bo góc: rounded-md (6px) — KHÔNG dùng rounded-full cho trạng thái nghiệp vụ
// - Kích thước: text-xs, font-medium, px-2 py-0.5
// ─────────────────────────────────────────────────────────────

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Loại badge:
   * - default: xám nhạt — trạng thái trung tính
   * - brand: cam đất — nổi bật thương hiệu
   * - success: xanh lá — hoàn thành, đã giao
   * - warning: vàng cam — đang xử lý, chờ duyệt
   * - danger: đỏ — lỗi, hủy, thất bại
   * - accent: tím — thông tin, mới
   */
  variant?: "default" | "brand" | "success" | "warning" | "danger" | "accent"
  /** Hiển thị chấm màu bên trái */
  dot?: boolean
}

const variantStyles: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "bg-toro-muted/60 text-toro-dark/70",
  brand:   "bg-toro-brand/15 text-toro-brand",
  success: "bg-toro-success/15 text-toro-success",
  warning: "bg-toro-warning/15 text-toro-warning",
  danger:  "bg-toro-danger/15 text-toro-danger",
  accent:  "bg-toro-accent/15 text-toro-accent",
}

const dotColors: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "bg-toro-dark/40",
  brand:   "bg-toro-brand",
  success: "bg-toro-success",
  warning: "bg-toro-warning",
  danger:  "bg-toro-danger",
  accent:  "bg-toro-accent",
}

/**
 * TOROqc Badge — Nhãn trạng thái và danh mục.
 *
 * @example
 * // Trạng thái đơn hàng
 * <Badge variant="success" dot>Đã giao hàng</Badge>
 * <Badge variant="warning" dot>Đang xử lý</Badge>
 * <Badge variant="danger">Đã hủy</Badge>
 *
 * // Tag danh mục
 * <Badge variant="accent">Quick Commerce</Badge>
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "default", dot = false, className = "", children, ...props }, ref) => (
    <span
      ref={ref}
      className={[
        "inline-flex items-center gap-1",
        "text-xs font-medium",
        "px-2 py-0.5 rounded-md",
        "whitespace-nowrap",
        variantStyles[variant],
        className,
      ].join(" ")}
      {...props}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColors[variant]}`} />
      )}
      {children}
    </span>
  )
)

Badge.displayName = "Badge"

// ─── Status Badge preset cho TORO order states ───────────────

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled"

const orderStatusConfig: Record<OrderStatus, { variant: BadgeProps["variant"]; label: string }> = {
  pending:    { variant: "default",  label: "Chờ xác nhận" },
  processing: { variant: "warning",  label: "Đang xử lý" },
  shipped:    { variant: "accent",   label: "Đang giao" },
  delivered:  { variant: "success",  label: "Đã giao" },
  cancelled:  { variant: "danger",   label: "Đã hủy" },
}

/**
 * TOROqc OrderStatusBadge — Badge preset cho trạng thái đơn hàng Quick Commerce.
 *
 * @example
 * <OrderStatusBadge status="delivered" />
 * // → renders: Badge variant="success" dot > "Đã giao"
 */
export const OrderStatusBadge: React.FC<{ status: OrderStatus; className?: string }> = ({
  status,
  className,
}) => {
  const config = orderStatusConfig[status]
  return (
    <Badge variant={config.variant} dot className={className}>
      {config.label}
    </Badge>
  )
}
OrderStatusBadge.displayName = "OrderStatusBadge"
