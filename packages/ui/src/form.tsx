import { FormHTMLAttributes, InputHTMLAttributes, LabelHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "./utils";

export function Form({ className, ...props }: FormHTMLAttributes<HTMLFormElement>) {
  return <form className={cn("muflow-form", className)} {...props} />;
}

export function FormField({ children, className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("muflow-form-field", className)} {...props}>{children}</label>;
}

export function FormLabel({ children }: { children: ReactNode }) {
  return <span className="muflow-form-label">{children}</span>;
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn("muflow-input", className)} {...props} />;
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn("muflow-textarea", className)} {...props} />;
}

export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn("muflow-select", className)} {...props} />;
}
