"use client";

import { useState, type HTMLAttributes, type ReactNode } from "react";

function classes(...values: Array<string | undefined | false>) {
  return values.filter(Boolean).join(" ");
}

export type NavigationItem = {
  id: string;
  label: string;
  href: string;
  icon?: ReactNode;
};

export type ResponsiveNavbarProps = HTMLAttributes<HTMLElement> & {
  brand: ReactNode;
  items: NavigationItem[];
  activeHref?: string;
  action?: ReactNode;
};

export function ResponsiveNavbar({
  brand,
  items,
  activeHref,
  action,
  className,
  ...props
}: ResponsiveNavbarProps) {
  const [open, setOpen] = useState(false);
  return (
    <nav
      className={classes("yd-navbar", className)}
      aria-label="Navigation principale"
      {...props}
    >
      <div className="yd-navbar__brand">{brand}</div>
      <button
        type="button"
        className="yd-navbar__toggle"
        aria-expanded={open}
        aria-label="Ouvrir le menu"
        onClick={() => setOpen((value) => !value)}
      >
        ☰
      </button>
      <div className={classes("yd-navbar__links", open && "is-open")}>
        {items.map((item) => (
          <a
            key={item.id}
            href={item.href}
            aria-current={item.href === activeHref ? "page" : undefined}
          >
            {item.label}
          </a>
        ))}
        {action ? <div className="yd-navbar__action">{action}</div> : null}
      </div>
    </nav>
  );
}

export type CollapsibleSidebarProps = HTMLAttributes<HTMLElement> & {
  brand: ReactNode;
  items: NavigationItem[];
  activeId?: string;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  onActiveChange?: (id: string) => void;
};

export function CollapsibleSidebar({
  brand,
  items,
  activeId,
  collapsed,
  defaultCollapsed = false,
  onCollapsedChange,
  onActiveChange,
  className,
  ...props
}: CollapsibleSidebarProps) {
  const [internal, setInternal] = useState(defaultCollapsed);
  const isCollapsed = collapsed ?? internal;
  const toggle = () => {
    const next = !isCollapsed;
    if (collapsed === undefined) setInternal(next);
    onCollapsedChange?.(next);
  };
  return (
    <aside
      className={classes(
        "yd-sidebar",
        isCollapsed && "is-collapsed",
        className,
      )}
      {...props}
    >
      <div className="yd-sidebar__brand">{brand}</div>
      <nav aria-label="Navigation latérale">
        {items.map((item) => (
          <a
            key={item.id}
            href={item.href}
            title={isCollapsed ? item.label : undefined}
            aria-current={item.id === activeId ? "page" : undefined}
            onClick={() => onActiveChange?.(item.id)}
          >
            <span className="yd-sidebar__icon" aria-hidden="true">
              {item.icon ?? item.label.slice(0, 1)}
            </span>
            <span className="yd-sidebar__label">{item.label}</span>
          </a>
        ))}
      </nav>
      <button
        type="button"
        className="yd-sidebar__collapse"
        onClick={toggle}
        aria-label={isCollapsed ? "Déplier" : "Replier"}
      >
        {isCollapsed ? "→" : "←"}
        <span>{isCollapsed ? "" : "Replier"}</span>
      </button>
    </aside>
  );
}
