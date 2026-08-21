"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";

function classes(...values: Array<string | undefined | false>) {
  return values.filter(Boolean).join(" ");
}

export type ImageAccordionItem = {
  id: string;
  title: string;
  description?: string;
  image: { src: string; alt: string };
};

export type ImageAccordionProps = HTMLAttributes<HTMLDivElement> & {
  items: ImageAccordionItem[];
  activeId?: string;
  defaultActiveId?: string;
  onActiveChange?: (id: string) => void;
};

export function ImageAccordion({
  items,
  activeId,
  defaultActiveId,
  onActiveChange,
  className,
  ...props
}: ImageAccordionProps) {
  const [internalId, setInternalId] = useState(defaultActiveId ?? items[0]?.id);
  const selected = activeId ?? internalId;
  const select = (id: string) => {
    if (activeId === undefined) setInternalId(id);
    onActiveChange?.(id);
  };
  const onKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (
      !items.length ||
      !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)
    )
      return;
    event.preventDefault();
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? items.length - 1
          : (index + (event.key === "ArrowRight" ? 1 : -1) + items.length) %
            items.length;
    const item = items[next];
    if (item) select(item.id);
  };
  return (
    <div className={classes("yd-image-accordion", className)} {...props}>
      {items.map((item, index) => {
        const isActive = item.id === selected;
        return (
          <button
            key={item.id}
            type="button"
            className={classes(
              "yd-image-accordion__item",
              isActive && "is-active",
            )}
            aria-expanded={isActive}
            onClick={() => select(item.id)}
            onKeyDown={(event) => onKeyDown(event, index)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.image.src} alt={item.image.alt} />
            <span className="yd-image-accordion__copy">
              <strong>{item.title}</strong>
              {item.description ? <small>{item.description}</small> : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export type SelectMenuItem = {
  value: string;
  label: string;
  disabled?: boolean;
};
export type SelectMenuProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> & {
  items: SelectMenuItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
};

export function SelectMenu({
  items,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Sélectionner",
  disabled,
  className,
  ...props
}: SelectMenuProps) {
  const [internal, setInternal] = useState(defaultValue ?? "");
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const selected = value ?? internal;
  const label =
    items.find((item) => item.value === selected)?.label ?? placeholder;
  useEffect(() => {
    const close = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);
  useEffect(() => {
    if (!open) return;
    const options = menu.current?.querySelectorAll<HTMLButtonElement>(
      '[role="option"]:not(:disabled)',
    );
    const selectedOption = menu.current?.querySelector<HTMLButtonElement>(
      '[role="option"][aria-selected="true"]:not(:disabled)',
    );
    (selectedOption ?? options?.[0])?.focus();
  }, [open]);
  const choose = (next: string) => {
    if (value === undefined) setInternal(next);
    onValueChange?.(next);
    setOpen(false);
  };
  return (
    <div ref={root} className={classes("yd-select", className)} {...props}>
      <button
        type="button"
        className="yd-select__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={disabled}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={(event) => {
          if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
            event.preventDefault();
            setOpen(true);
          }
          if (event.key === "Escape") setOpen(false);
        }}
      >
        {label}
        <span aria-hidden="true">⌄</span>
      </button>
      {open ? (
        <div
          ref={menu}
          className="yd-select__menu"
          role="listbox"
          aria-label={placeholder}
          onKeyDown={(event) => {
            const options = [
              ...(menu.current?.querySelectorAll<HTMLButtonElement>(
                '[role="option"]:not(:disabled)',
              ) ?? []),
            ];
            const current = options.indexOf(
              document.activeElement as HTMLButtonElement,
            );
            const targets: Record<string, number> = {
              ArrowDown: (current + 1) % options.length,
              ArrowUp: (current - 1 + options.length) % options.length,
              Home: 0,
              End: options.length - 1,
            };
            const target = targets[event.key];
            if (target !== undefined && options.length) {
              event.preventDefault();
              options[target]?.focus();
            }
            if (event.key === "Escape") {
              event.preventDefault();
              setOpen(false);
              root.current
                ?.querySelector<HTMLButtonElement>(".yd-select__trigger")
                ?.focus();
            }
          }}
        >
          {items.map((item) => (
            <button
              key={item.value}
              type="button"
              role="option"
              aria-selected={item.value === selected}
              disabled={item.disabled}
              onClick={() => choose(item.value)}
            >
              {item.label}
              <span>{item.value === selected ? "✓" : ""}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
}: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);
  return (
    <dialog
      ref={ref}
      className="yd-modal"
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onClose={() => onOpenChange(false)}
      onCancel={(event) => {
        event.preventDefault();
        onOpenChange(false);
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onOpenChange(false);
      }}
    >
      <div className="yd-modal__surface">
        <button
          className="yd-modal__close"
          type="button"
          aria-label="Fermer"
          onClick={() => onOpenChange(false)}
        >
          ×
        </button>
        <header>
          <h2 id={titleId}>{title}</h2>
          {description ? <p id={descriptionId}>{description}</p> : null}
        </header>
        <div className="yd-modal__body">{children}</div>
        {footer ? <footer>{footer}</footer> : null}
      </div>
    </dialog>
  );
}
