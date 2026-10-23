import { copy, type Language } from "@/content";
import { whatsapp } from "@/lib/links";
import { photos } from "@/photos";
import PhotoBox from "@/components/PhotoBox";

export default function Hero({ language }: { language: Language }) {
  const t = copy[language];
  return <section className="hero"><div className="hero-copy"><p className="eyebrow">{t.heroEyebrow}</p><h1>{t.heroTitle}</h1><p className="hero-lead">{t.heroText}</p><div className="hero-actions"><a className="button" href="#kerkesa">{t.primary}</a><a className="text-link" href={whatsapp(t.wa.general)}>{t.heroSecondary}</a></div></div><PhotoBox label={t.heroPhoto} hero photo={photos.hero} alt={t.photoAlt.hero} /></section>;
}
