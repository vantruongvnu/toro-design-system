import * as React from "react"

// ─────────────────────────────────────────────────────────────
// TOROqc Button Component
//
// Brand rules:
// - Primary: bg-toro-brand (#CC785C) text-white — dùng cho CTA chính
// - Secondary: border toro-brand/30, bg-transparent — dùng cho hành động phụ
// - Ghost: không viền, không nền — dùng trong toolbar/nav
// - Destructive: bg-toro-danger text-white — chỉ dùng cho xóa/hủy
//
// KHÔNG dùng rounded-full. Bo góc chuẩn: rounded-lg (8px)
// KHÔNG dùng shadow trên Button
// ─────────────────────────────────────────────────────────────

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Kiểu hiển thị của button */
  variant?: "primary" | "secondary" | "ghost" | "destructive" | "outline"
  /** Kích thước button */
  size?: "sm" | "md" | "lg"
  /** Trạng thái loading — hiển thị spinner, disable click */
  isLoading?: boolean
  /** Icon bên trái text */
  leftIcon?: React.ReactNode
  /** Icon bên phải text */
  rightIcon?: React.ReactNode
  /** Chỉ hiển thị icon, không có text (square button) */
  iconOnly?: boolean
}

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:     "bg-toro-brand text-white hover:bg-toro-brand/90 active:bg-toro-brand/80",
  secondary:   "border border-toro-brand/30 text-toro-dark bg-transparent hover:bg-toro-cream active:bg-toro-muted/40",
  ghost:       "text-toro-dark bg-transparent hover:bg-toro-cream active:bg-toro-muted/40",
  destructive: "bg-toro-danger text-white hover:bg-toro-danger/90 active:bg-toro-danger/80",
  outline:     "border border-toro-muted text-toro-dark bg-transparent hover:bg-toro-cream",
}

const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "h-8 px-3 text-sm gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2",
}

const iconOnlySize: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "h-8 w-8 p-0",
  md: "h-10 w-10 p-0",
  lg: "h-12 w-12 p-0",
}

/**
 * TOROqc Button — Component hành động chính của hệ thống.
 *
 * @example
 * // CTA chính
 * <Button variant="primary">Xác nhận đơn hàng</Button>
 *
 * // Hành động phụ
 * <Button variant="secondary" leftIcon={<PlusIcon />}>Thêm mới</Button>
 *
 * // Trạng thái loading
 * <Button variant="primary" isLoading>Đang xử lý...</Button>
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      iconOnly = false,
      leftIcon,
      rightIcon,
      className = "",
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const base = [
      "inline-flex items-center justify-center",
      "font-medium rounded-lg",
      "transition-colors duration-150",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-toro-brand/50 focus-visible:ring-offset-1",
      "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
    ].join(" ")

    const sizeClass = iconOnly ? iconOnlySize[size] : sizeStyles[size]

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${base} ${variantStyles[variant]} ${sizeClass} ${className}`}
        {...props}
      >
        {isLoading ? (
          <span className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
        ) : (
          <>
            {leftIcon && <span className="shrink-0 inline-flex">{leftIcon}</span>}
            {!iconOnly && children}
            {rightIcon && <span className="shrink-0 inline-flex">{rightIcon}</span>}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = "Button"
