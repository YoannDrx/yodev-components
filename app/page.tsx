import { LibraryExplorer } from "@/components/gallery/library-explorer";
import { getComponents, getFamilies } from "@/lib/catalog";

export default function HomePage() {
  const components = getComponents();
  const families = getFamilies().map((family) => ({
    slug: family.slug,
    title: family.title,
    count: family.components.length,
    searchText: family.components
      .flatMap((component) => [
        component.title,
        component.exportName,
        component.sourceRepository,
      ])
      .join(" "),
  }));
  const interactive = components.filter(
    (component) => component.interactive,
  ).length;
  return (
    <div className="page-shell">
      <section className="hero">
        <p className="eyebrow">Bibliothèque React personnelle</p>
        <h1>
          252 composants.
          <br />
          Une seule galerie.
        </h1>
        <p>
          Les cinq collections épinglées de Frontend Joe, organisées par famille
          et accessibles dans des aperçus isolés.
        </p>
        <div className="hero-stats" aria-label="Statistiques">
          <div>
            <strong>252</strong>
            <span>composants</span>
          </div>
          <div>
            <strong>31</strong>
            <span>familles</span>
          </div>
          <div>
            <strong>5</strong>
            <span>sources</span>
          </div>
          <div>
            <strong>{interactive}</strong>
            <span>interactifs</span>
          </div>
        </div>
      </section>
      <LibraryExplorer families={families} />
    </div>
  );
}
