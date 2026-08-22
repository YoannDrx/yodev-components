export const metadata = { title: "À propos" };

export default function AboutPage() {
  return (
    <div className="page-shell readable-page">
      <p className="eyebrow">À propos</p>
      <h1>Une bibliothèque, cinq collections.</h1>
      <p>
        YoDev Components rassemble uniquement les cinq dépôts de composants
        épinglés de Frontend Joe : CSS Components, JS Components, CSS Reels, ES6
        Components et React Components.
      </p>
      <h2>Attribution et autorisation</h2>
      <p>
        Les designs et sources amont sont des créations de Frontend Joe. Leur
        copie, leur adaptation et leur hébergement dans ce projet sont réalisés
        avec l’autorisation confirmée du titulaire. La licence MIT du dépôt
        couvre le code original YoDev, pas automatiquement les ports dérivés.
      </p>
      <h2>Médias</h2>
      <p>
        Les images et vidéos de démonstration restent hébergées en amont et sont
        référencées au commit enregistré. Elles ne sont pas intégrées au dépôt
        YoDev.
      </p>
    </div>
  );
}
