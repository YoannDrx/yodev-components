import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-shell empty-state">
      <h1>Composant introuvable</h1>
      <p>Cette référence n’existe pas dans les cinq collections suivies.</p>
      <Link href="/">Revenir aux familles</Link>
    </div>
  );
}
