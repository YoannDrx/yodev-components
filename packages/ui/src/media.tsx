"use client";

import { useEffect, useState, type HTMLAttributes } from "react";

export type CarouselItem = {
  id: string;
  image: { src: string; alt: string };
  title?: string;
  description?: string;
};
export type CarouselProps = HTMLAttributes<HTMLDivElement> & {
  items: CarouselItem[];
  index?: number;
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  loop?: boolean;
  autoPlayMs?: number;
};

export function Carousel({
  items,
  index,
  defaultIndex = 0,
  onIndexChange,
  loop = true,
  autoPlayMs = 0,
  className,
  ...props
}: CarouselProps) {
  const [internal, setInternal] = useState(defaultIndex);
  const active = index ?? internal;
  const select = (next: number) => {
    if (!items.length) return;
    const normalized = loop
      ? (next + items.length) % items.length
      : Math.max(0, Math.min(items.length - 1, next));
    if (index === undefined) setInternal(normalized);
    onIndexChange?.(normalized);
  };
  useEffect(() => {
    if (
      !autoPlayMs ||
      autoPlayMs < 1000 ||
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const timer = window.setInterval(() => select(active + 1), autoPlayMs);
    return () => window.clearInterval(timer);
  }, [active, autoPlayMs, items.length]);
  const item = items[active];
  if (!item) return null;
  return (
    <section
      className={`yd-carousel ${className ?? ""}`}
      aria-roledescription="carrousel"
      aria-label="Galerie"
      {...props}
    >
      <div className="yd-carousel__stage">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.image.src} alt={item.image.alt} />
        {item.title || item.description ? (
          <div className="yd-carousel__copy">
            {item.title ? <h3>{item.title}</h3> : null}
            {item.description ? <p>{item.description}</p> : null}
          </div>
        ) : null}
      </div>
      <button
        type="button"
        className="yd-carousel__previous"
        aria-label="Élément précédent"
        disabled={!loop && active === 0}
        onClick={() => select(active - 1)}
      >
        ←
      </button>
      <button
        type="button"
        className="yd-carousel__next"
        aria-label="Élément suivant"
        disabled={!loop && active === items.length - 1}
        onClick={() => select(active + 1)}
      >
        →
      </button>
      <div className="yd-carousel__dots">
        {items.map((value, itemIndex) => (
          <button
            key={value.id}
            type="button"
            aria-label={`Afficher l’élément ${itemIndex + 1}`}
            aria-current={itemIndex === active}
            onClick={() => select(itemIndex)}
          />
        ))}
      </div>
    </section>
  );
}
