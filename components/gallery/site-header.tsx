import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="YoDev Components, accueil">
        <span className="brand-mark">YD</span>
        <span>YoDev Components</span>
      </Link>
      <nav aria-label="Navigation principale">
        <Link href="/">Familles</Link>
        <Link href="/about">À propos</Link>
        <a
          href="https://github.com/YoannDrx/yodev-components"
          target="_blank"
          rel="noreferrer"
        >
          GitHub ↗
        </a>
      </nav>
    </header>
  );
}
