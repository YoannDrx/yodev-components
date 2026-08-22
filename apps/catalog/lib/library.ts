import type { CatalogItem } from "@yodev/catalog-core";

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
  {
    slug: "badge",
    name: "Badge",
    category: "Feedback",
    inspiration: "https://github.com/frontend-joe/css-badge/tree/main/badge-1",
    description: "Pastille sémantique compacte avec quatre tonalités.",
  },
  {
    slug: "banner",
    name: "Banner",
    category: "Feedback",
    inspiration:
      "https://github.com/frontend-joe/css-banners/tree/main/banner-1",
    description: "Bannière informative avec action, tonalité et fermeture.",
  },
  {
    slug: "checkbox",
    name: "Checkbox",
    category: "Contrôle",
    inspiration:
      "https://github.com/frontend-joe/css-reels/tree/main/checkboxes/part-1",
    description:
      "Case à cocher native, stylée et accompagnée d’une description.",
  },
  {
    slug: "switch",
    name: "Switch",
    category: "Contrôle",
    inspiration:
      "https://github.com/frontend-joe/css-reels/tree/main/switches/part-1",
    description: "Interrupteur accessible fondé sur une checkbox native.",
  },
  {
    slug: "text-field",
    name: "TextField",
    category: "Formulaire",
    inspiration:
      "https://github.com/frontend-joe/html-controls/tree/main/textbox-1",
    description: "Champ typé avec aide, erreur et associations ARIA complètes.",
  },
  {
    slug: "tooltip",
    name: "Tooltip",
    category: "Overlay",
    inspiration:
      "https://github.com/frontend-joe/css-reels/tree/main/tooltips/part-1",
    description: "Info-bulle visible au survol comme au focus clavier.",
  },
  {
    slug: "popover",
    name: "Popover",
    category: "Overlay",
    inspiration:
      "https://github.com/frontend-joe/css-popovers/tree/main/popover-1",
    description: "Panneau contextuel léger avec état et contrôles accessibles.",
  },
  {
    slug: "data-table",
    name: "DataTable",
    category: "Données",
    inspiration:
      "https://github.com/frontend-joe/es6-components/tree/main/tables/table-1",
    description:
      "Table responsive avec caption, en-têtes et alignements typés.",
  },
  {
    slug: "pagination",
    name: "Pagination",
    category: "Navigation",
    inspiration:
      "https://github.com/frontend-joe/es6-controls/tree/main/pacman-pagination",
    description:
      "Pagination compacte avec page courante et libellés accessibles.",
  },
  {
    slug: "toast",
    name: "Toast",
    category: "Feedback",
    inspiration:
      "https://github.com/frontend-joe/es6-libraries/tree/main/toastify",
    description:
      "Notification sémantique, fermable et sans dépendance externe.",
  },
  {
    slug: "footer",
    name: "Footer",
    category: "Navigation",
    inspiration:
      "https://github.com/frontend-joe/css-components/tree/main/footers/footer-1",
    description: "Pied de page responsive composé de colonnes de navigation.",
  },
  {
    slug: "signup-form",
    name: "SignupForm",
    category: "Formulaire",
    inspiration:
      "https://github.com/frontend-joe/css-components/tree/main/signups/signup-1",
    description:
      "Inscription typée avec validation HTML et consentement explicite.",
  },
  {
    slug: "stat-card",
    name: "StatCard",
    category: "Données",
    inspiration:
      "https://github.com/frontend-joe/css-components/tree/main/widgets/widget-1",
    description: "Tuile de métrique pour widgets et tableaux de bord.",
  },
  {
    slug: "progress-bar",
    name: "ProgressBar",
    category: "Feedback",
    inspiration:
      "https://github.com/frontend-joe/es6-components/tree/main/gsap/scroll-progress",
    description: "Progression native bornée avec valeur lisible et libellé.",
  },
  {
    slug: "mini-chart",
    name: "MiniChart",
    category: "Données",
    inspiration:
      "https://github.com/frontend-joe/es6-charts/tree/main/area-chart",
    description: "Courbe SVG responsive et décorative pour séries compactes.",
  },
  {
    slug: "motion-card",
    name: "MotionCard",
    category: "Mouvement",
    inspiration:
      "https://github.com/frontend-joe/es6-parallax/tree/main/parallax-1",
    description: "Carte de profondeur sobre respectant le mouvement réduit.",
  },
] as const;

export type LibrarySlug = (typeof libraryItems)[number]["slug"];

export function getLibraryItem(slug: string) {
  return libraryItems.find((item) => item.slug === slug);
}

const adaptationMatchers: Array<[RegExp, LibrarySlug]> = [
  [/accordion/, "image-accordion"],
  [/badge/, "badge"],
  [/banner/, "banner"],
  [/checkbox/, "checkbox"],
  [/switch/, "switch"],
  [/(tooltip)/, "tooltip"],
  [/(popover)/, "popover"],
  [/(toast)/, "toast"],
  [/(table)/, "data-table"],
  [/(pagination|pager)/, "pagination"],
  [/(scroll-progress|progress)/, "progress-bar"],
  [/(area-chart|bar-chart|piechart|chart)/, "mini-chart"],
  [/(footer)/, "footer"],
  [/(signup)/, "signup-form"],
  [/(login)/, "login-form"],
  [/(input|textbox|password-visibility)/, "text-field"],
  [/(dropdown|select)/, "select-menu"],
  [/(modal)/, "modal"],
  [/(sidebar|sticky-sidebar)/, "collapsible-sidebar"],
  [/(navbar|menu|burger)/, "responsive-navbar"],
  [/(carousel)/, "carousel"],
  [/(loader|spinner)/, "loader"],
  [/(button)/, "button"],
  [/(widget|dashboard)/, "stat-card"],
  [/(card)/, "profile-card"],
  [/(parallax|atropos|scrolling|horizontal-scroll)/, "motion-card"],
];

export function getAdaptationSlug(item: CatalogItem): LibrarySlug | undefined {
  const repo = item.repositoryId.replace("github:frontend-joe/", "");
  if (
    !/^(css|js|es6|react|svelte|nextjs|tailwind|html|vuejs)(-|$)|^frontendjoe$/.test(
      repo,
    )
  )
    return undefined;
  const searchable = `${repo}/${item.sourcePath}/${item.componentType}`
    .toLowerCase()
    .replaceAll("_", "-");
  return adaptationMatchers.find(([matcher]) => matcher.test(searchable))?.[1];
}
