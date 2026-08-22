"use client";

import {
  forwardRef,
  type CSSProperties,
  type IframeHTMLAttributes,
} from "react";

export type AuthorizedPortProps = Omit<
  IframeHTMLAttributes<HTMLIFrameElement>,
  "src" | "sandbox"
> & {
  className?: string;
  style?: CSSProperties;
};

type InternalProps = AuthorizedPortProps & { slug: string };

export const AuthorizedPortFrame = forwardRef<HTMLIFrameElement, InternalProps>(
  function AuthorizedPortFrame(
    { slug, className, title, loading = "lazy", ...props },
    ref,
  ) {
    return (
      <iframe
        {...props}
        ref={ref}
        className={className}
        loading={loading}
        referrerPolicy="no-referrer"
        sandbox="allow-scripts allow-forms allow-pointer-lock"
        src={`/api/preview/${encodeURIComponent(slug)}`}
        title={title ?? `Aperçu ${slug}`}
      />
    );
  },
);
