import { HTMLAttributes, ReactNode } from "react";
import { cn } from "./utils";

export type CardProps = HTMLAttributes<HTMLElement> & {
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
};

export function Card({ children, className, description, eyebrow, footer, title, ...props }: CardProps) {
  return (
    <article className={cn("muflow-card", className)} {...props}>
      {eyebrow || title || description ? (
        <header className="muflow-card__header">
          {eyebrow ? <p className="muflow-card__eyebrow">{eyebrow}</p> : null}
          {title ? <h3>{title}</h3> : null}
          {description ? <p>{description}</p> : null}
        </header>
      ) : null}
      {children ? <div className="muflow-card__body">{children}</div> : null}
      {footer ? <footer className="muflow-card__footer">{footer}</footer> : null}
    </article>
  );
}
