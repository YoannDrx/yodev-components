"use client";

import { useState } from "react";
import {
  Button,
  Carousel,
  CollapsibleSidebar,
  ImageAccordion,
  Loader,
  LoginForm,
  Modal,
  ProfileCard,
  ResponsiveNavbar,
  SelectMenu,
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
  return (
    <div className="demo-stack">
      <Loader size="sm" />
      <Loader />
      <Loader size="lg" tone="dark" />
    </div>
  );
}
