import * as React from "react"

// ─────────────────────────────────────────────────────────────
// TOROqc Input Component
//
// Brand rules:
// - Border: 1px solid toro-muted (#E4E4E7)
// - Focus ring: ring-2 ring-toro-brand/40
// - Bo góc: rounded-lg (8px)
// - Height: 40px (md), 36px (sm), 44px (lg)
// - Placeholder: text-toro-dark/40
// - Error state: border-toro-danger, ring-toro-danger/30
// ─────────────────────────────────────────────────────────────

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Kích thước input */
  size?: "sm" | "md" | "lg"
  /** Label hiển thị phía trên input */
  label?: string
  /** Text hỗ trợ bên dưới input */
  hint?: string
  /** Thông báo lỗi — khi có, input chuyển sang error state */
  error?: string
  /** Icon bên trái */
  leftIcon?: React.ReactNode
  /** Icon hoặc element bên phải (VD: clear button, toggle password) */
  rightElement?: React.ReactNode
  /** Bắt buộc nhập */
  required?: boolean
}

const sizeStyles = {
  sm: "h-9 text-sm px-3",
  md: "h-10 text-sm px-3",
  lg: "h-11 text-base px-4",
}

/**
 * TOROqc Input — Ô nhập liệu chuẩn thương hiệu.
 *
 * @example
 * // Input cơ bản
 * <Input label="Tên khách hàng" placeholder="Nhập họ tên..." />
 *
 * // Với icon và lỗi
 * <Input
 *   label="Số điện thoại"
 *   leftIcon={<PhoneIcon />}
 *   error="Số điện thoại không hợp lệ"
 * />
 *
 * // Search input
 * <Input
 *   placeholder="Tìm kiếm đơn hàng..."
 *   leftIcon={<SearchIcon />}
 *   rightElement={<Button size="sm" iconOnly>✕</Button>}
 * />
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = "md",
      label,
      hint,
      error,
      leftIcon,
      rightElement,
      required,
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? `input-${Math.random().toString(36).slice(2, 7)}`
    const hasError = Boolean(error)

    const inputClass = [
      "w-full rounded-lg bg-white",
      "border transition-colors",
      "text-toro-dark placeholder:text-toro-dark/40",
      "outline-none",
      "focus:ring-2 focus:ring-offset-0",
      hasError
        ? "border-toro-danger focus:ring-toro-danger/30 focus:border-toro-danger"
        : "border-toro-muted focus:ring-toro-brand/40 focus:border-toro-brand/60",
      "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-toro-cream",
      sizeStyles[size],
      leftIcon ? "pl-9" : "",
      rightElement ? "pr-9" : "",
    ].join(" ")

    return (
      <div className="flex flex-col gap-1">
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-toro-dark"
          >
            {label}
            {required && (
              <span className="text-toro-danger ml-0.5">*</span>
            )}
          </label>
        )}

        {/* Input wrapper */}
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-toro-dark/40 pointer-events-none">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`${inputClass} ${className}`}
            aria-invalid={hasError}
            aria-describedby={
              hasError ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
            }
            {...props}
          />
          {rightElement && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2">
              {rightElement}
            </span>
          )}
        </div>

        {/* Error message */}
        {hasError && (
          <p id={`${inputId}-error`} className="text-xs text-toro-danger mt-0.5">
            {error}
          </p>
        )}

        {/* Hint text */}
        {!hasError && hint && (
          <p id={`${inputId}-hint`} className="text-xs text-toro-dark/50 mt-0.5">
            {hint}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"
