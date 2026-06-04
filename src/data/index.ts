/**
 * spa-capelli-web · src/data/index.ts
 *
 * Single import point for all site content.
 * Data is stored in /src/content/spa/*.json (editable via TinaCMS).
 * TypeScript interfaces enforce schema consistency at build time.
 */

// ─── JSON imports ─────────────────────────────────────────────────────────────
import configRaw       from '../content/spa/config.json';
import quickServicesRaw from '../content/spa/quick-services.json';
import aboutRaw        from '../content/spa/about.json';
import servicesRaw     from '../content/spa/services.json';
import treatmentsRaw   from '../content/spa/treatments.json';
import whyUsRaw        from '../content/spa/why-us.json';
import testimonialsRaw from '../content/spa/testimonials.json';
import scheduleRaw     from '../content/spa/schedule.json';
import privacyRaw      from '../content/spa/privacy.json';

// ─── Interfaces ───────────────────────────────────────────────────────────────

export interface HeroData {
  eyebrow: string;
  titleLine1: string;
  titleHighlight: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface SiteConfig {
  siteName: string;
  tagline: string;
  phone: string;
  instagram: string;
  address: string;
  city: string;
  hero: HeroData;
}

export interface QuickServiceItem {
  icon: string;
  label: string;
}

export interface AboutData {
  eyebrow: string;
  titleLine1: string;
  titleHighlight: string;
  paragraph1: string;
  paragraph2: string;
  image: string;
  imageAlt: string;
  stats: Array<{ number: string; label: string }>;
}

export interface ServiceItem {
  number: string;
  name: string;
  description: string;
  priceFrom: string;
  currency: string;
}

export interface TreatmentItem {
  name: string;
  price: string;
}

export interface TreatmentCategory {
  icon: string;
  name: string;
  items: TreatmentItem[];
}

export interface TreatmentsData {
  bannerImage: string;
  bannerAlt: string;
  categories: TreatmentCategory[];
}

export interface WhyUsCard {
  icon: string;
  title: string;
  description: string;
}

export interface Testimonial {
  text: string;
  name: string;
  service: string;
  initial: string;
}

export interface ScheduleDay {
  day: string;
  hours: string;
  closed: boolean;
}

export interface PrivacySection {
  title: string;
  content: string;
  listItems: string[];
}

export interface PrivacyData {
  lastUpdate: string;
  sections: PrivacySection[];
}

// ─── Typed exports ────────────────────────────────────────────────────────────

export const siteConfig = configRaw as SiteConfig;
export const quickServices = quickServicesRaw.items as QuickServiceItem[];
export const about = aboutRaw as AboutData;
export const services = servicesRaw.items as ServiceItem[];
export const treatments = treatmentsRaw as TreatmentsData;
export const whyUs = whyUsRaw.cards as WhyUsCard[];
export const testimonials = testimonialsRaw.items as Testimonial[];
export const schedule = scheduleRaw.days as ScheduleDay[];
export const privacy = privacyRaw as PrivacyData;

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Returns WhatsApp link with optional pre-filled message */
export function waLink(message = 'Hola! quiero reservar una hora en Spa Capelli'): string {
  return `https://wa.me/${siteConfig.phone}?text=${encodeURIComponent(message)}`;
}

/** Returns base URL respecting Astro's `base` config */
export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL ?? '/';
  return `${base.replace(/\/$/, '')}${path}`;
}
