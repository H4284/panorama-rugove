import type { Language } from "@/content";

export const phoneHref = "tel:+38349677777";
export const emailHref = "mailto:hotelpanorama03@gmail.com";
export const whatsapp = (message: string) => `https://wa.me/38349677777?text=${encodeURIComponent(message)}`;

export const otherLanguage = (language: Language): Language => (language === "en" ? "sq" : "en");
export const homePath = (language: Language) => (language === "en" ? "/en" : "/");
export const privacyPath = (language: Language) => (language === "en" ? "/en/privacy" : "/privatesia");
