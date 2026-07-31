import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "./utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({ children, className, icon, size = "md", variant = "primary", ...props }: ButtonProps) {
  return (
    <button className={cn("muflow-button", `muflow-button--${variant}`, `muflow-button--${size}`, className)} {...props}>
      {icon ? <span className="muflow-button__icon">{icon}</span> : null}
      <span>{children}</span>
    </button>
  );
}
