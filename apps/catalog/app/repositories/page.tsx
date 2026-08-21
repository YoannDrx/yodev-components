import Link from "next/link";
import { getItemsForRepository, getRepositories } from "@/lib/catalog";

export default function RepositoriesPage() {
  const repositories = getRepositories();
  return (
    <div className="page">
      <p className="eyebrow">Inventaire GitHub</p>
      <h1 className="page-title">Les dépôts, sans angle mort.</h1>
      <p className="page-intro">
        Collections, applications, ressources et expériences : chaque dépôt
        public est conservé, même lorsqu’aucun aperçu autonome n’est détecté.
      </p>
      <div className="repo-list">
        {repositories.map((repository) => {
          const count = getItemsForRepository(repository.id).length;
          return (
            <Link
              className="repo-row"
              key={repository.id}
              href={`/repositories/${repository.name}`}
            >
              <strong>{repository.name}</strong>
              <span>{repository.description ?? "Sans description"}</span>
              <span className="repo-tech">
                {repository.technologies.slice(0, 2).map((tech) => (
                  <i className="badge" key={tech}>
                    {tech}
                  </i>
                ))}
              </span>
              <span>
                {count} item{count > 1 ? "s" : ""}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
