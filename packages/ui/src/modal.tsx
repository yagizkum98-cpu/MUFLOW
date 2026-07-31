"use client";

import { ReactNode } from "react";
import { cn } from "./utils";

export type ModalProps = {
  children: ReactNode;
  className?: string;
  footer?: ReactNode;
  onClose: () => void;
  open: boolean;
  title: ReactNode;
};

export function Modal({ children, className, footer, onClose, open, title }: ModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div aria-modal="true" className="muflow-modal" role="dialog">
      <button aria-label="Kapat" className="muflow-modal__backdrop" onClick={onClose} type="button" />
      <section className={cn("muflow-modal__panel", className)}>
        <header>
          <h2>{title}</h2>
          <button aria-label="Kapat" onClick={onClose} type="button">×</button>
        </header>
        <div className="muflow-modal__body">{children}</div>
        {footer ? <footer>{footer}</footer> : null}
      </section>
    </div>
  );
}
