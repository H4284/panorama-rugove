import { copy, type Language } from "@/content";
import SimpleHeader from "@/components/SimpleHeader";
import Footer from "@/components/Footer";

export default function Privacy({ language }: { language: Language }) {
  const t = copy[language];
  return <><SimpleHeader language={language} /><main className="legal-page"><h1>{t.privacyPage.title}</h1><div className="legal-copy">{t.privacyPage.lines.map((line, index) => <p className={index === 0 ? "unfinished" : ""} key={line}>{line}</p>)}</div></main><Footer language={language} /></>;
}
