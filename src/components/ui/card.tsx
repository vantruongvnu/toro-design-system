import * as React from "react"

// ─────────────────────────────────────────────────────────────
// TOROqc Card Component
//
// Brand rules:
// - Nền: bg-white (trên page bg-toro-cream) hoặc bg-toro-cream (trên nền trắng)
// - Border: 1px solid toro-muted (#E4E4E7)
// - Bo góc: rounded-lg (8px) — bắt buộc
// - KHÔNG dùng shadow trên Card
// - Padding chuẩn: p-4 (compact) hoặc p-6 (default)
// ─────────────────────────────────────────────────────────────

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Padding bên trong card */
  padding?: "none" | "sm" | "md" | "lg"
  /** Nền card — white khi đặt trên nền cream, cream khi đặt trên nền trắng */
  background?: "white" | "cream"
  /** Có viền hay không */
  bordered?: boolean
  /** Hover state nhẹ — dùng khi card là clickable */
  hoverable?: boolean
}

const paddingStyles = {
  none: "",
  sm:   "p-3",
  md:   "p-4",
  lg:   "p-6",
}

/**
 * TOROqc Card — Khối chứa nội dung cơ bản.
 *
 * @example
 * // Card metric đơn giản
 * <Card>
 *   <CardHeader>Doanh thu hôm nay</CardHeader>
 *   <CardContent>₫12,500,000</CardContent>
 * </Card>
 *
 * // Card clickable
 * <Card hoverable onClick={handleClick}>...</Card>
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      padding = "md",
      background = "white",
      bordered = true,
      hoverable = false,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const base = "rounded-lg overflow-hidden"
    const bg = background === "white" ? "bg-white" : "bg-toro-cream"
    const border = bordered ? "border border-toro-muted" : ""
    const hover = hoverable
      ? "cursor-pointer transition-colors hover:bg-toro-cream/70 active:bg-toro-cream"
      : ""

    return (
      <div
        ref={ref}
        className={`${base} ${bg} ${border} ${hover} ${paddingStyles[padding]} ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Card.displayName = "Card"

// ─── Sub-components ───────────────────────────────────────────

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Hành động phụ hiển thị bên phải header (VD: button "Xem tất cả") */
  action?: React.ReactNode
}

/**
 * TOROqc CardHeader — Phần tiêu đề của Card.
 * Tự động layout flex space-between khi có action.
 */
export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ action, className = "", children, ...props }, ref) => (
    <div
      ref={ref}
      className={`flex items-center justify-between mb-3 ${className}`}
      {...props}
    >
      <div className="font-semibold text-toro-dark text-base">{children}</div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
)
CardHeader.displayName = "CardHeader"

/**
 * TOROqc CardContent — Phần nội dung chính của Card.
 */
export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = "", children, ...props }, ref) => (
    <div ref={ref} className={`text-toro-dark ${className}`} {...props}>
      {children}
    </div>
  )
)
CardContent.displayName = "CardContent"

/**
 * TOROqc CardFooter — Phần chân Card, thường chứa actions.
 */
export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = "", children, ...props }, ref) => (
    <div
      ref={ref}
      className={`flex items-center gap-2 mt-4 pt-4 border-t border-toro-muted ${className}`}
      {...props}
    >
      {children}
    </div>
  )
)
CardFooter.displayName = "CardFooter"

/**
 * TOROqc MetricCard — Card hiển thị một chỉ số KPI.
 * Dùng cho Dashboard overview.
 *
 * @example
 * <MetricCard
 *   label="Đơn hàng hôm nay"
 *   value="1,284"
 *   trend="+12%"
 *   trendUp={true}
 * />
 */
export interface MetricCardProps {
  label: string
  value: string | number
  /** Phần trăm thay đổi so với kỳ trước */
  trend?: string
  /** true = tăng (xanh), false = giảm (đỏ) */
  trendUp?: boolean
  /** Icon nhỏ bên cạnh label */
  icon?: React.ReactNode
  className?: string
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  trend,
  trendUp,
  icon,
  className = "",
}) => (
  <Card className={className}>
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs text-toro-dark/60 font-medium mb-1 flex items-center gap-1">
          {icon && <span className="inline-flex">{icon}</span>}
          {label}
        </p>
        <p className="text-2xl font-bold text-toro-dark tracking-tight">{value}</p>
      </div>
      {trend && (
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-md ${
            trendUp
              ? "bg-toro-success/10 text-toro-success"
              : "bg-toro-danger/10 text-toro-danger"
          }`}
        >
          {trend}
        </span>
      )}
    </div>
  </Card>
)
MetricCard.displayName = "MetricCard"
