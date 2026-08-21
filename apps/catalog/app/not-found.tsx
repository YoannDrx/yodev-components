import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page page-narrow">
      <p className="eyebrow">404</p>
      <h1 className="page-title">Cette pièce n’est plus dans l’atelier.</h1>
      <p className="page-intro">
        La source a peut-être été renommée ou supprimée en amont.
      </p>
      <div className="hero-actions">
        <Link className="cta" href="/components">
          Revenir au catalogue
        </Link>
      </div>
    </div>
  );
}
