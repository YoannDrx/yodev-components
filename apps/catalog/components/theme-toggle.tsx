"use client";

export function ThemeToggle() {
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => {
        const next = document.documentElement.dataset.theme !== "dark";
        document.documentElement.dataset.theme = next ? "dark" : "light";
        window.localStorage.setItem("yodev-theme", next ? "dark" : "light");
      }}
    >
      ◐ Changer le thème
    </button>
  );
}
