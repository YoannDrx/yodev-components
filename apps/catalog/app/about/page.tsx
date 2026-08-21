export default function AboutPage() {
  return (
    <div className="page page-narrow prose">
      <p className="eyebrow">À propos du projet</p>
      <h1 className="page-title">
        Une mémoire visuelle, avec des frontières nettes.
      </h1>
      <p className="page-intro">
        YoDev Components rassemble les idées qui méritent d’être retrouvées sans
        confondre inspiration, aperçu et code réutilisable.
      </p>
      <h2>Catalogue externe</h2>
      <p>
        Les fiches conservent le dépôt, le chemin, le commit et la licence
        détectée. Les aperçus HTML, CSS et JavaScript sont récupérés depuis leur
        emplacement GitHub canonique et exécutés dans un iframe sans accès au
        parent.
      </p>
      <h2>Librairie originale</h2>
      <p>
        Le package <code>@yodev/components</code> contient uniquement des
        adaptations originales YoDev. Il est volontairement privé dans cette
        première version afin d’empêcher une publication npm accidentelle.
      </p>
      <h2>Attribution</h2>
      <p>
        La première source suivie est{" "}
        <a
          href="https://github.com/frontend-joe"
          target="_blank"
          rel="noreferrer"
        >
          Frontend Joe
        </a>
        . Les dépôts principaux ne présentent pas de licence racine détectable :
        aucun de leurs fichiers n’est redistribué dans le package.
      </p>
      <div className="notice">
        La licence MIT de ce dépôt couvre seulement le code original YoDev.
        Consulte `UPSTREAM_CONTENT_NOTICE.md` avant toute réutilisation d’un
        élément externe.
      </div>
    </div>
  );
}
