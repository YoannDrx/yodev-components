"use client";

import { useState } from "react";
import {
  Badge,
  Banner,
  Button,
  Carousel,
  Checkbox,
  CollapsibleSidebar,
  DataTable,
  Footer,
  ImageAccordion,
  Loader,
  LoginForm,
  MiniChart,
  Modal,
  MotionCard,
  Pagination,
  Popover,
  ProfileCard,
  ProgressBar,
  ResponsiveNavbar,
  SelectMenu,
  SignupForm,
  StatCard,
  Switch,
  TextField,
  Toast,
  Tooltip,
} from "@yodev/components";
import type { LibrarySlug } from "@/lib/library";

const images = [
  {
    id: "coast",
    title: "Côte sauvage",
    description: "Finistère, France",
    image: {
      src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      alt: "Vagues sur une plage",
    },
  },
  {
    id: "mountain",
    title: "Haute vallée",
    description: "Alpes, France",
    image: {
      src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
      alt: "Montagnes enneigées",
    },
  },
  {
    id: "forest",
    title: "Forêt calme",
    description: "Jura, France",
    image: {
      src: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
      alt: "Forêt dense",
    },
  },
];

export function LibraryPreview({ slug }: { slug: LibrarySlug }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(4);
  if (slug === "button")
    return (
      <div className="demo-stack">
        <Button size="sm">Petit</Button>
        <Button>Action principale</Button>
        <Button variant="secondary" size="lg">
          Continuer →
        </Button>
        <Button variant="ghost">Fantôme</Button>
        <Button loading>Chargement</Button>
      </div>
    );
  if (slug === "profile-card")
    return (
      <ProfileCard
        image={{
          src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80",
          alt: "Portrait de Camille",
        }}
        title="Camille Martin"
        eyebrow="Product designer"
        description="Je transforme les problèmes complexes en expériences numériques simples, utiles et mémorables."
        action={<Button size="sm">Voir le profil</Button>}
      />
    );
  if (slug === "image-accordion") return <ImageAccordion items={images} />;
  if (slug === "select-menu")
    return (
      <div className="demo-stack">
        <SelectMenu
          placeholder="Choisir un framework"
          items={[
            { value: "next", label: "Next.js" },
            { value: "react", label: "React" },
            { value: "svelte", label: "Svelte" },
            { value: "vue", label: "Vue" },
          ]}
        />
      </div>
    );
  if (slug === "modal")
    return (
      <div className="demo-stack">
        <Button onClick={() => setModalOpen(true)}>Ouvrir la modale</Button>
        <Modal
          open={modalOpen}
          onOpenChange={setModalOpen}
          title="Prêt à enregistrer ?"
          description="Cette adaptation repose sur l’élément dialog natif."
        >
          <p>
            Le focus, la touche Échap et le clic sur l’arrière-plan sont gérés.
          </p>
        </Modal>
      </div>
    );
  if (slug === "responsive-navbar")
    return (
      <div style={{ width: "min(100%, 900px)" }}>
        <ResponsiveNavbar
          brand={<strong>YoDev.</strong>}
          activeHref="#studio"
          items={[
            { id: "studio", label: "Studio", href: "#studio" },
            { id: "work", label: "Projets", href: "#work" },
            { id: "notes", label: "Notes", href: "#notes" },
          ]}
          action={<Button size="sm">Parler d’un projet</Button>}
        />
      </div>
    );
  if (slug === "collapsible-sidebar")
    return (
      <div className="demo-sidebar-wrap">
        <CollapsibleSidebar
          brand={<span>◆ YoDev</span>}
          activeId="library"
          items={[
            { id: "home", label: "Accueil", href: "#home", icon: "⌂" },
            { id: "library", label: "Librairie", href: "#library", icon: "▦" },
            {
              id: "favorites",
              label: "Favoris",
              href: "#favorites",
              icon: "♡",
            },
            { id: "settings", label: "Réglages", href: "#settings", icon: "⚙" },
          ]}
        />
        <div className="demo-sidebar-content">Espace de travail</div>
      </div>
    );
  if (slug === "carousel") return <Carousel items={images} />;
  if (slug === "login-form")
    return (
      <LoginForm
        forgotPasswordHref="#forgot"
        onSubmit={async () => {
          await new Promise((resolve) => window.setTimeout(resolve, 400));
        }}
      />
    );
  if (slug === "badge")
    return (
      <div className="demo-stack">
        <Badge>Nouveau</Badge>
        <Badge tone="accent">Design system</Badge>
        <Badge tone="success">Disponible</Badge>
        <Badge tone="warning">À vérifier</Badge>
      </div>
    );
  if (slug === "banner")
    return (
      <Banner title="Ton catalogue est synchronisé" tone="success">
        18 nouvelles références sont prêtes à être examinées.
      </Banner>
    );
  if (slug === "checkbox")
    return (
      <Checkbox
        defaultChecked
        label="Recevoir les nouveautés"
        description="Un récapitulatif, une fois par semaine."
      />
    );
  if (slug === "switch")
    return (
      <div className="demo-stack">
        <Switch defaultChecked label="Aperçus interactifs" />
        <Switch label="Mouvement automatique" />
      </div>
    );
  if (slug === "text-field")
    return (
      <div style={{ width: "min(100%, 420px)" }}>
        <TextField
          label="Nom du composant"
          placeholder="Ex. CommandMenu"
          hint="Utilise un nom court et descriptif."
        />
      </div>
    );
  if (slug === "tooltip")
    return (
      <Tooltip content="Ajouter aux favoris">
        <Button variant="secondary" aria-label="Ajouter aux favoris">
          ♡
        </Button>
      </Tooltip>
    );
  if (slug === "popover")
    return (
      <Popover triggerLabel="Voir les détails" title="Provenance">
        Inspiré par Frontend Joe, puis redessiné et réimplémenté pour YoDev.
      </Popover>
    );
  if (slug === "data-table")
    return (
      <DataTable
        caption="Composants les plus consultés"
        columns={[
          { key: "name", label: "Composant" },
          { key: "family", label: "Famille" },
          { key: "views", label: "Vues", align: "end" },
        ]}
        rows={[
          { id: 1, name: "Button", family: "Action", views: "2 841" },
          { id: 2, name: "Modal", family: "Overlay", views: "1 932" },
          { id: 3, name: "Carousel", family: "Média", views: "1 427" },
        ]}
      />
    );
  if (slug === "pagination")
    return <Pagination page={page} pageCount={12} onPageChange={setPage} />;
  if (slug === "toast")
    return (
      <Toast title="Favori enregistré" tone="success">
        La décision de curation sera conservée au prochain sync.
      </Toast>
    );
  if (slug === "footer")
    return (
      <Footer
        brand="YoDev."
        description="Des composants personnels, accessibles et réutilisables."
        columns={[
          {
            title: "Explorer",
            links: [
              { label: "Catalogue", href: "#catalogue" },
              { label: "Librairie", href: "#library" },
            ],
          },
          {
            title: "Projet",
            links: [
              { label: "À propos", href: "#about" },
              { label: "GitHub", href: "#github" },
            ],
          },
        ]}
        legal="© YoDev · Code original sous licence MIT"
      />
    );
  if (slug === "signup-form") return <SignupForm onSubmit={() => undefined} />;
  if (slug === "stat-card")
    return (
      <div className="demo-stack">
        <StatCard
          label="Aperçus actifs"
          value="363"
          trend="+18 cette semaine"
          icon="↗"
        />
        <StatCard
          label="Adaptations"
          value="26"
          trend="16 nouvelles familles"
          icon="◇"
        />
      </div>
    );
  if (slug === "progress-bar")
    return <ProgressBar label="Couverture des familles" value={92} />;
  if (slug === "mini-chart")
    return (
      <MiniChart
        label="Découvertes sur sept semaines"
        data={[12, 20, 17, 34, 29, 45, 58]}
      />
    );
  if (slug === "motion-card")
    return (
      <MotionCard eyebrow="Interaction" title="Profondeur maîtrisée">
        Un mouvement subtil, désactivé quand l’utilisateur le demande.
      </MotionCard>
    );
  return (
    <div className="demo-stack">
      <Loader size="sm" />
      <Loader />
      <Loader size="lg" tone="dark" />
    </div>
  );
}
