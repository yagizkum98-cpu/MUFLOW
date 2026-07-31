import { HTMLAttributes, ReactNode } from "react";
import { cn } from "./utils";

export type TableColumn<T> = {
  key: keyof T | string;
  header: ReactNode;
  render?: (row: T) => ReactNode;
};

export type TableProps<T> = HTMLAttributes<HTMLDivElement> & {
  columns: Array<TableColumn<T>>;
  emptyText?: string;
  rows: T[];
};

export function Table<T extends Record<string, unknown>>({ className, columns, emptyText = "Kayıt yok", rows, ...props }: TableProps<T>) {
  return (
    <div className={cn("muflow-table-wrap", className)} {...props}>
      <table className="muflow-table">
        <thead>
          <tr>
            {columns.map((column) => <th key={String(column.key)}>{column.header}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length}>{emptyText}</td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr key={String(row.id || index)}>
                {columns.map((column) => (
                  <td key={String(column.key)}>{column.render ? column.render(row) : String(row[column.key] ?? "")}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
