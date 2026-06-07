import * as React from "react"

// ─────────────────────────────────────────────────────────────
// TOROqc Table Component
//
// Brand rules:
// - Header: bg-toro-cream, text-toro-dark, font-medium, text-sm
// - Row hover: hover:bg-toro-cream/60
// - Divider: divide-y divide-toro-muted
// - KHÔNG dùng border ngoài bao quanh table
// - Cell padding: px-4 py-3 (md), px-3 py-2 (sm)
// ─────────────────────────────────────────────────────────────

export interface Column<T = Record<string, unknown>> {
  /** Key trong data object */
  key: string
  /** Label hiển thị ở header */
  header: string
  /** Custom render cell */
  render?: (value: unknown, row: T, index: number) => React.ReactNode
  /** Căn lề */
  align?: "left" | "center" | "right"
  /** Class tùy chỉnh cho cột */
  className?: string
  /** Cho phép sắp xếp */
  sortable?: boolean
}

export interface TableProps<T = Record<string, unknown>> {
  /** Danh sách cột */
  columns: Column<T>[]
  /** Dữ liệu */
  data: T[]
  /** Key duy nhất cho mỗi row */
  rowKey?: string | ((row: T) => string)
  /** Kích thước bảng */
  size?: "sm" | "md"
  /** Trạng thái loading */
  loading?: boolean
  /** Text hiển thị khi không có dữ liệu */
  emptyText?: string
  /** Callback khi click row */
  onRowClick?: (row: T, index: number) => void
  className?: string
}

const alignClass = {
  left:   "text-left",
  center: "text-center",
  right:  "text-right",
}

const cellPadding = {
  sm: "px-3 py-2",
  md: "px-4 py-3",
}

/**
 * TOROqc Table — Bảng dữ liệu chuẩn thương hiệu.
 *
 * @example
 * const columns = [
 *   { key: "id", header: "Mã đơn" },
 *   { key: "amount", header: "Giá trị", align: "right",
 *     render: (v) => `₫${v.toLocaleString()}` },
 *   { key: "status", header: "Trạng thái",
 *     render: (v) => <Badge variant={v === "success" ? "success" : "warning"}>{v}</Badge> },
 * ]
 * <Table columns={columns} data={orders} rowKey="id" />
 */
export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  rowKey = "id",
  size = "md",
  loading = false,
  emptyText = "Không có dữ liệu",
  onRowClick,
  className = "",
}: TableProps<T>) {
  const getKey = (row: T, index: number): string => {
    if (typeof rowKey === "function") return rowKey(row)
    return String(row[rowKey] ?? index)
  }

  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <table className="w-full border-collapse">
        {/* Header */}
        <thead>
          <tr className="bg-toro-cream border-b border-toro-muted">
            {columns.map((col) => (
              <th
                key={col.key}
                className={[
                  cellPadding[size],
                  "text-xs font-medium text-toro-dark/60 uppercase tracking-wide whitespace-nowrap",
                  alignClass[col.align ?? "left"],
                  col.className ?? "",
                ].join(" ")}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody className="divide-y divide-toro-muted">
          {loading ? (
            // Loading skeleton rows
            Array.from({ length: 5 }).map((_, i) => (
              <tr key={i}>
                {columns.map((col) => (
                  <td key={col.key} className={cellPadding[size]}>
                    <div className="h-4 bg-toro-muted/60 rounded animate-pulse" />
                  </td>
                ))}
              </tr>
            ))
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className={`${cellPadding[size]} text-center text-sm text-toro-dark/40 py-10`}
              >
                {emptyText}
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr
                key={getKey(row, index)}
                onClick={onRowClick ? () => onRowClick(row, index) : undefined}
                className={[
                  "transition-colors",
                  "hover:bg-toro-cream/60",
                  onRowClick ? "cursor-pointer" : "",
                ].join(" ")}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={[
                      cellPadding[size],
                      "text-sm text-toro-dark",
                      alignClass[col.align ?? "left"],
                      col.className ?? "",
                    ].join(" ")}
                  >
                    {col.render
                      ? col.render(row[col.key], row, index)
                      : String(row[col.key] ?? "—")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

Table.displayName = "Table"
