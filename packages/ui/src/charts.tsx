import { HTMLAttributes } from "react";
import { cn } from "./utils";

export type ChartPoint = {
  label: string;
  value: number;
};

export type BarChartProps = HTMLAttributes<HTMLDivElement> & {
  data: ChartPoint[];
  max?: number;
};

export function BarChart({ className, data, max, ...props }: BarChartProps) {
  const highest = max || Math.max(1, ...data.map((item) => item.value));

  return (
    <div className={cn("muflow-chart muflow-chart--bar", className)} {...props}>
      {data.map((item) => (
        <div className="muflow-chart__bar" key={item.label}>
          <i style={{ height: `${Math.max(4, (item.value / highest) * 100)}%` }} />
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </div>
      ))}
    </div>
  );
}

export function Metric({ label, value, change }: { change?: string; label: string; value: string }) {
  return (
    <article className="muflow-metric">
      <span>{label}</span>
      <strong>{value}</strong>
      {change ? <small>{change}</small> : null}
    </article>
  );
}
