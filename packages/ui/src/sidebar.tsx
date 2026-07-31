"use client";

import { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "./utils";

export type SidebarItem = AnchorHTMLAttributes<HTMLAnchorElement> & {
  active?: boolean;
  icon?: ReactNode;
  label: ReactNode;
};

export type SidebarProps = {
  brand?: ReactNode;
  className?: string;
  footer?: ReactNode;
  items: SidebarItem[];
};

export function Sidebar({ brand, className, footer, items }: SidebarProps) {
  return (
    <aside className={cn("muflow-sidebar", className)}>
      {brand ? <div className="muflow-sidebar__brand">{brand}</div> : null}
      <nav>
        {items.map(({ active, icon, label, className: itemClassName, ...item }) => (
          <a className={cn("muflow-sidebar__item", active && "active", itemClassName)} key={String(item.href || label)} {...item}>
            {icon ? <span>{icon}</span> : null}
            <strong>{label}</strong>
          </a>
        ))}
      </nav>
      {footer ? <footer>{footer}</footer> : null}
    </aside>
  );
}
