import { copy, type Language } from "@/content";

export default function Directions({ language }: { language: Language }) {
  const t = copy[language];
  return <section id="drejtimet" className="directions band"><div className="section-heading"><h2>{t.directionsTitle}</h2><p>{t.address}</p><p>{t.distance}</p><a className="button" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(t.address)}`}>{t.map}</a></div><iframe title={t.mapFallback} src={`https://www.google.com/maps?q=${encodeURIComponent(t.address)}&output=embed`} loading="lazy" /></section>;
}
