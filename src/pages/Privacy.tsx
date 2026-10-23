import { copy, type Language } from "@/content";
import { otherLanguage, privacyPath } from "@/lib/links";
import SimpleHeader from "@/components/SimpleHeader";
import Footer from "@/components/Footer";
import TaggedLine from "@/components/TaggedLine";

export default function Privacy({ language }: { language: Language }) {
  const t = copy[language];
  return <><SimpleHeader language={language} switchHref={privacyPath(otherLanguage(language))} /><main className="legal-page"><h1>{t.privacyPage.title}</h1><div className="legal-copy">{t.privacyPage.lines.map((line, index) => <p className={index === 0 ? "unfinished" : ""} key={line}>{line.includes("⚑") ? <TaggedLine text={line} tag={t.confirm} /> : line}</p>)}</div></main><Footer language={language} /></>;
}
