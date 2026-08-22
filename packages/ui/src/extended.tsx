"use client";

import {
  forwardRef,
  useId,
  useState,
  type FormEvent,
  type FormHTMLAttributes,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { Button } from "./shared";

function classes(...values: Array<string | undefined | false>) {
  return values.filter(Boolean).join(" ");
}

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: "neutral" | "accent" | "success" | "warning";
};
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { tone = "neutral", className, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      className={classes("yd-badge", `yd-badge--${tone}`, className)}
      {...props}
    />
  );
});

export type BannerProps = HTMLAttributes<HTMLElement> & {
  title: string;
  tone?: "info" | "success" | "warning";
  action?: ReactNode;
  onDismiss?: () => void;
};
export function Banner({
  title,
  tone = "info",
  action,
  onDismiss,
  children,
  className,
  ...props
}: BannerProps) {
  return (
    <section
      className={classes("yd-banner", `yd-banner--${tone}`, className)}
      role={tone === "warning" ? "alert" : "status"}
      {...props}
    >
      <span className="yd-banner__icon" aria-hidden="true">
        {tone === "success" ? "✓" : tone === "warning" ? "!" : "i"}
      </span>
      <div>
        <strong>{title}</strong>
        {children ? <p>{children}</p> : null}
      </div>
      {action ? <div className="yd-banner__action">{action}</div> : null}
      {onDismiss ? (
        <button type="button" aria-label="Fermer" onClick={onDismiss}>
          ×
        </button>
      ) : null}
    </section>
  );
}

export type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> & { label: ReactNode; description?: string };
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ label, description, className, ...props }, ref) {
    return (
      <label className={classes("yd-checkbox", className)}>
        <input ref={ref} type="checkbox" {...props} />
        <span className="yd-checkbox__control" aria-hidden="true" />
        <span>
          <strong>{label}</strong>
          {description ? <small>{description}</small> : null}
        </span>
      </label>
    );
  },
);

export type SwitchProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "role"
> & { label: ReactNode };
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { label, className, ...props },
  ref,
) {
  return (
    <label className={classes("yd-switch", className)}>
      <input ref={ref} type="checkbox" role="switch" {...props} />
      <span className="yd-switch__track" aria-hidden="true">
        <span />
      </span>
      <span>{label}</span>
    </label>
  );
});

export type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string;
};
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField({ label, hint, error, id, className, ...props }, ref) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const messageId = `${inputId}-message`;
    return (
      <div className={classes("yd-field", className)}>
        <label htmlFor={inputId}>{label}</label>
        <input
          ref={ref}
          id={inputId}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={hint || error ? messageId : undefined}
          {...props}
        />
        {error || hint ? (
          <small id={messageId} className={error ? "is-error" : undefined}>
            {error ?? hint}
          </small>
        ) : null}
      </div>
    );
  },
);

export type TooltipProps = HTMLAttributes<HTMLSpanElement> & {
  content: ReactNode;
  children: ReactNode;
};
export function Tooltip({
  content,
  children,
  className,
  ...props
}: TooltipProps) {
  const id = useId();
  return (
    <span className={classes("yd-tooltip", className)} {...props}>
      <span tabIndex={0} aria-describedby={id}>
        {children}
      </span>
      <span id={id} role="tooltip" className="yd-tooltip__bubble">
        {content}
      </span>
    </span>
  );
}

export type PopoverProps = HTMLAttributes<HTMLDivElement> & {
  triggerLabel: string;
  title?: string;
};
export function Popover({
  triggerLabel,
  title,
  children,
  className,
  ...props
}: PopoverProps) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className={classes("yd-popover", className)} {...props}>
      <Button
        variant="secondary"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((current) => !current)}
      >
        {triggerLabel}
      </Button>
      {open ? (
        <section id={id} className="yd-popover__panel">
          <button
            type="button"
            aria-label="Fermer"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
          {title ? <strong>{title}</strong> : null}
          <div>{children}</div>
        </section>
      ) : null}
    </div>
  );
}

export type DataTableColumn = {
  key: string;
  label: string;
  align?: "start" | "end";
};
export type DataTableProps = HTMLAttributes<HTMLDivElement> & {
  caption: string;
  columns: DataTableColumn[];
  rows: Array<Record<string, ReactNode>>;
};
export function DataTable({
  caption,
  columns,
  rows,
  className,
  ...props
}: DataTableProps) {
  return (
    <div className={classes("yd-table-wrap", className)} {...props}>
      <table className="yd-table">
        <caption>{caption}</caption>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col" data-align={column.align}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={String(row.id ?? index)}>
              {columns.map((column) => (
                <td key={column.key} data-align={column.align}>
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export type PaginationProps = HTMLAttributes<HTMLElement> & {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
};
export function Pagination({
  page,
  pageCount,
  onPageChange,
  className,
  ...props
}: PaginationProps) {
  const pages = Array.from(
    { length: pageCount },
    (_, index) => index + 1,
  ).filter(
    (value) =>
      value === 1 || value === pageCount || Math.abs(value - page) <= 1,
  );
  return (
    <nav
      className={classes("yd-pagination", className)}
      aria-label="Pagination"
      {...props}
    >
      <button
        type="button"
        disabled={page <= 1}
        aria-label="Page précédente"
        onClick={() => onPageChange(page - 1)}
      >
        ←
      </button>
      {pages.map((value, index) => (
        <span key={value}>
          {index > 0 && pages[index - 1] !== value - 1 ? (
            <i aria-hidden="true">…</i>
          ) : null}
          <button
            type="button"
            aria-current={value === page ? "page" : undefined}
            aria-label={`Page ${value}`}
            onClick={() => onPageChange(value)}
          >
            {value}
          </button>
        </span>
      ))}
      <button
        type="button"
        disabled={page >= pageCount}
        aria-label="Page suivante"
        onClick={() => onPageChange(page + 1)}
      >
        →
      </button>
    </nav>
  );
}

export type ToastProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
  tone?: "neutral" | "success" | "warning";
  onDismiss?: () => void;
};
export function Toast({
  title,
  tone = "neutral",
  onDismiss,
  children,
  className,
  ...props
}: ToastProps) {
  return (
    <div
      className={classes("yd-toast", `yd-toast--${tone}`, className)}
      role={tone === "warning" ? "alert" : "status"}
      {...props}
    >
      <span aria-hidden="true">{tone === "success" ? "✓" : "•"}</span>
      <div>
        <strong>{title}</strong>
        {children ? <p>{children}</p> : null}
      </div>
      {onDismiss ? (
        <button type="button" aria-label="Fermer" onClick={onDismiss}>
          ×
        </button>
      ) : null}
    </div>
  );
}

export type FooterColumn = {
  title: string;
  links: Array<{ label: string; href: string }>;
};
export type FooterProps = HTMLAttributes<HTMLElement> & {
  brand: ReactNode;
  description?: string;
  columns: FooterColumn[];
  legal?: ReactNode;
};
export function Footer({
  brand,
  description,
  columns,
  legal,
  className,
  ...props
}: FooterProps) {
  return (
    <footer className={classes("yd-footer", className)} {...props}>
      <div className="yd-footer__brand">
        <strong>{brand}</strong>
        {description ? <p>{description}</p> : null}
      </div>
      {columns.map((column) => (
        <nav key={column.title} aria-label={column.title}>
          <strong>{column.title}</strong>
          {column.links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      ))}
      {legal ? <div className="yd-footer__legal">{legal}</div> : null}
    </footer>
  );
}

export type SignupValues = { name: string; email: string; accepted: boolean };
export type SignupFormProps = Omit<
  FormHTMLAttributes<HTMLFormElement>,
  "onSubmit"
> & {
  onSubmit: (values: SignupValues) => void | Promise<void>;
  loading?: boolean;
  error?: string;
};
export function SignupForm({
  onSubmit,
  loading,
  error,
  className,
  ...props
}: SignupFormProps) {
  const [values, setValues] = useState<SignupValues>({
    name: "",
    email: "",
    accepted: false,
  });
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void onSubmit(values);
  };
  return (
    <form
      className={classes("yd-signup", className)}
      onSubmit={submit}
      {...props}
    >
      <header>
        <p>Créer un espace</p>
        <h2>Commencez gratuitement</h2>
      </header>
      {error ? <div role="alert">{error}</div> : null}
      <TextField
        label="Nom"
        name="name"
        autoComplete="name"
        required
        value={values.name}
        onChange={(event) => setValues({ ...values, name: event.target.value })}
      />
      <TextField
        label="E-mail"
        name="email"
        type="email"
        autoComplete="email"
        required
        value={values.email}
        onChange={(event) =>
          setValues({ ...values, email: event.target.value })
        }
      />
      <Checkbox
        label="J’accepte les conditions d’utilisation"
        required
        checked={values.accepted}
        onChange={(event) =>
          setValues({ ...values, accepted: event.target.checked })
        }
      />
      <Button type="submit" loading={loading}>
        Créer mon compte
      </Button>
    </form>
  );
}

export type StatCardProps = HTMLAttributes<HTMLElement> & {
  label: string;
  value: ReactNode;
  trend?: string;
  icon?: ReactNode;
};
export function StatCard({
  label,
  value,
  trend,
  icon,
  className,
  ...props
}: StatCardProps) {
  return (
    <article className={classes("yd-stat", className)} {...props}>
      <span>{label}</span>
      {icon ? <i aria-hidden="true">{icon}</i> : null}
      <strong>{value}</strong>
      {trend ? <small>{trend}</small> : null}
    </article>
  );
}

export type ProgressBarProps = HTMLAttributes<HTMLDivElement> & {
  value: number;
  max?: number;
  label: string;
};
export function ProgressBar({
  value,
  max = 100,
  label,
  className,
  ...props
}: ProgressBarProps) {
  const safeValue = Math.max(0, Math.min(max, value));
  return (
    <div className={classes("yd-progress", className)} {...props}>
      <span>
        <strong>{label}</strong>
        <small>{Math.round((safeValue / max) * 100)}%</small>
      </span>
      <progress value={safeValue} max={max}>
        {safeValue} sur {max}
      </progress>
    </div>
  );
}

export type MiniChartProps = HTMLAttributes<HTMLElement> & {
  data: number[];
  label: string;
  tone?: "accent" | "success";
};
export function MiniChart({
  data,
  label,
  tone = "accent",
  className,
  ...props
}: MiniChartProps) {
  const max = Math.max(...data, 1);
  const points = data
    .map((value, index) => {
      const x = data.length <= 1 ? 0 : (index / (data.length - 1)) * 100;
      return `${x},${38 - (value / max) * 34}`;
    })
    .join(" ");
  return (
    <figure
      className={classes("yd-chart", `yd-chart--${tone}`, className)}
      aria-label={label}
      {...props}
    >
      <figcaption>{label}</figcaption>
      <svg viewBox="0 0 100 40" role="img" aria-hidden="true">
        <polyline
          points={points}
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </figure>
  );
}

export type MotionCardProps = HTMLAttributes<HTMLElement> & {
  eyebrow?: string;
  title: string;
};
export function MotionCard({
  eyebrow,
  title,
  children,
  className,
  ...props
}: MotionCardProps) {
  return (
    <article className={classes("yd-motion-card", className)} {...props}>
      <div aria-hidden="true" />
      {eyebrow ? <span>{eyebrow}</span> : null}
      <h3>{title}</h3>
      {children ? <p>{children}</p> : null}
    </article>
  );
}
