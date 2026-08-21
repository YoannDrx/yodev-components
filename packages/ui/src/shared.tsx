"use client";

import {
  forwardRef,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from "react";

function classes(...values: Array<string | undefined | false>) {
  return values.filter(Boolean).join(" ");
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      loading = false,
      iconStart,
      iconEnd,
      className,
      children,
      disabled,
      ...props
    },
    ref,
  ) {
    return (
      <button
        ref={ref}
        className={classes(
          "yd-button",
          `yd-button--${variant}`,
          `yd-button--${size}`,
          className,
        )}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? (
          <span className="yd-button__spinner" aria-hidden="true" />
        ) : (
          iconStart
        )}
        <span>{children}</span>
        {!loading && iconEnd}
      </button>
    );
  },
);

export type ProfileCardProps = HTMLAttributes<HTMLElement> & {
  image: { src: string; alt: string };
  title: string;
  eyebrow?: string;
  description: string;
  action?: ReactNode;
};

export const ProfileCard = forwardRef<HTMLElement, ProfileCardProps>(
  function ProfileCard(
    { image, title, eyebrow, description, action, className, ...props },
    ref,
  ) {
    return (
      <article
        ref={ref}
        className={classes("yd-profile-card", className)}
        {...props}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- package stays framework-agnostic */}
        <img
          className="yd-profile-card__image"
          src={image.src}
          alt={image.alt}
        />
        <div className="yd-profile-card__content">
          {eyebrow ? (
            <p className="yd-profile-card__eyebrow">{eyebrow}</p>
          ) : null}
          <h3>{title}</h3>
          <p>{description}</p>
          {action ? (
            <div className="yd-profile-card__action">{action}</div>
          ) : null}
        </div>
      </article>
    );
  },
);

export type LoaderProps = HTMLAttributes<HTMLSpanElement> & {
  size?: "sm" | "md" | "lg";
  tone?: "accent" | "light" | "dark";
  label?: string;
  decorative?: boolean;
};

export function Loader({
  size = "md",
  tone = "accent",
  label = "Chargement",
  decorative = false,
  className,
  ...props
}: LoaderProps) {
  return (
    <span
      className={classes(
        "yd-loader",
        `yd-loader--${size}`,
        `yd-loader--${tone}`,
        className,
      )}
      role={decorative ? undefined : "status"}
      aria-label={decorative ? undefined : label}
      aria-hidden={decorative || undefined}
      {...props}
    >
      <span />
      <span />
      <span />
    </span>
  );
}
