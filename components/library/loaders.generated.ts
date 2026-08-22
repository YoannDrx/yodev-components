import type { ComponentType } from "react";
import type { AuthorizedPortProps } from "./authorized-port-frame";

export const componentLoaders: Record<
  string,
  () => Promise<{ default: ComponentType<AuthorizedPortProps> }>
> = {
  "css-accordion01": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssAccordion01,
    })),
  "css-accordion02": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssAccordion02,
    })),
  "css-card01": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssCard01,
    })),
  "css-card10": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssCard10,
    })),
  "css-card11": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssCard11,
    })),
  "css-card13": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssCard13,
    })),
  "css-card02": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssCard02,
    })),
  "css-card03": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssCard03,
    })),
  "css-card04": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssCard04,
    })),
  "css-card07": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssCard07,
    })),
  "css-card08": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssCard08,
    })),
  "css-card09": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssCard09,
    })),
  "css-carousel02": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssCarousel02,
    })),
  "css-dashboard01": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssDashboard01,
    })),
  "css-dropdown01": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssDropdown01,
    })),
  "css-dropdown02": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssDropdown02,
    })),
  "css-dropdown03": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssDropdown03,
    })),
  "css-footer01": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssFooter01,
    })),
  "css-footer10": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssFooter10,
    })),
  "css-footer11": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssFooter11,
    })),
  "css-footer12": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssFooter12,
    })),
  "css-footer13": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssFooter13,
    })),
  "css-footer14": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssFooter14,
    })),
  "css-footer15": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssFooter15,
    })),
  "css-footer02": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssFooter02,
    })),
  "css-footer03": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssFooter03,
    })),
  "css-footer04": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssFooter04,
    })),
  "css-footer05": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssFooter05,
    })),
  "css-footer06": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssFooter06,
    })),
  "css-footer07": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssFooter07,
    })),
  "css-footer08": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssFooter08,
    })),
  "css-footer09": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssFooter09,
    })),
  "css-login01": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssLogin01,
    })),
  "css-login10": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssLogin10,
    })),
  "css-login12": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssLogin12,
    })),
  "css-login15": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssLogin15,
    })),
  "css-login16": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssLogin16,
    })),
  "css-login17": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssLogin17,
    })),
  "css-login18": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssLogin18,
    })),
  "css-login02": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssLogin02,
    })),
  "css-login03": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssLogin03,
    })),
  "css-login04": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssLogin04,
    })),
  "css-login05": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssLogin05,
    })),
  "css-login06": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssLogin06,
    })),
  "css-login07": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssLogin07,
    })),
  "css-login08": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssLogin08,
    })),
  "css-login09": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssLogin09,
    })),
  "css-menu01": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssMenu01,
    })),
  "css-menu02": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssMenu02,
    })),
  "css-menu03": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssMenu03,
    })),
  "css-navbar01": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssNavbar01,
    })),
  "css-navbar02": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssNavbar02,
    })),
  "css-navbar03": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssNavbar03,
    })),
  "css-navbar04": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssNavbar04,
    })),
  "css-navbar05": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssNavbar05,
    })),
  "css-navbar06": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssNavbar06,
    })),
  "css-navbar07": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssNavbar07,
    })),
  "css-navbar08": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssNavbar08,
    })),
  "css-navbar09": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssNavbar09,
    })),
  "css-parallax01": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssParallax01,
    })),
  "css-parallax02": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssParallax02,
    })),
  "css-sidebar01": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssSidebar01,
    })),
  "css-sidebar02": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssSidebar02,
    })),
  "css-sidebar03": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssSidebar03,
    })),
  "css-sidebar04": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssSidebar04,
    })),
  "css-sidebar05": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssSidebar05,
    })),
  "css-sidebar06": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssSidebar06,
    })),
  "css-sidebar07": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssSidebar07,
    })),
  "css-sidebar08": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssSidebar08,
    })),
  "css-signup01": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssSignup01,
    })),
  "css-signup02": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssSignup02,
    })),
  "css-signup03": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssSignup03,
    })),
  "css-signup04": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssSignup04,
    })),
  "css-trick-sticky-sidebar": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssTrickStickySidebar,
    })),
  "css-widget01": () =>
    import("./ports.generated").then((module) => ({
      default: module.CssWidget01,
    })),
  "reel-burger01": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReelBurger01,
    })),
  "reel-burger02": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReelBurger02,
    })),
  "reel-burger03": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReelBurger03,
    })),
  "reel-button01": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReelButton01,
    })),
  "reel-button02": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReelButton02,
    })),
  "reel-button03": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReelButton03,
    })),
  "reel-button04": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReelButton04,
    })),
  "reel-checkbox01": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReelCheckbox01,
    })),
  "reel-checkbox02": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReelCheckbox02,
    })),
  "reel-checkbox03": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReelCheckbox03,
    })),
  "reel-checkbox04": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReelCheckbox04,
    })),
  "reel-dropdown01": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReelDropdown01,
    })),
  "reel-example-child-selectors": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReelExampleChildSelectors,
    })),
  "reel-example-filter-property": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReelExampleFilterProperty,
    })),
  "reel-example-timing-function": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReelExampleTimingFunction,
    })),
  "reel-example02": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReelExample02,
    })),
  "reel-example-transforms": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReelExampleTransforms,
    })),
  "reel-input01": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReelInput01,
    })),
  "reel-input02": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReelInput02,
    })),
  "reel-loader03": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReelLoader03,
    })),
  "reel-loader04": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReelLoader04,
    })),
  "reel-loader05": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReelLoader05,
    })),
  "reel-loader06": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReelLoader06,
    })),
  "reel-loader07": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReelLoader07,
    })),
  "reel-loader08": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReelLoader08,
    })),
  "reel-loader09": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReelLoader09,
    })),
  "reel-menu01": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReelMenu01,
    })),
  "reel-modal01": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReelModal01,
    })),
  "reel-svg03": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReelSvg03,
    })),
  "reel-switch01": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReelSwitch01,
    })),
  "reel-switch02": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReelSwitch02,
    })),
  "reel-switch04": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReelSwitch04,
    })),
  "reel-tooltip01": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReelTooltip01,
    })),
  "es6-accordion01": () =>
    import("./ports.generated").then((module) => ({
      default: module.Es6Accordion01,
    })),
  "es6-banner01": () =>
    import("./ports.generated").then((module) => ({
      default: module.Es6Banner01,
    })),
  "es6-card01": () =>
    import("./ports.generated").then((module) => ({
      default: module.Es6Card01,
    })),
  "es6-carousel01": () =>
    import("./ports.generated").then((module) => ({
      default: module.Es6Carousel01,
    })),
  "es6-carousel02": () =>
    import("./ports.generated").then((module) => ({
      default: module.Es6Carousel02,
    })),
  "es6-carousel03": () =>
    import("./ports.generated").then((module) => ({
      default: module.Es6Carousel03,
    })),
  "es6-control01": () =>
    import("./ports.generated").then((module) => ({
      default: module.Es6Control01,
    })),
  "es6-dropdown01": () =>
    import("./ports.generated").then((module) => ({
      default: module.Es6Dropdown01,
    })),
  "es6-gsap-scroll-progress": () =>
    import("./ports.generated").then((module) => ({
      default: module.Es6GsapScrollProgress,
    })),
  "es6-library-atropos-js": () =>
    import("./ports.generated").then((module) => ({
      default: module.Es6LibraryAtroposJs,
    })),
  "es6-library-no-ui-slider-js": () =>
    import("./ports.generated").then((module) => ({
      default: module.Es6LibraryNoUiSliderJs,
    })),
  "es6-library-paroller-js": () =>
    import("./ports.generated").then((module) => ({
      default: module.Es6LibraryParollerJs,
    })),
  "es6-library-ukiyo-lenis": () =>
    import("./ports.generated").then((module) => ({
      default: module.Es6LibraryUkiyoLenis,
    })),
  "es6-menu01": () =>
    import("./ports.generated").then((module) => ({
      default: module.Es6Menu01,
    })),
  "es6-navbar01": () =>
    import("./ports.generated").then((module) => ({
      default: module.Es6Navbar01,
    })),
  "es6-navbar02": () =>
    import("./ports.generated").then((module) => ({
      default: module.Es6Navbar02,
    })),
  "es6-parallax01": () =>
    import("./ports.generated").then((module) => ({
      default: module.Es6Parallax01,
    })),
  "es6-parallax02": () =>
    import("./ports.generated").then((module) => ({
      default: module.Es6Parallax02,
    })),
  "es6-scrolling01": () =>
    import("./ports.generated").then((module) => ({
      default: module.Es6Scrolling01,
    })),
  "es6-sidebar01": () =>
    import("./ports.generated").then((module) => ({
      default: module.Es6Sidebar01,
    })),
  "es6-sidebar02": () =>
    import("./ports.generated").then((module) => ({
      default: module.Es6Sidebar02,
    })),
  "es6-signup01": () =>
    import("./ports.generated").then((module) => ({
      default: module.Es6Signup01,
    })),
  "es6-table01": () =>
    import("./ports.generated").then((module) => ({
      default: module.Es6Table01,
    })),
  "es6-table02": () =>
    import("./ports.generated").then((module) => ({
      default: module.Es6Table02,
    })),
  "es6-table03": () =>
    import("./ports.generated").then((module) => ({
      default: module.Es6Table03,
    })),
  "js-accordion01": () =>
    import("./ports.generated").then((module) => ({
      default: module.JsAccordion01,
    })),
  "js-banner01": () =>
    import("./ports.generated").then((module) => ({
      default: module.JsBanner01,
    })),
  "js-banner02": () =>
    import("./ports.generated").then((module) => ({
      default: module.JsBanner02,
    })),
  "js-carousel01": () =>
    import("./ports.generated").then((module) => ({
      default: module.JsCarousel01,
    })),
  "js-carousel02": () =>
    import("./ports.generated").then((module) => ({
      default: module.JsCarousel02,
    })),
  "js-control01": () =>
    import("./ports.generated").then((module) => ({
      default: module.JsControl01,
    })),
  "js-control02": () =>
    import("./ports.generated").then((module) => ({
      default: module.JsControl02,
    })),
  "js-control03": () =>
    import("./ports.generated").then((module) => ({
      default: module.JsControl03,
    })),
  "js-control04": () =>
    import("./ports.generated").then((module) => ({
      default: module.JsControl04,
    })),
  "js-footer01": () =>
    import("./ports.generated").then((module) => ({
      default: module.JsFooter01,
    })),
  "js-gsap01": () =>
    import("./ports.generated").then((module) => ({
      default: module.JsGsap01,
    })),
  "js-gsap02": () =>
    import("./ports.generated").then((module) => ({
      default: module.JsGsap02,
    })),
  "js-login01": () =>
    import("./ports.generated").then((module) => ({
      default: module.JsLogin01,
    })),
  "js-login10": () =>
    import("./ports.generated").then((module) => ({
      default: module.JsLogin10,
    })),
  "js-login02": () =>
    import("./ports.generated").then((module) => ({
      default: module.JsLogin02,
    })),
  "js-login03": () =>
    import("./ports.generated").then((module) => ({
      default: module.JsLogin03,
    })),
  "js-login04": () =>
    import("./ports.generated").then((module) => ({
      default: module.JsLogin04,
    })),
  "js-login05": () =>
    import("./ports.generated").then((module) => ({
      default: module.JsLogin05,
    })),
  "js-login06": () =>
    import("./ports.generated").then((module) => ({
      default: module.JsLogin06,
    })),
  "js-login07": () =>
    import("./ports.generated").then((module) => ({
      default: module.JsLogin07,
    })),
  "js-login08": () =>
    import("./ports.generated").then((module) => ({
      default: module.JsLogin08,
    })),
  "js-login09": () =>
    import("./ports.generated").then((module) => ({
      default: module.JsLogin09,
    })),
  "js-modal01": () =>
    import("./ports.generated").then((module) => ({
      default: module.JsModal01,
    })),
  "js-navbar01": () =>
    import("./ports.generated").then((module) => ({
      default: module.JsNavbar01,
    })),
  "js-parallax01": () =>
    import("./ports.generated").then((module) => ({
      default: module.JsParallax01,
    })),
  "js-sidebar01": () =>
    import("./ports.generated").then((module) => ({
      default: module.JsSidebar01,
    })),
  "js-sidebar10": () =>
    import("./ports.generated").then((module) => ({
      default: module.JsSidebar10,
    })),
  "js-sidebar11": () =>
    import("./ports.generated").then((module) => ({
      default: module.JsSidebar11,
    })),
  "js-sidebar12": () =>
    import("./ports.generated").then((module) => ({
      default: module.JsSidebar12,
    })),
  "js-sidebar02": () =>
    import("./ports.generated").then((module) => ({
      default: module.JsSidebar02,
    })),
  "js-sidebar03": () =>
    import("./ports.generated").then((module) => ({
      default: module.JsSidebar03,
    })),
  "js-sidebar04": () =>
    import("./ports.generated").then((module) => ({
      default: module.JsSidebar04,
    })),
  "js-sidebar05": () =>
    import("./ports.generated").then((module) => ({
      default: module.JsSidebar05,
    })),
  "js-sidebar06": () =>
    import("./ports.generated").then((module) => ({
      default: module.JsSidebar06,
    })),
  "js-sidebar07": () =>
    import("./ports.generated").then((module) => ({
      default: module.JsSidebar07,
    })),
  "js-sidebar08": () =>
    import("./ports.generated").then((module) => ({
      default: module.JsSidebar08,
    })),
  "js-sidebar09": () =>
    import("./ports.generated").then((module) => ({
      default: module.JsSidebar09,
    })),
  "js-slider01": () =>
    import("./ports.generated").then((module) => ({
      default: module.JsSlider01,
    })),
  "js-table01": () =>
    import("./ports.generated").then((module) => ({
      default: module.JsTable01,
    })),
  "js-widget01": () =>
    import("./ports.generated").then((module) => ({
      default: module.JsWidget01,
    })),
  "react-accordion01": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactAccordion01,
    })),
  "react-accordion02": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactAccordion02,
    })),
  "react-accordion03": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactAccordion03,
    })),
  "react-delete-button": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactDeleteButton,
    })),
  "react-fab-button": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactFabButton,
    })),
  "react-trash-button": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactTrashButton,
    })),
  "react-card01": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactCard01,
    })),
  "react-card02": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactCard02,
    })),
  "react-card03": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactCard03,
    })),
  "react-card04": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactCard04,
    })),
  "react-card05": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactCard05,
    })),
  "react-card06": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactCard06,
    })),
  "react-card07": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactCard07,
    })),
  "react-card08": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactCard08,
    })),
  "react-carousel01": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactCarousel01,
    })),
  "react-carousel02": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactCarousel02,
    })),
  "react-carousel03": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactCarousel03,
    })),
  "react-auto-suggest": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactAutoSuggest,
    })),
  "react-editable-text": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactEditableText,
    })),
  "react-password-strength": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactPasswordStrength,
    })),
  "react-password-strength02": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactPasswordStrength02,
    })),
  "react-password-strength03": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactPasswordStrength03,
    })),
  "react-password-strength04": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactPasswordStrength04,
    })),
  "react-password-visibility": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactPasswordVisibility,
    })),
  "react-slider": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactSlider,
    })),
  "react-dropdown01": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactDropdown01,
    })),
  "react-dropdown02": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactDropdown02,
    })),
  "react-dropdown03": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactDropdown03,
    })),
  "react-dropdown04": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactDropdown04,
    })),
  "react-dropdown05": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactDropdown05,
    })),
  "react-dropdown06": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactDropdown06,
    })),
  "react-dropdown07": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactDropdown07,
    })),
  "react-dropdown08": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactDropdown08,
    })),
  "react-scroll-reveal": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactScrollReveal,
    })),
  "react-gsaptyped-message": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactGSAPTypedMessage,
    })),
  "react-rc-slider": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactRcSlider,
    })),
  "react-react-dropzone": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactReactDropzone,
    })),
  "react-react-xarrows": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactReactXarrows,
    })),
  "react-login01": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactLogin01,
    })),
  "react-login02": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactLogin02,
    })),
  "react-login03": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactLogin03,
    })),
  "react-login04": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactLogin04,
    })),
  "react-login05": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactLogin05,
    })),
  "react-login06": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactLogin06,
    })),
  "react-login07": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactLogin07,
    })),
  "react-login08": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactLogin08,
    })),
  "react-login09": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactLogin09,
    })),
  "react-menu01": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactMenu01,
    })),
  "react-modal01": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactModal01,
    })),
  "react-modal02": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactModal02,
    })),
  "react-navbar01": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactNavbar01,
    })),
  "react-navbar02": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactNavbar02,
    })),
  "react-navbar03": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactNavbar03,
    })),
  "react-navbar04": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactNavbar04,
    })),
  "react-navbar05": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactNavbar05,
    })),
  "react-parallax01": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactParallax01,
    })),
  "react-parallax02": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactParallax02,
    })),
  "react-sidebar01": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactSidebar01,
    })),
  "react-sidebar10": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactSidebar10,
    })),
  "react-sidebar11": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactSidebar11,
    })),
  "react-sidebar12": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactSidebar12,
    })),
  "react-sidebar13": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactSidebar13,
    })),
  "react-sidebar14": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactSidebar14,
    })),
  "react-sidebar02": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactSidebar02,
    })),
  "react-sidebar03": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactSidebar03,
    })),
  "react-sidebar04": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactSidebar04,
    })),
  "react-sidebar05": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactSidebar05,
    })),
  "react-sidebar06": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactSidebar06,
    })),
  "react-sidebar07": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactSidebar07,
    })),
  "react-sidebar08": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactSidebar08,
    })),
  "react-sidebar09": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactSidebar09,
    })),
  "react-sidebar15": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactSidebar15,
    })),
  "react-sidebar16": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactSidebar16,
    })),
  "react-signup01": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactSignup01,
    })),
  "react-table01": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactTable01,
    })),
  "react-table02": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactTable02,
    })),
  "react-table03": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactTable03,
    })),
  "react-widget01": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactWidget01,
    })),
  "react-widget02": () =>
    import("./ports.generated").then((module) => ({
      default: module.ReactWidget02,
    })),
};
