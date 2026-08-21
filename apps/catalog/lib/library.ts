export const libraryItems = [
  {
    slug: "button",
    name: "Button",
    category: "Action",
    inspiration:
      "https://github.com/frontend-joe/css-reels/tree/main/buttons/part-1",
    description:
      "Bouton fluide avec trois variantes, trois tailles et état de chargement.",
  },
  {
    slug: "profile-card",
    name: "ProfileCard",
    category: "Carte",
    inspiration:
      "https://github.com/frontend-joe/css-components/tree/main/cards/card-1",
    description:
      "Carte éditoriale responsive destinée aux profils et témoignages.",
  },
  {
    slug: "image-accordion",
    name: "ImageAccordion",
    category: "Accordéon",
    inspiration:
      "https://github.com/frontend-joe/js-components/tree/main/accordions/accordion-1",
    description:
      "Galerie en accordéon contrôlée ou autonome, utilisable au clavier.",
  },
  {
    slug: "select-menu",
    name: "SelectMenu",
    category: "Contrôle",
    inspiration:
      "https://github.com/frontend-joe/es6-components/tree/main/dropdowns/dropdown-1",
    description:
      "Menu de sélection compact avec fermeture extérieure et navigation clavier.",
  },
  {
    slug: "modal",
    name: "Modal",
    category: "Overlay",
    inspiration:
      "https://github.com/frontend-joe/js-components/tree/main/modals/modal-1",
    description:
      "Fenêtre modale native avec restauration du focus et fermeture Échap.",
  },
  {
    slug: "responsive-navbar",
    name: "ResponsiveNavbar",
    category: "Navigation",
    inspiration:
      "https://github.com/frontend-joe/js-components/tree/main/navbars/navbar-1",
    description: "Barre de navigation adaptative avec menu mobile accessible.",
  },
  {
    slug: "collapsible-sidebar",
    name: "CollapsibleSidebar",
    category: "Navigation",
    inspiration:
      "https://github.com/frontend-joe/svelte-components/tree/main/src/components/sidebars/Sidebar1",
    description: "Navigation latérale contrôlée ou autonome avec mode compact.",
  },
  {
    slug: "carousel",
    name: "Carousel",
    category: "Média",
    inspiration:
      "https://github.com/frontend-joe/es6-components/tree/main/carousels/carousel-1",
    description:
      "Carrousel contrôlable, bouclable et respectueux du mouvement réduit.",
  },
  {
    slug: "login-form",
    name: "LoginForm",
    category: "Formulaire",
    inspiration:
      "https://github.com/frontend-joe/css-components/tree/main/logins/login-1",
    description:
      "Formulaire de connexion typé avec validation native et états d’erreur.",
  },
  {
    slug: "loader",
    name: "Loader",
    category: "Feedback",
    inspiration:
      "https://github.com/frontend-joe/css-reels/tree/main/loaders/part-3",
    description:
      "Indicateur de chargement léger avec trois tailles et trois tons.",
  },
] as const;

export type LibrarySlug = (typeof libraryItems)[number]["slug"];

export function getLibraryItem(slug: string) {
  return libraryItems.find((item) => item.slug === slug);
}
