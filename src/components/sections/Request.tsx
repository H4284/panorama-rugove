import { copy, type Language } from "@/content";
import StayForm from "@/components/StayForm";

export default function Request({ language }: { language: Language }) {
  const t = copy[language];
  return <section id="kerkesa" className="request band-dark"><div className="section-heading"><h2>{t.formTitle}</h2><p>{t.formIntro}</p></div><StayForm language={language} /></section>;
}
