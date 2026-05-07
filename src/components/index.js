// Barrel of components used by the live site (home, about, service-v6,
// contact, faq, error). Slimmed during template cleanup — see
// docs/superpowers/specs/2026-05-07-template-cleanup-design.md.

// Common
export { default as CursorAnimation } from "./common/CursorAnimation";
export { default as Switcher } from "./common/Switcher";
export { default as ScrollTop } from "./common/ScrollTop";
export { default as Preloader } from "./preloader/Preloader";
export { default as ScrollSmootherComponents } from "./common/ScrollSmootherComponents";

// Creative Agency (home + shared chrome)
export { default as CreativeAgencyHeader } from "./header/CreativeAgencyHeader";
export { default as CreativeAgencyHero } from "./hero/CreativeAgencyHero";
export { default as CreativeAgencyAbout } from "./about/CreativeAgencyAbout";
export { default as CreativeAgencyService } from "./service/CreativeAgencyService";
export { default as CreativeAgencyCTA } from "./cta/CreativeAgencyCTA";
export { default as CreativeAgencyFooter } from "./footer/CreativeAgencyFooter";
export { default as CreativeAgencyBrand } from "./brand/CreativeAgencyBrand";

// About page
export { default as AboutHero } from "./hero/AboutHero";
export { default as AboutStory } from "./story/AboutStory";
export { default as AboutCounter } from "./counter/AboutCounter";
export { default as AboutTestimonial } from "./testimonial/AboutTestimonial";

// Contact page
export { default as Contact1 } from "./contact/Contact1";

// Service page
export { default as ServiceV6Hero } from "./hero/ServiceV6Hero";

// FAQ page
export { default as Faq1 } from "./faq/Faq1";
export { default as FaqCTA } from "./cta/FaqCTA";

// Error/404 page
export { default as DigitalAgencyHeader } from "./header/DigitalAgencyHeader";
export { default as Error1 } from "./error/Error1";
